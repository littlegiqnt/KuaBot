import { SubSlashCommand } from "structure/SubSlashCommand";

export default new SubSlashCommand({
    name: "reboot",
    async execute(interaction) {
        await interaction.reply({ content: "끄아악 죽는다." });
        process.exit(1);
    },
});