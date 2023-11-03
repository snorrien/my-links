//const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
//const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');
//const { getAuth } = require("firebase-admin/auth");

// const firebaseConfig = {
//   apiKey: "AIzaSyBs2u_LOQH6iJTlbdyluT3EklQggFcMh9c",
//   authDomain: "mylinks-2dbeb.firebaseapp.com",
//   projectId: "mylinks-2dbeb",
//   storageBucket: "mylinks-2dbeb.appspot.com",
//   messagingSenderId: "104547746485",
//   appId: "1:104547746485:web:77e00dbb8f5857ea4bb4fc",
//   measurementId: "G-7VC2W67H2J",
//   serviceAccountId: 'firebase-service-account@firebase-sa-management.iam.gserviceaccount.com',
//   credential: applicationDefault()
// };

//const fbApp = initializeApp(firebaseConfig);
//const db = getFirestore(fbApp);

const sqlite3 = require('sqlite3').verbose();
const express = require("express");
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('client/build'));
const port = 3000;

let db = new sqlite3.Database('./links.db', sqlite3.OPEN_CREATE, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the links database.');

  db.close();
});

app.get('/login', async (req, res) => {
  db = new sqlite3.Database('./links.db', sqlite3.OPEN_READWRITE, (err) => {
    db.serialize(() => {
      db.each(`SELECT name FROM links`, (err, row) => {
        console.log(row.name);
      });
    });
    
    db.close();

    res.status(200).send('ads')
  });
})







app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});

