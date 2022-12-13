import TaskQueue from "structure/TaskQueue";
import { onVcStateChange } from "utils/level/calculate-voice-xp";
import createVoiceStateUpdateEventListener from "./createVoiceStateUpdateEventListener";

const queues = new Map<string, TaskQueue>();

export default createVoiceStateUpdateEventListener((oldState, newState) => {
    if (newState.member == null) return;
    let q = queues.get(newState.member.id);
    if (q == null) {
        q = new TaskQueue();
        queues.set(newState.member.id, q);
    }
    q.enqueue(async () => {
        await onVcStateChange(oldState, newState);
    });
});