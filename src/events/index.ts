import { AllEventListener } from "../structure/EventListener";
import interactionCreate from "./interactionCreate";
import ready from "./ready";
import guildMemberAdd from "./guildMemberAdd";

const events: Array<Array<AllEventListener>> = [
    interactionCreate, //
    ready,
    guildMemberAdd,
];

export default events;
