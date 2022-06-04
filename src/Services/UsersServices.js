const userModels = require("../Models/UserModels");
const userSchema = require("../Schemas/UserSchema");
const appError = require("../Errors/appError");

//Create user
const userCreate = async (user) => {
  const { value, error } = userSchema.validate(user);
  if (error) {
    throw new appError("Erro no Schema " + error, 400);
  }

  const userNameUsed = await userModels.findByUsername(user.username);

  if (userNameUsed) {
    throw new appError("Username já está em uso!", 409);
  }

  const nameUsed = await userModels.findByName(user.name);

  if (nameUsed) {
    throw new appError("Nome já está em uso!", 409);
  }

  const emailUsed = await userModels.findByEmail(user.email);

  if (emailUsed) {
    throw new appError("Email já está em uso!", 409);
  }

  return await userModels.userCreate(value);
};

//Find all
const findAll = async () => {
  return await userModels.findAll();
};

//Delete user
const userDelete = async (id) => {
  const deleted = await userModels.userDelete(id);
  if (deleted.deletedCount === 0) {
    throw new appError("Usuário não encontrado!", 409);
  } else {
    return { message: "Usuário removido com sucesso!" };
  }
};

module.exports = {
  userCreate,
  findAll,
  userDelete,
};
