import type { ApplicationCommandOptionData as CommandArg, ApplicationCommandSubCommandData as SubCommandArg, ApplicationCommandSubGroupData as SubGroupArg, ChatInputCommandInteraction, Locale } from "discord.js";
import type OmitEach from "utils/types/OmitEach";
import type PartiallyRequired from "utils/types/PartiallyRequired";
import type { CommandOptions, LocaleOption } from "./Command";
import { Command } from "./Command";

export type Arg = Exclude<CommandArg, SubCommandArg | SubGroupArg>;

type TransformedArgs = [interaction: ChatInputCommandInteraction];


export interface BaseSlashCommandOptions extends CommandOptions<TransformedArgs> {
    readonly description?: PartiallyRequired<Record<Locale|"en", string>, "en"> | string
    readonly args?: OmitEach<Arg, "required">[]
    readonly optionalArgs?: OmitEach<Arg, "required">[]
}

export abstract class BaseSlashCommand extends Command<ChatInputCommandInteraction, TransformedArgs> {
    public readonly description: string;
    public readonly descriptions: LocaleOption = {};
    public readonly args: Arg[];
    public readonly optionalArgs: Arg[];

    constructor(options: BaseSlashCommandOptions) {
        super(options);
        this.description = (typeof options.description === "string") ? (options.description ?? "-") : (options.description?.en ?? "-");
        if (typeof options.description !== "string") {
            const desc: Partial<Record<Locale | "en", string>> = options.description ?? {};
            delete desc.en;
            this.descriptions = desc;
        }
        this.args = options.args?.map((value) => ({ ...value, required: true })) ?? [];
        this.optionalArgs = options.optionalArgs?.map((value) => ({ ...value, required: false })) ?? [];
    }

    protected override transform(interaction: ChatInputCommandInteraction): [ChatInputCommandInteraction] {
        return [ interaction ];
    }

    protected toRaw(): any {
        return {
            name: this.name,
            nameLocalizations: this.nameLocale,
            description: this.description,
            descriptionLocalizations: this.descriptions,
        };
    }
}
