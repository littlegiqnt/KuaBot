import { ButtonBuilder, ButtonInteraction, InteractionButtonComponentData } from "discord.js";
import { ComponentOptions, MessageComponent } from "./MessageComponent";

export interface ButtonOptions extends InteractionButtonComponentData, Omit<ComponentOptions<[interaction: ButtonInteraction]>, "customId"> {
}

export class Button extends MessageComponent<ButtonInteraction> {
    public constructor(public readonly options: ButtonOptions) {
        super(options);
    }

    protected transform(x: ButtonInteraction): [ButtonInteraction] {
        return [x];
    }

    public isMine(x: ButtonInteraction): boolean {
        return x.customId === this.customId;
    }

    public getButton() {
        return new ButtonBuilder({
            ...this.options,
        });
    }
}