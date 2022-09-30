import { createInteractionCreateEventListener } from "./index";

export default createInteractionCreateEventListener((interaction) => {
    if (!interaction.isButton()) return;

    const filter = (i: any) => i.customId === "selectroles_male";
    const collector = interaction.channel?.createMessageComponentCollector({ filter });
    if (!collector) return;

    collector.on("collect", async (i) => {
        await i.editReply({ content: interaction, ephemeral: true });
    });

    collector.on("end", (collected) => console.log(`Collected ${collected.size} items`));
});
