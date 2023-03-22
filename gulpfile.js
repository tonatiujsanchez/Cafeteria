
const { src, dest, watch, series } = require('gulp')

// SCSS - SASS
const sass = require('gulp-sass')(require('sass'))
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')

// IMAGES
const imagemin = require('gulp-imagemin')
const webp = require('gulp-webp')
const avif = require('gulp-avif')


const css = () => {

    return src('src/scss/app.scss')         // 1.- indentificar archivo
        .pipe( sass() )                     // 2.- Compilar
        .pipe( postcss([ autoprefixer ]) )  // 4.- Hacer campatible con navegadores
        .pipe( dest('build/css') )          // 3.- Guardar el .css 
}

const imagenes = () => {
    
    return src('src/img/**/*')
        .pipe( imagemin({ optimizationLavel: 3 }) )
        .pipe( dest('build/img') )
    
}

const imagenesWebp = () => {
    return src('src/img/**/*.{png,jpg,jpeg}')
        .pipe( webp() )
        .pipe( dest('build/img') )
}

const imagenesAvif = () => {
    return src('src/img/**/*.{png,jpg,jpeg}')
        .pipe( avif({ quality: 50 }) )
        .pipe( dest('build/img') )
}

const dev = () => {
    watch( 'src/scss/**/*.scss', css )
    // watch( 'src/img/**/*', imagenes )
}



exports.dev = dev
exports.css = css
exports.dev = dev
exports.imagenes = imagenes
exports.imagenesWebp = imagenesWebp
exports.imagenesAvif = imagenesAvif

exports.default = series(imagenes, imagenesWebp, imagenesAvif, css, dev)