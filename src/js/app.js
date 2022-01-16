// Импортируем все функции из файла functions.js по указанному адресу:
import * as flsFunctions from "./modules/functions.js";

flsFunctions.isWebp();

// подключение Swiper-слайдера:
import Swiper, { Navigation, Pagination } from 'swiper';

// инициализация Swiper:
const swiper = new Swiper();