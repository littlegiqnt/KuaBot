import { ButtonStyle, Locale } from "discord.js";
import { Button } from "structure/interaction/component/Button";
import updateLang from "utils/updateLang";

export default new Button({
    customId: "detect_language",
    style: ButtonStyle.Success,
    labels: {
        en: "언어 자동 감지 / Automatically detect Language",
    },
    emoji: "🔍",
    async execute(interaction) {
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
    },
});