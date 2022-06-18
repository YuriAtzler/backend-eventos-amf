const jwt = require("jsonwebtoken");
const userModel = require("../Models/UserModels");
const loginSchema = require("../Schemas/LoginSchema");
const { jwtData } = require("../config/auth");
const appError = require("../Errors/appError");

const findByEmail = async (email) => userModel.findByEmail(email);

const auth = async (loginData) => {
  const { error } = loginSchema.validate(loginData);
  if (error) throw new appError("Campos incorretos", 401);

  const { email, password } = loginData;

  const userLogin = await findByEmail(email);

  if (!userLogin || userLogin.password !== password) {
    throw new appError("E-mail ou senha incorretos", 401);
  }

  const { _id, admin } = userLogin;
  const { secret, expiresIn, algorithm } = jwtData;
  const user = { _id, admin, email };

  const token = jwt.sign({ data: user }, secret, {
    expiresIn,
    algorithm,
  });

  return token;
};

module.exports = {
  auth,
};
