// middlewares/logger.ts

import winston from "winston";
import expressWinston from "express-winston";

// создадим логер запросов
export const requestLogger = expressWinston.logger({
  transports: [new winston.transports.File({ filename: "request.log" })],
  format: winston.format.json(),
});

// логер ошибок
export const errorLogger = expressWinston.errorLogger({
  transports: [
    // этот транспорт будет собирать только ошибки
    new winston.transports.File({ filename: "error.log" }),
  ],
  format: winston.format.json(),
});
