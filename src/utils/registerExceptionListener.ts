import logger from "structure/Logger";
import isProduction from "./isProduction";

export default async () => {
    process.on("uncaughtException", async (err) => {
        console.log(err);
        if (isProduction()) {
            await logger.error(err);
        }
        process.exit(1);
    });
};
