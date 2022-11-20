import { GUILD_ID } from "config";
import { SlashCommand } from "structure/SlashCommand";
import addUser from "./add-user";
import close from "./close";
import lang from "./lang";
import list from "./list";
import removeUser from "./remove-user";

export default new SlashCommand({
    name: "문의",
    subCommands: [ list, close, addUser, removeUser, lang ],
    guildID: GUILD_ID,
});
