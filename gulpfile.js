var gulp = require('gulp');
var concat = require('gulp-concat');
var mini = require('gulp-minify-css');
var replace = require('gulp-replace');
var build = require('gulp-html-replace');

//合并压缩CSS文件
gulp.task('concat', function() {
    gulp.src(['./VCv2/style/**/*.css', './VCv2/icovc/style.css'])
        .pipe(concat('vc.min.css'))
        .pipe(mini({
            advanced: false,
            keepBreaks: false
        }))
        .pipe(gulp.dest('./build/VCv2/style/'))
});

//转移iconfont文件
gulp.task('moveicon', function() {
    gulp.src('./VCv2/icovc/VCv2.ttf')
        .pipe(gulp.dest('./build/VCv2/style/'))
});

//转移img文件夹
gulp.task('moveimg', function() {
    gulp.src('./VCv2/img/*')
        .pipe(gulp.dest('./build/VCv2/img'))
});

//转移script文件夹
gulp.task('movescript', function() {
    gulp.src('./VCv2/script/*')
        .pipe(gulp.dest('./build/VCv2/script'))
});

//替换HTML文件中的线下地址
gulp.task('replace', function() {
    gulp.src(['./page/**/*.html', './index.html', '!node_modules/**/*.html'])
        .pipe(replace(/(\.\.\/){0,2}dist/gi, 'http://cloudliving-img.b0.upaiyun.com/static/Home/dist'))
        .pipe(replace(/(\.\.\/){0,2}VCv2/g, 'http://cloudliving-img.b0.upaiyun.com/static/Home/VCv2'))
        .pipe(build({

            // 'css': '../VCv2/style/vc.min.css'
            // 线上地址
            'css':'http://cloudliving-img.b0.upaiyun.com/static/Home/VCv2/style/vc.min.css'
        }))
        .pipe(gulp.dest('build/'));
});

//批量执行任务
gulp.task('default', ['concat', 'moveicon', 'moveimg', 'movescript', 'replace']);
