import gulp from "gulp";
import sass from "sass";
import gulpSass from "gulp-sass";
import cssnano from "gulp-cssnano";
import rev from "gulp-rev";
import gulpUglify from "gulp-uglify-es";
import imagemin from "gulp-imagemin";
import { deleteSync } from "del";

const uglify = gulpUglify.default;
const sassTemp = gulpSass(sass);
// const css1 = async () => {
//   return gulp
//     .src("./assets/sass/**/*.scss")
//     .pipe(sassTemp())
//     .pipe(cssnano())
//     .pipe(gulp.dest("./assets.css"));
// };


const js = async () => {
  return gulp
    .src("./assets/**/*.js")
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest("./public/assets"))
    .pipe(
      rev.manifest('public/assets/rev-manifest.json',{
        base: './public/assets',
        merge: true,
      })
    )
    .pipe(gulp.dest("./public/assets"));
};


const css2 = async () => {
  return gulp
    .src("./assets/**/*.css")
    .pipe(cssnano())
    .pipe(rev())
    .pipe(gulp.dest("./public/assets"))
    .pipe(
      rev.manifest('public/assets/rev-manifest.json',{
        base: './public/assets',
        merge: true,
      })
    )
    .pipe(gulp.dest("./public/assets"));
};

const images = async () => {
  return gulp
    .src("./assets/**/*.+(png|jpg|gif|svg|jpeg)")
    .pipe(imagemin())
    .pipe(rev())
    .pipe(gulp.dest("./public/assets"))
    .pipe(
      rev.manifest('public/assets/rev-manifest.json',{
        base: './public/assets',
        merge: true,
      })
    )
    .pipe(gulp.dest("./public/assets"));
};

// empty the public/assets directory
const cleanAssets = async () => {
  return deleteSync("./public/assets");
};

export { js, images, cleanAssets,css2 };

const build = gulp.series(cleanAssets, js, css2, images);

export default build;