import type { MessageActionRowComponentBuilder } from "discord.js";
import { ActionRowBuilder } from "discord.js";

export class ActionRow<Type extends MessageActionRowComponentBuilder> extends ActionRowBuilder<Type> {
    public constructor(...components: Array<Type>) {
        super();
        this.setComponents(...components);
    }
}

