// controllers/users.ts
// это файл контроллеров
import { Request, Response } from "express";
import User from "../models/user";

export const createUser = (req: Request, res: Response) => {
  const { name, about, avatar } = req.body;
  if (name && about && avatar) {
    return User.create({ name, about, avatar })
      .then((user) => res.send({ data: user }))
      .catch((err) => res.status(500).send({ message: "Произошла ошибка" }));
  }
  return res.status(400).send({
    message: "Переданы некорректные данные при создании пользователя",
  });
};

export const getUser = (req: Request, res: Response) => {
  const { userId } = req.params;

  return User.findById(userId)
    .then((user) => {
      if (!user) {
        return res
          .status(404)
          .send({ message: "Пользователь по указанному _id не найден" });
      }
      res.send({ data: user });
    })
    .catch((err) => res.status(500).send({ message: "Ошибка по умолчанию" }));
};

export const getUsers = (req: Request, res: Response) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => res.status(500).send({ message: "Произошла ошибка" }));
};

export const updateUser = (req: Request, res: Response) => {
  const { _id } = req.user;
  const { name, about } = req.body;

  if (name && about) {
    return User.findByIdAndUpdate(
      _id,
      { name: name, about: about },
      // Передадим объект опций:
      {
        new: true, // обработчик then получит на вход обновлённую запись
        runValidators: true, // данные будут валидированы перед изменением
        upsert: true, // если пользователь не найден, он будет создан
      }
    )
      .then((user) => {
        if (!user) {
          return res
            .status(404)
            .send({ message: "Пользователь с указанным _id не найден" });
        }
        res.send({ data: user });
      })
      .catch((user) =>
        res.send({
          message:
            "Данные не прошли валидацию. Либо произошло что-то совсем немыслимое",
        })
      );
  }
  return res
    .status(400)
    .send({ message: "Переданы некорректные данные при обновлении профиля" });
};

export const updateAvatar = (req: Request, res: Response) => {
  const { _id } = req.user;
  const { link } = req.body;

  if (_id && link) {
    return User.findByIdAndUpdate(
      _id,
      { link: link },
      // Передадим объект опций:
      {
        new: true, // обработчик then получит на вход обновлённую запись
        runValidators: true, // данные будут валидированы перед изменением
        upsert: true, // если пользователь не найден, он будет создан
      }
    )
      .then((user) => {
        if (!user) {
          return res.status(404).send({ message: "Пользователь с указанным _id не найден" });
        }
        res.send({ data: user })
      })
      .catch((avatar) =>
        res.send({
          message:
            "Данные не прошли валидацию. Либо произошло что-то совсем немыслимое",
        })
      );
  }
  return res.status(400).send({ message: "Переданы некорректные данные при обновлении аватара" })
};
