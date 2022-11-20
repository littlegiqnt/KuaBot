import { ApplicationCommandOptionType, EmbedBuilder } from "discord.js";
import Color from "structure/Color";
import dbManager from "structure/DBManager";
import { SubSlashCommand } from "structure/SubSlashCommand";

export default new SubSlashCommand({
    name: "시작날짜",
    description: "두 분이 만나 신지 얼마나 되셨는지 저에게 알려주세요!",
    args: [
        {
            type: ApplicationCommandOptionType.String,
            name: "날짜",
            description: "연도-달-일 형식으로 입력하세요",
        },
    ],
    async execute(interaction) {
        await interaction.deferReply({ ephemeral: false });
        const date: Date = new Date(new Date(interaction.options.getString("날짜")!)
            .toDateString());
        if (isNaN(date.valueOf())) {
            const embed = new EmbedBuilder()
                .setColor(Color.BRIGHT_RED)
                .setTitle("엇, 날짜를 설정하지 못했어요..")
                .setDescription("혹시 잘못된 날짜를 입력하지는 않았는지 확인해봐요!");
            interaction.editReply({ embeds: [ embed ] });
            return;
        }
        const user = await dbManager.loadUser(interaction.user.id);
        user.coupleSince = date;
        user.save();
        const embed = new EmbedBuilder()
            .setColor(Color.GREEN)
            .setTitle("날짜를 저장해 놨어요!")
            .setDescription(`설정된 날짜는 ${new Intl.DateTimeFormat("ko-KR").format(date)}이에요!`);
        interaction.editReply({ embeds: [ embed ] });
    },
});
