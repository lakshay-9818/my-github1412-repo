const gulp = require('gulp');
//const sass = require('gulp-sass')(require('sass'));
//const cssnano = require('gulp-cssnano');
const cleanCSS = require('gulp-clean-css');
const rev = require('gulp-rev');
const uglify = require('gulp-uglify-es').default;
const imagemin = require('gulp-imagemin');
//const del = require('del');



// gulp.task('css', function(done){
//    console.log('minifying css...');
//    gulp.src('./assets/sass/**/*.scss')
//    .pipe(sass())
//    .pipe(cssnano())
//    .pipe(gulp.dest('./assets.css'));
// gulp.src('./assets/**/*.css')   
//    .pipe(rev())
//    .pipe(gulp.dest('./public/assets'))
//    .pipe(rev.manifest({
//        cwd: 'public',  
//        merge: true   
//    }))
//    .pipe(gulp.dest('./public/assets'));
//    done();
// });
gulp.task('css', () => {
   console.log('minifying css...');
   return gulp.src('./assets/**/*.css')
     .pipe(cleanCSS())
     .pipe(rev())
     .pipe(gulp.dest('./public/assets'))
     .pipe(rev.manifest({
      cwd: 'public',
      merge: true
  }))
     .pipe(gulp.dest('./public/assets'));
 });

gulp.task('js', function(done){
   console.log('minifying js...');
    gulp.src('./assets/**/*.js')
   .pipe(uglify())
   .pipe(rev())
   .pipe(gulp.dest('./public/assets'))
   .pipe(rev.manifest({
       cwd: 'public',
       merge: true
   }))
   .pipe(gulp.dest('./public/assets'));
   done()
});


gulp.task('images', function(done){
   console.log('compressing images...');
   gulp.src('./assets/**/*.+(png|jpg|gif|svg|jpeg)')
   .pipe(imagemin())
   .pipe(rev())
   .pipe(gulp.dest('./public/assets'))
   .pipe(rev.manifest({
       cwd: 'public',
       merge: true
   }))
   .pipe(gulp.dest('./public/assets'));
   done();
});


// empty the public/assets directory
gulp.task('clean:assets', function(done){
    //del.deleteSync('./public/assets');
   done();
});

// Call the tasks in series
gulp.task('build', gulp.series('clean:assets', 'css', 'js', 'images'), function(done){
   console.log('Building assets');
   done();
});




// const gulp = require('gulp');

// const uglify = require('gulp-uglify');
// const imagemin = require('gulp-imagemin');
// const rev = require('gulp-rev');


// gulp.task('minify-css', () => {
//   return gulp.src('src/css/*.css')
//     .pipe(cleanCSS())
//     .pipe(rev())
//     .pipe(gulp.dest('dist/css'))
//     .pipe(rev.manifest())
//     .pipe(gulp.dest('dist/css'));
// });

// gulp.task('minify-js', () => {
//   return gulp.src('src/js/*.js')
//     .pipe(uglify())
//     .pipe(rev())
//     .pipe(gulp.dest('dist/js'))
//     .pipe(rev.manifest())
//     .pipe(gulp.dest('dist/js'));
// });

// gulp.task('minify-images', () => {
//   return gulp.src('src/images/*')
//     .pipe(imagemin())
//     .pipe(rev())
//     .pipe(gulp.dest('dist/images'))
//     .pipe(rev.manifest())
//     .pipe(gulp.dest('dist/images'));
// });