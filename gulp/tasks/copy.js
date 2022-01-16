// задача: копирование файлов

// создадим и экспортируем (для использования в других файлах) функцию copy для выполнения задачи:
export const copy = () => {
	// функция возвращает: обращаемся к глобальной переменной app, там ищем gulp, у которого есть метод src(), который получает доступ к файлам и папкам по указанному пути (пути у нас уже настроены в path.js):
	return app.gulp.src(app.path.src.files)
		// пропишем действие:
		// перенос файлов по указанному пути с помощъю метода dest():
		.pipe(app.gulp.dest(app.path.build.files))
}