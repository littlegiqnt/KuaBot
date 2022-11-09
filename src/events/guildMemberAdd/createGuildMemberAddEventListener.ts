import { createEventListenerFactory } from "../../structure/EventListener";
const createGuildMemberAddEventListener = createEventListenerFactory("guildMemberAdd");
export default createGuildMemberAddEventListener;
