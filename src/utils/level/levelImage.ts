import axios from "axios";
import { GuildMember } from "discord.js";
import { join } from "path";
import { IUser } from "schema/userSchema";
import sharp from "sharp";
import dbManager from "structure/DBManager";
import { getLevelByXp } from "./level";

const roundedCorners = Buffer.from(
    "<svg><rect x=\"0\" y=\"0\" width=\"600\" height=\"600\" rx=\"600\" ry=\"600\"/></svg>",
);

export const createLevelImage = async (member: GuildMember, iuser?: IUser) => {
    const user = iuser ?? await dbManager.loadUser(member.id);
    const [avatar] = await Promise.all([createRoundedAvatorImage(member)]);
    return sharp(join("images/level.png"))
        .composite([
            {
                input: avatar,
                top: 160,
                left: 140,
            },
            {
                input: {
                    text: {
                        text: `<span foreground="white">${getLevelByXp(user.xp.chat)}</span>`,
                        fontfile: join("fonts/NanumSquareEB.ttf"),
                        font: "나눔스퀘어 ExtraBold",
                        dpi: 500,
                        rgba: true,
                        align: "left",
                    },
                },
                top: 810,
                left: 1700,
            },
            {
                input: {
                    text: {
                        text: `<span foreground="white">${getLevelByXp(user.xp.voice)}</span>`,
                        fontfile: join("fonts/NanumSquareEB.ttf"),
                        font: "나눔스퀘어 ExtraBold",
                        dpi: 500,
                        rgba: true,
                        align: "left",
                    },
                },
                top: 1165,
                left: 1775,
            },
        ])
        .toBuffer();
};

const createRoundedAvatorImage = async (member: GuildMember) => {
    const avatarOrigin = (await axios.get(member.displayAvatarURL(), {
        responseType: "arraybuffer",
    })).data as Buffer;
    return sharp(avatarOrigin)
        .resize(600)
        .composite([
            {
                input: roundedCorners,
                blend: "dest-in",
            },
        ])
        .toBuffer();
};