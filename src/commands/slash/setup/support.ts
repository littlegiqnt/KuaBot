import type { TextBasedChannel } from "discord.js";
import { ButtonBuilder, ButtonStyle, EmbedBuilder } from "discord.js";
import { ActionRow } from "structure/ActionRow";
import { SubSlashCommand } from "structure/SubSlashCommand";
import supportMessage from "templates/support/open";

export default new SubSlashCommand({
    name: "support",
    execute(interaction) {
        interaction.deferReply().then(() => interaction.deleteReply());

        if (!interaction.channel) return;

        sendSupportInstruction(interaction.channel);
    },
});

const sendSupportInstruction = async (channel: TextBasedChannel) => {
    const embed = new EmbedBuilder()
        .setTitle("문의하기")
        .setDescription(supportMessage);
    const row = new ActionRow(
        new ButtonBuilder()
            .setCustomId("create_ticket_check")
            .setEmoji("🔍")
            .setLabel("문의하기")
            .setStyle(ButtonStyle.Primary),
    );

    await channel.send({ embeds: [ embed ], components: [ row ] });
};
