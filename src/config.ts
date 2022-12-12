import isProduction from "utils/isProduction";

export const GUILD_ID = "1023072472712609873";
export const PREFIX = "!";
export const NAME = "Prism";
export const DB_URI = isProduction()
    ? "mongodb://root:qwer11!!@kuabot_db:27017/kuabot?authSource=admin" : "mongodb://localhost/dev?authSource=admin";
export const DEBUG_COMMANDS = false;
