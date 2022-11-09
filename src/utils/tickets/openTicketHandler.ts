import type { ButtonInteraction, ChatInputCommandInteraction, InteractionReplyOptions } from "discord.js";
import { ButtonBuilder, ButtonStyle, CategoryChannel, channelMention, ChannelType, EmbedBuilder, GuildMember, PermissionsBitField, userMention } from "discord.js";
import { bot } from "index";
import { TicketStatus } from "schema/ticketSchema";
import { ActionRow } from "structure/ActionRow";
import Color from "structure/Color";
import dbManager from "structure/DBManager";
import { ticketDateFormatter } from "utils/dateFormatter";

const checkEmbed: InteractionReplyOptions = {
    ephemeral: true,
    embeds: [
        new EmbedBuilder()
            .setColor("Gold")
            .setTitle("정말로 문의를 하실 거죠?")
            .setDescription("실수가 아닌지 확인하는 거랍니다! :D"),
    ],
    components: [
        new ActionRow(
            new ButtonBuilder()
                .setStyle(ButtonStyle.Success)
                .setCustomId("create_ticket")
                .setLabel("문의 생성하기"),
        ),
    ],
};

export const createTicketCheck = async (interaction: ButtonInteraction | ChatInputCommandInteraction) => {
    interaction.reply(checkEmbed);
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
                id: interaction.user.id,
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
            whenCreated: now,
            whenOpened: null,
            users: [],
            transcript: `\
문의자: ${member.user?.tag ?? "알 수 없음"} (${member.displayName}) ${member.id}
신청 날짜: ${ticketDateFormatter.format(now)}`,
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
                .setDescription("현재 발생한 문제 또는 상황에 대하여 최대한 자세하게 설명해 주세요!\n"
                    + "채팅을 입력하면 문의가 정식으로 신청됩니다.\n\n"
                    + "문의를 닫으시려면 밑의 버튼을 눌러주세요!"),
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
                    .setLabel("문의 닫기"),
            ),
        ],
    });

    interaction.editReply({
        embeds: [
            new EmbedBuilder()
                .setColor(Color.GREEN)
                .setTitle("문의가 성공적으로 신청되었어요!")
                .setDescription(`${channelMention(channel.id)}로 이동해 주세요!`),
        ],
    });
};
