export interface InteractionOptions<Args extends Array<any>> {
    readonly execute: (...args: Args) => void | Promise<void>
}

export abstract class Interaction<T, Args extends Array<any> = [interaction: T]> {
    private readonly _execute: (...args: Args) => void | Promise<void>;

    public constructor(options: InteractionOptions<Args>) {
        this._execute = options.execute;
    }

    public execute(x: T) {
        return this._execute(...this.transform(x));
    }

    protected abstract transform(x: T): Args;

    public abstract isMine(x: T): boolean;
}