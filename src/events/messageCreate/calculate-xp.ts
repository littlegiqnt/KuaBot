import type { GuildMember } from "discord.js";
import { TextChannel } from "discord.js";
import Bot from "structure/Bot";
import dbManager from "structure/DBManager";
import createMessageCreateEventListener from "./createMessageCreateEventListener";

const history: Record<string, number> = {};
const allowedCategories: string[] = [ "1023074542190592000", "1023185189553311754" ];

export default createMessageCreateEventListener((message) => {
    const bot = message.client;
    if (!(bot instanceof Bot)) {
        return;
    }
    const { member } = message;
    if (member == null || member.user.bot) {
        return;
    }

    const { channel } = message;
    if (!(channel instanceof TextChannel)) return;
    const category = channel.parentId;
    if (category == null || !allowedCategories.includes(category)) {
        return;
    }

    const whenCreated = Math.floor(message.createdTimestamp / (1000 * 60));
    const lastCreated = history[member.id];

    if (!lastCreated || lastCreated !== whenCreated) {
        history[member.id] = whenCreated;
        addXp(bot, member);
        return;
    }
});

const addXp = async (bot: Bot, member: GuildMember) => {
    const user = await dbManager.loadUser(member.id);
    if (!user.totalXp) {
        user.totalXp = 1;
    } else {
        user.totalXp += 1;
    }
    user.save();
};
