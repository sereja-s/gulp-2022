// Задача: работа со шрифтами:

import fs from "fs"; // плагин node для работы с файловой системой (уже есть)
import fonter from "gulp-fonter"; // преобразование шрифтов в форматы ttf и woff
import ttf2woff2 from "gulp-ttf2woff2"; // преобразование шрифтов в форматы ttf2 и woff2

// создадим и экспортируем (для использования в других файлах) функцию otfToTtf для выполнения задачи:
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

// создадим и экспортируем для использования в других файлах функцию ttfToWoff для выполнения задачи:
export const ttfToWoff = () => {
	// ищем файлы шрифтов .ttf:
	return app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`, {})
		// пропишем действия:
		// обработка ошибок и вывод сообщений(подсказок):
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: "FONTS",
				message: "Error: <%= error.message %>"
			})
		))
		// конвертируем в .woff:
		.pipe(fonter(
			{
				formats: ['woff']
			}
		))
		// выгружаем в папку с результатом:
		.pipe(app.gulp.dest(`${app.path.build.fonts}`))
		//ищем файлы шрифтов .ttf:
		.pipe(app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`))
		// конвертируем в .woff2:
		.pipe(ttf2woff2())
		// выгружаем в папку с результатом:
		.pipe(app.gulp.dest(`${app.path.build.fonts}`));
}

// Запись подключения файлов шрифтов в файл стилей:
export const fontsStyle = () => {
	// файл стилей подклбччения шрифтов:
	let fontsFile = `${app.path.srcFolder}/scss/fonts.scss`;
	// проверяем существуют ли файлы шрифтов: 
	fs.readdir(app.path.build.fonts, function (err, fontsFiles) {
		if (fontsFiles) {
			// проверяем существует ли файл стилей для подключения шрифтов:
			let fontsFile = `${app.path.srcFolder}/scss/fonts.scss`;
			if (!fs.existsSync(fontsFile)) {
				// если файла нет, создаём его:
				fs.writeFile(fontsFile, '', cb);
				let newFileOnly;
				for (let i = 0; i < fontsFiles.length; index++) {
					// записываем подключения файлов шрифтов в файл стилей:
					let fontFileName = fontsFiles[i].split('.')[0];
					if (newFileOnly !== fontFileName) {
						let fontName = fontFileName.split('-')[0] ? fontFileName.split('-')[0] : fontFileName;
						let fontWeight = fontFileName.split('-')[1] ? fontFileName.split('-')[1] : fontFileName;
						if (fontWeight.toLowerCase() === 'thin') {
							fontWeight = 100;
						} else if (fontWeight.toLowerCase() === 'extralight') {
							fontWeight = 200;
						} else if (fontWeight.toLowerCase() === 'light') {
							fontWeight = 300;
						} else if (fontWeight.toLowerCase() === 'medium') {
							fontWeight = 500;
						} else if (fontWeight.toLowerCase() === 'semibold') {
							fontWeight = 600;
						} else if (fontWeight.toLowerCase() === 'bold') {
							fontWeight = 700;
						} else if (fontWeight.toLowerCase() === 'extrabold' || fontWeight.toLowerCase() === 'heavy') {
							fontWeight = 800;
						} else if (fontWeight.toLowerCase() === 'black') {
							fontWeight = 900;
						} else {
							fontWeight = 400;
						}
						//Полный вариант
						// fs.appendFile(fontsFile, 
						//   `@font-face {
						//     font-family: ${fontName};
						//     font-display: swap;
						//     src: url("../fonts/${fontFileName}.woff2") format("woff2"), url("../fonts/${fontFileName}.woff") format("woff");
						//     font-weight: ${fontWeight};
						//     font-style: normal;
						//   }\r\n`, cb);
						//Сокращённый вариант, надо подключать сокращённый вариант
						fs.appendFile(fontsFile, `@font-face {\n\tfont-family: ${fontName};\n\tfont-display: swap;\n\tsrc: url("../fonts/${fontFileName}.woff2") format("woff2"), url("../fonts/${fontFileName}.woff") format("woff");\n\tfont-weight: ${fontWeight};\n\tfont-style: normal;\n}\r\n`, cb)
						newFileOnly = fontFileName;
					}
				}
			} else {
				console.log("Файл scss/fonts.scss уже существует. Для обновления файла нужно его удалить");
			}
		}
	});

	return app.gulp.src(`${app.path.srcFolder}`);
	function cb() { }
}

