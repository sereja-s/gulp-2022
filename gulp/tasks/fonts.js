// Задача: работа со шрифтами:

import fs from "fs"; // плагин node для работы с файловой системой (уже есть)
import fonter from "gulp-fonter"; // преобразование шрифтов в форматы ttf и woff
import ttf2woff2 from "gulp-ttf2woff2"; // преобразование шрифтов в форматы ttf2 и woff2

// создадим и экспортируем (для использования в других файлах) функцию images для выполнения задачи:
export const otfToTtf = () => {
	// ищем файлы шрифтов .otf:
	return app.gulp.src(`${app.path.srcFolder}/fonts/*.otf`, {})
		// пропишем действия:
		// обработка ошибок и вывод сообщений(подсказок):
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: "FONTS",
				message: "Error: <%= error.message %>"
			})
		))
		// конвертируем в .ttf:
		.pipe(fonter(
			{
				formats: ['ttf']
			}
		))
		// выгружаем в исходную папку:
		.pipe(app.gulp.dest(`${app.path.srcFolder}/fonts/`))
}