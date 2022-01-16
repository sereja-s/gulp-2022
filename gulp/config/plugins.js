// подключим плагин gulp-replace (поиск и замена):
import replace from "gulp-replace";
// подключим плагин gulp-plumber (обработка ошибок):
import plumber from "gulp-plumber";
// подключим плагин gulp-notify (сообщения(подсказки)):
import notify from "gulp-notify";
// подключим плагин browser-sync (открывает браузер(обновляет автоматически)):
import browsersync from "browser-sync";

// создадим и экспортируем (для использования в других файлах) объект, в который будем собирать общие плагины:
export const plugins = {
	replace: replace,
	plumber: plumber,
	notify: notify,
	browsersync: browsersync
}
