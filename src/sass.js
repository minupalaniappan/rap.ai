import {sass} from 'node-sass'
var result = sass.renderSync({
  file: '/core/app.scss',
  outputStyle: 'compressed',
  outFile: '/assets/app.css',
  sourceMap: true, // or an absolute or relative (to outFile) path
});
