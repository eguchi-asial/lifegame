const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.ts',
  devtool: 'inline-source-map',
  module: {
    // 変更検知の設定。htmlはpluginでhtml-webpack-pluginを使ってる。
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      }
    ],
  },
  plugins: [
    // html-webpack-pluginの設定
    new HtmlWebpackPlugin({
      // 対象のテンプレートを設定
      template: `${__dirname}/index.html`,
      // 書き出し先
      filename: `${__dirname}/dist/index.html`,
      // ビルドしたjsファイルを読み込む場所。デフォルトはhead
      inject: 'body'
    }),
  ],
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 8080,
  },

};
