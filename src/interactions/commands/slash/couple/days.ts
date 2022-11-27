import { ApplicationCommandOptionType, EmbedBuilder, escapeMarkdown, GuildMember } from "discord.js";
import Color from "structure/Color";
import dbManager from "structure/DBManager";
import { SubCommand } from "structure/interaction/command/SubCommand";

export default new SubCommand({
    name: "days",
    nameLocale: {
        ko: "몇일",
    },
    description: {
        "en-US": "Calculate how long you or another user has been in a relationship!",
        ko: "현재 자신 또는 다른 유저가 연인 사이를 얼마나 유지해왔는지 계산해 줘요!",
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
        await interaction.deferReply({ ephemeral: false });
        const member = interaction.options.getMember("user") ?? interaction.member;
        if (!(member instanceof GuildMember)) {
            throw new Error("member가 GuildMember가 아님");
        }
        const user = await dbManager.loadUser(member.id);
        if (user.coupleSince == null) {
            const embed = new EmbedBuilder()
                .setColor(Color.BRIGHT_RED)
                .setTitle("아앗.. 날짜가 기억나지 않아요..")
                .setDescription("혹시 저한테 말해주신 적이 없는 건 아닌가요..?");
            interaction.editReply({ embeds: [ embed ] });
            return;
        }
        const days = Math.floor((new Date(new Date()
            .toDateString())
            .getTime() - user.coupleSince.getTime()) / (1000 * 60 * 60 * 24)) + 1;
        const embed = new EmbedBuilder()
            .setColor(Color.GREEN)
            .setDescription(`현재 ${escapeMarkdown(member.displayName)}님은 ${days}일 이에요!`);
        interaction.editReply({ embeds: [ embed ] });
    },
});
