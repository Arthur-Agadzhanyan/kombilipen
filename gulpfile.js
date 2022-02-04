let projectFolder = 'dist'; // папка в которой будет результат работы gulp
let sourceFolder = 'src'; // папка с исходниками

let fs = require("fs")

let path = { // содержит объекты которые будут содержать различные пути к файлам и папкам
    build: { // production версия
        html: projectFolder + '/',
        css: projectFolder + '/css/',
        js: projectFolder + '/js/',
        img: projectFolder + '/img/',
        fonts: projectFolder + '/fonts/'
    },

    src: { // исходники
        html: [sourceFolder + '/*.html', '!' + sourceFolder + '/_*.html'],// сначала мы просматриваем все файлы html , а потом исключаем те файлы, которые которые начинаются на _
        css: sourceFolder + '/scss/style.scss',// gulp будет обрабатывать только файл style.scss, а не все файлы находящиеся в папке scss
        js: sourceFolder + '/js/script.js',// gulp будет обрабатывать только файл script.js, а не все файлы находящиеся в папке js
        img: sourceFolder + '/img/**/*.{png,jpg,svg,webp,gif,ico}',// /**/ означает что мы будем просматривать не только контент в папке /img, но и контент внутри папок которые лежат в /img, *.{png,jpg,svg,webp,gif,ico} указывает на то, что мы просматриваем только файлы с расширениями png,jpg,svg,webp,gif,ico
        fonts: sourceFolder + '/fonts/*.ttf' // указывает на то, что мы просматриваем только файлы с расширением .ttf
    },

    watch: { // будем использовать для live reload
        html: sourceFolder + '/**/*.html',
        css: sourceFolder + '/scss/**/*.scss',
        js: sourceFolder + '/js/**/*.js',
        img: sourceFolder + '/img/**/*.{png,jpg,svg,webp,gif,ico}'
        // шрифты слушать постоянно нам не нужно
    },

    clean: `./${projectFolder}/`// отвечает за удаление папки в которой будет результат работы gulp, каждый раз когда мы будем запускать gulp
}

//создадим ряд переменных которые помогут в написании сценариев

let { src, dest } = require('gulp')
let gulp = require('gulp')
let browsersync = require('browser-sync').create()// переменная для плагина browser-sync
let fileInclude = require('gulp-file-include');// переменная для плагина gulp-file-include
let del = require('del')// переменная для плагина del

let scss = require('gulp-sass') // переменная для плагина gulp-sass
let autoprefixer = require('gulp-autoprefixer') // переменная для плагина gulp-autoprefixer
let mediaQueries = require('gulp-group-css-media-queries') // переменная для плагина gulp-group-css-media-queries
let cleanCss = require('gulp-clean-css') // переменная для плагина gulp-clean-css
let rename = require('gulp-rename') // переменная для плагина gulp-rename

let uglify = require('gulp-uglify-es').default // переменная плагина gulp-uglify-es

let imageMin = require('gulp-imagemin')
let webp = require('gulp-webp')
let webpHtml = require('gulp-webp-html')
let webpcss = require('gulp-webpcss')

let ttf2woff = require("gulp-ttf2woff")
let ttf2woff2 = require("gulp-ttf2woff2")
let fonter = require("gulp-fonter")

// устанавливаем плагин browser-sync для автоматической перезагрузки страницы======================================================
//npm i browser-sync --save-dev

const browserSync = () => {// создаем функцию которая будет обновлять страницу
    browsersync.init({// в объекте пишем настройки для плагина
        server: {
            baseDir: `./${projectFolder}/` // то же значение что и у переменной clean
        },
        port: 3000, // указываем порт по которому будет отрываться наш браузер 
        notify: false // убирает табличку которая показывает что браузер обновился (она может отвлекать)
    })
}

//устанавливаем плагин gulp-file-include для того чтобы подключать html файлы друг к другу (например кусок верстки header.html подключить к main.html чтобы добавить ) на самом деле он делает намного больше
//npm i gulp-file-include --save-dev


