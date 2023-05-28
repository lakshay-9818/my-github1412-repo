// import gulp from "gulp";
// import sass from "sass";
// import gulpSass from "gulp-sass";
// import cssnano from "gulp-cssnano";
// import rev from "gulp-rev";
// import gulpUglify from "gulp-uglify-es";
// import imagemin from "gulp-imagemin";
// import { deleteSync } from "del";
// import cache from "gulp-cache";

// gulp.task('clear', () =>
//     cache.clearAll()
// );


// const uglify = gulpUglify.default;
// const sassTemp = gulpSass(sass);
// // const css1 = async () => {
// //   return gulp
// //     .src("./assets/sass/**/*.scss")
// //     .pipe(sassTemp())
// //     .pipe(cssnano())
// //     .pipe(gulp.dest("./assets.css"));
// // };


// const js = async () => {
//   return gulp
//     .src("./assets/**/*.js")
//     .pipe(uglify())
//     .pipe(rev())
//     .pipe(gulp.dest("./public/assets"))
//     .pipe(
//       rev.manifest('public/assets/rev-manifest.json',{
//         base: './public/assets',
//         merge: true,
//       })
//     )
//     .pipe(gulp.dest("./public/assets"));
// };




// const css2 = async () => {
//   return gulp
//     .src("./assets/**/*.css")
//     .pipe(cssnano())
//     .pipe(rev())
//     .pipe(gulp.dest("./public/assets"))
//     .pipe(
//       rev.manifest('public/assets/rev-manifest.json',{
//         base: './public/assets',
//         merge: true,
//       })
//     )
//     .pipe(gulp.dest("./public/assets"));
// };

// const images = async () => {
//   return gulp
//     .src("./assets/**/*.+(png|jpg|gif|svg|jpeg)")
//     .pipe(imagemin())
//     .pipe(rev())
//     .pipe(gulp.dest("./public/assets"))
//     .pipe(
//       rev.manifest('public/assets/rev-manifest.json',{
//         base: './public/assets',
//         merge: true,
//       })
//     )
//     .pipe(gulp.dest("./public/assets"));
// };

// // empty the public/assets directory
// const cleanAssets = async (err) => {
//   if(err) return;
//   return deleteSync("./public/assets };

// export { js, images, cleanAssets,css2 };

// const build = gulp.series(cleanAssets, css2, js,  images);

// export default build;



import gulp from 'gulp';
import rev from 'gulp-rev';
import revDel from 'rev-del';
import cleanCSS from 'gulp-clean-css';
import uglify from 'gulp-uglify';
import imagemin from 'gulp-imagemin';

// Define your task to minimize CSS
gulp.task('minify-css', () => {
  return gulp.src('./assets/**/*.css')
    .pipe(cleanCSS())
    .pipe(rev())  
    .pipe(gulp.dest('./public/assets'))  
    .pipe(rev.manifest( 
      'public/assets/rev-manifest.json',{
                 base: './public/assets',
                 merge: true,
               }     
    ))
    .pipe(revDel({ dest: './public/assets/css', force: true }))
    .pipe(gulp.dest('./public/assets'));
});

// Define your task to minimize JS
gulp.task('minify-js', () => {
  return gulp.src('./assets/**/*.js')
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest(
      'public/assets/rev-manifest.json',{
        base: './public/assets',
        merge: true,
      } 
    ))
    .pipe(revDel({ dest: './public/assets/js', force: true }))
    .pipe(gulp.dest('./public/assets'));
});

// Define your task to minimize images
gulp.task('minify-images', () => {
  return gulp.src('./assets/**/*.+(png|jpg|gif|svg|jpeg)')
    .pipe(imagemin())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest(
      'public/assets/rev-manifest.json',{
        base: './public/assets',
        merge: true,
      } 
    ))
    .pipe(revDel({ dest: './public/assets/images', force: true }))
    .pipe(gulp.dest('./public/assets'));
});

// Define a task to run all the minimize tasks
gulp.task('minimize', gulp.parallel('minify-css', 'minify-js', 'minify-images'));

// Define a default task to run the minimize task
gulp.task('default', gulp.series('minimize'));
