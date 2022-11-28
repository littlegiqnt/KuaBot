import { SubCommandGroup } from "structure/interaction/command/SubCommandGroup";
import roles from "./roles";
import support from "./support";

export default new SubCommandGroup({
    name: "en",
    subCommands: [
        roles,
        support,
    ],
});
