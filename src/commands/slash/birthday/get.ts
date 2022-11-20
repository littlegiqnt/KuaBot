import { ApplicationCommandOptionType, EmbedBuilder, GuildMember, userMention } from "discord.js";
import Color from "structure/Color";
import dbManager from "structure/DBManager";
import { SubSlashCommand } from "structure/SubSlashCommand";

export default new SubSlashCommand({
    name: "언제",
    description: "제가 생일을 잘 기억하고 있는지 확인해 주세요! :)",
    optionalArgs: [
        {
            type: ApplicationCommandOptionType.User,
            name: "유저",
            description: "특정한 유저를 선택해요.",
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
        } else {
            const embed = new EmbedBuilder()
                .setColor(Color.BRIGHT_BLUE)
                .setDescription(`${userMention(member.id)}님의 생일은 ${user.birthday.month}월 ${user.birthday.day}일 이에요!`);
            interaction.editReply({ embeds: [ embed ] });
        }
    },
});
