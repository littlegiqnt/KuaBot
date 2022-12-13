import type { SlashCommand } from "structure/interaction/command/SlashCommand";
import admin from "./admin";
import birthday from "./birthday";
import clear from "./clear";
import couple from "./couple";
import level from "./level";
import ping from "./ping";
import setup from "./setup";
import ticket from "./ticket";

const commands: Array<SlashCommand> = [ping, setup, couple, clear, admin, level, birthday, ticket];

export default commands;
