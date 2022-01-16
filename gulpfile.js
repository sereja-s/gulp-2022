// Подключаем основные модули:
// импорируем gulp из пакета gulp:
import gulp from "gulp";
// импортируем константу path из файла path.js:
import { path } from "./gulp/config/path.js";
// импортруем общие плагины:
import { plugins } from "./gulp/config/plugins.js";

// Передаём значения в глобальную переменную для хранения общих сущностей:
global.app = {
	path: path,
	gulp: gulp,
	plugins: plugins
}


// импорт задач:
import { copy } from "./gulp/tasks/copy.js";
import { reset } from "./gulp/tasks/reset.js";
import { html } from "./gulp/tasks/html.js";
import { server } from "./gulp/tasks/server.js";
import { scss } from "./gulp/tasks/scss.js";
import { js } from "./gulp/tasks/js.js";


// функция, которая будет наблюдать за изменениями в файлах папки, путь к которой прописан в path.js:
function watcher() {
	// обратимся к соответствующей функции в gulp, в которую передадим путь к файлам за которыми нужно следить и действие(задачу) которое необходимо выполнить:
	gulp.watch(path.watch.files, copy);
	gulp.watch(path.watch.html, html);
	gulp.watch(path.watch.scss, scss);
	gulp.watch(path.watch.js, js);
}


// Пропишем основные задачи которые должны выполняться параллельно (обратимся к gulp и его функции parallel()):
const mainTasks = gulp.parallel(copy, html, scss, js);


// построение сценариев выполнения задач:
//обратимся к gulp и его методу для последовательного выполнения задач series() и укажем последовательно задачи(функции):
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));


// выполнение сценария по умолчанию:
gulp.task('default', dev);