const { ObjectId } = require("mongodb");
const { connection } = require("./conn");

//Connect
const getUsersCollection = async () => {
  const conn = await connection();
  return conn.collection("users");
};

//Find email
const findByEmail = async (email) => {
  const db = await getUsersCollection();
  return await db.findOne({ email });
};

//Find name
const findByName = async (name) => {
  const db = await getUsersCollection();
  return await db.findOne({ name });
};

const findByUsername = async (username) => {
  const db = await getUsersCollection();
  return await db.findOne({ username });
};

//Create user
const userCreate = async (user) => {
  const db = await getUsersCollection();
  const { insertId } = await db.insertOne(user);
  return { _id: insertId, ...user };
};

//Find all
const findAll = async () => {
  const db = await getUsersCollection();
  return await db.find().toArray();
};

//Delete user
const userDelete = async (id) => {
  const db = await getUsersCollection();
  return await db.deleteOne({ _id: ObjectId(id) });
};

module.exports = {
  userCreate,
  findByName,
  findByUsername,
  findAll,
  findByEmail,
  userDelete,
};
