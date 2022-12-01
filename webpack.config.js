const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isDev = process.env.NODE_ENV === "development"

const mode = isDev ? "development" : "production"

module.exports = {
  entry: path.resolve(__dirname, "static", "index.ts"),
  output: {
    filename: "[contenthash].js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
  },
  devtool: isDev ? "inline-source-map" : false,
  devServer: {
    port: 1234,
    static: path.resolve(__dirname, "dist"),
    historyApiFallback: true
  },
  optimization: {
    runtimeChunk: "single",
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: isDev ? "Dev Messenger" : "Messenger",
      template: path.resolve(__dirname, "static/index.html")
    }),
    new MiniCssExtractPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: "ts-loader",
      },
      {
        test: /\.js$/,
        use: ["source-map-loader"],
        enforce: "pre"
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        loader: "file-loader",
        options: {
          name: "[path][name].[ext]",
        },
      },
      {
        test: /\.(css|pcss)$/,
        use: [
          isDev ? "style-loader" : MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: true,
              importLoaders: 1,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                config: path.resolve(__dirname, "postcss.config.js"),
                hmr: isDev
              },
            }
          },
        ],
      },
      {
        test: /\.hbs/,
        loader: "handlebars-loader",
      }
    ]
  },
  resolve: {
    extensions: [".js", ".ts", ".css", ".pcss", ".hbs"],
  },
  mode: mode
}
