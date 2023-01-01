import type {
    ApplicationCommandOptionData as CommandArg,
    ApplicationCommandSubCommandData as SubCommandArg,
    ApplicationCommandSubGroupData as SubGroupArg,
    ChatInputCommandInteraction
} from "discord.js";
import LocaleOption from "utils/types/LocaleOption";
import Locales from "utils/types/LocaleOptionWithEn";
import type OmitEach from "utils/types/OmitEach";
import type { CommandOptions } from "./Command";
import { Command } from "./Command";

export type Arg = Exclude<CommandArg, SubCommandArg | SubGroupArg>;
type TransformedArgs = [interaction: ChatInputCommandInteraction];

export interface BaseSlashCommandOptions extends CommandOptions<TransformedArgs> {
    readonly description?: Locales
    readonly args?: Array<OmitEach<Arg, "required">>
    readonly optionalArgs?: Array<OmitEach<Arg, "required">>
}

export abstract class BaseSlashCommand extends Command<ChatInputCommandInteraction, TransformedArgs> {
    public readonly descriptions: LocaleOption;
    public readonly args: Array<Arg>;
    public readonly optionalArgs: Array<Arg>;

    public constructor(options: BaseSlashCommandOptions) {
        super(options);
        this.args = options.args?.map((value) => ({ ...value, required: true })) ?? [];
        this.optionalArgs = options.optionalArgs?.map((value) => ({ ...value, required: false })) ?? [];
        // eslint-disable-next-line @typescript-eslint/naming-convention
        this.descriptions = Object.fromEntries(Object.entries(options.description ?? { "en-US": "-" })
            .map(([key, value]) => [key in BaseSlashCommand.localeAliasMap
                ? BaseSlashCommand.localeAliasMap[key as keyof typeof BaseSlashCommand.localeAliasMap]
                : key,
            value] as const));
    }

    protected override transform(interaction: ChatInputCommandInteraction): [ChatInputCommandInteraction] {
        return [interaction];
    }

    protected toRaw(): any {
        return {
            name: this.name,
            nameLocalizations: this.nameLocale,
            description: this.descriptions["en-US"],
            descriptionLocalizations: this.descriptions,
        };
    }

    private static localeAliasMap = {
        "en": "en-US",
    };
}
