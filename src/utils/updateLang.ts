import type { MessageComponentInteraction, SelectMenuInteraction } from "discord.js";
import { GuildMember, Locale } from "discord.js";
import dbManager from "structure/DBManager";
import rolesManager from "structure/RolesManager";

export default async (interaction: MessageComponentInteraction|SelectMenuInteraction, lang: Locale) => {
    const { member } = interaction;
    if (!(member instanceof GuildMember)) return;
    const user = await dbManager.loadUser(interaction.user.id);
    user.lang = lang;
    switch (lang) {
        case Locale.Korean: {
            await Promise.all([
                user.save(),
                member.roles.remove(rolesManager.get("foreign")!),
            ]);
            interaction.editReply("언어를 한국어로 선택해 드렸어요!");
            break;
        }
        case Locale.EnglishGB:
        case Locale.EnglishUS: {
            await Promise.all([
                user.save(),
                member.roles.add(rolesManager.get("foreign")!),
            ]);
            interaction.editReply("I've set your language to English");
            break;
        }
    }
};
