var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin');
const SWPrecache = require('sw-precache-webpack-plugin')
//const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    //filename: 'build.js'
      filename: 'build-[hash].js',
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
       
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      },
      {
        test: /\.(css|less)$/,
        use: [/*{
            loader: "style-loader" // creates style nodes from JS strings
        },*/ {
            loader: "css-loader" // translates CSS into CommonJS
        },/* {
            loader: "less-loader" // compiles Less to CSS
        }*/]
    }
    ]
  },
  resolveLoader: {
    modules: [
      path.resolve(__dirname, './node_modules'),

    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.common.js'
    },
      modules: [
          path.resolve(__dirname, './src'),
          path.resolve(__dirname, './node_modules'),
          path.resolve(__dirname, './public'),
          path.resolve('.'),
          //path.resolve('../vueAddons')
      ]
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  performance: {
    hints: false
  },

    plugins: [
        new HtmlWebpackPlugin({
            template: 'index-template.html',
            inject: 'body',
            filename: '../index.html'
        }),

        new SWPrecache({
          cacheId: 'projud',
          filepath: 'service-worker.js',
          staticFileGlobs: [
            'index.html',
            'manifest.json',
            '/*.{js,css}'
          ],
          stripPrefix: '/'
        })
        
    ],

  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    /*new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),*/
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
