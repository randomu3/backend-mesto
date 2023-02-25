import { celebrate, Joi } from "celebrate";

export const validateCreateCards = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string()
      .required()
      .regex(
        /^(http|https):\/\/(?:www\.)?[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]+(?:#\w*)?$/
      ),
  }),
});

export const valdateDelCard = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required(),
  }),
});

export const valdateLikeCard = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required(),
  }),
});

export const valdateDislikeCard = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required(),
  }),
});
