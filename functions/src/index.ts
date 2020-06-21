import express = require('express');
const functions = require('firebase-functions');

const app: express.Application = express();

app.get('/', function (req, res) {
  res.send('Hello from functions!');
});

app.get('/timestamp', (request, response) => {
    response.send(`${Date.now()}`);
});

app.get('/test', (request, response) => {
  response.send("You shall pass here!");
});



exports.app = functions.https.onRequest(app);