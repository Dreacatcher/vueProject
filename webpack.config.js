var path = require('path')
var webpack = require('webpack')
var srcDir = path.resolve(process.cwd(), 'src');

module.exports = {
  entry: {
    schoolMapMain: 'schoolMapMainJs',
    makeAppointmentMain: 'makeAppointmentMainJs'
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: '[name].build.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
            // the "scss" and "sass" values for the lang attribute to the right configs here.
            // other preprocessors should work out of the box, no loader config like this necessary.
            'scss': 'vue-style-loader!css-loader!sass-loader',
            'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.json', '.scss','.jpg','.png','.vue'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      'main':srcDir+'/main.js',
      
      // schoolMap
      'schoolMapJs': srcDir+'/components/schoolMap/controllers/schoolMap',
      'schoolMapMainVue': srcDir+'/components/schoolMap/ui/schoolMapVue',
      'schoolMapMainJs': srcDir+'/components/schoolMap/schoolMapMain',

      //makeAppointment
      'makeAppointmentJs': srcDir+'/components/makeAppointment/controllers/makeAppointment',
      'makeAppointmentMainVue': srcDir+'/components/makeAppointment/ui/makeAppointmentVue',
      'makeAppointmentMainJs': srcDir+'/components/makeAppointment/makeAppointmentMain'
    }
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
}

// 增加生产的环境判断
if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
