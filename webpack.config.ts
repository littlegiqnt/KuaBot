import DotEnv from "dotenv-webpack";
import path, { resolve } from "path";
import { Configuration } from "webpack";

const isProduction = process.env.NODE_ENV === "production";

const config:Configuration = {
    entry: "./src/index.ts",
    target: "node",
    externals: (ctx, callback) => {
		if (
			(
				/node_modules/.test(ctx.context!)
			) || (
				!path.isAbsolute(ctx.request!) && !/^(?:@|\.+\/)/.test(ctx.request!)
			)
		) callback(undefined, `commonjs ${ctx.request!}`)
		else callback()
	},
    output: {
		clean: true,
        libraryTarget: 'commonjs',
        path: resolve(__dirname, "dist"),
    },
    plugins: [
        new DotEnv()
    ],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'esbuild-loader',
                options: {
                    loader: 'ts',  // Or 'ts' if you don't need tsx
                    target: 'node18'
                }
            },
        ],
    },
    resolve: {
        modules: [resolve(__dirname, "js"), "node_modules"],
        extensions: [".tsx", ".ts", ".jsx", ".js", "..."],
        symlinks: true
    },
};

module.exports = () => {
    if (isProduction) {
        config.mode = "production";
    } else {
        config.mode = "development";
    }
    return config;
}
