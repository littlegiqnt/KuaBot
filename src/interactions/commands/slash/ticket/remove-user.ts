import { ApplicationCommandOptionType, EmbedBuilder, GuildMember, userMention } from "discord.js";
import dbManager from "structure/DBManager";
import { SubCommand } from "structure/interaction/command/SubCommand";
import rolesManager from "structure/RolesManager";
import { isNormalTextChannel } from "utils/checkChannel";
import { notTicketReply } from "utils/tickets/closeTicketHandler";

export default new SubCommand({
    name: "removeuser",
    nameLocales: {
        ko: "유저제거",
    },
    description: {
        en: "Remove a specific user from this ticket",
        ko: "이 문의에서 특정 유저를 제거해요",
    },
    args: [
        {
            type: ApplicationCommandOptionType.User,
            name: "user",
            nameLocalizations: {
                ko: "유저",
            },
            description: "User to remove",
            descriptionLocalizations: {
                ko: "제거할 유저",
            },
        },
    ],
    async execute(interaction) {
        const { channel, member } = interaction;

        if (!(member instanceof GuildMember) || channel == null
            || !member.roles.cache.hasAny(rolesManager.getId("owner"), rolesManager.getId("manager"))
            || !isNormalTextChannel(channel)) return;

        const supportTicket = await dbManager.SupportTicket.findById(interaction.channelId);
        if (supportTicket == null) {
            interaction.reply(notTicketReply);
            return;
        }

        const user = interaction.options.getUser("user");
        if (user == null) return;
        const users = new Set(supportTicket.users);
        users.delete(user.id);
        supportTicket.users = Array.from(users);

        await Promise.all([channel.permissionOverwrites.delete(user), supportTicket.save()]);
        interaction.reply({ embeds: [new EmbedBuilder()
            .setColor("Yellow")
            .setTitle("해당 유저를 제거했어요!")
            .setDescription(`이제부터 ${userMention(user.id)}님은 이 문의에 참가할 수 없어요.`)] });
    },
});
