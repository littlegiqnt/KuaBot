import { GuildMember, Message } from "discord.js";
import dbManager from "structure/DBManager";
import { isNormalTextChannel } from "utils/checkChannel";

const history: Record<string, number> = {};
const allowedCategories: Array<string> = ["1023074542190592000", "1023185189553311754"];

export const onMessage = async (message: Message) => {
    const { member, channel } = message;
    if (member == null || member.user.bot || !isNormalTextChannel(channel)) return;

    const category = channel.parentId;
    if (category == null || !allowedCategories.includes(category)) {
        return;
    }

    const whenCreated = Math.floor(message.createdTimestamp / (1000 * 60));
    const lastCreated = history[member.id];

    if (lastCreated == null || lastCreated !== whenCreated) { // 1분이 지난 메세지이면
        history[member.id] = whenCreated;
        await addXp(member);
        return;
    }
};

const addXp = async (member: GuildMember) => {
    const user = await dbManager.loadUser(member.id);
    user.xp.chat += 1;
    return user.save();
};