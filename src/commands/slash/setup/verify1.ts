import { EmbedBuilder, Guild, TextBasedChannel } from "discord.js";
import { SubSlashCommand } from "../../../structure/SubSlashCommand";

export default new SubSlashCommand({
    name: "verify1",
    async execute(interaction) {
        await interaction.deferReply();
        interaction.deleteReply();

        if (!interaction.channel) return;

        sendEmbed(interaction.guild!, interaction.channel);
    },
});

async function sendEmbed(guild: Guild, channel: TextBasedChannel) {
    const emojis = await guild?.emojis.fetch();
    const emoji_verified = emojis.get("1026012338614173706");
    const embed = new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle("《PRISM》✨")
        .setDescription("프리즘에 오신것을 환영합니다!")
        .addFields({
            name: "<:verified:1026009161865101354> 1차 인증하기",
            value:
                "서버에서 활동하시기 위해서 필수적인 역할을 선택해 주셔야 합니다!\n" +
                "<#1023079946215772180>로 이동하여 역할들을 선택하세요!\n" +
                "모든 필수 역할들을 선택하시면 __자동으로 1차 인증 역할이 지급됩니다!__ :D",
        });

    await channel.send({ embeds: [embed] });
}
