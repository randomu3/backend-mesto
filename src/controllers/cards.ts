// controllers/cards.ts
// это файл контроллеров
import { Request, Response } from "express";
import Card from "../models/card";
import { celebrate, Joi } from "celebrate";

export const createCard = (req: Request, res: Response) => {
  const { name, link } = req.body;
  const { _id } = req.user;

  if (name && link) {
    return Card.create({ name, link, owner: _id /* используем req.user */ })
      .then((card) => res.send({ data: card }))
      .catch((err) => res.status(500).send({ message: "Произошла ошибка" }));
  }
  return res
    .status(400)
    .send({ message: "Переданы некорректные данные при создании карточки" });
};

export const delCard = (req: Request, res: Response) => {
  const { cardId } = req.params;

  return Card.findByIdAndRemove(cardId)
    .then((card) => {
      if (!card) {
        return res
          .status(404)
          .send({ message: "Карточка с указанным _id не найдена" });
      }
      if (card.owner.toString() !== req.user._id)
        return res.status(404).send({
          message: "Нельзя удалить чужую карточку",
        });
      res.status(200).send({ data: card, message: "Карточка успешно удалена" });
    })
    .catch((err) =>
      res
        .status(500)
        .send({ message: "Что-то на сервере с карточкой пошло не так" })
    );
};

export const getCards = (req: Request, res: Response) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => res.status(500).send({ message: "Произошла ошибка" }));
};

export const likeCard = (req: Request, res: Response) => {
  const { cardId } = req.params;
  const { _id } = req.user;

  if (cardId && _id) {
    return Card.findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: _id } }, // добавить _id в массив, если его там нет
      { new: true }
    )
      .then((_id) => {
        if (!_id) {
          return res
            .status(404)
            .send({ message: "Передан несуществующий _id карточки" });
        }
        res.status(200).send({ message: "Лайк поставлен успешно" });
      })
      .catch((err) => res.status(500).send({ message: `Ошибка. ${err}` }));
  }
  return res.status(400).send({
    message: "Переданы некорректные данные для постановки/снятии лайка",
  });
};

export const dislikeCard = (req: Request, res: Response) => {
  const { cardId } = req.params;
  const { _id } = req.user;

  if (cardId && _id) {
    return Card.findByIdAndUpdate(
      cardId,
      { $pull: { likes: _id } }, // добавить _id в массив, если его там нет
      { new: true }
    )
      .then((_id) => {
        if (!_id) {
          return res
            .status(404)
            .send({ message: "Передан несуществующий _id карточки" });
        }
        res.status(200).send({ message: "Лайк убран успешно" });
      })
      .catch((err) => res.status(500).send({ message: "Ошибка по умолчанию" }));
  }
  return res.status(400).send({
    message: "Переданы некорректные данные для постановки/снятии лайка",
  });
};
