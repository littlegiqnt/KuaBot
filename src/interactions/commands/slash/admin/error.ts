import { SubSlashCommand } from "structure/interaction/command/SubSlashCommand";

export default new SubSlashCommand({
    name: "error",
    description: "오류 출력",
    args: [],
    async execute(interaction) {
        await interaction.reply({ ephemeral: true, content: "에러 발생!" });
        throw Error("Test");
    },
});
