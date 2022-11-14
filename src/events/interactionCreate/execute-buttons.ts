import type { MessageComponentInteraction, Role } from "discord.js";
import { GuildMember, Locale } from "discord.js";
import Bot from "structure/Bot";
import logger from "structure/Logger";
import rolesManager from "structure/RolesManager";
import handleErrorReply from "utils/handleErrorReply";
import updateLang from "utils/updateLang";
import createInteractionCreateEventListener from "./createInteractionCreateEventListener";

export default createInteractionCreateEventListener(async (interaction) => {
    if (!interaction.isButton()) return;

    try {
        if (interaction.customId.startsWith("selectroles")) {
            await processSelectRoles(interaction);
        } else if (interaction.customId === "detect_language") {
            await processDetectLanguage(interaction);
        }
    } catch (e) {
        handleErrorReply(e, interaction);
    }
});

const processSelectRoles = async (interaction: MessageComponentInteraction) => {
    await interaction.deferReply({ ephemeral: true });

    const bot = interaction.client;
    if (!(bot instanceof Bot)) {
        return;
    }
    const { member } = interaction;
    if (!(member instanceof GuildMember)) {
        handleErrorReply(new Error("member가 GuildMember가 아님"), interaction);
        return;
    }

    switch (interaction.customId) {
        case "selectroles_male": {
            await Promise.all([
                member.roles.add(rolesManager.get("male")!),
                member.roles.remove(rolesManager.get("female")!),
            ]);
            break;
        }
        case "selectroles_female": {
            await Promise.all([
                member.roles.remove(rolesManager.get("male")!),
                member.roles.add(rolesManager.get("female")!),
            ]);
            break;
        }
        case "selectroles_adult": {
            await Promise.all([
                member.roles.add(rolesManager.get("adult")!),
                member.roles.remove(rolesManager.get("highschool")!),
                member.roles.remove(rolesManager.get("middleschool")!),
            ]);
            break;
        }
        case "selectroles_highschool": {
            await Promise.all([
                member.roles.remove(rolesManager.get("adult")!),
                member.roles.add(rolesManager.get("highschool")!),
                member.roles.remove(rolesManager.get("middleschool")!),
            ]);
            break;
        }
        case "selectroles_middleschool": {
            await Promise.all([
                member.roles.remove(rolesManager.get("adult")!),
                member.roles.remove(rolesManager.get("highschool")!),
                member.roles.add(rolesManager.get("middleschool")!),
            ]);
            break;
        }
        case "selectroles_couple": {
            await Promise.all([
                member.roles.add(rolesManager.get("couple")!),
                member.roles.remove(rolesManager.get("single")!),
            ]);
            break;
        }
        case "selectroles_single": {
            await Promise.all([
                member.roles.remove(rolesManager.get("couple")!),
                member.roles.add(rolesManager.get("single")!),
            ]);
            break;
        }
        case "selectroles_dm_allow": {
            await Promise.all([
                member.roles.add(rolesManager.get("dmAllow")!),
                member.roles.remove(rolesManager.get("dmDisallow")!),
            ]);
            break;
        }
        case "selectroles_dm_disallow": {
            await Promise.all([
                member.roles.remove(rolesManager.get("dmAllow")!),
                member.roles.add(rolesManager.get("dmDisallow")!),
            ]);
            break;
        }
        case "selectroles_announcement": {
            const role: Role = rolesManager.get("announcement")!;
            if (member.roles.cache.has(role.id)) {
                await member.roles.remove(role);
                interaction.editReply({ content: "해당 역할이 제거되었습니다!" });
            } else {
                await member.roles.add(role);
                interaction.editReply({ content: "해당 역할이 추가되었습니다!" });
            }
            return;
        }
        case "selectroles_giveaway": {
            const role: Role = rolesManager.get("giveaway")!;
            if (member.roles.cache.has(role.id)) {
                await member.roles.remove(role);
                interaction.editReply({ content: "해당 역할이 제거되었습니다!" });
            } else {
                await member.roles.add(role);
                interaction.editReply({ content: "해당 역할이 추가되었습니다!" });
            }
            return;
        }
        default: {
            interaction.editReply({ content: "실패하였습니다! 관리자에게 문의해주세요." });
            return;
        }
    }
    const rolesLeft: number = await checkRolesLeft(member);
    if (rolesLeft > 0) {
        interaction.editReply({ content: `설정되었습니다!\n남은 필수 역할은 총 ${rolesLeft}개 입니다. :D` });
    } else if (!member.roles.cache.has(rolesManager.get("stepOneVerified")!.id)) {
        interaction.editReply({
            content:
                "설정되었습니다!\n<:verified:1026009161865101354> 1차 인증이 완료되어 이제 서버에서 활동하실 수 있습니다!",
        });
        member.roles.add(rolesManager.get("stepOneVerified")!);
        logger.stepOneVerify(member);
    } else {
        interaction.editReply({ content: "설정되었습니다!" });
    }
};

const checkRolesLeft = async (member: GuildMember): Promise<number> => {
    let left = 0;
    if (!(member.roles.cache.has(rolesManager.get("male")!.id) || member.roles.cache.has(rolesManager.get("female")!.id))) {
        left += 1;
    }
    if (
        !(
            member.roles.cache.has(rolesManager.get("adult")!.id)
            || member.roles.cache.has(rolesManager.get("highschool")!.id)
            || member.roles.cache.has(rolesManager.get("middleschool")!.id)
        )
    ) {
        left += 1;
    }
    if (!(member.roles.cache.has(rolesManager.get("couple")!.id) || member.roles.cache.has(rolesManager.get("single")!.id))) {
        left += 1;
    }
    if (
        !(member.roles.cache.has(rolesManager.get("dmAllow")!.id) || member.roles.cache.has(rolesManager.get("dmDisallow")!.id))
    ) {
        left += 1;
    }
    return left;
};

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
