import { EmbedBuilder, Locale, TextBasedChannel } from "discord.js";
import ticketOpenCheck from "interactions/components/buttons/ticket/create-ticket-check";
import { ActionRow } from "structure/ActionRow";
import { SubCommand } from "structure/interaction/command/SubCommand";

export default new SubCommand({
    name: "support",
    execute(interaction) {
        interaction
            .deferReply()
            .then(() => interaction.deleteReply());

        if (interaction.channel == null) return;

        sendSupportInstruction(interaction.channel);
    },
});

const sendSupportInstruction = async (channel: TextBasedChannel) => {
    const embed = new EmbedBuilder()
        .setTitle("Create a support ticket")
        .setDescription(`Do you have a suggestion or want to report someone?
Please click button below to make a ticket!`);

    await channel.send({
        embeds: [embed],
        components: [
            new ActionRow(
                ticketOpenCheck.getButton(Locale.EnglishUS),
            ),
        ],
    });
};
