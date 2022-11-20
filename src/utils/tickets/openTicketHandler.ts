import type { ButtonInteraction, ChatInputCommandInteraction } from "discord.js";
import { ButtonBuilder, ButtonStyle, CategoryChannel, channelMention, ChannelType, EmbedBuilder, GuildMember, PermissionsBitField, userMention } from "discord.js";
import { bot } from "index";
import type { TicketTypeKey } from "schema/ticketSchema";
import { TicketStatus, TicketType } from "schema/ticketSchema";
import { ActionRow } from "structure/ActionRow";
import Color from "structure/Color";
import dbManager from "structure/DBManager";
import { ticketDateFormatter } from "utils/dateFormatter";
import msg from "utils/msg";

export const createTicketCheck = async (interaction: ButtonInteraction | ChatInputCommandInteraction) => {
    interaction.reply({
        ephemeral: true,
        embeds: [
            new EmbedBuilder()
                .setColor("Gold")
                .setTitle(msg(interaction.locale, "tickets.createConfirmEmbed.title"))
                .setDescription(msg(interaction.locale, "tickets.createConfirmEmbed.description")),
        ],
        components: [
            new ActionRow(
                new ButtonBuilder()
                    .setStyle(ButtonStyle.Danger)
                    .setCustomId("create_ticket_report")
                    .setLabel(msg(interaction.locale, "tickets.category.report"))
                    .setEmoji("⚠️"),
                new ButtonBuilder()
                    .setStyle(ButtonStyle.Success)
                    .setCustomId("create_ticket_suggestion")
                    .setLabel(msg(interaction.locale, "tickets.category.suggestion"))
                    .setEmoji("🙋"),
                new ButtonBuilder()
                    .setStyle(ButtonStyle.Secondary)
                    .setCustomId("create_ticket_other")
                    .setLabel(msg(interaction.locale, "tickets.category.other"))
                    .setEmoji("❓"),
            ),
        ],
    });
};

export const createTicket = async (interaction: ButtonInteraction) => {
    await interaction.deferReply({ ephemeral: true });

    const { member } = interaction;
    if (!(member instanceof GuildMember)) return;

    const category = bot.channels.cache.get("1037195764419530802");
    if (!(category instanceof CategoryChannel)) throw new Error("문의 카테고리 인식 실패");

    const channel = await category.children.create({
        name: `${member.displayName}`,
        type: ChannelType.GuildText,
        permissionOverwrites: [
            {
                id: member.id,
                allow: [ PermissionsBitField.Flags.ViewChannel ],
            },
        ],
    });
    try {
        const now = Date.now();
        await dbManager.SupportTicket.create({
            _id: channel.id,
            opener: member.id,
            status: TicketStatus.CREATED,
            type: getTicketType(interaction.customId),
            lang: interaction.locale,
            whenCreated: now,
            whenOpened: null,
            users: [],
            transcript: `\
User: ${member.user?.tag ?? "알 수 없음"} (${member.displayName}) ${member.id}
Date: ${ticketDateFormatter.format(now)}`,
        });
    } catch (e) {
        await channel.delete();
        throw new Error("DB 작성 실패");
    }

    channel.send({
        embeds: [
            new EmbedBuilder()
                .setColor("Green")
                .setTitle(msg(interaction.locale, "tickets.createEmbed.title"))
                .setDescription(msg(interaction.locale, "tickets.createEmbed.description")),
        ],
        content: `${userMention(member.id)}`,
        allowedMentions: {
            parse: [ "users" ],
        },
        components: [
            new ActionRow(
                new ButtonBuilder()
                    .setStyle(ButtonStyle.Secondary)
                    .setCustomId("close_ticket_check")
                    .setLabel(msg(interaction.locale, "tickets.createEmbed.closeButton")),
            ),
        ],
    });

    interaction.editReply({
        embeds: [
            new EmbedBuilder()
                .setColor(Color.GREEN)
                .setTitle(msg(interaction.locale, "tickets.createMessage.title"))
                .setDescription(msg(interaction.locale, "tickets.createMessage.description", { channel: channelMention(channel.id) })),
        ],
    });
};

const getTicketType = (buttonId: string): TicketType => {
    const splitted = buttonId.split("_");
    const typeString = splitted[splitted.length - 1].toUpperCase() as TicketTypeKey;
    return TicketType[typeString];
};
