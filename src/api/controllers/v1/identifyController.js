const {
  createContact,
  getAllContactById,
  getPrimaryContactById,
} = require("../../services/v1/identifyService");


const getContacts = async (data) => {
  let { phoneNumber, email } = data;
  //create primary entry
  phoneNumber = phoneNumber === undefined ? null : phoneNumber;
  email = email === undefined ? null : email;
  //updating secondary contact
  if (phoneNumber !== null && email !== null) {
    let resultOne = await getPrimaryContactById({
      name: "phoneNumber",
      value: phoneNumber,
    });
    let resultTwo = await getPrimaryContactById({
      name: "email",
      value: email,
    });
  }
  let primaryEntry = {};
  if (phoneNumber) {
    primaryEntry = await getPrimaryContactById({
      name: "phoneNumber",
      value: phoneNumber,
    });
  } else {
    primaryEntry = await getPrimaryContactById({ name: "email", value: email });
  }
  primaryEntry = primaryEntry[0];
  if (!primaryEntry) {
    //create a primary Entry
    let objToInsert = {
      phoneNumber: phoneNumber,
      email: email,
      linkPrecedence: "primary",
    };
    primaryEntry = await createContact(objToInsert);
  } else {
    //work on creating secondary Entry
    if (
      primaryEntry.phoneNumber !== phoneNumber ||
      primaryEntry.email !== email
    ) {
      let objToInsert = {
        phoneNumber: phoneNumber,
        email: email,
        linkPrecedence: "secondary",
        linkedId: primaryEntry.id,
      };
      let secondaryEntry = await createContact(objToInsert);
    }
  }
  //create response object
  let contact = {
    primaryContactId: primaryEntry.id,
    emails: null,
    phoneNumber: null,
    secondaryContactIds: null,
  };
  contact.primaryContactId = primaryEntry.id;
  let emails = [primaryEntry.email ?? "N/A"];
  let phoneNumbers = [primaryEntry.phoneNumber ?? "N/A"];
  let secondaryContactIds = [];
  let searchObject = {
    propertyName: "linkedId",
    propertyValue: primaryEntry.id,
  };

  let contacts = await getAllContactById(searchObject);
  contacts.map((contact) => {
    emails.push(contact.email ?? "N/A");
    phoneNumbers.push(contact.phoneNumber ?? "N/A");
    secondaryContactIds.push(contact.id);
  });
  contact.emails = emails;
  contact.phoneNumber = phoneNumbers;
  contact.secondaryContactIds = secondaryContactIds;
  return Object.freeze({ contact: contact });
};

module.exports = {
  getContacts,
};
