import { SubCommand } from "structure/interaction/command/SubCommand";

export default new SubCommand({
    name: "error",
    description: "오류 출력",
    args: [],
    async execute(interaction) {
        await interaction.reply({ ephemeral: true, content: "에러 발생!" });
        throw Error("Test");
    },
});
