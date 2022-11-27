import type { ApplicationCommandSubGroup, ChatInputCommandInteraction } from "discord.js";
import { ApplicationCommandOptionType } from "discord.js";
import type { BaseSlashCommandOptions } from "./BaseSlashCommand";
import { BaseSlashCommand } from "./BaseSlashCommand";
import type { SubCommand } from "./SubCommand";

export interface SubCommandGroupOptions extends Pick<BaseSlashCommandOptions, "name"> {
    readonly subCommands: SubCommand[]
}

export class SubCommandGroup extends BaseSlashCommand {
    private readonly subCommands: SubCommand[];

    constructor(options: SubCommandGroupOptions) {
        super({
            execute: (interaction) => this.execute(interaction),
            ...options,
        });
        this.subCommands = options.subCommands;
    }

    public override isMine(interaction: ChatInputCommandInteraction): boolean {
        return interaction.options.getSubcommandGroup(false) === this.name;
    }

    public override toRaw(): ApplicationCommandSubGroup {
        return {
            ...super.toRaw(),
            type: ApplicationCommandOptionType.SubcommandGroup as const,
            options: this.subCommands?.flatMap((sub) => sub.toRaw()),
        };
    }
}
