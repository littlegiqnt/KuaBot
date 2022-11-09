import isProduction from "utils/isProduction";

export const GUILD_ID = "1023072472712609873";
export const PREFIX = "!";
export const NAME = "Prism";
export const DB_URI = isProduction()
    ? "mongodb://root:qwer11!!@prismdb:27017/prismbot?authSource=admin" : "mongodb://root:qwer11!!@ssh.projecttl.net:27018/prismbot_dev?authSource=admin";
