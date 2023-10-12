var gulp         = require('gulp');
    sass         = require('gulp-sass');
    browserSync  = require('browser-sync');
    autoprefixer = require('gulp-autoprefixer');
    pug          = require('gulp-pug');
    plumber      = require('gulp-plumber');
    prettyHtml = require('gulp-pretty-html');

gulp.task('sass', function(done){
    gulp.src("app/sass/**/*.scss")
        .pipe(sass({outputStyle: 'expanded', indentWidth: 4}).on('error', sass.logError))
        .pipe(autoprefixer({ cascade: true, overrideBrowserslist: ['last 2 versions']}))
        .pipe(gulp.dest("app/css"))
        .pipe(browserSync.reload({stream: true}));
        
    done();
});

gulp.task('pug', function(){
    return gulp.src("app/pug/**/*.pug")
        .pipe(plumber())
        .pipe(pug({
            pretty: true
         }))
        .pipe(prettyHtml({indent_size: 4}))
        .pipe(gulp.dest("app/"))
        .pipe(browserSync.reload({stream: true}));
});


gulp.task('browser-sync', function(done) {
    browserSync({
        proxy: "http://dobriy-gulp/",
        notify: false
    });

    done();
});

gulp.task('watch', gulp.series('browser-sync', function(done) {
    gulp.watch("app/sass/**/*.*", gulp.series('sass'));
    gulp.watch("app/pug/**/*.pug", gulp.series('pug'));
    gulp.watch("app/js/*.js").on('change', browserSync.reload);
    done();
}));