const { connection } = require("./conn");
const { ObjectId } = require("mongodb");

const getEventCollection = async () => {
  const conn = await connection();
  return conn.collection("events");
};

//Create event
const eventCreate = async (event) => {
  const db = await getEventCollection();
  const { insertId } = await db.insertOne(event);
  return { _id: insertId, ...event };
};

//Find name
const findByNameEvent = async (nameEvent) => {
  const db = await getEventCollection();
  return await db.findOne({ nameEvent });
};

const findById = async (id) => {
  const db = await getEventCollection();
  return await db.findOne({ _id: ObjectId(id) });
};

const findAll = async () => {
  const db = await getEventCollection();
  return await db.find().toArray();
};

//Delete event
const eventDelete = async (id) => {
  const db = await getEventCollection();
  return await db.deleteOne({ _id: ObjectId(id) });
};

const eventUpdate = async (id, event) => {
  const db = await getEventCollection();
  const updateEvent = await db.findOneAndUpdate(
    { _id: ObjectId(id) },
    { $set: event },
    { returnDocument: "after" }
  );
  return updateEvent.value;
};

const eventUpdateImage = async (id, event) => {
  const db = await getEventCollection();
  const updateEvent = await db.findOneAndUpdate(
    { _id: ObjectId(id) },
    { $set: event },
    { returnDocument: "after" }
  );
  return updateEvent.value;
};

module.exports = {
  eventCreate,
  findByNameEvent,
  findAll,
  eventDelete,
  findById,
  eventUpdate,
  eventUpdateImage,
};
