import { EmbedBuilder } from "discord.js";
import { SlashCommand } from "structure/interaction/command/SlashCommand";

export default new SlashCommand({
    name: "ping",
    description: {
        en: "See how fast I can respond!",
        ko: "제가 얼마나 빠르게 답하는지 확인해 보실래요?",
    },
    execute(interaction) {
        const embed = new EmbedBuilder()
            .setColor("Blue")
            .setTitle("Pong! 🏓")
            .setDescription(`**응답 속도**\nBot: ${Date.now() - interaction.createdTimestamp}ms\nAPI: ${interaction.client.ws.ping}ms`);

        interaction.reply({ ephemeral: false, embeds: [embed] });
    },
});
