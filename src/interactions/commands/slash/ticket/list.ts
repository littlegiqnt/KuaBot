import { channelMention, EmbedBuilder, GuildMember, time, userMention } from "discord.js";
import { TicketStatus, TicketType } from "schema/ticketSchema";
import dbManager from "structure/DBManager";
import { SubCommand } from "structure/interaction/command/SubCommand";
import rolesManager from "structure/RolesManager";

export default new SubCommand({
    name: "list",
    nameLocale: {
        ko: "목록",
    },
    description: {
        en: "Check all the support tickets that are currently open",
        ko: "현재 열려있는 모든 문의 티켓들을 확인해요",
    },
    async execute(interaction) {
        if (!(interaction.member instanceof GuildMember)) return;
        if (!interaction.member.roles.cache.hasAny(rolesManager.getId("owner"), rolesManager.getId("manager"))) return;
        const tickets = await dbManager.SupportTicket.find({});
        const embed = new EmbedBuilder()
            .setTitle("문의 목록")
            .setDescription("현재 열려있는 문의 목록이에요!");
        if (tickets.length === 0) {
            embed.setDescription("생성되었거나 열려있는 문의가 없어요!");
        } else {
            tickets.forEach((value) => {
                embed.addFields({
                    name: `${(interaction.client.users.cache.get(value.opener))?.tag ?? "알 수 없는 멤버"}`,
                    value: `\
채널: ${channelMention(value.id)}
신청자: ${userMention(value.opener)}
상태: ${value.status === TicketStatus.CREATED
        ? "아직 시작 안됨(아직 아무 채팅을 안 입력함)"
        : "오픈됨"}
종류: ${ticketTypeName(value.type)}
생성된 날짜: ${time(value.whenCreated, "F")}
시작된 날짜: ${value.whenOpened == null
        ? "아직 시작 안됨"
        : time(value.whenOpened, "F")}
추가로 참여한 유저들: ${value.users.length === 0
        ? "없음"
        : [...value.users].map((id) => userMention(id))}`,
                });
            });
        }
        interaction.reply({ embeds: [embed] });
    },
});

const ticketTypeName = (type: TicketType) => {
    switch (type) {
        case TicketType.REPORT: return "신고";
        case TicketType.SUGGESTION: return "건의";
        case TicketType.OTHER: return "기타";
        default: return "알 수 없음";
    }
};
