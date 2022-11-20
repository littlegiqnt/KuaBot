import type { ButtonInteraction, ChatInputCommandInteraction, GuildChannel, InteractionReplyOptions } from "discord.js";
import { ButtonBuilder, ButtonStyle, EmbedBuilder } from "discord.js";
import { TicketStatus } from "schema/ticketSchema";
import { ActionRow } from "structure/ActionRow";
import dbManager from "structure/DBManager";
import logger from "structure/Logger";
import msg from "utils/msg";
import { uploadTranscript } from "./ticketTranscriptHandler";

export const notTicketEmbed: InteractionReplyOptions = {
    ephemeral: true,
    embeds: [
        new EmbedBuilder()
            .setColor("Red")
            .setTitle("엇, 이 명령어는 문의 채널에서만 입력하실 수 있어요!")
            .setDescription("닫으려는 문의 채널에서 계속해 주세요!"),
    ],
};

export const closeTicketCheck = async (interaction: ButtonInteraction | ChatInputCommandInteraction) => {
    const supportTicket = await dbManager.SupportTicket.findById(interaction.channelId);
    if (supportTicket == null) {
        interaction.reply(notTicketEmbed);
        return;
    }
    interaction.reply({
        ephemeral: true,
        embeds: [
            new EmbedBuilder()
                .setColor("Gold")
                .setTitle(msg(interaction.locale, "tickets.closeConfirmEmbed.title"))
                .setDescription(msg(interaction.locale, "tickets.closeConfirmEmbed.description")),
        ],
        components: [
            new ActionRow(
                new ButtonBuilder()
                    .setStyle(ButtonStyle.Danger)
                    .setCustomId("close_ticket")
                    .setLabel(msg(interaction.locale, "tickets.closeConfirmEmbed.confirmButton")),
            ),
        ],
    });
};

export const closeTicket = async (interaction: ButtonInteraction) => {
    const supportTicket = await dbManager.SupportTicket.findById(interaction.channelId);
    if (supportTicket == null) {
        interaction.reply(notTicketEmbed);
        return;
    }
    interaction.channel?.delete();
};

export const onTicketDelete = async (channel: GuildChannel) => {
    const supportTicket = await dbManager.SupportTicket.findById(channel.id);
    if (supportTicket == null) return;
    if (supportTicket.status === TicketStatus.CREATED) {
        await logger.ticket(supportTicket, channel.client);
    } else {
        const url = await uploadTranscript(supportTicket.transcript);
        await logger.ticket(supportTicket, channel.client, url);
    }
    await supportTicket.remove();
};
