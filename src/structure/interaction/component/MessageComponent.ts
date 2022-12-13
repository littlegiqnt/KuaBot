import { Interaction, InteractionOptions } from "../Interaction";

export interface ComponentOptions<Args extends Array<any>> extends InteractionOptions<Args> {
    readonly customId: string
}

export abstract class MessageComponent<T, Args extends Array<any> = [T]> extends Interaction<T, Args> {
    public readonly customId: string;

    public constructor(options: ComponentOptions<Args>) {
        super(options);
        this.customId = options.customId;
    }
}