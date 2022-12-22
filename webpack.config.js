/* eslint-disable @typescript-eslint/no-var-requires */
// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path");
const webpackNodeExternals = require("webpack-node-externals");

const isProduction = process.env.NODE_ENV === "production";


const config = {
    entry: "./src/index.ts",
    target: "node",
    externals: [webpackNodeExternals()],
    output: {
        path: path.resolve(__dirname, "dist"),
    },
    plugins: [
        // Add your plugins here
        // Learn more about plugins from https://webpack.js.org/configuration/plugins/
    ],
    module: {
        rules: [
            {
                loader: "esbuild-loader",
                options: {
                    loader: "ts",
                    target: "node18",
                },
            },
        ],
    },
    resolve: {
        modules: [path.resolve(__dirname, "src")],
        extensions: [".tsx", ".ts", ".jsx", ".js", "..."],
    },
};

module.exports = () => {
    if (isProduction) {
        config.mode = "production";
    } else {
        config.mode = "development";
    }
    return config;
};
