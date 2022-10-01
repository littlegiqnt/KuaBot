import { GuildMember, Role, User } from "discord.js";
import { createInteractionCreateEventListener } from "./index";

export default createInteractionCreateEventListener(async (interaction) => {
    if (!interaction.isButton()) return;

    if (interaction.customId.startsWith("selectroles")) {
        await interaction.deferReply({ ephemeral: true });
        const member: GuildMember = interaction.member as GuildMember;
        await interaction.guild?.roles.fetch();
        switch (interaction.customId) {
            case "selectroles_male": {
                await member.roles.add(interaction.guild?.roles.cache.get("1023192732090515536")!);
                await member.roles.remove(interaction.guild?.roles.cache.get("1023192805339824239")!);
                break;
            }
            case "selectroles_female": {
                await member.roles.remove(interaction.guild?.roles.cache.get("1023192732090515536")!);
                await member.roles.add(interaction.guild?.roles.cache.get("1023192805339824239")!);
                break;
            }
            case "selectroles_adult": {
                await member.roles.add(interaction.guild?.roles.cache.get("1023204873489100821")!);
                await member.roles.remove(interaction.guild?.roles.cache.get("1023192920116957194")!);
                await member.roles.remove(interaction.guild?.roles.cache.get("1023192855700832416")!);
                break;
            }
            case "selectroles_highschool": {
                await member.roles.remove(interaction.guild?.roles.cache.get("1023204873489100821")!);
                await member.roles.add(interaction.guild?.roles.cache.get("1023192920116957194")!);
                await member.roles.remove(interaction.guild?.roles.cache.get("1023192855700832416")!);
                break;
            }
            case "selectroles_middleschool": {
                await member.roles.remove(interaction.guild?.roles.cache.get("1023204873489100821")!);
                await member.roles.remove(interaction.guild?.roles.cache.get("1023192920116957194")!);
                await member.roles.add(interaction.guild?.roles.cache.get("1023192855700832416")!);
                break;
            }
            case "selectroles_couple": {
                await member.roles.add(interaction.guild?.roles.cache.get("1023193785343148042")!);
                await member.roles.remove(interaction.guild?.roles.cache.get("1023193735179288696")!);
                break;
            }
            case "selectroles_single": {
                await member.roles.remove(interaction.guild?.roles.cache.get("1023193785343148042")!);
                await member.roles.add(interaction.guild?.roles.cache.get("1023193735179288696")!);
                break;
            }
            case "selectroles_announcement": {
                const role: Role = interaction.guild?.roles.cache.get("1024229806193258506")!;
                if ((await member.fetch()).roles.cache.has(role.id)) {
                    await member.roles.remove(role);
                    interaction.editReply({ content: "해당 역할이 제거되었습니다!" });
                } else {
                    await member.roles.add(role);
                    interaction.editReply({ content: "해당 역할이 추가되었습니다!" });
                }
                break;
            }
            case "selectroles_dm_allow": {
                await member.roles.add(interaction.guild?.roles.cache.get("1024229137809952778")!);
                await member.roles.remove(interaction.guild?.roles.cache.get("1024229118583255060")!);
                break;
            }
            case "selectroles_dm_disallow": {
                await member.roles.remove(interaction.guild?.roles.cache.get("1024229137809952778")!);
                await member.roles.add(interaction.guild?.roles.cache.get("1024229118583255060")!);
                break;
            }
            default: {
                interaction.editReply({ content: "실패하였습니다! 관리자에게 문의해주세요." });
                return;
            }
        }
        if (interaction.customId !== "selectroles_announcement") {
            interaction.editReply({ content: "설정되었습니다!" });
        }
    }
});
