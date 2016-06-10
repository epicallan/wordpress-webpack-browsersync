/* eslint default-case:0 */
const path = require('path');
const fs = require('fs-extra');
const browserSync = require('browser-sync').create();
const htmlInjector = require('bs-html-injector');
const webpackConfig = require('./webpack.config');
// ===========================================================================
// CONFIG
// ===========================================================================
const PATHS = webpackConfig.data.PATHS;
const PROXY_TARGET = webpackConfig.data.PROXY_TARGET;
const bsOptions = {
  port: 3000,
  files: [`${PATHS.build}/*.css`,`${PATHS.build}/*.js`],
  proxy: {
    // proxy local WP install
    target: PROXY_TARGET,
  },
  // this gets annoying
  open: false,
};

// setup html injector, only compare differences within outer most div (#page)
browserSync.use(htmlInjector, {
    files: `${PATHS.base}/*.php`,
    restrictions: ['#page']
});

// ===========================================================================
// RUN
// ===========================================================================
// clean -> ensure 'style.css' -> run browsersync
fs.emptyDir(PATHS.build, () => (
    fs.ensureFile(path.resolve(PATHS.build, 'style.css'), () => (
      browserSync.init(bsOptions)
    ))
  )
);
