import axios from "axios";
import { GuildMember } from "discord.js";
import { join } from "path";
import sharp from "sharp";
import { SubCommand } from "structure/interaction/command/SubCommand";

export default new SubCommand({
    name: "test",
    async execute(interaction) {
        const { member } = interaction;
        if (!(member instanceof GuildMember)) return;

        await interaction.deferReply();
        console.log(member.displayAvatarURL());
        const avatar = await sharp(
            (await axios.get(member.displayAvatarURL(), {
                responseType: "arraybuffer",
            })).data,
        ).resize(100)
            .toBuffer();
        const image = await sharp(join("images/level.png"))
            .composite([
                {
                    input: avatar,
                },
            ])
            .toBuffer();
        interaction.editReply({ files: [ image ] });
    },
});
