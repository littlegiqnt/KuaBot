import { createEventListenerFactory } from "structure/EventListener";

const createGuildMemberUpdateEventListener = createEventListenerFactory("guildMemberUpdate");
export default createGuildMemberUpdateEventListener;
