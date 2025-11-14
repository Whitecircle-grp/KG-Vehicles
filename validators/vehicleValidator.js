const Joi = require("joi");

exports.vehicleValidation = Joi.object({
  vehicleNumber: Joi.string().required(),
  ownerName: Joi.string().required(),
  vehicleType: Joi.string().required(),
  insuranceExpiry: Joi.date().allow(null, '').optional(),
  fitnessExpiry: Joi.date().allow(null, '').optional(),
  permitExpiry: Joi.date().allow(null, '').optional(),
  pollutionExpiry: Joi.date().allow(null, '').optional(),
  taxExpiry: Joi.alternatives().try(
    Joi.date().allow(null, ''),
    Joi.string().valid('Lifetime').insensitive()
  ).optional(),
  documentStatus: Joi.string().valid('Active', 'Expired', 'Warning').optional(),
  createdBy: Joi.string().required(),
  oldVehicle: Joi.boolean().default(false)
});
