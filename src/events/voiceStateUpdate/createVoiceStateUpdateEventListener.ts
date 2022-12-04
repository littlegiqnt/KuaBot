import { createEventListenerFactory } from "structure/EventListener";

const createVoiceStateUpdateEventListener = createEventListenerFactory("voiceStateUpdate");
export default createVoiceStateUpdateEventListener;