// Задача: преобразование файлов scss в css

// подключим плагин sass (препроцессор):
import dartSass from "sass";
// подключим плагин gulp-sass (подключает препроцессор):
import gulpSass from "gulp-sass";
// подключим плагин gulp-sass (меняет имя файла):
import rename from "gulp-rename";

import cleanCss from "gulp-clean-css"; // cсжатие css-файла
import webpcss from "gulp-webpcss"; // вывод webp-изображений
import autoprefixer from "gulp-autoprefixer"; // добавление вендорных префиксов
import groupCssMediaQueries from "gulp-group-css-media-queries"; // группировка медиа-запросов

const sass = gulpSass(dartSass)

// создадим и экспортируем (для использования в других файлах) функцию scss для выполнения задачи:
export const scss = () => {
	return app.gulp.src(app.path.src.scss, { sourcemaps: true })
		// пропишем действиея:
		// обработка ошибок и вывод сообщений(подсказок):
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: "SCSS",
				message: "Error: <%= error.message %>"
			})
		))
		// поиск и замена (здесь- исправление путей к картинкам в результате):
		.pipe(app.plugins.replace(/@img\//g, '../img/'))
		//вызываем компилятор:
		.pipe(sass({
			outputStyle: 'expanded' // изначальный стиль готового файла
		}))
		.pipe(groupCssMediaQueries())
		.pipe(webpcss(
			{
				// webp-изображения подключаются только если браузер их потдерживает:
				webpClass: ".webp",
				noWebpClass: ".no-webp"
			}
		))
		.pipe(autoprefixer(
			{
				grid: true,
				overrideBrowserslist: ["last 3 versions"],
				cascade: true
			}
		))
		// перенос файлов по указанному пути с помощъю метода dest() до того как css-файл будет сжат:
		.pipe(app.gulp.dest(app.path.build.css))
		.pipe(cleanCss())
		//меняем имя файла:
		.pipe(rename({
			extname: ".min.css"
		}))
		// перенос css-файлов по указанному пути с помощъю метода dest() после сжатия:
		.pipe(app.gulp.dest(app.path.build.css))
		// автоматическое обновление браузера после переноса файлов в папку с результатом:
		.pipe(app.plugins.browsersync.stream());
}