const joi = require("joi");

module.exports = joi.object({
  _id: joi.string(),
  nameEvent: joi.string().required().max(50),
  place: joi.string().required().max(50),
  time: joi.string().required(),
  description: joi.string().required(),
  arrImage: joi.array().required(),
  speaker: joi.string().required(),
  status: joi.boolean().default(true),
});
