import { GuildMember, Message } from "discord.js";
import dbManager from "structure/DBManager";
import { isNormalTextChannel } from "utils/checkChannel";
import { getLevelByXp } from "./level";

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

/**
 * Add 1 chat xp and return whether leveled-up or not
 * @param member member
 * @returns true if leveled-up or else false
 */
const addXp = async (member: GuildMember): Promise<boolean> => {
    const user = await dbManager.loadUser(member.id);
    const previousLvl = getLevelByXp(user.xp.chat);
    const newUser = await dbManager.User
        // eslint-disable-next-line @typescript-eslint/naming-convention
        .findOneAndUpdate({ _id: member.id }, { $inc: { "xp.chat": 1 } })
        .exec();
    if (newUser == null) {
        return false;
    }
    const nowLvl = getLevelByXp(newUser.xp.chat);
    return previousLvl !== nowLvl;
};