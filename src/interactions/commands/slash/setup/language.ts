import { EmbedBuilder, StringSelectMenuBuilder } from "discord.js";
import detectLanguage from "interactions/components/buttons/detect-language";
import { ActionRow } from "structure/ActionRow";
import { SubCommand } from "structure/interaction/command/SubCommand";
import { description, title } from "templates/language";

export default new SubCommand({
    name: "lang",
    async execute(interaction) {
        interaction.deferReply()
            .then(() => interaction.deleteReply());

        const embed = new EmbedBuilder()
            .setColor("Blue")
            .setTitle(title)
            .setDescription(description);

        await interaction.channel?.send({
            embeds: [embed],
            components: [
                new ActionRow(
                    detectLanguage.getButton(),
                ),
                new ActionRow(
                    new StringSelectMenuBuilder()
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
                ),
            ],
        });
    },
});
