import { SubCommand } from "structure/interaction/command/SubCommand";

export default new SubCommand({
    name: "error",
    description: {
        ko: "오류 강제 발생",
        en: "Forcely cause an error",
    },
    args: [],
    async execute(interaction) {
        await interaction.reply({ ephemeral: true, content: "에러 발생!" });
        throw Error("Test");
    },
});
