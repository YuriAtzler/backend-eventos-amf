const eventModels = require("../Models/EventModels");
const eventSchema = require("../Schemas/EventSchema");
const appError = require("../Errors/appError");
const fs = require("fs");
const path = require("path");
const tmpFolder = path.resolve(__dirname, "..", "..", "upload");

//Create user
const eventCreate = async (event) => {
  const { value, error } = eventSchema.validate(event);
  if (error) {
    deleteImages(event);
    throw new appError("Erro no Schema " + error, 400);
  }

  const eventNameUsed = await eventModels.findByNameEvent(event.nameEvent);
  if (eventNameUsed != null) {
    deleteImages(event);
    throw new appError("Nome de envento já está em uso!", 409);
  }

  return await eventModels.eventCreate(value);
};

//Find all
const findAll = async () => {
  return await eventModels.findAll();
};

//Delete images
const deleteImages = (event) => {
  if (event) {
    for (let i = 0; i < event.arrImage.length; i++) {
      let path = event.arrImage[i].split("/");

      fs.unlink(`${tmpFolder}/${path[2]}`, (err) => {
        console.log(err);
      });
    }
  }
};

//Delete events
const eventDelete = async (id) => {
  const event = await eventModels.findById(id);
  if (event) {
    for (let i = 0; i < event.arrImage.length; i++) {
      let path = event.arrImage[i].split("/");

      fs.unlink(`${tmpFolder}/${path[2]}`, (err) => {
        console.log(err);
      });
    }
  }
  const deleted = await eventModels.eventDelete(id);
  if (deleted.deletedCount === 0) {
    throw new appError("Evento não encontrado!", 409);
  } else {
    return { message: "Evento removido com sucesso!" };
  }
};

module.exports = {
  eventCreate,
  findAll,
  eventDelete,
};
