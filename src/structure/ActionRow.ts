import type { MessageActionRowComponentBuilder } from "discord.js";
import { ActionRowBuilder } from "discord.js";

export class ActionRow<Type extends MessageActionRowComponentBuilder> extends ActionRowBuilder<Type> {
    constructor(...components: Type[]) {
        super();
        this.setComponents(...components);
    }
}

