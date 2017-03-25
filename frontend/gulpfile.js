var gulp = require('gulp');
var webServer = require('gulp-webserver');
var mainBowerFiles = require('main-bower-files');
var inject = require('gulp-inject');
var del = require('del');

var paths = {
    temp: 'temp',
    tempVendor: 'temp/vendor',
    tempIndex: 'temp/index.html',

    index: 'app/index.html',
    appSrc: ['app/**/*', '!app/index.html'],
    bowerSrc: 'bower_components'
};

gulp.task('default', ['watch', 'copyAndInjectAll']);



gulp.task('watch', ['serve'], function() {
    gulp.watch(paths.appSrc, ['copyAndInjectScripts']);
    gulp.watch(paths.bowerSrc, ['copyAndInjectVendors']);
    gulp.watch(paths.index, ['copyAndInjectAll']);
});

gulp.task('serve', function() {
    gulp.src(paths.temp)
        .pipe(webServer({
            proxies: [{
                source: '/api',
                target: 'http://localhost:1337'
            }]
        }));
});

gulp.task('copyAndInjectAll', function() {
    var tempVendors = gulp.src(mainBowerFiles()).pipe(gulp.dest(paths.tempVendor));
    var appFiles = gulp.src(paths.appSrc).pipe(gulp.dest(paths.temp));

    return gulp.src(paths.index)
        .pipe(gulp.dest(paths.temp))
        .pipe(inject(tempVendors, {
            relative: true,
            name: 'vendorInject'
        }))
        .pipe(inject(appFiles, {
            relative: true
        }))
        .pipe(gulp.dest(paths.temp));
});

gulp.task('copyAndInjectVendors', function() {
    var tempVendors = gulp.src(mainBowerFiles()).pipe(gulp.dest(paths.tempVendor));

    return gulp.src(paths.tempIndex)
        .pipe(inject(tempVendors, {
            relative: true,
            name: 'vendorInject'
        }))
        .pipe(gulp.dest(paths.temp));
});

gulp.task('copyAndInjectScripts', function() {
    var appFiles = gulp.src(paths.appSrc).pipe(gulp.dest(paths.temp));

    return gulp.src(paths.tempIndex)
        .pipe(inject(appFiles, {
            relative: true
        }))
        .pipe(gulp.dest(paths.temp));
});

gulp.task('clean', function() {
    del([paths.temp]);
});
