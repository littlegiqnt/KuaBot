import { ApplicationCommandOptionType, EmbedBuilder, Guild, GuildMember, TextBasedChannel, User } from "discord.js";
import { SubSlashCommand } from "../../../structure/SubSlashCommand";

export default new SubSlashCommand({
    name: "join",
    args: [
        {
            type: ApplicationCommandOptionType.User,
            name: "유저",
            description: "참여한 유저",
        },
    ],
    async execute(interaction) {
        const user = interaction.options.getUser("유저");
        if (!user) return;
        await interaction.deferReply();
        interaction.deleteReply();

        if (!interaction.channel) return;

        sendEmbed(user, interaction.channel);
    },
});

async function sendEmbed(user: User, channel: TextBasedChannel) {
    const embed = new EmbedBuilder()
        .setColor(0x00ff00)
        .setTitle(`《PRISM》✨`)
        .setDescription(
            `<@${user.id}>님! 유저가 이끄는 서버, **프리즘**에 오신것을 환영합니다!\n\n` +
                "<#1023077753504944138>를 잘 숙지하시고 <#1023189655576916038>에서 간단한 인증을 진행해 주시면 바로 활동하실 수 있어요!"
        );

    await channel.send({ embeds: [embed] });
}
