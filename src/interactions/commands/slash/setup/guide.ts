import { ButtonBuilder, ButtonStyle, EmbedBuilder, TextChannel } from "discord.js";
import { ActionRow } from "structure/ActionRow";
import { SubCommand } from "structure/interaction/command/SubCommand";
import { isNormalTextChannel } from "utils/checkChannel";

export default new SubCommand({
    name: "guide",
    async execute(interaction) {
        interaction.deferReply()
            .then(() => interaction.deleteReply());

        if (interaction.channel == null || !isNormalTextChannel(interaction.channel)) return;

        await send(interaction.channel);
    },
});

const send = async (channel: TextChannel) => {
    const embed = new EmbedBuilder()
        .setColor(0xff7f00)
        .setTitle("✨《KUA》에 오신것을 환영해요!")
        .setDescription(
            "이 서버는 유저들의 __자유로운 소통과 친목__을 위한 종합 게임 커뮤니티 서버에요!\n"
            + "서버에서 활동하시기 앞서 먼저 제가 간단한 안내를 진행할게요!\n"
            + "Please click a button below!",
        );
    const row = new ActionRow<ButtonBuilder>(
        new ButtonBuilder()
            .setCustomId("guide_1")
            .setLabel("진행하기")
            .setStyle(ButtonStyle.Primary),
    );
    await channel.send({ embeds: [embed], components: [row] });
};