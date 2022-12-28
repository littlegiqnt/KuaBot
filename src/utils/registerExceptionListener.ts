import logger from "structure/Logger";
import isProduction from "./isProduction";

export default async () => {
    process.on("uncaughtException", (err) => {
        console.log(err);
        if (isProduction()) {
            logger.error(err)
                .then(() => process.exit(1));
        }
    });
};
