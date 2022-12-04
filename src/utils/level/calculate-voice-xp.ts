import { VoiceState } from "discord.js";
import dbManager from "structure/DBManager";

const vcTime = new Map<string, number>();

export const countStart = async (memberId: string) => {
    vcTime.set(memberId, Date.now());
};

export const countEnd = async (memberId: string) => {
    if (!vcTime.has(memberId)) return;
    const time = Date.now() - vcTime.get(memberId)!;
    const seconds = Math.floor(time / 1000);
    addXp(memberId, Math.floor(seconds / 30));
};

export const onVcStateChange = async (oldState: VoiceState, newState: VoiceState) => {
    if (newState.member == null) return;
    if (!isCounted(oldState) && isCounted(newState)) {
        countStart(newState.member.id);
    } else if (newState.channelId == null || (isCounted(oldState) && !isCounted(newState))) {
        countEnd(newState.member.id);
    }
};

const addXp = async (memberId: string, amount: number) => {
    const user = await dbManager.loadUser(memberId);
    user.xp.chat += amount;
    return user.save();
};

const isCounted = (state: VoiceState) =>
    state.streaming ?? state.selfVideo;