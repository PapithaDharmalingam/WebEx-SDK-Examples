
import * as webpack from 'webpack';

/**
 * This is where you define your additional webpack configuration items to be appended to
 * the end of the webpack config.
 */
export default {
  node: {
    fs: 'empty'
  }
} as webpack.Configuration;
