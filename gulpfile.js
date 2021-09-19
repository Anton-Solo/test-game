const gulp        = require('gulp');
const browserSync = require('browser-sync');
const sass        = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const rename = require("gulp-rename");
const imagemin    = require('gulp-image');
const pngquant    = require('imagemin-pngquant'); 

gulp.task('server', function() {

    browserSync({
        server: {
            baseDir: "src"
        }
    });

    gulp.watch("src/*.html").on('change', browserSync.reload);
});

gulp.task('styles', function() {
    return gulp.src("src/sass/**/*.+(scss|sass)")
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(autoprefixer())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream());
});

gulp.task('watch', function() {
    gulp.watch("src/sass/**/*.+(scss|sass)", gulp.parallel('styles'));
});

gulp.task('build', function() {
 
    let buildCss = gulp.src('src/css/styles.min.css')
        .pipe(gulp.dest('dist/css'))
 
    let buildFonts = gulp.src('src/fonts/*')
        .pipe(gulp.dest('dist/fonts'))
 
    let buildJs = gulp.src('src/js/*') 
        .pipe(gulp.dest('dist/js'))
 
    let buildHtml = gulp.src('src/*.html')
        .pipe(gulp.dest('dist'));

    let buildImg = gulp.src('src/img/**/**')
        .pipe(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('dist/img'));

    return buildCss, buildFonts, buildJs, buildHtml, buildImg;
 
});

gulp.task('default', gulp.parallel('watch', 'server', 'styles'));