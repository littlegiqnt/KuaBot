/* eslint-disable no-lonely-if */
import type { MessageComponentInteraction, Role } from "discord.js";
import { GuildMember } from "discord.js";
import logger from "structure/Logger";
import rolesManager from "structure/RolesManager";
import TaskQueue from "structure/TaskQueue";
import handleErrorReply from "utils/handleErrorReply";
import msg from "utils/msg";
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

        const t = msg(interaction.locale);

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
                interaction.editReply({ content: t("rolesSelect.failed") });
                return;
            }
        }

        if (member.roles.cache.has(rolesManager.get("stepOneVerified")!.id)) {
            interaction.editReply({ content: t("rolesSelect.success") });
        } else {
            const rolesLeft: number = await checkRolesLeft(member);
            if (rolesLeft > 0) {
                interaction.editReply({ content: t("rolesSelect.successWithRolesLeft", { count: rolesLeft }) });
            } else {
                interaction.editReply({ content: t("rolesSelect.successComplete") });
                member.roles.add(rolesManager.get("stepOneVerified")!);
                logger.stepOneVerify(member);
            }
        }
    });
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
    if (!(member.roles.cache.has(rolesManager.get("couple")!.id)
            || member.roles.cache.has(rolesManager.get("single")!.id)
            || member.roles.cache.has(rolesManager.get("foreveralone")!.id)
            || member.roles.cache.has(rolesManager.get("lovePrivate")!.id))) {
        left += 1;
    }
    if (
        !(member.roles.cache.has(rolesManager.get("dmAllow")!.id) || member.roles.cache.has(rolesManager.get("dmDisallow")!.id))
    ) {
        left += 1;
    }
    return left;
};

const handlePingRole = async (role: Role, member: GuildMember, interaction: MessageComponentInteraction) => {
    const t = msg(interaction.locale);
    if (member.roles.cache.has(role.id)) {
        await member.roles.remove(role);
        interaction.editReply({ content: `\\➖ ${t("rolesSelect.remove")}` });
    } else {
        await member.roles.add(role);
        interaction.editReply({ content: `\\➕ ${t("rolesSelect.add")}` });
    }
};
