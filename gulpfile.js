const gulp = require("gulp"),
	  miniCss = require("gulp-minify-css"),
	  uglify = require("gulp-uglify"),
	  babel = require("gulp-babel"),
	  connect = require("gulp-connect"),
	  sass = require("gulp-sass");

//制定任务

gulp.task("html", function(){
	gulp.src("src/index.html").pipe(gulp.dest("dist")).pipe(connect.reload());
	gulp.src("src/html/**/*.html").pipe(gulp.dest("dist/html")).pipe(connect.reload());
})

gulp.task("css", function(){
	gulp.src("src/scss/**/*.scss")
		.pipe(sass())
		.pipe(miniCss())
		.pipe(gulp.dest("dist/css"))
		.pipe(connect.reload());
})

gulp.task("js", function(){
	gulp.src("src/js/**/*.js")
		.pipe(babel())
		.pipe(uglify())
		.pipe(gulp.dest("dist/js"))
		.pipe(connect.reload());
})

gulp.task("module", function(){
	gulp.src("src/module/**/*.js")
		.pipe(babel())
		.pipe(uglify())
		.pipe(gulp.dest("dist/module"))
		.pipe(connect.reload());
})

gulp.task("libs", function(){
	gulp.src("src/libs/**/*")
	.pipe(gulp.dest("dist/libs"))
	.pipe(connect.reload());
})

gulp.task("img", function(){
	gulp.src("src/imgs/**/*")
		.pipe(gulp.dest("dist/imgs"))
		.pipe(connect.reload());
})

gulp.task("server", function(){
	connect.server({
		livereload: true,
		port:2333,
		root:"dist"
	})
})

gulp.task("watch", function(){
	gulp.watch("src/index.html",["html"]);
	gulp.watch("src/html/**/*.html",["html"]);
	gulp.watch("src/scss/**/*.scss", ["css"]);
	gulp.watch("src/js/**/*.js", ["js"]);
	gulp.watch("src/module/**/*.js", ["module"]);
	gulp.watch("src/imgs/**/*", ["img"]);
})

gulp.task("default", ["html", "css", "js", "module", "img", "libs", "server", "watch"]);
