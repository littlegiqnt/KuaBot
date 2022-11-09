import axios, { AxiosError } from "axios";
import type { Message } from "discord.js";
import { EmbedBuilder, PermissionsBitField, TextChannel } from "discord.js";
import { TicketStatus } from "schema/ticketSchema";
import dbManager from "structure/DBManager";
import logger from "structure/Logger";
import { ticketDateFormatter } from "utils/dateFormatter";
import handleErrorReply from "utils/handleErrorReply";

export const uploadTranscript = async (transcript: string): Promise<string | undefined> => {
    try {
        const response = await axios({
            method: "post",
            url: "https://pastebin.com/api/api_post.php",
            headers: {
                "content-type": "multipart/form-data;",
            },
            data: {
                /* eslint-disable @typescript-eslint/naming-convention */
                api_dev_key: "zVErncKp0NECrshme_ZHKE4eQDGBkJBs",
                api_option: "paste",
                api_paste_code: transcript,
                /* eslint-enable @typescript-eslint/naming-convention */
            },
        });
        return response.data;
    } catch (e) {
        if (e instanceof AxiosError) {
            logger.error(e);
            logger.debug(e.response?.data);
        }
        return undefined;
    }
};

export const addTranscriptMessage = async (message: Message) => {
    const { channel } = message;
    if (!(channel instanceof TextChannel)) return;

    const supportTicket = await dbManager.SupportTicket.findById(message.channelId);
    if (supportTicket == null) return;

    if (supportTicket.status === TicketStatus.CREATED && !message.author.bot) {
        try {
            const category = await channel.parent?.fetch();
            await channel.permissionOverwrites.set([
                ...category?.permissionOverwrites.cache.values() ?? [],
                {
                    id: supportTicket.opener,
                    allow: [ PermissionsBitField.Flags.ViewChannel ],
                },
            ]);
            supportTicket.status = TicketStatus.OPENED;
            supportTicket.whenOpened = message.createdAt;
            await supportTicket.save();
            message.channel.send({
                embeds: [
                    new EmbedBuilder()
                        .setColor("Blue")
                        .setDescription("문의가 공개되었어요!"),
                ],
            });
        } catch (e) {
            handleErrorReply(e);
        }
    }

    supportTicket.transcript = supportTicket.transcript.concat("\n",
        `[${ticketDateFormatter.format(message.createdAt)}] [${message.author.tag}]: ${message.content}`);
    if (message.attachments != null && message.attachments.size > 0) {
        supportTicket.transcript = supportTicket.transcript.concat("\n",
            `[${ticketDateFormatter.format(message.createdAt)}] [${message.author.tag}]: `
            + `${message.attachments.map((value) => value.url).join(", ")}`);
    }
    await supportTicket.save();
};
/*
export const updateTranscriptMessage = async (oldMessage: Message, newMessage: Message) => {
    const { channel } = newMessage;
    if (!(channel instanceof TextChannel)) return;

    const supportTicket = await dbManager.SupportTicket.findById(newMessage.channelId);
    if (supportTicket == null) return;

    const lines = supportTicket.transcript.split("\n");
    const lineNumber = lines.
};
*/
