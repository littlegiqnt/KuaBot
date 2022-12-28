import type { TextBasedChannel } from "discord.js";
import { EmbedBuilder } from "discord.js";
import ticketOpenCheckButton from "interactions/components/buttons/ticket/open-check";
import { ActionRow } from "structure/ActionRow";
import { SubCommand } from "structure/interaction/command/SubCommand";

export default new SubCommand({
    name: "support",
    execute(interaction) {
        interaction.deferReply()
            .then(() => interaction.deleteReply());

        if (interaction.channel == null) return;

        sendSupportInstruction(interaction.channel);
    },
});

const sendSupportInstruction = async (channel: TextBasedChannel) => {
    const embed = new EmbedBuilder()
        .setTitle("문의하기")
        .setDescription(`서버에 대한 문의사항/신고사항이 있으신가요?
밑의 버튼을 눌러 문의 카테고리를 선택해 주세요!`);
    const row = new ActionRow(ticketOpenCheckButton.getButton());

    await channel.send({ embeds: [embed], components: [row] });
};
