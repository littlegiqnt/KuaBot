import { ButtonStyle } from "discord.js";
import { Button } from "structure/interaction/component/Button";
import { createTicketCheck } from "utils/tickets/openTicketHandler";

export default new Button({
    customId: "create_ticket_check",
    style: ButtonStyle.Primary,
    labels: {
        en: "Click this to get a support!",
        ko: "문의하기",
    },
    emoji: "🔍",
    async execute(interaction) {
        return createTicketCheck(interaction);
    },
});