import type { TextBasedChannel } from "discord.js";
import { ButtonBuilder, ButtonStyle, EmbedBuilder } from "discord.js";
import { ActionRow } from "structure/ActionRow";
import { SubCommand } from "structure/interaction/command/SubCommand";

export default new SubCommand({
    name: "support",
    execute(interaction) {
        interaction.deferReply().then(() => interaction.deleteReply());

        if (!interaction.channel) return;

        sendSupportInstruction(interaction.channel);
    },
});

const sendSupportInstruction = async (channel: TextBasedChannel) => {
    const embed = new EmbedBuilder()
        .setTitle("Create a support ticket")
        .setDescription(`Do you have a suggestion or want to report someone?
Please click button below to make a ticket!`);
    const row = new ActionRow(
        new ButtonBuilder()
            .setCustomId("create_ticket_check")
            .setEmoji("🔍")
            .setLabel("Click this to get a support!")
            .setStyle(ButtonStyle.Primary),
    );

    await channel.send({ embeds: [ embed ], components: [ row ] });
};
