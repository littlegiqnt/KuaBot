import { GUILD_ID } from "config";
import { SlashCommand } from "structure/interaction/command/SlashCommand";
import days from "./days";
import since from "./since";

export default new SlashCommand({
    name: "커플",
    subCommands: [ since, days ],
    guildID: GUILD_ID,
});
