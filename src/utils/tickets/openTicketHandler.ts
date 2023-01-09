import type { ButtonInteraction, ChatInputCommandInteraction, User } from "discord.js";
import { ButtonBuilder, ButtonStyle, CategoryChannel, channelMention, ChannelType, EmbedBuilder, GuildMember, PermissionsBitField, userMention } from "discord.js";
import { bot } from "index";
import type { TicketTypeKey } from "schema/ticketSchema";
import { TicketStatus, TicketType } from "schema/ticketSchema";
import { ActionRow } from "structure/ActionRow";
import dbManager from "structure/DBManager";
import { ticketDateFormatter } from "utils/dateFormatter";

export const createTicketCheck = async (interaction: ButtonInteraction | ChatInputCommandInteraction) => {
    interaction.reply({
        ephemeral: true,
        embeds: [
            new EmbedBuilder()
                .setColor("Gold")
                .setTitle("정말로 문의를 하실 거죠?")
                .setDescription("적합한 카테고리를 선택해 주세요!"),
        ],
        components: [
            new ActionRow(
                new ButtonBuilder()
                    .setStyle(ButtonStyle.Danger)
                    .setCustomId("create_ticket_report")
                    .setLabel("신고")
                    .setEmoji("⚠️"),
                new ButtonBuilder()
                    .setStyle(ButtonStyle.Success)
                    .setCustomId("create_ticket_suggestion")
                    .setLabel("건의")
                    .setEmoji("🙋"),
                new ButtonBuilder()
                    .setStyle(ButtonStyle.Secondary)
                    .setCustomId("create_ticket_other")
                    .setLabel("기타")
                    .setEmoji("❓"),
            ),
        ],
    });
};

export const createTicket = async (interaction: ButtonInteraction) => {
    await interaction.deferReply({ ephemeral: true });

    const { member } = interaction;
    if (!(member instanceof GuildMember)) return;

    const ticketType = getTicketType(interaction.customId);

    // --- 문의 한도 ---
    const tickets = await getTicketsByUser(member.user);
    if (tickets.length >= 3) {
        interaction.editReply({ embeds: [
            new EmbedBuilder()
                .setColor("Red")
                .setTitle("오류가 발생했어요!")
                .setDescription("현재 생성되어 있는 문의가 너무 많아요.."),
        ] });
        return;
    } else if (tickets.filter((value) => value.type === ticketType).length >= 2) {
        interaction.editReply({ embeds: [
            new EmbedBuilder()
                .setColor("Red")
                .setTitle("오류가 발생했어요!")
                .setDescription("이 카테고리에 생성되어 있는 문의가 너무 많아요.."),
        ] });
        return;
    }

    const category = bot.channels.cache.get("1037195764419530802");
    if (!(category instanceof CategoryChannel)) throw new Error("문의 카테고리 인식 실패");

    const channel = await category.children.create({
        name: `${TicketType[ticketType]}-${member.displayName}`,
        type: ChannelType.GuildText,
        permissionOverwrites: [
            {
                id: member.id,
                allow: [PermissionsBitField.Flags.ViewChannel],
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
                .setTitle("문의가 신청되었어요!")
                .setDescription("현재 발생한 문제 또는 상황에 대하여 최대한 자세하게 설명해 주세요!\n또한, 채팅을 입력하면 바로 문의가 열려요."),
        ],
        content: `${userMention(member.id)}`,
        allowedMentions: {
            parse: ["users"],
        },
        components: [
            new ActionRow(
                new ButtonBuilder()
                    .setStyle(ButtonStyle.Secondary)
                    .setCustomId("close_ticket_check")
                    .setLabel("문의 닫기"),
            ),
        ],
    });

    interaction.editReply({
        embeds: [
            new EmbedBuilder()
                .setColor("Green")
                .setTitle("문의가 성공적으로 신청되었어요!")
                .setDescription(`${channelMention(channel.id)}로 이동해 주세요!`),
        ],
    });
};

const getTicketType = (buttonId: string): TicketType => {
    const splitted = buttonId.split("_");
    const typeString = splitted[splitted.length - 1].toUpperCase() as TicketTypeKey;
    return TicketType[typeString];
};

const getTicketsByUser = async (user: User) => dbManager.SupportTicket.find({ opener: user.id });
