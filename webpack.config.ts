import DotEnv from "dotenv-webpack";
import { resolve } from "path";
import { Configuration } from "webpack";

const isProduction = process.env.NODE_ENV === "production";

const config: Configuration = {
    mode: isProduction
        ? "production"
        : "development",
    entry: "./src/index.ts",
    target: "node",
    output: {
        clean: true,
        libraryTarget: "commonjs",
        path: resolve(__dirname, "dist"),
    },
    plugins: [
        new DotEnv(),
    ],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "esbuild-loader",
                options: {
                    loader: "tsx",
                    target: "node18",
                },
                resolve: {
                    fullySpecified: false,
                },
            },
        ],
    },
    resolve: {
        extensions: [".ts", ".tsx", ".jsx", ".js", "..."],
        symlinks: true,
        modules: ["node_modules", resolve(__dirname, "src"), "..."],
        fullySpecified: false,
    },
};

module.exports = config;
