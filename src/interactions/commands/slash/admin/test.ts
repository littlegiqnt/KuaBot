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
        const avatarOrigin = (await axios.get(member.displayAvatarURL(), {
            responseType: "arraybuffer",
        })).data as Buffer;
        const avatar = await sharp({
            create: {
                width: 600,
                height: 600,
                channels: 4,
                background: { r: 0, g: 0, b: 0, alpha: 0.0 },
            },
        })
            .composite([
                {
                    input: avatarOrigin,
                    blend: "in",
                },
            ])
            .png()
            .toBuffer();
        const image = await sharp(join("images/level.png"))
            .composite([
                {
                    input: avatar,
                    top: 150,
                    left: 150,
                },
            ])
            .toBuffer();
        interaction.editReply({ files: [image] });
    },
});
