const express = require('express');
const morgan = require('morgan');
const cookieParser = require("cookie-parser");
const cors = require("cors");
const removeHeader = require("../middleware/removeHeader");

const serverConfig = (app) => {

  // CORS
  app.use(
    cors({
      origin: ["http://localhost:5173"],
      optionsSuccessStatus: 200,
      credentials: true
    })
  );
    
  // погран. служба / парсит тело из формы
  app.use(express.urlencoded({ extended: true }))

  // погран. служба регистрации / парсит JSON
  app.use(express.json())
  app.use(cookieParser());
  app.use(morgan('dev'));
  app.use(removeHeader)
}

module.exports = serverConfig;