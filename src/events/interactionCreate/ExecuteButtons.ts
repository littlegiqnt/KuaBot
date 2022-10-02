import { GuildMember, MessageComponentInteraction, Role, RoleManager, User } from "discord.js";
import getCachedRole from "../../RolesManager";
import { createInteractionCreateEventListener } from "./index";

export default createInteractionCreateEventListener(async (interaction) => {
    if (!interaction.isButton()) return;

    if (interaction.customId.startsWith("selectroles")) {
        processSelectRoles(interaction);
    }
});

async function processSelectRoles(interaction: MessageComponentInteraction) {
    await interaction.deferReply({ ephemeral: true });

    const member: GuildMember = interaction.member as GuildMember;

    const beforeLeftRoles: number = await checkRolesLeft(member);
    switch (interaction.customId) {
        case "selectroles_male": {
            await member.roles.add(getCachedRole("male")!);
            await member.roles.remove(getCachedRole("female")!);
            break;
        }
        case "selectroles_female": {
            await member.roles.remove(getCachedRole("male")!);
            await member.roles.add(getCachedRole("female")!);
            break;
        }
        case "selectroles_adult": {
            await member.roles.add(getCachedRole("adult")!);
            await member.roles.remove(getCachedRole("highschool")!);
            await member.roles.remove(getCachedRole("middleschool")!);
            break;
        }
        case "selectroles_highschool": {
            await member.roles.remove(getCachedRole("adult")!);
            await member.roles.add(getCachedRole("highschool")!);
            await member.roles.remove(getCachedRole("middleschool")!);
            break;
        }
        case "selectroles_middleschool": {
            await member.roles.remove(getCachedRole("adult")!);
            await member.roles.remove(getCachedRole("highschool")!);
            await member.roles.add(getCachedRole("middleschool")!);
            break;
        }
        case "selectroles_couple": {
            await member.roles.add(getCachedRole("couple")!);
            await member.roles.remove(getCachedRole("single")!);
            break;
        }
        case "selectroles_single": {
            await member.roles.remove(getCachedRole("couple")!);
            await member.roles.add(getCachedRole("single")!);
            break;
        }
        case "selectroles_announcement": {
            const role: Role = getCachedRole("announcement")!;
            if (member.roles.cache.has(role.id)) {
                await member.roles.remove(role);
                interaction.editReply({ content: "해당 역할이 제거되었습니다!" });
            } else {
                await member.roles.add(role);
                interaction.editReply({ content: "해당 역할이 추가되었습니다!" });
            }
            break;
        }
        case "selectroles_dm_allow": {
            await member.roles.add(getCachedRole("dm_allow")!);
            await member.roles.remove(getCachedRole("dm_disallow")!);
            break;
        }
        case "selectroles_dm_disallow": {
            await member.roles.remove(getCachedRole("dm_allow")!);
            await member.roles.add(getCachedRole("dm_disallow")!);
            break;
        }
        default: {
            interaction.editReply({ content: "실패하였습니다! 관리자에게 문의해주세요." });
            return;
        }
    }
    if (interaction.customId !== "selectroles_announcement") {
        const rolesLeft: number = await checkRolesLeft(member);
        if (rolesLeft > 0) {
            interaction.editReply({ content: `설정되었습니다!\n ${rolesLeft}개의 역할을 선택하시면 1차 인증이 완료됩니다!` });
        } else if (beforeLeftRoles != 0) {
            interaction.editReply({ content: "설정되었습니다!\n1차 인증이 완료되어 이제 서버에서 활동하실 수 있습니다!" });
            member.roles.add(getCachedRole("verified_1")!);
        } else {
            interaction.editReply({ content: "설정되었습니다!" });
        }
    }
}

async function checkRolesLeft(member: GuildMember): Promise<number> {
    let left: number = 0;
    member = await member.fetch();
    if (!(member.roles.cache.has(getCachedRole("male")!.id) || member.roles.cache.has(getCachedRole("female")!.id))) left++;
    if (!(member.roles.cache.has(getCachedRole("adult")!.id) || member.roles.cache.has(getCachedRole("highschool")!.id) || member.roles.cache.has(getCachedRole("middleschool")!.id))) left++;
    if (!(member.roles.cache.has(getCachedRole("couple")!.id) || member.roles.cache.has(getCachedRole("single")!.id))) left++;
    if (!(member.roles.cache.has(getCachedRole("dm_allow")!.id) || member.roles.cache.has(getCachedRole("dm_disallow")!.id))) left++;
    return left;
}
