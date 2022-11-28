import { DEBUG_COMMANDS } from "config";
import { createWriteStream } from "fs";
import commands from "interactions/commands/slash";
import type { SlashCommand } from "structure/interaction/command/SlashCommand";
import createReadyEventListener from "./createReadyEventListener";

export default createReadyEventListener((client) => {
    if (DEBUG_COMMANDS) {
        commandsDataDebug();
    }

    // 글로벌 슬래시 명령어 등록
    client.application.commands.set(
        commands
            .filter((command) => command.guildID == null)
            .flatMap((command) => command.toRaw()),
    );

    // 길드별로 그룹
    const groupedCommands = commands
        .reduce<Record<string, SlashCommand[]>>((grouped, obj) => {
            if (obj.guildID == null) return grouped;
            const value = obj.guildID;
            grouped[value] ??= [];
            grouped[value].push(obj);
            return grouped;
        }, {});

    // 길드별로 등록
    for (const key in groupedCommands) {
        const cmds: SlashCommand[] = groupedCommands[key];
        client.application.commands.set(
            cmds
                .filter((command) => command.guildID)
                .flatMap((command) => command.toRaw()),
            key,
        );
    }
});

const commandsDataDebug = async () => {
    const file = createWriteStream("debug.json");
    file.on("error", (err) => { console.error(err); });
    file.write(JSON.stringify(commands.flatMap((v) => v.toRaw())));
    file.end();
};
