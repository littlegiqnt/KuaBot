import { ApplicationCommandOptionType, EmbedBuilder, GuildMember, userMention } from "discord.js";
import dbManager from "structure/DBManager";
import { SubCommand } from "structure/interaction/command/SubCommand";

export default new SubCommand({
    name: "daysleft",
    nameLocales: {
        ko: "남은일수",
    },
    description: {
        en: "Calculate the number of days left until your or a specific user's birthday!",
        ko: "생일까지 남은 일수를 계산해줘요!",
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
                ko: "특정 유저를 선택해요",
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
        if (user.birthday.month == null || user.birthday.day == null) {
            const embed = new EmbedBuilder()
                .setColor("red")
                .setTitle("아앗.. 생일이 기억나지 않아요..")
                .setDescription("혹시 저한테 말해주신 적이 없는 건 아닌가요..?");
            interaction.editReply({ embeds: [embed] });
            return;
        }
        const now = new Date(new Date()
            .toDateString());
        const birthday = new Date(`${now.getFullYear()}.${user.birthday.month}.${user.birthday.day}`);
        if (now.getTime() > birthday.getTime()) {
            birthday.setFullYear(birthday.getFullYear() + 1);
        }
        const daysLeft = (birthday.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
        if (daysLeft === 0) {
            const embed = new EmbedBuilder()
                .setColor("blue")
                .setDescription(`${userMention(member.id)}님의 생일은 바로 오늘, ${user.birthday.month}월 ${user.birthday.day}일이에요!\n`
                    + "생일 축하드려요!! 🥳🎉🎉");
            interaction.editReply({ embeds: [embed] });
            return;
        }
        const embed = new EmbedBuilder()
            .setColor("blue")
            .setDescription(`${userMention(member.id)}님의 생일은 **${daysLeft}일** 남았어요!`);
        interaction.editReply({ embeds: [embed] });
    },
});
