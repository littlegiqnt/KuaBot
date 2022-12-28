import { ButtonBuilder, ButtonStyle, EmbedBuilder, SelectMenuBuilder } from "discord.js";
import { ActionRow } from "structure/ActionRow";
import Color from "structure/Color";
import { SubCommand } from "structure/interaction/command/SubCommand";
import { description, title } from "templates/language";

export default new SubCommand({
    name: "lang",
    async execute(interaction) {
        interaction.deferReply()
            .then(() => interaction.deleteReply());

        const embed = new EmbedBuilder()
            .setColor(Color.BRIGHT_BLUE)
            .setTitle(title)
            .setDescription(description);
        const row1 = new ActionRow(
            new ButtonBuilder()
                .setStyle(ButtonStyle.Success)
                .setLabel("언어 자동 감지 / Automatically detect Language")
                .setCustomId("detect_language"),
        );
        const row2 = new ActionRow(
            new SelectMenuBuilder()
                .setCustomId("select_language")
                .setPlaceholder("Select your language")
                .setOptions([
                    {
                        label: "한국어",
                        value: "lang_ko",
                    },
                    {
                        label: "English",
                        value: "lang_en",
                    },
                ]),
        );

        await interaction.channel?.send({ embeds: [embed], components: [row1, row2] });
    },
});
