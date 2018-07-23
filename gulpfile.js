const gulp = require('gulp');
const ts = require('gulp-typescript');
tslint = require("gulp-tslint");

const JSON_FILES = ['src/*.json', 'src/**/*.json'];
var tsProject = ts.createProject("tsconfig.json");

gulp.task('scripts', () => {
  const tsResult = tsProject.src()
    .pipe(tsProject());
  return tsResult.js.pipe(gulp.dest('dist'));
});

gulp.task('watch', ['scripts'], () => {
  gulp.watch('src/**/*.ts', ['scripts']);
});

gulp.task('assets', function () {
  return gulp.src(JSON_FILES)
    .pipe(gulp.dest('dist'));
});

gulp.task('default', ['watch', 'assets']);

gulp.task("lint", function () {
  return gulp.src([
    "source/**/**.ts",
    "test/**/**.test.ts"
  ])
    .pipe(tslint({}))
    .pipe(tslint.report("verbose"));
});

gulp.task("build-app", function () {
  return gulp.src([
    "source/**/**.ts",
    "typings/main.d.ts/",
    "source/interfaces/interfaces.d.ts"
  ])
    .pipe(tsc(tsProject))
    .js.pipe(gulp.dest("source/"));
});