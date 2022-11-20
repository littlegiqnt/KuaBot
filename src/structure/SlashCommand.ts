import type { ChatInputApplicationCommandData as ChatInputCommand, ChatInputCommandInteraction } from "discord.js";
import { ApplicationCommandType as CommandType } from "discord.js";
import type { BaseSlashCommandOptions } from "./BaseSlashCommand";
import { BaseSlashCommand } from "./BaseSlashCommand";
import type { SubSlashCommand } from "./SubSlashCommand";

export interface ParentSlashCommandOptions extends Pick<BaseSlashCommandOptions, "name"> {
    readonly subCommands: SubSlashCommand[]
    readonly guildID?: string
}
export interface SlashCommandOptions extends BaseSlashCommandOptions {
    readonly guildID?: string
}
export class SlashCommand extends BaseSlashCommand {
    private readonly subCommands: SubSlashCommand[] | null = null;

    public readonly guildID?: string;

    constructor(options: ParentSlashCommandOptions);

    constructor(options: SlashCommandOptions);

    constructor(options: SlashCommandOptions | ParentSlashCommandOptions) {
        super({
            // because of ts17009 need to create unnecessary anonymous function
            execute: (interaction) => this.execute(interaction),
            ...options,
        });
        if ("subCommands" in options) this.subCommands = options.subCommands;
        if ("guildID" in options) this.guildID = options.guildID;
    }

    public override isMine(interaction: ChatInputCommandInteraction): boolean {
        return interaction.commandName === this.name;
    }

    public override execute(interaction: ChatInputCommandInteraction) {
        if (this.subCommands !== null) {
            for (const subCommand of this.subCommands) {
                if (subCommand.isMine(interaction)) return subCommand.execute(interaction);
            }
        } else {
            super.execute(interaction); return;
        }
    }

    public override toRaw(): ChatInputCommand {
        return {
            type: CommandType.ChatInput as const,
            ...super.toRaw(),
            options: this.subCommands?.map((subCommand) => subCommand.toRaw()) ?? [ ...this.args, ...this.optionalArgs ],
        };
    }
}
