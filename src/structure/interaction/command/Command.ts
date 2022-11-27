import type { Locale } from "discord.js";

export type LocaleOption = Partial<Record<Locale, string>>

export interface CommandOptions<Args extends any[]> {
    readonly name: string
    readonly nameLocale?: LocaleOption
    readonly execute: (...args: Args) => void | Promise<void>
}

export abstract class Command<T, Args extends any[] = [T]> {
    private readonly _execute: (...args: Args) => void | Promise<void>;

    public readonly name: string;
    public readonly nameLocale?: LocaleOption;

    constructor(options: CommandOptions<Args>) {
        this.name = options.name;
        this.nameLocale = options.nameLocale;
        this._execute = options.execute;
    }

    public execute(x: T) {
        return this._execute(...this.transform(x));
    }

    protected abstract transform(x: T): Args;

    public abstract isMine(x: T): boolean;
}
