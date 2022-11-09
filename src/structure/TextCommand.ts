import type { Message } from "discord.js";
import { PREFIX } from "../config"; // TODO: make TextCommand pure
import { Command, type CommandOptions } from "./Command";

type TransformedArgs = [msg: Message, args: string[]];

export interface ParentTextCommandOptions extends Pick<CommandOptions<TransformedArgs>, "name"> {
    readonly subCommands: TextCommand[]
    readonly execute?: (...args: TransformedArgs) => void | Promise<void>
}
export class TextCommand extends Command<Message, TransformedArgs> {
    private depth!: number;

    private readonly subCommands: TextCommand[] | null = null;

    constructor(options: ParentTextCommandOptions);

    constructor(options: CommandOptions<TransformedArgs>);

    constructor(options: ParentTextCommandOptions | CommandOptions<TransformedArgs>) {
        super({
            execute: () => {},
            ...options,
        });
        if ("subCommands" in options) this.subCommands = options.subCommands;
        this.setSubCommandDepths(0);
    }

    private setSubCommandDepths(depth: number) {
        this.depth = depth;
        if (this.subCommands == null) return;
        for (const subCommand of this.subCommands) {
            subCommand.setSubCommandDepths(depth + 1);
        }
    }

    protected override transform(msg: Message): [Message, string[]] {
        const [ _commandName, ...args ] = msg.content.split(" ")
            .slice(this.depth);
        return [ msg, args ];
    }

    public override isMine(msg: Message) {
        return msg.content.startsWith(PREFIX) && msg.content.slice(PREFIX.length)
            .split(" ")[this.depth] === this.name;
    }

    public override execute(msg: Message) {
        if (this.subCommands !== null) {
            let executedSomething = false;
            for (const subCommand of this.subCommands) {
                if (subCommand.isMine(msg)) {
                    executedSomething = true;
                    subCommand.execute(msg);
                }
            }
            if (!executedSomething) super.execute(msg);
        } else {
            super.execute(msg);
        }
    }
}
