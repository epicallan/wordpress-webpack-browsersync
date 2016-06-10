/* eslint default-case:0 */
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin'); // extracts css into its own file instead of inlining it in js bundle
const NPMInstallPlugin = require('npm-install-webpack-plugin');
// ===========================================================================
// CONSTANTS
// ===========================================================================
const THEME_NAME = 'customTheme';
const PROXY_TARGET = 'devinit.dev';
const themePath =  path.resolve(__dirname, `wp/wp-content/themes/${THEME_NAME}`);
const PATHS = {
  src: path.resolve(themePath, 'src'),
  build: path.resolve(themePath, 'build'),
  modules: path.resolve(__dirname, 'node_modules'),
  base: themePath,
};

const LOADER_INCLUDES = [ PATHS.src];

const DEVELOPMENT = 'development';
const PRODUCTION = 'production';

// ===========================================================================
// SETUP ENV
// ===========================================================================
const ENV = process.env.NODE_ENV === 'production' ? PRODUCTION : DEVELOPMENT ;
// ===========================================================================
// CONFIG EXPORT
// ===========================================================================
module.exports = {
  entry: getEntry(ENV),
  output: {
    path: PATHS.build,
    filename: '[name].js',
    publicPath: PATHS.base,
    sourceMapFilename: '[file].map',
  },
  module: {
    loaders: getLoaders(ENV),
  },

  plugins: getPlugins(ENV),

  target: 'web',

  data: {
    THEME_NAME,
    PROXY_TARGET,
    PATHS,
  },
};

function getEntry(env) {
  const entry = {};
  entry.main = [ path.resolve(PATHS.src, 'js/main.js') ];
  entry.style = path.resolve(PATHS.src, 'sass/style.scss');
  return entry;
}

function getLoaders(env) {
  const loaders = [
    {
      test: /\.js$/,
      include: LOADER_INCLUDES,
      loader: 'babel',
      query: {
        cacheDirectory: true,
      },
    },
    {
     test: /\.s?css$/,
     include: LOADER_INCLUDES,
     loader: ExtractTextPlugin.extract((
       ''
       + 'css'
       + '?sourceMap'
       + '!'
       + 'sass'
       + '?sourceMap'
     )),
    }
  ];
  return loaders;
}

function getPlugins(env) {
  const plugins = [
    new webpack.DefinePlugin({
      'ENV': JSON.stringify(env) // sets ENV constant to development or production
    })
  ];
  switch (env) {
    case PRODUCTION:
    // optimizations
      plugins.push(new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }));
      plugins.push(new webpack.optimize.DedupePlugin());
      plugins.push(new webpack.optimize.OccurenceOrderPlugin());
    break;
    case DEVELOPMENT:
      plugins.push(new NPMInstallPlugin({ save: true }));
      plugins.push(new webpack.NoErrorsPlugin());
      break;
  }
  plugins.push(new ExtractTextPlugin('style.css'));
  return plugins;
}
