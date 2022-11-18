import type { Client, GuildMember, PartialGuildMember, TextChannel } from "discord.js";
import { EmbedBuilder, time, userMention } from "discord.js";
import type { ISupportTicket } from "schema/ticketSchema";
import { description, title } from "templates/join";
import isProduction from "utils/isProduction";

class Logger {
    private userWelcomeChannel: TextChannel | undefined;
    private userLogChannel: TextChannel | undefined;
    private devChannel: TextChannel | undefined;
    private mainChatChannel: TextChannel | undefined;
    private ticketLogChannel: TextChannel | undefined;

    public init(client: Client) {
        this.userWelcomeChannel = client.channels.cache.get("1023191661167263859") as TextChannel;
        this.userLogChannel = client.channels.cache.get("1026360713524035584") as TextChannel;
        this.devChannel = client.channels.cache.get("1024959239384477726") as TextChannel;
        this.mainChatChannel = client.channels.cache.get("1031057694213296159") as TextChannel;
        this.ticketLogChannel = client.channels.cache.get("1038463307021025290") as TextChannel;
    }

    public async error(error: unknown) {
        if (!(error instanceof Error)) {
            return;
        }
        if (isProduction()) {
            try {
                const embed = new EmbedBuilder()
                    .setColor(0xFF5733)
                    .setTitle("오류 발생!")
                    .setDescription(`**${error.message}**\n${error.stack}`);
                await this.devChannel?.send({ embeds: [ embed ] });
            } catch (e) {
                console.log(error);
                console.log(e);
                return;
            }
        } else {
            console.log(error);
        }
    }

    public async debug(message: string) {
        try {
            const embed = new EmbedBuilder()
                .setColor("Grey")
                .setTitle("디버그")
                .setDescription(message);
            await this.devChannel?.send({ embeds: [ embed ] });
        } catch (e) {
            this.error(e);
            return;
        }
    }

    public async userJoin(member: GuildMember) {
        if (!isProduction()) return;
        const logEmbed = new EmbedBuilder()
            .setColor(0x00ff00)
            .setTitle(`Join: ${member.user.tag}`)
            .setDescription(
                `${userMention(member.id)}\n`
                + `**ID**: ${member.id}\n`
                + `**Created At**: <t:${Math.floor(member.user.createdAt.getTime() / 1000)}:F>\n`
                + `**Joined At**: <t:${Math.floor(member.joinedAt!.getTime() / 1000)}:F>`,
            )
            .setThumbnail(member.displayAvatarURL());
        const welcomeEmbed = new EmbedBuilder()
            .setColor(0x00ff00)
            .setTitle(title)
            .setDescription(description(member));
        return Promise.all([
            this.userLogChannel?.send({ embeds: [ logEmbed ] }),
            this.userWelcomeChannel?.send({
                embeds: [ welcomeEmbed ],
                content: userMention(member.id),
                allowedMentions: { parse: [ "users" ] },
            }),
        ]);
    }

    public async userQuit(member: GuildMember | PartialGuildMember) {
        if (!isProduction()) return;
        const logEmbed = new EmbedBuilder()
            .setColor(0xEE4B2B)
            .setTitle(`Quit: ${member.user.tag}`)
            .setDescription(
                `${userMention(member.id)}\n`
                + `**ID**: ${member.id}\n`
                + `**Created At**: <t:${Math.floor(member.user.createdAt.getTime() / 1000)}:F>\n`
                + `**Joined At**: <t:${Math.floor(member.joinedAt!.getTime() / 1000)}:F>`,
            )
            .setThumbnail(member.displayAvatarURL());
        return this.userLogChannel?.send({ embeds: [ logEmbed ] });
    }

    public async stepOneVerify(member: GuildMember | PartialGuildMember) {
        if (!isProduction()) return;
        const logEmbed = new EmbedBuilder()
            .setColor(0x0096FF)
            .setTitle(`Verified(Step 1): ${member.user.tag}`)
            .setDescription(
                `${userMention(member.id)}\n`
                + `**ID**: ${member.id}\n`
                + `**Created At**: <t:${Math.floor(member.user.createdAt.getTime() / 1000)}:F>\n`
                + `**Joined At**: <t:${Math.floor(member.joinedAt!.getTime() / 1000)}:F>`,
            )
            .setThumbnail(member.displayAvatarURL());

        return this.userLogChannel?.send({ embeds: [ logEmbed ] });
    }

    public async ticket(supportTicket: ISupportTicket, client: Client, transcriptUrl?: string) {
        const embed = new EmbedBuilder()
            .setColor("Navy")
            .setTitle("문의 티켓 로그")
            .setFields([
                {
                    name: "문의자",
                    value: `${userMention(supportTicket.opener)} (${supportTicket.opener})`,
                    inline: true,
                },
                {
                    name: "문의 생성 날짜",
                    value: `${time(supportTicket.whenCreated, "F")}`,
                    inline: true,
                },
                {
                    name: "문의 시작 날짜",
                    value: `${supportTicket.whenOpened == null ? "시작 안됨" : time(supportTicket.whenOpened, "F")}`,
                    inline: true,
                },
                {
                    name: "추가로 참여한 유저들",
                    value: `${supportTicket.users.length === 0 ? "없음" : supportTicket.users.map((value) => userMention(value))}`,
                    inline: true,
                },
                {
                    name: "기록",
                    value: `${transcriptUrl ?? "기록 내용 없음"}`,
                    inline: true,
                },
            ]);
        this.ticketLogChannel?.send({ embeds: [ embed ] });
        const opener = await client.users.fetch(supportTicket.opener);
        return opener.send({ embeds: [ embed ] }).catch((err) => {});
    }
}

const logger = new Logger();
export default logger;
