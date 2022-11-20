import { GUILD_ID } from "config";
import { ApplicationCommandOptionType, EmbedBuilder, escapeMarkdown, GuildMember, userMention } from "discord.js";
import Color from "structure/Color";
import dbManager from "structure/DBManager";
import { SlashCommand } from "structure/SlashCommand";

export default new SlashCommand({
    name: "레벨",
    description: "자신 또는 다른 유저의 레벨을 확인해요!",
    optionalArgs: [
        {
            type: ApplicationCommandOptionType.User,
            name: "유저",
            description: "특정한 유저를 선택해요",
        },
    ],
    async execute(interaction) {
        const member = interaction.options.getMember("유저") ?? interaction.member;
        if (!(member instanceof GuildMember)) {
            throw new Error("member가 GuildMember가 아님");
        }
        const xp = (await dbManager.loadUser(member.id)).totalXp;
        // const level = (xp / 0.7) ** 2.5;

        const embed = new EmbedBuilder()
            .setColor(Color.BRIGHT_BLUE)
            .setTitle(`${escapeMarkdown((await member.user.fetch()).tag)}`)
            .setThumbnail(member.displayAvatarURL())
            .setDescription(
                `${userMention(member.id)}\n`
                + `**XP**: ${xp}\n`
                + "**Level**: 아직 준비중인 기능이에요!",
            );

        interaction.reply({ embeds: [ embed ] });
    },
    guildID: GUILD_ID,
});
