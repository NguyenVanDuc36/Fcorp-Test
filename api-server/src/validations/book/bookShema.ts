const Joi = require('joi')
    .extend(require('@joi/date'));

export const createBookSchema = {
  body: Joi.object({
    name: Joi.string().required(),
    author: Joi.string().required(),
    publishedDate: Joi.date().format("YYYY-MM-DD").required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
  })
};

export const updateBookSchema = {
  body: Joi.object({
    name: Joi.string(),
    author: Joi.string(),
    publishedDate: Joi.date().format('YYYY-MM-DD'),
    description: Joi.string(),
    price: Joi.number(),
  })
};
