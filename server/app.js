require('dotenv').config()
const express = require('express');
const serverConfig = require('./config/serverConfig');
const indexRouter = require('./routes/index.routes');

const app = express();
const PORT = process.env.PORT || 4000;

// конфигурация сервера
serverConfig(app)

// маршрутизация
app.use('/', indexRouter)

// запускаю прослушивание сервера на 3000 порту
app.listen(PORT, () => console.log(`Server started at ${PORT} port`))
