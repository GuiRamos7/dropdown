const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
  // Determina o modo que nosso webpack fará as coisas, sendo em dev, mais rapido para buildar

  mode: isDevelopment ? 'development' : 'production',

  // Ele fica responsavel para ajudar na hora de indentificar um erro na hora do desenvolvimento
  devtool: isDevelopment ? 'eval-source-map' : 'source-map',

  // Arquivo principal da nossa aplicação, o arquivo de entrada da nossa aplicação
  entry: path.resolve(__dirname, 'src', 'index.jsx'),

  // Arquivo que vamos gerar para nosso bundle
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },

  resolve: {
    // Aqui passamos os arquivos que ele vai ler
    extensions: ['.js', '.jsx'],
  },

  // Ele determina como diferentes arquivos vão ser tratados
  module: {
    // Uma array de regras
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [
              isDevelopment && require.resolve('react-refresh/babel'),
            ].filter(Boolean),
          },
        },
      },
    ],
  },
  // Aqui podemos passar plugins para nossa configração do webpack
  plugins: [
    // Esse plugin ele fica responsavel de colocar a tag script no nosso arquivo html
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html'),
    }),

    isDevelopment && new ReactRefreshWebpackPlugin(),
  ].filter(Boolean),

  //

  devServer: {
    static: path.resolve(__dirname, 'public'),
    hot: true,
  },
};
