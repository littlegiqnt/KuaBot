import { SubSlashCommand } from "structure/interaction/command/SubSlashCommand";

export default new SubSlashCommand({
    name: "reboot",
    description: "봇 재부팅",
    async execute(interaction) {
        await interaction.reply({ content: "끄아악 죽는다." });
        process.exit(1);
    },
});