// pipe - это функция в которой мы можем задавать команды для gulp

//==================Html=======================
//чтобы нам не приходилось постоянно прописывать pictures и т.п. для того чтобы отобразить webp картинку мы установим плагин gulp-webp-html
//npm i --save-dev gulp-webp-html

function html() {// функция для работы с html файлами
    return src(path.src.html)// обращаемся к исходникам
        .pipe(fileInclude()) // gulp-file-include собирает файлы
        .pipe(webpHtml())
        .pipe(dest(path.build.html))// выгружаем исходники в результат
        .pipe(browsersync.stream())// нужно для того чтобы gulp обновил страницу
}

//==============Js===================
// устанавливаем плагин gulp-uglify-es который будет сжимать и оптимизировать js файлы
//npm i --save-dev gulp-uglify-es

function js() {// функция для работы с html файлами
    return src(path.src.js)// обращаемся к исходникам
        .pipe(fileInclude()) // gulp-file-include собирает файлы
        .pipe(dest(path.build.js))// выгружаем исходники в результат
        .pipe(browsersync.stream())
        .pipe(uglify()) // сжимает и оптимизирует файл js
        .pipe(rename({ // gulp-rename переименовывает сжатый выше файл
            extname: '.min.js'// переименовываем наш сжатый файл, и теперь у него в конце будет не ".css" a '.min.css', и он будет сохранен в отдельном файле
        }))
        .pipe(dest(path.build.js))
        .pipe(browsersync.stream())// нужно для того чтобы gulp обновил страницу
}

//===============Css==============================

// устанавливаем плагин gulp-sass для того, чтобы конвертировать scss в css
// npm i gulp-sass --save-dev

//устанавливаем плагин gulp-autoprefixer для того чтобы в стилях автоматически добавлялись префиксы для браузеров
//npm i gulp-autoprefixer --save-dev

//устанавливаем плагин gulp-group-css-media-queries для того, чтобы он собирал разбросанные по всему css файлу медиа запросы, группировал их, и ставил их в конец файла 
//npm i --save-dev gulp-group-css-media-queries

// устанавливаем плагин gulp-clean-css , который будет чистить и сжимать наш файл css на выходе
//npm i --save-dev gulp-clean-css
// Для более удобной работы с gulp-clean-css мы установим плагин gulp-rename, с помощью него мы сможем создать 2 файла стилей - 1 сжатый, другой Читаемый
//npm i --save-dev gulp-rename
// чтобы работать с webp в css мы скачали плагин gulp-webpcss
//npm i --save-dev gulp-webpcss

function css() { // функция для работы с css файлами
    return src(path.src.css)// обращаемся к исходникам

        .pipe(scss({// вклиниваем gulp-sass в работу и внутри объекта указываем настройки 
            outputStyle: 'expanded' // expanded указывает, что css файл не будет сжатым  
        }))
        .pipe(mediaQueries())// используем плагин gulp-group-css-media-queries
        .pipe(autoprefixer({// задаем настройки плагина gulp-autoprefixer
            overrideBrowserslist: ['last 5 versions'],// какие браузеры мы будем поддерживать
            cascade: true // мтиль написания (каскадный) лучше выбирать true
        }))
        .pipe(webpcss({ webpClass: '.webp', noWebpClass: '.no-webp' }))// используем плагин gulp-webpcss
        .pipe(dest(path.build.css))//перед тем как файл будет минифицирован (сжат) мы его выгружаем
        .pipe(browsersync.stream())//следим за обновлениями

        .pipe(cleanCss())//gulp-clean-css сжимает и минифицирует файл
        .pipe(rename({ // gulp-rename переименовывает сжатый выше файл
            extname: '.min.css'// переименовываем наш сжатый файл, и теперь у него в конце будет не ".css" a '.min.css', и он будет сохранен в отдельном файле
        }))
        .pipe(dest(path.build.css))// выгружаем сжатый файл, тем самым у нас теперь есть 2 файла стилей - 1 сжатый, другой Читаемый
        .pipe(browsersync.stream())//следим за обновлениями
}

