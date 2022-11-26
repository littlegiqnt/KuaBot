export interface CommandOptions<Args extends any[]> {
    readonly name: string
    readonly execute: (...args: Args) => void | Promise<void>
}
export abstract class Command<T, Args extends any[] = [T]> {
    private readonly _execute: (...args: Args) => void | Promise<void>;

    public readonly name: string;

    constructor(options: CommandOptions<Args>) {
        this.name = options.name;
        this._execute = options.execute;
    }

    public execute(x: T) {
        return this._execute(...this.transform(x));
    }

    protected abstract transform(x: T): Args;

    public abstract isMine(x: T): boolean;
}
