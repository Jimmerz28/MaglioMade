var gulp = require("gulp"),
    sass = require("gulp-ruby-sass"),
    gutil = require("gulp-util"),
    csslint = require("gulp-csslint"),
    rename = require("gulp-rename"),
    minifyHTML = require("gulp-minify-html"),
    changed = require("gulp-changed"),
    imagemin = require("gulp-imagemin"),
    jshint = require("gulp-jshint"),
    stylish = require("jshint-stylish"),
    jade = require("gulp-jade"),
    prefix = require("gulp-autoprefixer"),
    uglify = require("gulp-uglify"),
    clean = require("gulp-rimraf"),
    exec = require("child_process").exec,
    imageResize = require("gulp-image-resize"),
    publish = require("gulp-awspublish"),
    gzip = require("gulp-gzip"),
    parallelize = require("concurrent-transform"),
    fs = require("fs");

var paths =
{
    dist: "dist",
    src: "src",
    fonts: "./fonts/**/*.{svg,eot,woff,ttf}",
    styles: "./sass/**/*.{sass,scss}",
    images: "./images/**/*.{svg,png,jpg}",
    scripts: "./js/*.js",
    libs: "./js/libs/**/*.js",
    templates: "./templates/**/*.jade",
    resume: "./resume/*.pdf"
};

aws = JSON.parse(fs.readFileSync("credentials/deploy_creds.json"));

gulp.task("build", ["imagemin", "htmlvalidation", "copyfonts", "copyJSLibs","styles", "scripts", "generateChildren", "generateProjectImages"], function(){});

gulp.task("publish", function()
{
    var publisher = publish.create(
        {
            key: aws.key,
            secret: aws.secret,
            bucket: aws.bucket,
            region: aws.region
        });
        
    var headers = {"Cache-Control": "max-age=0, no-cache, no-transform, public"};
    
    return gulp.src("./dist/**/*.*")
    .pipe(publisher.publish(headers))
    .pipe(publisher.cache())
    .pipe(publish.reporter());
});

gulp.task("copyfonts", function()
{
    return gulp.src("./fonts/*", {cwd: paths.src})
    .pipe(gulp.dest("./fonts", {cwd: paths.dist}));
});
 
gulp.task("csslint", ["styles"], function()
{
    return gulp.src("./css/*.css", {cwd: paths.dist})
    .pipe(csslint())
    .pipe(prefix("last 1 version"))
    .pipe(csslint.reporter());
});

gulp.task("imagemin", function()
{
    return gulp.src(["./images/**/*", "!./images/projects/**/*"], {cwd: paths.src})
    .pipe(changed("./images", {cwd: paths.dist}))
    .pipe(imagemin())
    .pipe(gulp.dest("./images", {cwd: paths.dist}));
});

gulp.task("styles", function()
{
    return gulp.src(paths.styles, {cwd: paths.src})
    .pipe(sass({ style: "compressed", loadPath: "node_modules/node-bourbon/assets/stylesheets/" }).on("error", gutil.log))
    .pipe(rename({ extname: ".min.css" }))
    .pipe(gulp.dest("./css/", {cwd: paths.dist}));
});

gulp.task("htmlvalidation", function()
{
    return gulp.src("./html/**/*.html", {cwd: paths.src})
    .pipe(minifyHTML())
    .pipe(gulp.dest("./", {cwd: paths.dist}));
});

gulp.task("htmlminification", function()
{
    return gulp.src("./html/**/*.html", {cwd: paths.src})
    .pipe(minifyHTML())
    .pipe(gulp.dest("./", {cwd: paths.dist}));
});

gulp.task("jadeTransform", function()
{
    return gulp.src(paths.templates, {cwd: paths.src})
    .pipe(jade())
    .pipe(gulp.dest("./", {cwd: paths.dist}));
});

gulp.task("prefixer", function()
{
    return gulp.src("./css", {cwd: paths.dist})
    .pipe(prefix())
    .pipe(gulp.dest("./css", {cwd: paths.dist}));
});

gulp.task("gulpvalidate", function()
{
    return gulp.src("./gulpfile.js")
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

gulp.task("copyJSLibs", function()
{
    return gulp.src(paths.libs, {cwd: paths.src})
    .pipe(gulp.dest("./js/libs", {cwd: paths.dist}));
});

gulp.task("scripts", function()
{
    return gulp.src(paths.scripts, {cwd: paths.src})
    .pipe(jshint(
            {
                curly: true,
                eqeqeq: true,
                forin: true,
                indent: true,
                newcap: true,
                latedef: true,
                nonew: true,
                quotmark: "double",
                trailing: true,
                maxcomplexity: 5,
                globals:
                {
                    jQuery: true
                }
            }
        ))
    .pipe(uglify({"report": "gzip", dead_code: false, quote_keys: true, mangle: {except:["jQuery"]}}))
    .pipe(rename({ extname: ".min.js" }))
    .pipe(gulp.dest("./js/", {cwd: paths.dist}));
});

gulp.task("clean", function()
{
        return gulp.src("./dist", {read: false})
        .pipe(clean());
});

gulp.task("generateChildren", function()
{
    exec("node src/templates/create.js");
});

gulp.task("generateFullPreviews", function()
{
    return gulp.src("./images/projects/**/*.{png,jpg}", { cwd: paths.src })
    .pipe(rename(function(path)
    {
        path.dirname += "/full";
        path.basename += "_Full";
    }))
    .pipe(imagemin())
    .pipe( gulp.dest("./images/projects", {cwd: paths.dist}) );
});

gulp.task("generateMediumPreviews", function()
{
    return gulp.src("./images/projects/**/*.{png,jpg}", { cwd: paths.src })
    .pipe(imageResize(
        {
            width: 700,
            height: 394,
            crop: false,
            upscale: false,
            imageMagick: true
        }))
    .pipe(imagemin())
    .pipe(rename(function(path)
    {
        path.dirname += "/medium";
        path.basename += "_Medium";
    }))
    .pipe( gulp.dest("./images/projects", {cwd: paths.dist}) )
    .pipe(imagemin());
});

gulp.task("copyResume", function()
{
   return gulp.src(paths.resume, {cwd: paths.src})
   .pipe(rename("MaglioMade_Resume.pdf"))
   .pipe(gulp.dest("./resume", {cwd: paths.dist}))
});

gulp.task("generateProjectImages", ["generateMediumPreviews", "generateFullPreviews"], function(){});

gulp.task("watch", function()
{
    gulp.watch("./sass/**/*.scss", {cwd: paths.src, read: false}, ["styles"]);
    // Should probably be moved to the deploy task once we move to a template
    gulp.watch("./html/**/*.html", {cwd: paths.src, read: false}, ["htmlminification"]);
    gulp.watch("./images/**/*", {cwd: paths.src, read: false}, ["imagemin"]);
    gulp.watch("./gulpfile.js", ["gulpvalidate"]);
    gulp.watch(paths.scripts, {cwd: paths.src, read: false}, ["scripts"]);
});
