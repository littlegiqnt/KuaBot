import { createInteractionCreateEventListener } from "./index";

export default createInteractionCreateEventListener((interaction) => {
    if (!interaction.isButton()) return;

    const filter = (i: any) => i.customId === "male";
    const collector = interaction.channel?.createMessageComponentCollector({ filter });
    if (!collector) return;

    collector.on("collect", async (i) => {
        await i.reply({ content: "test", ephemeral: true });
    });

    collector.on("end", (collected) => console.log(`Collected ${collected.size} items`));
});
