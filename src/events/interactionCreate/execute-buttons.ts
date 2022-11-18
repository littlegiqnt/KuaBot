import type { MessageComponentInteraction } from "discord.js";
import { Locale } from "discord.js";
import handleErrorReply from "utils/handleErrorReply";
import updateLang from "utils/updateLang";
import createInteractionCreateEventListener from "./createInteractionCreateEventListener";

export default createInteractionCreateEventListener(async (interaction) => {
    if (!interaction.isButton()) return;

    try {
        if (interaction.customId === "detect_language") {
            await processDetectLanguage(interaction);
        }
    } catch (e) {
        handleErrorReply(e, interaction);
    }
});


const processDetectLanguage = async (interaction: MessageComponentInteraction) => {
    await interaction.deferReply({ ephemeral: true });

    const lang = interaction.locale;

    switch (lang) {
        case Locale.Korean:
        case Locale.EnglishUS:
        case Locale.EnglishGB: {
            await updateLang(interaction, lang);
            break;
        }
        default: {
            throw new Error("알 수 없는 언어");
        }
    }
};
