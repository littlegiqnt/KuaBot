import type { ChatInputApplicationCommandData as ChatInputCommandData, ChatInputCommandInteraction } from "discord.js";
import { ApplicationCommandType } from "discord.js";
import type { BaseSlashCommandOptions } from "./BaseSlashCommand";
import { BaseSlashCommand } from "./BaseSlashCommand";
import type { SubCommand } from "./SubCommand";
import type { SubCommandGroup } from "./SubCommandGroup";

export interface SlashCommandOptions extends BaseSlashCommandOptions {
    readonly guildID?: string
}

export interface ParentSlashCommandOptions extends Pick<BaseSlashCommandOptions, "name"> {
    readonly subCommands: (SubCommand | SubCommandGroup)[]
    readonly guildID?: string
}

export class SlashCommand extends BaseSlashCommand {
    private readonly subCommands: (SubCommand | SubCommandGroup)[] | null = null;

    public readonly guildID?: string;

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

    public override toRaw(): ChatInputCommandData {
        return {
            ...super.toRaw(),
            type: ApplicationCommandType.ChatInput as const,
            options: this.subCommands?.map((sub) => sub.toRaw()) ?? [ ...this.args, ...this.optionalArgs ],
        };
    }
}
