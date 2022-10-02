import { createEventListenerFactory } from "../../structure/EventListener";
import MemberJoin from "./MemberJoin";

export const createGuildMemberAddEventListener = createEventListenerFactory("guildMemberAdd");

export default [
    MemberJoin, //
];
