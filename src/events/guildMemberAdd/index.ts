import { createEventListenerFactory } from "../../structure/EventListener";
export const createGuildMemberAddEventListener = createEventListenerFactory("guildMemberAdd");
import MemberJoin from "./MemberJoin";

export default [
    MemberJoin, //
];
