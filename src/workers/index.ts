import type { Client } from "discord.js";
import MembersCount from "./MembersCount";
import UpdateStatus from "./UpdateStatus";

export async function onPreLogin(_client: Client) {

}

export async function onPostLogin(client: Client) {
    MembersCount(client);
    UpdateStatus(client);
}
