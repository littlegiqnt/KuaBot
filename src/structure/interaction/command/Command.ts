import LocaleOption from "utils/types/LocaleOption";
import { Interaction, InteractionOptions } from "../Interaction";

export interface CommandOptions<Args extends Array<any>> extends InteractionOptions<Args> {
    readonly name: string
    readonly nameLocales?: LocaleOption
}

export abstract class Command<T, Args extends Array<any> = [T]> extends Interaction<T, Args> {
    public readonly name: string;
    public readonly nameLocale?: LocaleOption;

    public constructor(options: CommandOptions<Args>) {
        super(options);
        this.name = options.name;
        this.nameLocale = options.nameLocales;
    }
}