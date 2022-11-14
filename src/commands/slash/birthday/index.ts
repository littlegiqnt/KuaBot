import { GUILD_ID } from "config";
import { SlashCommand } from "structure/SlashCommand";
import get from "./get";
import left from "./left";
import set from "./set";

export default new SlashCommand({
    name: "생일",
    subCommands: [ get, set, left ],
    guildID: GUILD_ID,
});