const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./server/db');

const dbConnection = mongoose.connection;

app.use(bodyParser.json());
app.use("/", express.static(__dirname));

let verifyAuthen = require('./server/verify-authentication');
const authenticationRouter = require('./server/routes/authentication');
const userRouter = require('./server/routes/user');
const roomRouter = require('./server/routes/room');
const classRouter = require('./server/routes/class');

app.use('/auth', authenticationRouter);
app.use('/api', verifyAuthen(), userRouter);
app.use('/api', verifyAuthen(), roomRouter);
app.use('/api', verifyAuthen(), classRouter);

app.get('*', function(req, res, next) {
    res.send("hi");
});

app.listen('4000', function () {
    console.log('Listening on port 4000');
})

dbConnection.on('error', console.error.bind(console, 'connection error:'));
dbConnection.once('open', function() {
  console.log("Connected to db")
});