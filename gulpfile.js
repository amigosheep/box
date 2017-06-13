"use strict";

//加载模块
var gulp=require("gulp");
var less=require("gulp-less");
// var cssnano=require("gulp-cssnano");
var cssmin=require("gulp-cssmin");
var concat=require("gulp-concat");
var uglify=require("gulp-uglify");
var imagemin=require("gulp-imagemin");
var clean=require("gulp-clean");
var browserSync=require("browser-sync").create();


//定义一个简单任务
gulp.task("hello",function(){
	console.log("hello world");
});

//html复制的任务
gulp.task("html",function(){
	gulp.src("src/**/*.html")
	.pipe(gulp.dest("dist"));
});

//less编译
gulp.task("less",function(){
	gulp.src("src/less/*.less")
	.pipe(less())//less编译
	// .pipe(cssnano())//压缩
	.pipe(cssmin())
	.pipe(gulp.dest("dist/css/"));
});

//js合并
gulp.task("js",function(){
	gulp.src("src/js/*.js")
	.pipe(concat("all.js"))
	.pipe(uglify())
	.pipe(gulp.dest("dist/js/"));
});

//压缩图片
gulp.task("image",function(){
	gulp.src("src/img/*")
	.pipe(imagemin())
	.pipe(gulp.dest("dist/img/"));
});

//清空内容
gulp.task("clean",function(){
	gulp.src("dist/")
	.pipe(clean());
});

//合并任务
gulp.task("dist",["html","less","js","image"]);

//定义一个监视任务
gulp.task('watch',function(){
    gulp.watch('src/**/*.html',['html']);//监视src目录下所有的html，文件，当发生变化时，进行监视，html任务也跟着变化
    gulp.watch('src/less/*.less',['less']);
    gulp.watch('src/js/*.js',['js']);
    gulp.watch('src/img/*',['image']);
});

//启动一个broswer-sync静态服务器，实现浏览器的同步
gulp.task('serve',['html','less','js','image','watch'],function(){
    browserSync.init({
        server:{
            baseDir:'./dist'
        },
        port:2017,
    });
});
