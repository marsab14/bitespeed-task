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

const updateContactById = async (data) => {
  console.log("data to update is", data.id)
  try {
    let result = await Contact.update({ linkPrecedence: data.linkPrecedence, linkedId: data.linkedId }, {where: {id: data.id}})
    console.log("update result is", result)
    return result;
  } catch (e) {
    throw new INTERNAL_SERVER_ERROR("Error while updating contact in database");
  }
}

const getAllPrimaryContactByEmailOrPhoneNumber = async (data) => {
  try {
    let result = await Contact.findAll({
      where: {
          [Op.or] : [
            { phoneNumber : data.phoneNumber},
            { email: data.email }
          ],
          linkPrecedence: {
            [Op.eq]: "primary"
          },
        },
      order: [
        ['createdAt', 'ASC']
      ]
    })
    
    return result;
  } catch (e) {
    console.log(e)
    throw new INTERNAL_SERVER_ERROR("Error while getting contact in database");
  }
}

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
  try {
    let result = await Contact.findOne({
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
  getPrimaryContactById,
  getAllPrimaryContactByEmailOrPhoneNumber,
  updateContactById
};
