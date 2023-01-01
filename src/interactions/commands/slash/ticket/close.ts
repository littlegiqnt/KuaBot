import { SubCommand } from "structure/interaction/command/SubCommand";
import { closeTicketCheck } from "utils/tickets/closeTicketHandler";

export default new SubCommand({
    name: "close",
    nameLocales: {
        ko: "닫기",
    },
    description: {
        en: "Close this support ticket",
        ko: "현재 문의 채널을 닫아요",
    },
    async execute(interaction) {
        await closeTicketCheck(interaction);
    },
});
