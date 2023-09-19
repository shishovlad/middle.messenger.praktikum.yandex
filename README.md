# Учебный проект «Мессенджер»

Проект первого модуля курса.

## Демо

[https://mellow-beijinho-28b03d.netlify.app/](https://mellow-beijinho-28b03d.netlify.app/)

### Страницы

- [Авторизация](https://mellow-beijinho-28b03d.netlify.app/)
- [Регистрация](https://mellow-beijinho-28b03d.netlify.app/sign-up)
- [Мессенджер](https://mellow-beijinho-28b03d.netlify.app/messenger)
- [Настройки профиля](https://mellow-beijinho-28b03d.netlify.app/settings)
- [404 ошибка](https://mellow-beijinho-28b03d.netlify.app/anything) — любой `slug`, которого нет в `Routes`
- [500 ошибка](https://mellow-beijinho-28b03d.netlify.app/) — _не было реализовано в рамках текущего спринта_

## Установка

Убедитесь в том, что установлены зависимости:

```bash
npm install
```

## Development

Запустите сервер разработки http://localhost:3000

```bash
npm run dev
```

## Production

Соберите приложение для продакшн версии:

```bash
npm run build
```

## Development server

Вы можете локально запустить продакшн версию сборки. Для этого соберите приложение, а затем запустите раздачу статики выполнив всего одну команду.

```bash
npm run start
```

## Материалы

- Макет: [Figma](https://www.figma.com/file/y7OIiC2xrD8O8ZeVR10SXf/middle.messenger.praktikum.yandex?type=design&node-id=0-1&mode=design&t=jQaFdcBYxp2ZJ8iP-0)
- Шаблонизатор: [handlebars](https://handlebarsjs.com/)
- Плагин шаблонизатора для сборщика: [vite-plugin-handlebars](https://www.npmjs.com/package/vite-plugin-handlebars)

## Инструменты

- TypeScript
- Eslint
- Prettier
- SlyleLint
- Postcss
