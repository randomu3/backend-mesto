import { celebrate, Joi } from "celebrate"

export const validateUpdateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required()
  })
})

export const validateUpdateAvatar = celebrate({
  body: Joi.object().keys({
    link: Joi.string().required()
  })
})

export const validateGetProfile = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required()
  })
})