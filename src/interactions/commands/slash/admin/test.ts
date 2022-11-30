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
        /* const avatarOrigin = (await axios.get(member.displayAvatarURL(), {
            responseType: "arraybuffer",
        })).data;*/
        const avatar = await sharp()
            .composite([
                {
                    input: {
                        create: {
                            width: 600,
                            height: 600,
                            background: "white",
                            channels: 3,
                        },
                    },
                    blend: "dest-in",
                },
            ])
            .resize(400)
            .toBuffer();
        console.debug(2);
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
