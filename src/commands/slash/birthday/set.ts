import { ApplicationCommandOptionType, EmbedBuilder, GuildMember, userMention } from "discord.js";
import Color from "structure/Color";
import dbManager from "structure/DBManager";
import { SubSlashCommand } from "structure/SubSlashCommand";

export default new SubSlashCommand({
    name: "설정",
    description: "저한테 생일을 알려주세요!",
    args: [
        {
            type: ApplicationCommandOptionType.Integer,
            name: "월",
            description: "월을 입력해 주세요!",
        },
        {
            type: ApplicationCommandOptionType.Integer,
            name: "일",
            description: "일을 입력해 주세요!",
        },
    ],
    async execute(interaction) {
        await interaction.deferReply({ ephemeral: false });
        const { member } = interaction;
        if (!(member instanceof GuildMember)) {
            throw new Error("member가 GuildMember가 아님");
        }
        const user = await dbManager.loadUser(member.id);
        const month = interaction.options.getInteger("월");
        const day = interaction.options.getInteger("일");
        if (month != null && month >= 1 && month <= 12
                && day != null && day >= 1 && day <= 31) {
            user.birthday.month = month;
            user.birthday.day = day;
            await user.save();
            const embed = new EmbedBuilder()
                .setColor(Color.GREEN)
                .setTitle("생일을 기억할게요!")
                .setDescription(`${userMention(member.id)}님의 생일은 ${month}월 ${day}일 이에요!\n`);
            interaction.editReply({ embeds: [ embed ] });
        } else {
            const embed = new EmbedBuilder()
                .setColor(Color.BRIGHT_RED)
                .setTitle("잘못된 날짜를 입력하셨어요!")
                .setDescription("다시 한번 확인해 주세요!");
            interaction.editReply({ embeds: [ embed ] });
        }
    },
});
