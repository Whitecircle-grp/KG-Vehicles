const Joi = require("joi");

exports.vehicleValidation = Joi.object({
  vehicleNumber: Joi.string().required(),
  ownerName: Joi.string().required(),
  vehicleType: Joi.string().required(),
  insuranceExpiry: Joi.date().required(),
  fitnessExpiry: Joi.date().required(),
  permitExpiry: Joi.date().required(),
  pollutionExpiry: Joi.date().required(),
  taxExpiry: Joi.date().required(),
  documentStatus: Joi.string().valid('Active', 'Expired', 'Warning').optional(),
  createdBy: Joi.string().required(),
  oldVehicle: Joi.boolean().default(false)
});
