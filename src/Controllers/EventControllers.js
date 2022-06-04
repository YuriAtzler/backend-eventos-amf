const eventServices = require("../Services/EventServices");

//Create event
const eventCreate = async (request, response) => {
  const arrImage = request.files;
  for (let i = 0; i < arrImage.length; i++) {
    arrImage[i] = `${request.get("host")}/images/${arrImage[i].filename}`;
  }
  const event = JSON.parse(request.body.body);
  const result = await eventServices.eventCreate({
    ...event,
    arrImage,
  });
  response.status(201).json(result);
};

//Find event
const findAll = async (_request, response) => {
  const result = await eventServices.findAll();
  response.status(200).json(result);
};

//Delete event
const eventDelete = async (request, response) => {
  const { id } = request.params;
  const deleted = await eventServices.eventDelete(id);
  response.status(200).json(deleted);
};

module.exports = {
  eventCreate,
  findAll,
  eventDelete,
};