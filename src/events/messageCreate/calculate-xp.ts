import { GUILD_ID } from "config";
import type { GuildMember } from "discord.js";
import dbManager from "structure/DBManager";
import { isNormalTextChannel } from "utils/checkChannel";
import createMessageCreateEventListener from "./createMessageCreateEventListener";

const history: Record<string, number> = {};
const allowedCategories: string[] = [ "1023074542190592000", "1023185189553311754" ];

export default createMessageCreateEventListener((message) => {
    if (message.guildId !== GUILD_ID) return;

    const { member, channel } = message;
    if (member == null || member.user.bot || !isNormalTextChannel(channel)) return;

    const category = channel.parentId;
    if (category == null || !allowedCategories.includes(category)) {
        return;
    }

    const whenCreated = Math.floor(message.createdTimestamp / (1000 * 60));
    const lastCreated = history[member.id];

    if (!lastCreated || lastCreated !== whenCreated) {
        history[member.id] = whenCreated;
        addXp(member);
        return;
    }
});

const addXp = async (member: GuildMember) => {
    const user = await dbManager.loadUser(member.id);
    if (!user.totalXp) {
        user.totalXp = 1;
    } else {
        user.totalXp += 1;
    }
    user.save();
};
