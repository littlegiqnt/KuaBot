import { SubSlashCommand } from "../../../structure/SubSlashCommand";

export default new SubSlashCommand({
    name: "error",
    args: [],
    async execute(interaction) {
        await interaction.reply({ ephemeral: true, content: "에러 발생!" });
        throw Error("Test");
    },
});
