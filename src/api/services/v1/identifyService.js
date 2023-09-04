const { Op } = require("sequelize");
const Contact = require("../../models/contactModel");
const { INTERNAL_SERVER_ERROR } = require("../../../common/libs/errors");

const createContact = async (data) => {
  try {
    let result = await Contact.create(data);
    return result;
  } catch (e) {
    console.log("error is from create contact", e)
    throw new INTERNAL_SERVER_ERROR("Error while creating contact in database");
  }
};

const getAllContactById = async (data) => {
  let name = data.propertyName;
  let value = data.propertyValue
  try {
    let result = await Contact.findAll({
      where: {
        [name]: {
          [Op.eq] : value
        }
      }
    })
    
    return result;
  } catch (e) {
    throw new INTERNAL_SERVER_ERROR("Error while creating contact in database");
  }
}


const getPrimaryContactById = async (data) => {
  let name = data.name;
  let value = data.value
  console.log("data is", data)
  try {
    let result = await Contact.findAll({
      where: {
          [Op.and] : [
            {[name]: value},
            {linkPrecedence: "primary"}
          ]
        }
    })
    
    return result;
  } catch (e) {
    throw new INTERNAL_SERVER_ERROR("Error while creating contact in database");
  }
}

module.exports = {
  createContact,
  getAllContactById,
  getPrimaryContactById
};
