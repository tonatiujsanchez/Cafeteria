
const { src, dest, watch, series } = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')


const css = ( done ) => {

    src('src/scss/app.scss')                // 1.- indentificar archivo
        .pipe( sass() )                     // 2.- Compilar
        .pipe( postcss([ autoprefixer ]) )  // 4.- Hacer campatible con navegadores
        .pipe( dest('build/css') )          // 3.- Guardar el .css 

    done()
}

const dev = () => {
    watch( 'src/scss/**/*.scss', css )
    watch( 'src/scss/app.scss', css )
}



exports.css = css
exports.dev = dev

exports.default = series(css, dev)