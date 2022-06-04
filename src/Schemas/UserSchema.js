const joi = require("joi");

module.exports = joi.object({
  _id: joi.string(),
  name: joi.string().required().max(50),
  username: joi.string().required().max(50),
  email: joi.string().required().email(),
  password: joi.string().required().max(30),
  admin: joi.boolean().default(false),
});
