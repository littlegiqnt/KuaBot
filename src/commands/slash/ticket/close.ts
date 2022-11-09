import { SubSlashCommand } from "structure/SubSlashCommand";
import { closeTicketCheck } from "utils/tickets/closeTicketHandler";

export default new SubSlashCommand({
    name: "닫기",
    description: "현재 문의 채널을 닫아요",
    async execute(interaction) {
        await closeTicketCheck(interaction);
    },
});
