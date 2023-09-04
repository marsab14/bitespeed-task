// index.js
const express = require('express');
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const app = express();
const port = process.env.PORT || 3000;

// Open the SQLite database
const dbPromise = open({
  filename: 'bitespeed.db',
  driver: sqlite3.Database,
});

// Initialize the Contact table if it doesn't exist
dbPromise.then((db) =>
  db.exec(`
    CREATE TABLE IF NOT EXISTS Contact (
      id INTEGER PRIMARY KEY,
      phoneNumber TEXT,
      email TEXT,
      linkedId INTEGER,
      linkPrecedence TEXT,
      createdAt DATETIME,
      updatedAt DATETIME,
      deletedAt DATETIME
    );
  `)
);

app.use(express.json());

// Define the /identify endpoint
app.post('/identify', async (req, res) => {
  const { email, phoneNumber } = req.body;

  // Check if either email or phoneNumber is provided
  if (!email && !phoneNumber) {
    return res.status(400).json({ error: 'Either email or phoneNumber must be provided.' });
  }

  try {
    // Open the database connection
    const db = await dbPromise;

    // Find the primary Contact based on the provided email or phoneNumber
    let primaryContact;
    if (email) {
      primaryContact = await db.get('SELECT * FROM Contact WHERE email = ? AND linkPrecedence = "primary"', email);
    } else {
      primaryContact = await db.get(
        'SELECT * FROM Contact WHERE phoneNumber = ? AND linkPrecedence = "primary"',
        phoneNumber
      );
    }

    if (!primaryContact) {
      return res.status(404).json({ error: 'Customer not found.' });
    }

    // Find all linked Contacts
    const linkedContacts = await db.all('SELECT * FROM Contact WHERE linkedId = ?', primaryContact.id);

    // Consolidate the Contacts
    const consolidatedContact = {
      id: primaryContact.id,
      phoneNumber: primaryContact.phoneNumber,
      email: primaryContact.email,
      linkedContacts: linkedContacts.map((contact) => ({
        id: contact.id,
        phoneNumber: contact.phoneNumber,
        email: contact.email,
      })),
    };

    res.json(consolidatedContact);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while processing the request.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});