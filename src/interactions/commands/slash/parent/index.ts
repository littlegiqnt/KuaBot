import { SlashCommand } from "structure/interaction/command/SlashCommand";

import child from "./child";

export default new SlashCommand({
    name: "parent",
    subCommands: [ child ],
});
