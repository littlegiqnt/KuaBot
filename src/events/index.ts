import type { AllEventListener } from "../structure/EventListener";
import channelDelete from "./channelDelete";
import guildMemberAdd from "./guildMemberAdd";
import guildMemberRemove from "./guildMemberRemove";
import guildMemberUpdate from "./guildMemberUpdate";
import interactionCreate from "./interactionCreate";
import messageCreate from "./messageCreate";
import messageUpdate from "./messageUpdate";
import ready from "./ready";

const events: AllEventListener[][] = [
    ready,
    messageCreate,
    messageUpdate,
    interactionCreate,
    guildMemberAdd,
    guildMemberRemove,
    guildMemberUpdate,
    channelDelete,
];

export default events;
