import { SubCommandGroup } from "structure/interaction/command/SubCommandGroup";
import instruction from "./instruction";
import roles from "./roles";
import support from "./support";

export default new SubCommandGroup({
    name: "ko",
    subCommands: [
        instruction,
        roles,
        support,
    ],
});
