# Go-ToDo: Full-Stack Todo App

![App screenshot #1][screenshot_1]
![App screenshot #2][screenshot_2]

[screenshot_1]: docs/images/ui_1.png
[screenshot_2]: docs/images/ui_2.png

## 📝 Описание

Go-ToDo — это небольшой pet-проект для управления задачами с интерфейсом на React и высокопроизводительным бэкендом на Go. Проект использует MongoDB для хранения данных и предоставляет интерфейс для создания и отслеживания задач на день.

## 🚀 Используемый стек технологий

### Backend

* Go (Golang).
* Air - Live reload для разработки.
* Fiber - Быстрый веб-фреймворк для REST API.
* MongoDB - NoSQL СУБД для хранения задач.

### Frontend

* TypeScript (TS).
* React - Библиотека для построения интерактивных веб-интерфейсов
* Vite - Сборщик проекта
* ChakraUI - UI библиотека готовых компонентов
* Lucide icons - Иконки для веб-интерфейса
* TanStack React Query - HTTP запросы к REST API

## ⚙️ Установка и запуск

### Требования

* Go
* Node.js
* Docker (docker-compose)

### 1. Клонирование репозитория

```bash
git clone https://github.com/KTemka1234/Go-ToDo.git
cd Go-ToDo
```

### 2. Настройка окружения

Создайте файл переменных среды **.env** в корне проекта на основе файла [example.env](example.env):

```bash
BACKEND_PORT=3000
VITE_PORT=5173

VITE_API_URL=http://localhost:3000/api

FRONTEND_URL=http://localhost:5173

MONGODB_URI=mongodb://user:password@mongodb:27017
# Если запуск без Docker: mongodb://user:password@localhost:27017

# При изменении данных нужно также измениить MONGODB_URI
MONGODB_USER=user
MONGODB_PASSWORD=password

MONGODB_EXPRESS_USER=user
MONGODB_EXPRESS_PASSWORD=password
```

### 3. Запуск через docker-compose

```bash
docker-compose up -d
```

### 4. Ручной запуск
Перед запуском программы убедитесь, что у вас есть доступ к MongoDB, а также проверьте в файле *.env* URI подключения к СУБД.

**Backend**

```bash
go mod download
air
```

**Frontend**

```bash
cd client
npm install
npm run dev
```

## 🌐 Доступ к приложению

* **Frontend**: http://localhost:5173 (порт задаётся в файле *.env*)
* **Backend API**: http://localhost:3000 (порт задаётся в файле *.env*)
* **Mongo Express**: http://localhost:8081

## 📜 License

MIT License. Подробнее см. в файле [LICENSE](LICENSE).