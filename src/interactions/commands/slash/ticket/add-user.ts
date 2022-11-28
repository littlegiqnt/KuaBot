import { ApplicationCommandOptionType, EmbedBuilder, GuildMember, userMention } from "discord.js";
import dbManager from "structure/DBManager";
import { SubCommand } from "structure/interaction/command/SubCommand";
import rolesManager from "structure/RolesManager";
import { isNormalTextChannel } from "utils/checkChannel";
import { notTicketEmbed } from "utils/tickets/closeTicketHandler";

export default new SubCommand({
    name: "adduser",
    nameLocale: {
        ko: "유저추가",
    },
    description: {
        en: "Add a specific user to this ticket",
        ko: "이 문의에 특정 유저를 추가해요",
    },
    args: [
        {
            type: ApplicationCommandOptionType.User,
            name: "user",
            nameLocalizations: {
                ko: "유저",
            },
            description: "User to add",
            descriptionLocalizations: {
                ko: "추가할 유저",
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
            interaction.reply(notTicketEmbed);
            return;
        }
        const user = interaction.options.getUser("user");
        if (user == null) return;
        supportTicket.users = Array.from(new Set(supportTicket.users).add(user.id));
        // eslint-disable-next-line @typescript-eslint/naming-convention
        await Promise.all([ channel.permissionOverwrites.edit(user, { ViewChannel: true }), supportTicket.save() ]);
        interaction.reply({ embeds: [ new EmbedBuilder()
            .setColor("Green")
            .setTitle("해당 유저를 추가했어요!")
            .setDescription(`이제부터 ${userMention(user.id)}님은 이 문의에 참가할 수 있어요.`) ] });
    },
});
