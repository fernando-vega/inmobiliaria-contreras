var gulp = require('gulp'),
    webserver = require('gulp-webserver'),
    pug = require('gulp-pug'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    gulpif = require('gulp-if'),
    less = require('gulp-less'),
    cleanCSS = require('less-plugin-clean-css'),
    autoprefix = require('less-plugin-autoprefix'),
    cssmin = require('gulp-cssmin'),
    rename = require('gulp-rename'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant');


//config
var config = {
    styles: {
        main: './src/styles/main.less',
        watch: './src/styles/**/*.less',
        output: './dev/css/'
    },
    html: {
        main: './src/*.pug',
        watch: './src/**/*.pug',
        output: './dev/'
    },
    images: {
        main: './src/images/**/*',
        watch: './src/images/**/*',
        output: './dev/images/'
    },
    js: {
        main: './src/js/*.js',
        watch: './src/js/*.js',
        output: './dev/js/'
    }
}

//compile Jade
gulp.task('compile-pug', function(){
    return gulp.src(config.html.main)
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest(config.html.output))
});

// Compile Styles
gulp.task('compile-less', function () {
    gulp.src(config.styles.main)
        .pipe(less({
            use: autoprefix('last 10 versions', 'ie 9'),
            use: cleanCSS()
        }))
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(config.styles.output))
});

//Compile JavaScript
gulp.task('compile-js', function(){
    gulp.src(config.js.main)
        .pipe(concat('main.js'))
        .pipe(gulpif('/dev', uglify()))
        .pipe(gulp.dest(config.js.output))
});

//Optimize Images
gulp.task('images', function() {
    gulp.src(config.images.main)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest(config.images.output));
});

// server
gulp.task('server', function () {
    gulp.src('./dev')
        .pipe(webserver({
            host: 'localhost',
            port: 8000,
            livereload: true
        }));
});

gulp.task('watch', function () {
    gulp.watch(config.styles.watch, ['compile-less']);
    gulp.watch(config.html.watch, ['compile-pug']);
    gulp.watch(config.js.watch, ['compile-js']);
});


gulp.task('compile', ['compile-pug', 'compile-less', 'compile-js']);

gulp.task('default', ['watch', 'server' ,'images' , 'compile']);
