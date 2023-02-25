// controllers/users.ts
// это файл контроллеров
import { NextFunction, Request, Response } from "express";
import User from "../models/user";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"; // импортируем модуль
import { NotFoundError } from "../errors/not-found-err";

export const createUser = (req: Request, res: Response) => {
  const { name, about, avatar, email, password } = req.body;

  if (validator.isEmail(email) && password) {
    // хешируем пароль
    const hash = bcrypt.hashSync(password, 10);
    return User.create({ name, about, avatar, email, password: hash })
      .then((user) => res.send({ data: user }))
      .catch((err) => res.status(500).send({ message: err }));
  }

  return res.status(400).send({
    message: "Переданы некорректные данные при создании пользователя",
  });
};

export const getProfile = (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.params;

  return User.findById(userId)
    .then((user) => {
      if (!user) {
        // если такого пользователя нет,
        // сгенерируем исключение
        throw new NotFoundError('Нет пользователя с таким id');
      }
      res.send({ data: user });
    })
    .catch(next); // добавили catch
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
          return res
            .status(404)
            .send({ message: "Пользователь с указанным _id не найден" });
        }
        res.send({ data: user });
      })
      .catch((avatar) =>
        res.send({
          message:
            "Данные не прошли валидацию. Либо произошло что-то совсем немыслимое",
        })
      );
  }
  return res
    .status(400)
    .send({ message: "Переданы некорректные данные при обновлении аватара" });
};

export const login = (req: Request, res: Response) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      // создадим токен
      const token = jwt.sign(
        { _id: user._id },
        "some-secret-key",
        { expiresIn: "7d" } // токен будет просрочен через неделю после создания
      );

      // вернём токен
      res.send({ token });
    })
    .catch((err: any) => {
      res.status(401).send({ message: `Ошибка. ${err}` });
    });
};

export const getCurrentUser = (req: Request, res: Response) => {
  const { _id } = req.user
  return User.findById({ _id })
    .then((user) => {
      if (!user) {
        return res.send(404).send({ message: "Пользователь не найден" });
      }
      res.status(200).send({ user })
    })
    .catch((err) => res.status(500).send({ message: `Ошибка. ${err}` }));
}