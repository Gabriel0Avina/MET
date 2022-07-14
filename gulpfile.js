const {src, dest, watch, parallel } = require("gulp");
const sass = require("gulp-sass")(require('sass'));
const plumber = require('gulp-plumber');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');

//imagenes

const webp = require('gulp-webp');

//javascript

const terser = require('gulp-terser-js');

function css(done){
    
    src('src/scss/**/*.scss')//identificar  el archivo de SASS
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(sass())//Compilarlo
    .pipe(postcss([autoprefixer(), cssnano() ]))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('build/css'));//almacenarlo en el disco duro 

    done();//callcaback que avisa a gulp cuando llegamos al final 
}

function versionWebp(done){

    const opciones = {
        quality:50
    };

    src('src/img/**/*.{png,jpg}')
    .pipe(webp(opciones))
    .pipe(dest('build/img'))

    done()
}

function javascript(done){
    src('src/js/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(terser())
    .pipe(sourcemaps.write('.'))
    .pipe(dest('build/js'));

    done();
}

function dev(done){

    watch('src/scss/**/*.scss',css);
    watch('src/js/**/*.js',javascript);
    done();
}

exports.css = css;
exports.javascript = javascript;
exports.versionWebp= versionWebp;
exports.dev = parallel( versionWebp, javascript, dev) ;