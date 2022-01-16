// получаем имя папки проекта (импортируем модуль path с помощью синтаксиса ES6 (т.к. у нас подключен в файле package.json: "type": "module")):
import * as nodePath from 'path';
// с помощью полученного модуля path, получаем имя папки проекта:
const rootFolder = nodePath.basename(nodePath.resolve());


// путь к папке с результатом (будет создаваться автоматически):
const buildFolder = `./dist`; // в качестве названия папки можно использовать имя папки проекта: rootFolder
// путь к папке с исходниками:
const srcFolder = `./src`;


// создадим общий объект path, в котором будет храниться вся информация о путях к файлам b экспортируем её (что бы использоввать её в других файлах):
export const path = {
	// основные объекты:
	// указываем путь к папке в которую мы хотим пренести скопированные файлы (папка с результатами):
	build: {
		js: `${buildFolder}/js/`,
		css: `${buildFolder}/css/`,
		html: `${buildFolder}/`,
		files: `${buildFolder}/files/`,
	},
	// указываем путь к папке с файлами которые мы хотим копировать (исходники):
	src: {
		js: `${srcFolder}/js/app.js`,
		scss: `${srcFolder}/scss/style.scss`,
		html: `${srcFolder}/*.html`, // смотрим (копируем) только за файлами html в корне исходников (у нас- index.html)
		files: `${srcFolder}/files/**/*.*`,
	},
	// указываем путь к папке с файлами за которыми надо следить:
	watch: {
		js: `${srcFolder}/js/**/*.js`,
		scss: `${srcFolder}/scss/**/*.scss`,
		html: `${srcFolder}/**/*.html`, // наблюдаем за изменениями за всеми файлами html во всех папках в исходниках
		files: `${srcFolder}/files/**/*.*`,
	},
	// отдельные свойства:
	clean: buildFolder,
	buildFolder: buildFolder,
	srcFolder: srcFolder,
	rootFolder: rootFolder,
	ftp: ``
}