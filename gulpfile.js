//Requer os pacotes
var gulp = require('gulp');
var gulpSass = require('gulp-sass');
var gulpAutoprefixer = require('gulp-autoprefixer');
var gulpConcat = require ('gulp-concat');
var gulpImagemin = require ('gulp-imagemin');

//Tarefa para estilos
gulp.task('style', function(){
  return gulp.src([
    'assets/style/**/*'
  ])
  .pipe(gulpSass({
    outputStyle: 'compressed'
  })
  .on('error', gulpSass.logError))
  .pipe(gulpAutoprefixer({
    cascade: false
  }))
  .pipe(gulpConcat('main.css'))
  .pipe(gulp.dest('build/style'))
});

//Tarefa para scripts
gulp.task('script', function(){
  return gulp.src([
    'assets/script/**/*.js'
  ])
  .pipe(gulpConcat('main.js'))
  .pipe(gulp.dest('build/script'))
})

//Tarefa que compacta as imagens
gulp.task('image', function() {
   return gulp.src([
      'assets/image/**',
   ])
   .pipe(gulpImagemin({
      interlaced: true,
      progressive: true,
      optimizationLevel: 5,
   }))
   .pipe(gulp.dest('build/image'))
 });
 

//Tarefa que observa as alterações
gulp.task('watch', function(){
  //Observa as alterações nos estilos
  gulp.watch('assets/style/**/*', gulp.task('style'));
  //Observa as alterações nos scripts
  gulp.watch('assets/script/**/*', gulp.task('script'));
  //Observa as alterações nas imagens
  gulp.watch('assets/image/**/*', gulp.task('image'));
})

//Tarefa padrão, executa o build primeiro e depois observa as alterações
gulp.task('default', gulp.parallel(
  'style',
  'script',
  'image',
  'watch'
))