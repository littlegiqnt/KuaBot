import { ApplicationCommandOptionType, EmbedBuilder, GuildMember, Locale } from "discord.js";
import dbManager from "structure/DBManager";
import { SubCommand } from "structure/interaction/command/SubCommand";
import rolesManager from "structure/RolesManager";
import { isNormalTextChannel } from "utils/checkChannel";
import { notTicketEmbed } from "utils/tickets/closeTicketHandler";

export default new SubCommand({
    name: "language",
    nameLocale: {
        ko: "언어",
    },
    description: {
        "en-US": "View or set the language for this ticket",
        ko: "이 문의의 언어를 보거나 설정해요",
    },
    optionalArgs: [
        {
            type: ApplicationCommandOptionType.String,
            name: "language",
            nameLocalizations: {
                ko: "언어",
            },
            description: "Language to set",
            descriptionLocalizations: {
                ko: "설정할 언어",
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
        const langInput = interaction.options.getString("language");

        if (langInput == null) {
            interaction.reply({ embeds: [ new EmbedBuilder()
                .setColor("NotQuiteBlack")
                .setTitle("이 문의의 언어")
                .setDescription(`이 문의의 언어는 ${supportTicket.lang}이에요!`) ] });
        } else {
            if (!(Object.values(Locale) as string[]).includes(langInput)) {
                interaction.reply({ embeds: [ new EmbedBuilder()
                    .setColor("Red")
                    .setTitle("알 수 없는 언어에요!")
                    .setDescription("올바른 예시: en-US, ko") ] });
                return;
            }
            supportTicket.lang = langInput as Locale;
            await supportTicket.save();
            interaction.reply({ embeds: [ new EmbedBuilder()
                .setColor("Green")
                .setTitle("설정했어요!") ] });
        }
    },
});
