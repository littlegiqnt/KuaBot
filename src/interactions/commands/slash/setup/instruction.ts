import type { TextChannel } from "discord.js";
import { EmbedBuilder } from "discord.js";
import { SubSlashCommand } from "structure/interaction/command/SubSlashCommand";
import { isNormalTextChannel } from "utils/checkChannel";

export default new SubSlashCommand({
    name: "instruction",
    async execute(interaction) {
        interaction.deferReply().then(() => interaction.deleteReply());

        if (interaction.channel == null || !isNormalTextChannel(interaction.channel)) return;

        await sendMain(interaction.channel);
        await sendRoles(interaction.channel);
    },
});

const sendMain = async (channel: TextChannel) => {
    const embed1 = new EmbedBuilder()
        .setColor(0xff7f00)
        .setTitle("✨《PRISM》에 오신것을 환영합니다!")
        .setDescription(
            "이 서버는 유저들의 __자유로운 소통과 친목__을 위한 커뮤니티 서버에요!\n"
            + "<#1023077753504944138>에있는 간단한 서버 규칙만 숙지해 주신다면 자유롭게 활동하실 수 있답니다! :D\n"
            + "혹시라도 문의사항이 있으시다면 바로 문의 부탁드려요!",
        );
    const embed2 = new EmbedBuilder()
        .setColor(0xff7f00)
        .setDescription(
            "이 메세지를 보내는 저는 이 서버만을 위해 특별히 자체 제작된 봇이에요!\n여러분들이 도움이 필요할 때면 언제든지 여기저기서 나타날 거랍니다 :3",
        );

    await channel.send({ files: [ "https://media.discordapp.net/attachments/1024959239384477726/1026067822993997824/prism.png" ] });
    await channel.send({ embeds: [ embed1, embed2 ] });
};

const sendRoles = async (channel: TextChannel) => {
    const embed = new EmbedBuilder()
        .setColor(0xff7f00)
        .setDescription(
            "<@&1023192476573519912>\n이 서버를 대표하시고, 또한 저를 만들어주신 주인님이에요.\n\n"
            + "<@&1023192522937356288>\n서버를 관리해주시는 분들이랍니다.\n\n"
            + "<@&1026358836145176636>\n서버를 운영하는데 있어 큰 도움을 주신 분들! 제가 태어나는데도 많은 도움을 주셨다고 해요.",
        );

    await channel.send({ files: [ "https://media.discordapp.net/attachments/1027203777289261167/1027248208826605669/-009.png" ] });
    await channel.send({ embeds: [ embed ] });
};
