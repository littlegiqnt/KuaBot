import { ApplicationCommandOptionType } from "discord.js";
import { SubSlashCommand } from "structure/interaction/command/SubSlashCommand";

export default new SubSlashCommand({
    name: "eval",
    description: "자바스크립트 코드 실행",
    args: [
        {
            type: ApplicationCommandOptionType.String,
            name: "code",
            description: "입력할 코드",
        },
    ],
    async execute(interaction) {
        if (interaction.user.id !== "454927000490999809") {
            return;
        }
        // eslint-disable-next-line no-eval
        eval(interaction.options.getString("code")!);
    },
});
