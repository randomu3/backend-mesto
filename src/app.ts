import express, {
  NextFunction,
  Request,
  Response,
} from "express";
import mongoose, { CastError } from "mongoose";
import routerUsers from "./routes/users";
import routerCards from "./routes/cards";
import { createUser, login } from "./controllers/users";
import auth from "./middlewares/auth";
import { errors } from "celebrate";
import { requestLogger, errorLogger } from './middlewares/logger';

// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:27017/mestodb");
mongoose.set("strictQuery", true);

app.use(requestLogger); // подключаем логер запросов

// за ним идут все обработчики роутов

// auth
app.post("/signin", login);
app.post("/signup", createUser);

// авторизация
app.use(auth);

app.use("/cards", routerCards);
app.use("/users", routerUsers);

app.use(errorLogger); // подключаем логер ошибок

// обработчики ошибок
app.use(errors()); // обработчик ошибок celebrate

// наш централизованный обработчик
app.use(
  (
    err: { statusCode?: number; message: string },
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    // если у ошибки нет статуса, выставляем 500
    const { statusCode = 500, message } = err;

    res.status(statusCode).send({
      // проверяем статус и выставляем сообщение в зависимости от него
      message: statusCode === 500 ? "На сервере произошла ошибка" : message,
    });
  }
);

// app.use(express.static(path.join(__dirname, 'public')));
app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
