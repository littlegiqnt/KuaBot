import { Client, Guild, Role } from "discord.js";
import { loadavg } from "os";

type rolesType = {
    [key: string]: Role;
};
type rolesIDType = {
    [key: string]: string;
};

export class RolesManager {
    private static instance: RolesManager;

    private guild: Guild;
    private roles: rolesType = {};
    private rolesID: rolesIDType = {
        verified_1: "1023192667372388412",
        male: "1023192732090515536",
        female: "1023192805339824239",
        adult: "1023204873489100821",
        highschool: "1023192920116957194",
        middleschool: "1023192855700832416",
        couple: "1023193785343148042",
        single: "1023193735179288696",
        announcement: "1024229806193258506",
        dm_allow: "1024229137809952778",
        dm_disallow: "1024229118583255060",
    };

    constructor(guild: Guild) {
        this.guild = guild;
    }

    public static getInstance() {
        return this.instance;
    }

    public static async init(client: Client) {
        this.instance = new this(await client.guilds.fetch(process.env.GUILDID!));
        await this.instance.load();
    }

    public async load() {
        const roles_ = await this.guild.roles.fetch();
        for (const name in this.rolesID) {
            const roleID = this.rolesID[name];
            this.roles[name] = (await this.guild.roles.fetch()).get(this.rolesID[name])!;
        }
    }

    /**
     * get
     */
    public get(name: string): Role | undefined {
        return this.roles[name];
    }
}

export default function getCachedRole(name: string): Role | undefined {
    return RolesManager.getInstance().get(name);
}
