/* import { GuildMember } from "discord.js";
import { join } from "path";
import { IUser } from "schema/userSchema";
import dbManager from "structure/DBManager";

registerFont(join("fonts/NanumSquareEB.ttf"), { family: "Nanum Square EB" });

const roundedCorners = Buffer.from(
    "<svg><rect x=\"0\" y=\"0\" width=\"600\" height=\"600\" rx=\"600\" ry=\"600\"/></svg>",
);

export const createLevelImage = async (member: GuildMember, iuser?: IUser) => {
    const user = iuser ?? await dbManager.loadUser(member.id);

    const bgimg = await loadImage(join("images", "level.png"));
    const canvas = createCanvas(bgimg.width, bgimg.height);
    const ctx = canvas.getContext("2d");

    ctx.drawImage(bgimg, 0, 0);

    return canvas.createPNGStream();
};*/