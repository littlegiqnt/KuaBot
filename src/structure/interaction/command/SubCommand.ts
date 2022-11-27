import type { ApplicationCommandSubCommand } from "discord.js";
import { ApplicationCommandOptionType, type ChatInputCommandInteraction } from "discord.js";
import { BaseSlashCommand } from "./BaseSlashCommand";

export class SubCommand extends BaseSlashCommand {
    public override isMine(interaction: ChatInputCommandInteraction): boolean {
        return interaction.options.getSubcommand(false) === this.name;
    }

    public override toRaw(): ApplicationCommandSubCommand[] {
        return {
            ...super.toRaw(),
            type: ApplicationCommandOptionType.Subcommand as const,
            options: [ ...this.args, ...this.optionalArgs ],
        };
    }
}
