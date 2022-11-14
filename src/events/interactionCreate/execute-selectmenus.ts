import type { Role, SelectMenuInteraction } from "discord.js";
import { GuildMember, Locale } from "discord.js";
import Bot from "structure/Bot";
import dbManager from "structure/DBManager";
import rolesManager from "structure/RolesManager";
import handleErrorReply from "utils/handleErrorReply";
import updateLang from "utils/updateLang";
import createInteractionCreateEventListener from "./createInteractionCreateEventListener";

export default createInteractionCreateEventListener(async (interaction) => {
    if (!interaction.isSelectMenu()) return;

    try {
        if (interaction.customId === "selectroles_games") {
            await processSelectGames(interaction);
        } else if (interaction.customId === "select_language") {
            await processSelectLanguage(interaction);
        }
    } catch (e) {
        handleErrorReply(e, interaction);
    }
});

const processSelectGames = async (interaction: SelectMenuInteraction) => {
    await interaction.deferReply({ ephemeral: true });

    const bot = interaction.client;
    if (!(bot instanceof Bot)) {
        return;
    }
    const { member } = interaction;
    if (!(member instanceof GuildMember)) {
        throw new Error("member가 GuildMember가 아님");
    }

    const rolesToAdd: Role[] = [];
    interaction.values.forEach((value: string) => {
        const role = rolesManager.get(value) ?? null;
        if (!role) return;
        rolesToAdd.push(role);
    });
    await member.roles.remove(await rolesManager.getGrouped("games") ?? []);
    await member.roles.add(rolesToAdd);
    if (rolesToAdd.length === interaction.values.length) {
        interaction.editReply("선택하신 게임들로 적용해 드렸어요!");
    } else {
        interaction.editReply(`약간의 오류가 발생해서 선택하신 역할 중 ${rolesToAdd.length}개만 적용할 수 있었어요...ㅠㅠ 관리자에게 문의해 주세요!`);
    }
};

const processSelectLanguage = async (interaction: SelectMenuInteraction) => {
    await interaction.deferReply({ ephemeral: true });

    if (interaction.values.length > 1 || interaction.values.length < 1) {
        interaction.editReply("오류가 발생하였어요!");
        return;
    }
    const user = await dbManager.loadUser(interaction.user.id);
    const [ lang ] = interaction.values;

    switch (lang) {
        case "lang_ko": {
            updateLang(interaction, Locale.Korean);
            break;
        }
        case "lang_en": {
            updateLang(interaction, Locale.EnglishUS);
            break;
        }
        default: {
            throw new Error("알 수 없는 언어");
        }
    }
};