import { GUILD_ID } from "config";
import { ApplicationCommandOptionType, EmbedBuilder, escapeMarkdown, GuildMember, userMention } from "discord.js";
import dbManager from "structure/DBManager";
import { SlashCommand } from "structure/interaction/command/SlashCommand";
import { getLevelByXp } from "utils/level/level";

export default new SlashCommand({
    name: "level",
    nameLocales: {
        ko: "레벨",
    },
    description: {
        en: "Check your or specific user's level!",
        ko: "자신 또는 다른 유저의 레벨을 확인해요!",
    },
    optionalArgs: [
        {
            type: ApplicationCommandOptionType.User,
            name: "user",
            nameLocalizations: {
                ko: "유저",
            },
            description: "Select specific user",
            descriptionLocalizations: {
                ko: "특정한 유저를 선택해요",
            },
        },
    ],
    async execute(interaction) {
        const member = interaction.options.getMember("user") ?? interaction.member;
        if (!(member instanceof GuildMember)) {
            throw new Error("member가 GuildMember가 아님");
        }
        const user = await dbManager.loadUser(member.id);

        const embed = new EmbedBuilder()
            .setColor("Blue")
            .setTitle(`${escapeMarkdown((await member.user.fetch()).tag)}`)
            .setThumbnail(member.displayAvatarURL())
            .setDescription(
                `${userMention(member.id)}\n`
                + `**Chat**: LVL ${getLevelByXp(user.xp.chat)} (${user.xp.chat})`,
            );

        interaction.reply({ embeds: [embed] });
    },
    // eslint-disable-next-line @typescript-eslint/naming-convention
    guildId: GUILD_ID,
});
