# Dead Battery Diary ♡

Дневник выбора телефона в эстетике ЛиРу: чёрные сердечки, бумажные карточки и понятное сравнение камер и автономности.

Статический сайт для GitHub Pages. Бюджет — примерно 40 000 ₽, максимум 50 000 ₽. Подборка и цены проверены **13 ноября 2026 года**. Цены за указанные версии, обычно при оплате наличными, без доставки; уточнения есть в каждой карточке.

## Что внутри

- Девять моделей: Samsung, Google Pixel, OnePlus, vivo, Xiaomi и Nothing.
- Фильтры по сценарию съёмки и бюджету 40 / 50 тысяч.
- Избранное сохраняется только в браузере через localStorage.
- Сравнение всех моделей или выбранных телефонов.
- Источники характеристик, обзоров, цен и фотографий в карточках и внизу страницы.
- Адаптивная вёрстка, клавиатурная навигация, поддержка prefers-reduced-motion.

## Краткое сравнение

| Телефон | Память | Проверенная цена | Основной компромисс |
| --- | --- | ---: | --- |
| [Samsung Galaxy S26 FE](https://manyphone.ru/catalog/smartfony/samsung/samsung-galaxy-s26-fe/) | 8/256 ГБ | 45 990 ₽ | По автономности уступает OnePlus. Адаптер отдельно. |
| [Google Pixel 10a](https://desota.ru/catalog/pixel_10/smartfon_google_pixel_10a_256gb_obsidian/) | 8/256 ГБ | 44 980 ₽ | Камера близка к 9a. Полная зарядка в тесте — около 1 5 часа. |
| [OnePlus 15R](https://technolider24.ru/catalog/oneplus-15r-256gb-black/) | 12/256 ГБ | 49 990 ₽ | 49 990 ₽ только при подходящей оплате и самовывозе. Нет адаптера. |
| [vivo V70](https://gix.ru/catalog/smartfony-vivo/smartfon_vivo_v70_8_256gb_grey/) | 8/256 ГБ | 39 290 ₽ | Фронтальное 4K без стабилизации по тесту Sulit. |
| [OnePlus Nord 6](https://msk-katalog.ru/smartfony/oneplus/oneplus-nord-6/) | 8/256 ГБ | 38 830 ₽ | Фронтальный 4K может заметно трястись. Проверь регион. |
| [Xiaomi 17T](https://techmart.ru/smartfony_na_android/smartfony_xiaomi/xiaomi_17/smartfon_xiaomi_17t_12_256_gb_chyornyj) | 12/256 ГБ | 43 900 ₽ | Фронталка заметно скромнее задних камер. |
| [Nothing Phone (3)](https://biggeek.ru/products/smartfon-nothing-phone-3-12-plus-256-gb-black) | 12/256 ГБ | 44 490 ₽ | Средняя автономность  нагрев при продолжительной съёмке. |
| [Google Pixel 9](https://xn--80aaibtga0ao6a.xn--p1ai/item/smartfon-google-pixel-9-12-128-gb-chyornyy-obsidian-globalnaya-versiya) | 12/128 ГБ | 47 800 ₽ | 128 ГБ потребуют чаще выгружать исходники. |
| [Google Pixel 9a](https://msk-katalog.ru/smartfony/googleb/google-pixel/google-pixel-9a/) | 8/256 ГБ | 39 259 ₽ | Ночью основное видео мягче  чем у Pixel 9. Зарядка неспешная. |

## Уточнения к выбору

Режимы видео относятся к штатной камере телефона. Поведение камеры внутри TikTok отдельно не тестировалось. Показатели GSMArena Active Use — результаты смешанного теста, а не длительность непрерывной записи видео. Рекомендации основаны на перечисленных обзорах; одинакового собственного тестирования всех устройств не проводилось.

## Структура

- `index.html` — обложка, разделы, сравнение и источники.
- `styles.css` — оформление и адаптивная вёрстка.
- `phones.js` — данные девяти телефонов: цены, версии, выводы, ссылки.
- `app.js` — карточки, фильтры, избранное и сравнение.
- `assets/` — локальные фотографии, SVG-декор и шрифты.

## Публикация и редактирование

GitHub Pages: **Settings → Pages → Deploy from a branch → main → / (root)**. Сборка не нужна; все пути относительные, поэтому сайт работает в каталоге `/phonechoice/`.

Для локального просмотра достаточно любого статического HTTP-сервера из корня репозитория. Чтобы обновить предложение, измените запись в `phones.js`, укажите дату проверки на странице и сверьте комплектацию с конкретным магазином.

## Источники и права

Фото устройств принадлежат производителям и соответствующим магазинам. Ссылки на страницы-источники приведены в `assets/image-sources.json` и на сайте. Цвета и конфигурации фотографий могут отличаться от описанного предложения; изображение иллюстрирует модель устройства. Партнёрских ссылок и аналитических счётчиков нет.

Шрифты Cormorant Garamond, Golos Text и Marck Script получены из [Google Fonts](https://github.com/google/fonts). Их локальные версии содержат латиницу, кириллицу и основные знаки; лицензии SIL Open Font License находятся в `assets/fonts/*-OFL.txt`.

### Обзоры по моделям

#### Samsung Galaxy S26 FE

- https://www.sammobile.com/samsung/galaxy-s26-fe/review/
- https://www.91mobiles.com/reviews/samsung-galaxy-s26-fe-review/
- https://www.gsmarena.com/samsung_galaxy_s26_fe-review-2999p3.php

#### Google Pixel 10a

- https://www.gsmarena.com/google_pixel_10a_vs_google_pixel_9a_review_battery_camera_price_compared-news-72523.php
- https://www.gsmarena.com/google_pixel_10a-review-2943p3.php

#### OnePlus 15R

- https://www.oneplus.com/us/15r/specs
- https://www.smartprix.com/bytes/oneplus-15r-camera-review/
- https://www.ixbt.com/mobile/oneplus-nord-6-review.html
- https://www.slashgear.com/2053867/oneplus-15r-review/

#### vivo V70

- https://www.vivo.com/ru/products/param/v70
- https://www.sulittechreviews.com/phones/parang-flagship-na-tong-vivo-v70/
- https://www.ixbt.com/mobile/vivo-v70-review.html

#### OnePlus Nord 6

- https://www.oneplus.in/oneplus-nord-6?sku=5011118854
- https://www.smartzone.de/oneplus-nord-6-im-test/
- https://www.ixbt.com/mobile/oneplus-nord-6-review.html

#### Xiaomi 17T

- https://www.mi.com/global/product/xiaomi-17t/specs/
- https://www.smartzone.de/xiaomi-17t-test/

#### Nothing Phone (3)

- https://www.phonearena.com/reviews/nothing-phone-3-review_id7482
- https://www.gsmarena.com/nothing_phone_3-review-2853.php
- https://www.androidcentral.com/phones/nothing-phones/nothing-phone-3-review
- https://www.91mobiles.com/reviews/nothing-phone-3-long-term-review/

#### Google Pixel 9

- https://www.gsmarena.com/google_pixel_9a_vs_pixel_9_review_battery_camera_price_compared-news-68194.php
- https://www.phonearena.com/news/pixel-9-camera_id160455

#### Google Pixel 9a

- https://www.gsmarena.com/google_pixel_9a_vs_pixel_9_review_battery_camera_price_compared-news-68194.php
- https://www.gsmarena.com/google_pixel_10a_vs_google_pixel_9a_review_battery_camera_price_compared-news-72523.php
