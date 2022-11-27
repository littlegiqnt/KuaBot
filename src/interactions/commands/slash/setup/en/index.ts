import { SubCommandGroup } from "structure/interaction/command/SubCommandGroup";
import roles from "./roles";

export default new SubCommandGroup({
    name: "en",
    subCommands: [
        roles,
    ],
});
