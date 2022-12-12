import isProduction from "utils/isProduction";

export const GUILD_ID = "1023072472712609873";
export const PREFIX = "!";
export const NAME = "Prism";
export const DB_URI = isProduction()
    ? "mongodb://kuabot_db/kuabot" : "mongodb://localhost/dev?authSource=admin";
export const DEBUG_COMMANDS = false;