//====Fonts=================
function fonts() {
    src(path.src.fonts)
        .pipe(ttf2woff())
        .pipe(dest(path.build.fonts))
    return src(path.src.fonts)
        .pipe(ttf2woff2())
        .pipe(dest(path.build.fonts))
}

//===Images===============
// устанаваливаем плагин gulp-imagemin, который будет сжимать картинки (желательно без потери качества)
//npm i --save-dev gulp-imagemin

// установим ряд плагинов для того чтобы конвертировать наши изображения в современный формат .webp: gulp-webp
//npm i --save-dev gulp-webp

function images() {// функция для работы с html файлами
    return src(path.src.img)// обращаемся к исходникам
        .pipe(webp({// конвертирует в webp
            quality: 70 // качество изображения
        }))
        .pipe(dest(path.build.img)) // выгружаем изображения webp
        .pipe(browsersync.stream())

        .pipe(src(path.src.img))
        .pipe(imageMin({ // используем и настраиваем плагин gulp-imagemin
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],// улучшена работа с svg 
            interlaced: true,
            optimizationLevel: 3 // 0 to 7 | указываем как сильно мы сжимаем изображения (чем сильнее сжатие, тем более страдает качество)
        }))
        .pipe(dest(path.build.img))// выгружаем сжатые изображения (для того чтобы использовать их в браузерах, которые не поддерживают webp)
        .pipe(browsersync.stream())// нужно для того чтобы gulp обновил страницу
}

//========Задачи=======================
gulp.task("otf2ttf", () => {
    return src([sourceFolder + '/fonts/*.otf'])
        .pipe(fonter({
            formats: ['ttf']
        }))
        .pipe(dest(sourceFolder + '/fonts/'))
})
//=================================

function fontsStyle(params) { // отвечает за запись и подключение шрифтов к файлу стилей
    let file_content = fs.readFileSync(sourceFolder + '/scss/fonts.scss');
    if (file_content == '') {
        fs.writeFile(sourceFolder + '/scss/fonts.scss', '', cb);
        return fs.readdir(path.build.fonts, function (err, items) {
            if (items) {
                let c_fontname;
                for (var i = 0; i < items.length; i++) {
                    let fontname = items[i].split('.');
                    fontname = fontname[0];
                    if (c_fontname != fontname) {
                        fs.appendFile(sourceFolder + '/scss/fonts.scss', '@include font("' + fontname + '", "' + fontname + '", "400", "normal");\r\n', cb);
                    }
                    c_fontname = fontname;
                }
            }
        })
    }
}

function cb() { // callback 

}

function watchFiles() { // это уже точно перезагрузка страницы
    gulp.watch([path.watch.html], html)// в массиве указываем пути к файлам за которыми хотим следить, вторым параметром указываем функцию которая будет обрабатывать файл
    gulp.watch([path.watch.css], css)
    gulp.watch([path.watch.js], js)
    gulp.watch([path.watch.img], images)

}

//устанавливаем плагин del для того чтобы удалять папку dist чтобы gulp мог создать обновлённую папку dist 
//npm i del --save-dev

function clean() {// функция которая с помощью плагина del будет удалять старую версию проекта
    return del(path.clean) // path.clean это путь который мы указали в объекте path
}
// gulp.series указывает, что файлы должны обработаться поочередно (в каком порядке будет указана в скобках)
// gulp.parallel указывает, что файлы должны обрабатываться одновременно
let build = gulp.series(clean, gulp.parallel(images, js, css, html, fonts),fontsStyle);// первая функция удаляет старую версию проекта, вторая одновременно обрабатывает файлы картинок,стилей,js,шрифтов и html
let watch = gulp.parallel(build, watchFiles, browserSync);

// нужно подружить gulp с нашими новыми переменными, для этого используем exports
exports.fontsStyle = fontsStyle;
exports.fonts = fonts;
exports.images = images;
exports.js = js;
exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch; // когда мы запускаем gulp, тогда будет выполняться переменная watch