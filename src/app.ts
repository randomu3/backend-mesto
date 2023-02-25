import express from "express";
import mongoose from "mongoose";
import routerUsers from "./routes/users";
import routerCards from "./routes/cards";
// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:27017/mestodb");

app.use((req, res, next) => {
  req.user = {
    _id: "63f8e330675348ce43a21aa5", // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});

app.use("/cards", routerCards);
app.use("/users", routerUsers);

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});

// 63f8e330675348ce43a21aa5
