import { createEventListenerFactory } from "../../structure/EventListener";
const createGuildMemberRemoveEventListener = createEventListenerFactory("guildMemberRemove");
export default createGuildMemberRemoveEventListener;
