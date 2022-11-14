import type { MessageComponentInteraction, SelectMenuInteraction } from "discord.js";
import { Locale } from "discord.js";
import dbManager from "structure/DBManager";

export default async (interaction: MessageComponentInteraction|SelectMenuInteraction, lang: Locale) => {
    const user = await dbManager.loadUser(interaction.user.id);
    user.lang = lang;
    await user.save();
    switch (lang) {
        case Locale.Korean: {
            interaction.editReply("언어를 한국어로 선택해 드렸어요!");
            break;
        }
        case Locale.EnglishGB:
        case Locale.EnglishUS: {
            interaction.editReply("I've set your language to English");
            break;
        }
    }
};
