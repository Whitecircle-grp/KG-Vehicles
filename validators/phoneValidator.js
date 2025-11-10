const Joi = require("joi");

exports.phoneValidation = Joi.object({
  phone: Joi.string()
    .pattern(/^\+\d{10,15}$/)
    .required()
    .messages({
      "string.pattern.base": "Phone number must be in international format, e.g. +919876543210",
      "string.empty": "Phone number is required",
    }),
});

