import type { TextBasedChannel } from "discord.js";
import { EmbedBuilder } from "discord.js";
import { SubSlashCommand } from "structure/SubSlashCommand";
import { description, fields, title } from "templates/stepOneVerify";

export default new SubSlashCommand({
    name: "verify1",
    async execute(interaction) {
        interaction.deferReply().then(() => interaction.deleteReply());

        if (!interaction.channel) return;

        sendEmbed(interaction.channel);
    },
});

const sendEmbed = async (channel: TextBasedChannel) => {
    const embed = new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle(title)
        .setDescription(description)
        .addFields(...fields);

    await channel.send({ embeds: [ embed ] });
};
