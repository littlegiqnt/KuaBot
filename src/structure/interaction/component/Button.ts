import { ButtonBuilder, ButtonInteraction, InteractionButtonComponentData, Locale } from "discord.js";
import Locales from "utils/types/LocaleOptionWithEn";
import { ComponentOptions, MessageComponent } from "./MessageComponent";

type ButtonOptionsType = Omit<InteractionButtonComponentData, "type" | "customId" | "label"> & ComponentOptions<[interaction: ButtonInteraction]>;
export interface ButtonOptions extends ButtonOptionsType {
    labels: Locales
}

export class Button extends MessageComponent<ButtonInteraction> {
    public readonly options: ButtonOptionsType;
    public readonly labels;

    public constructor(options: ButtonOptions) {
        super(options);
        const { labels, ..._options } = options;
        this.options = _options;
        this.labels = labels;
    }

    protected transform(x: ButtonInteraction): [ButtonInteraction] {
        return [x];
    }

    public isMine(x: ButtonInteraction): boolean {
        return x.customId === this.customId;
    }

    public getButton(locale?: Locale) {
        const options = {
            ...this.options,
            label: locale == null || locale === Locale.EnglishUS
                ? this.labels.en
                : this.labels[locale],
        };
        return new ButtonBuilder({
            ...options,
        });
    }
}