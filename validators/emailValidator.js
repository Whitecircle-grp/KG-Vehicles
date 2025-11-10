const Joi = require("joi");

exports.emailValidation = Joi.object({
  email: Joi.string().email().required()
});
