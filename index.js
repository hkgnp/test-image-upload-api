//////////////////////////////////////////////////////////
//////////////////// BASIC SETUP /////////////////////////
//////////////////////////////////////////////////////////

// Implement basic requirements
const express = require('express');
const cors = require('cors');

// For Mongo
require('dotenv').config(); // Not needed for Heroku
const mongoUrl = process.env.MONGO_URL;
const MongoUtil = require('./MongoUtil');
const ObjectId = require('mongodb').ObjectId;
const axios = require('axios')

// Set up express app
let app = express();

// Add in app.use for json and cors
app.use(express.json());
app.use(cors());

//////////////////////////////////////////////////////////
/////////////////////// MAIN API /////////////////////////
//////////////////////////////////////////////////////////

let main = async () => {

    // API to link with MongoDB
    const DBNAME = 'xxxxxx';
    let db = await MongoUtil.connect(mongoUrl, DBNAME);

    // Collection 'post-details' POST
    app.post('/test', async (req, res) => {
        let { name, username } = req.body;

        let result = await db.collection('test-profile').insertOne({
            name: name,
            date: new Date()
        });
        
        let idResult = await db.collection('test-profile').findOne({
            name: req.body.name
        })
        console.log(idResult._id)

        let usernameResult = await db.collection('test-username').insertOne({
            username: username,
            profile_reference: idResult._id
        })

        res.status(200)
        res.send(usernameResult)
    });
};

main();


app.listen(process.env.PORT || 7000, () =>
    console.log('Server is running on port 7000 ...')
);
