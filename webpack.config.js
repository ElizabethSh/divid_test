const path = require(`path`);
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const magicImporter = require('node-sass-magic-importer');

module.exports = {
  target: 'web',
  context: path.resolve(__dirname, 'src'),
  entry: {
    main: './index.js'
  },
  output: {
    filename: './js/[name].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  devtool: 'source-map',
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    hot: true
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  plugins: [
      new HtmlWebpackPlugin({
      template: './index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'css/styles.css'
    })
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
            {
                loader: MiniCssExtractPlugin.loader
            },
            {
                loader: 'css-loader'
            },
            {
                loader: 'postcss-loader'
            },
            {
                loader:  'sass-loader',
                options: {
                    sassOptions: {
                        importer: magicImporter()
                    }
                }
            }
        ],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
                '@babel/preset-env',
                '@babel/preset-react'
            ]
          }
        }
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|ico)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
                name: 'img/[name].[ext]',
                esModule: false,
            }
          }
        ]
      }
    ],
  }
}