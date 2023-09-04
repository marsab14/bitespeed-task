const {
  createContact,
  getAllContactById,
  getPrimaryContactById,
  getAllPrimaryContactByEmailOrPhoneNumber,
  updateContactById,
} = require("../../services/v1/identifyService");

const getContacts = async (data) => {
  let { phoneNumber, email } = data;
  //rectify data
  phoneNumber = phoneNumber === undefined ? null : phoneNumber;
  email = email === undefined ? null : email;
  let primaryEntry = null;
  if (email && phoneNumber) {
    //if email and phoneNumber both are present in request
    let allPrimaryEntries = await getAllPrimaryContactByEmailOrPhoneNumber({
      phoneNumber,
      email,
    });
    if (allPrimaryEntries.length === 0) {
      //no previous entry present, create a new entry
      let objToCreate = {
        phoneNumber: phoneNumber,
        email: email,
        linkPrecedence: "primary",
      };
      let result = await createContact(objToCreate);
      primaryEntry = result;
    } else if (allPrimaryEntries.length === 1) {
      //if entry has different phoneNumber or email then create a new secondary entry
      primaryId = allPrimaryEntries[0].id;
      primaryEntry = allPrimaryEntries[0];
      if (
        allPrimaryEntries[0].email !== email ||
        allPrimaryEntries[0].phoneNumber !== phoneNumber
      ) {
        let objToCreate = {
          phoneNumber: phoneNumber,
          email: email,
          linkPrecedence: "secondary",
          linkedId: allPrimaryEntries[0].id,
        };
        await createContact(objToCreate);
      }
    } else if (allPrimaryEntries.length > 1) {
      //here we will check if phoneNumber and email belongs to two different primaryEntries,
      //here maximum 2 primary entries will be there
      primaryEntry = allPrimaryEntries[0];

      for (let i = 1; i < allPrimaryEntries.length; i++) {
        allPrimaryEntries[i].linkPrecedence = "secondary";
        allPrimaryEntries[i].linkedId = primaryEntry.id;
        await updateContactById(allPrimaryEntries[i]);
      }
    }
  } else {
    //if either email or phoneNumber is present in request
    if (phoneNumber) {
      primaryEntry = await getPrimaryContactById({
        name: "phoneNumber",
        value: phoneNumber,
      });
    } else {
      primaryEntry = await getPrimaryContactById({
        name: "email",
        value: email,
      });
    }
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
        await createContact(objToInsert);
      }
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
  getContacts
};
