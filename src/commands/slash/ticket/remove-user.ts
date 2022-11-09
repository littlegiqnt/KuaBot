import { ApplicationCommandOptionType, EmbedBuilder, GuildMember, TextChannel, userMention } from "discord.js";
import dbManager from "structure/DBManager";
import rolesManager from "structure/RolesManager";
import { SubSlashCommand } from "structure/SubSlashCommand";
import { notTicketEmbed } from "utils/tickets/closeTicketHandler";

export default new SubSlashCommand({
    name: "유저제거",
    description: "이 문의에서 특정 유저를 제거해요",
    args: [
        {
            type: ApplicationCommandOptionType.User,
            name: "유저",
            description: "제거할 유저",
        },
    ],
    async execute(interaction) {
        if (!(interaction.member instanceof GuildMember)) return;
        if (!interaction.member.roles.cache.hasAny(rolesManager.getId("owner"), rolesManager.getId("manager"))) return;

        const supportTicket = await dbManager.SupportTicket.findById(interaction.channelId);
        if (supportTicket == null) {
            interaction.reply(notTicketEmbed);
            return;
        }

        if (!(interaction.channel instanceof TextChannel)) return;
        const user = interaction.options.getUser("유저");
        if (user == null) return;

        const index = supportTicket.users.indexOf(user.id);
        if (index > -1) {
            supportTicket.users.splice(index, 1);
        }

        // eslint-disable-next-line @typescript-eslint/naming-convention
        await Promise.all([ interaction.channel.permissionOverwrites.delete(user), supportTicket.save() ]);
        interaction.reply({ embeds: [ new EmbedBuilder()
            .setColor("Yellow")
            .setTitle("해당 유저를 제거했어요!")
            .setDescription(`이제부터 ${userMention(user.id)}님은 이 문의에 참가할 수 없어요.`) ] });
    },
});
