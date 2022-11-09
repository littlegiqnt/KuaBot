import { EmbedBuilder, PermissionsBitField, TextChannel } from "discord.js";
import { Status } from "schema/ticketSchema";
import dbManager from "structure/DBManager";
import { ticketDateFormatter } from "utils/dateFormatter";
import handleErrorReply from "utils/handleErrorReply";
import createMessageCreateEventListener from "./createMessageCreateEventListener";

export default createMessageCreateEventListener(async (message) => {
    const { channel } = message;
    if (!(channel instanceof TextChannel)) return;

    const supportTicket = await dbManager.SupportTicket.findById(message.channelId);
    if (supportTicket == null) return;

    if (supportTicket.status === Status.CREATED && !message.author.bot) {
        try {
            const category = await channel.parent?.fetch();
            await channel.permissionOverwrites.set([
                ...category?.permissionOverwrites.cache.values() ?? [],
                {
                    id: supportTicket.opener,
                    allow: [ PermissionsBitField.Flags.ViewChannel ],
                },
            ]);
            supportTicket.status = Status.OPENED;
            supportTicket.whenOpened = new Date();
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
        `[${ticketDateFormatter.format(Date.now())}] [${message.author.tag}]: ${message.content}`);
    if (message.attachments != null && message.attachments.size > 0) {
        supportTicket.transcript = supportTicket.transcript.concat("\n",
            `[${ticketDateFormatter.format(Date.now())}] [${message.author.tag}]: `
            + `${message.attachments.map((value) => value.url).join(", ")}`);
    }
    await supportTicket.save();
});
