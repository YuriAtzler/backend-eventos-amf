const usersServices = require("../Services/UsersServices");

//Create user
const userCreate = async (request, response) => {
  const { name, username, email, password, admin } = request.body;
  const result = await usersServices.userCreate({
    name,
    username,
    email,
    password,
    admin,
  });
  response.status(201).json(result);
};

//Find all
const findAll = async (_request, response) => {
  const result = await usersServices.findAll();
  response.status(200).json(result);
};

//Delete user
const userDelete = async (request, response) => {
  const { id } = request.params;
  const deleted = await usersServices.userDelete(id);
  response.status(200).json(deleted);
};

module.exports = {
  userCreate,
  findAll,
  userDelete,
};
