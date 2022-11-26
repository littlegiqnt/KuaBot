import { ApplicationCommandOptionType, EmbedBuilder, GuildMember, userMention } from "discord.js";
import Color from "structure/Color";
import dbManager from "structure/DBManager";
import { SubSlashCommand } from "structure/interaction/command/SubSlashCommand";

export default new SubSlashCommand({
    name: "남은일수",
    description: "자신 또는 특정 유저의 생일까지 남은 일수를 계산해 줘요!",
    optionalArgs: [
        {
            type: ApplicationCommandOptionType.User,
            name: "유저",
            description: "특정 유저를 선택해요.",
        },
    ],
    async execute(interaction) {
        await interaction.deferReply({ ephemeral: false });
        const member = interaction.options.getMember("유저") ?? interaction.member;
        if (!(member instanceof GuildMember)) {
            throw new Error("member가 GuildMember가 아님");
        }
        const user = await dbManager.loadUser(member.id);
        if (user.birthday.month == null || user.birthday.day == null) {
            const embed = new EmbedBuilder()
                .setColor(Color.BRIGHT_RED)
                .setTitle("아앗.. 생일이 기억나지 않아요..")
                .setDescription("혹시 저한테 말해주신 적이 없는 건 아닌가요..?");
            interaction.editReply({ embeds: [ embed ] });
            return;
        }
        const now = new Date(new Date().toDateString());
        const birthday = new Date(`${now.getFullYear()}.${user.birthday.month}.${user.birthday.day}`);
        if (now.getTime() > birthday.getTime()) {
            birthday.setFullYear(birthday.getFullYear() + 1);
        }
        const daysLeft = (birthday.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
        if (daysLeft === 0) {
            const embed = new EmbedBuilder()
                .setColor(Color.BRIGHT_BLUE)
                .setDescription(`${userMention(member.id)}님의 생일은 바로 오늘, ${user.birthday.month}월 ${user.birthday.day}일이에요!\n`
                    + "생일 축하드려요!! 🥳🎉🎉");
            interaction.editReply({ embeds: [ embed ] });
            return;
        }
        const embed = new EmbedBuilder()
            .setColor(Color.BRIGHT_BLUE)
            .setDescription(`${userMention(member.id)}님의 생일은 **${daysLeft}일** 남았어요!`);
        interaction.editReply({ embeds: [ embed ] });
    },
});
