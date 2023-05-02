const Joi = require('joi');

const nameSchema = Joi.string().min(5).required();

const quantitySchema = Joi.number().integer().min(1).required();

module.exports = { nameSchema, quantitySchema };