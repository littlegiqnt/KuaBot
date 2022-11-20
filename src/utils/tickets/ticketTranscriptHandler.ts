import axios, { AxiosError } from "axios";
import type { Message } from "discord.js";
import { EmbedBuilder, PermissionsBitField } from "discord.js";
import { TicketStatus } from "schema/ticketSchema";
import dbManager from "structure/DBManager";
import logger from "structure/Logger";
import TaskQueue from "structure/TaskQueue";
import { isNormalTextChannel } from "utils/checkChannel";
import { ticketDateFormatter } from "utils/dateFormatter";
import handleErrorReply from "utils/handleErrorReply";
import msg from "utils/msg";

const queue: TaskQueue = new TaskQueue(); // ?

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
                api_paste_private: 1,
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
    queue.enqueue(async () => {
        const { channel } = message;
        if (!isNormalTextChannel(channel)) return;

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
                channel.send({
                    embeds: [
                        new EmbedBuilder()
                            .setColor("Blue")
                            .setTitle(msg(supportTicket.lang, "tickets.openEmbed.title"))
                            .setDescription(msg(supportTicket.lang, "tickets.openEmbed.description")),
                    ],
                });
            } catch (e) {
                handleErrorReply(e);
            }
        }

        supportTicket.transcript = supportTicket.transcript.concat("\n", buildTranscriptLine(message));
        if (message.attachments != null && message.attachments.size > 0) {
            supportTicket.transcript = supportTicket.transcript.concat("\n",
                `[${ticketDateFormatter.format(message.createdAt)}] [${message.author.tag}]: `
            + `${message.attachments.map((value) => value.url).join(", ")}`);
        }
        await supportTicket.save();
    });
};

export const updateTranscriptMessage = async (oldMessage: Message, newMessage: Message) => {
    queue.enqueue(async () => {
        const { channel } = newMessage;
        if (!isNormalTextChannel(channel)) return;

        const supportTicket = await dbManager.SupportTicket.findById(newMessage.channelId);
        if (supportTicket == null) return;

        const lines = supportTicket.transcript.split("\n");
        const index = lines.indexOf(buildTranscriptLine(oldMessage));
        lines[index] = buildTranscriptLine(newMessage);
        supportTicket.transcript = lines.join("\n");
        await supportTicket.save();
    });
};

export const buildTranscriptLine = (message: Message): string => {
    let line = "";
    if (message.author.bot || (message.content != null && message.content !== "")) {
        line += `[${ticketDateFormatter.format(message.createdAt)}] [${message.author.tag}]: ${message.content}`;
    }
    if (message.attachments != null && message.attachments.size > 0) {
        if (line !== "") {
            line += "\n";
        }
        line += `[${ticketDateFormatter.format(message.createdAt)}] [${message.author.tag}]: `
            + `${message.attachments.map((value) => value.url).join(", ")}`;
    }
    return line;
};
