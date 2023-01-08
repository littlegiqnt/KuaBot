/* eslint-disable no-lonely-if */
import type { MessageComponentInteraction, Role } from "discord.js";
import { GuildMember } from "discord.js";
import rolesManager from "structure/RolesManager";
import TaskQueue from "structure/TaskQueue";
import handleErrorReply from "utils/handleErrorReply";
import createInteractionCreateEventListener from "./createInteractionCreateEventListener";

export default createInteractionCreateEventListener(async (interaction) => {
    if (!interaction.isButton()) return;

    if (interaction.customId.startsWith("selectroles")) {
        processSelectRoles(interaction);
    }
});

const workQueue = new Map<string, TaskQueue>();

const processSelectRoles = (interaction: MessageComponentInteraction) => {
    let queue = workQueue.get(interaction.user.id);
    if (queue == null) {
        queue = new TaskQueue();
        workQueue.set(interaction.user.id, queue);
    }
    queue.enqueue(async () => {
        await interaction.deferReply({ ephemeral: true });

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
                    member.roles.remove(rolesManager.get("foreveralone")!),
                    member.roles.remove(rolesManager.get("lovePrivate")!),
                ]);
                break;
            }
            case "selectroles_single": {
                await Promise.all([
                    member.roles.remove(rolesManager.get("couple")!),
                    member.roles.add(rolesManager.get("single")!),
                    member.roles.remove(rolesManager.get("foreveralone")!),
                    member.roles.remove(rolesManager.get("lovePrivate")!),
                ]);
                break;
            }
            case "selectroles_foreveralone": {
                await Promise.all([
                    member.roles.remove(rolesManager.get("couple")!),
                    member.roles.remove(rolesManager.get("single")!),
                    member.roles.add(rolesManager.get("foreveralone")!),
                    member.roles.remove(rolesManager.get("lovePrivate")!),
                ]);
                break;
            }
            case "selectroles_relationship_hide": {
                await Promise.all([
                    member.roles.remove(rolesManager.get("couple")!),
                    member.roles.remove(rolesManager.get("single")!),
                    member.roles.remove(rolesManager.get("foreveralone")!),
                    member.roles.add(rolesManager.get("lovePrivate")!),
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
                handlePingRole(role, member, interaction);
                return;
            }
            case "selectroles_giveaway": {
                const role: Role = rolesManager.get("giveaway")!;
                handlePingRole(role, member, interaction);
                return;
            }
            default: {
                interaction.editReply({ content: "실패했어요.. 관리자에게 문의해주세요!" });
                return;
            }
        }

        interaction.editReply({ content: "<a:check:1061576200075620362> 설정되었어요!" });
    });
};

const handlePingRole = async (role: Role, member: GuildMember, interaction: MessageComponentInteraction) => {
    if (member.roles.cache.has(role.id)) {
        await member.roles.remove(role);
        interaction.editReply({ content: "➖ 해당 역할을 제거했어요!" });
    } else {
        await member.roles.add(role);
        interaction.editReply({ content: "➕ 해당 역할을 추가했어요!" });
    }
};
