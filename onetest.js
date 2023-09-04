// Create a database client
const dbClient = new MongoClient("mongodb://localhost:27017");

// Connect to the database
dbClient.connect((err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  // Get the `contacts` collection
  const contactsCollection = dbClient.db("bitespeed").collection("contacts");

  // Create a `Contact` model
  const Contact = mongoose.model("Contact", {
    phoneNumber: String,
    email: String,
    linkedId: Number,
    linkPrecedence: String,
    createdAt: Date,
    updatedAt: Date,
  });

  // Define the `/identify` endpoint
  app.post("/identify", async (req, res) => {
    // Get the email and phone number from the request body
    const email = req.body.email;
    const phoneNumber = req.body.phoneNumber;

    // Find all contacts with the given email or phone number
    const contacts = await Contact.find({
      email: email,
      phoneNumber: phoneNumber,
    });

    // If no contacts are found, create a new contact
    if (contacts.length === 0) {
      const contact = new Contact({
        phoneNumber: phoneNumber,
        email: email,
        linkPrecedence: "primary",
      });
      await contact.save();
      res.status(200).json({
        contact: {
          primaryContatctId: contact.id,
          emails: [contact.email],
          phoneNumbers: [contact.phoneNumber],
          secondaryContactIds: [],
        },
      });
    } else {
      // Find the "primary" contact
      const primaryContact = contacts.find((contact) => contact.linkPrecedence === "primary");

      // If the email and phone number match the primary contact, return it
      if (email === primaryContact.email && phoneNumber === primaryContact.phoneNumber) {
        res.status(200).json({
          contact: {
            primaryContatctId: primaryContact.id,
            emails: [primaryContact.email],
            phoneNumbers: [primaryContact.phoneNumber],
            secondaryContactIds: [],
          },
        });
      } else {
        // Create a new "secondary" contact
        const secondaryContact = new Contact({
          phoneNumber: phoneNumber,
          email: email,
          linkedId: primaryContact.id,
          linkPrecedence: "secondary",
        });
        await secondaryContact.save();
        res.status(200).json({
          contact: {
            primaryContatctId: primaryContact.id,
            emails: [primaryContact.email, secondaryContact.email],
            phoneNumbers: [primaryContact.phoneNumber, secondaryContact.phoneNumber],
            secondaryContactIds: [secondaryContact.id],
          },
        });
      }
    }
  });
});