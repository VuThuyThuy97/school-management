const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./app/db');

const dbConnection = mongoose.connection;

app.use(bodyParser.json());
app.use("/", express.static(__dirname));

let verifyAuthen = require('./app/verify-authentication');
const authenticationRouter = require('./app/routes/authentication');
const userRouter = require('./app/routes/user');
const roomRouter = require('./app/routes/room');
const classRouter = require('./app/routes/class');

app.use('/auth', authenticationRouter);
app.use('/api', verifyAuthen(), userRouter);
app.use('/api', verifyAuthen(), roomRouter);
app.use('/api', verifyAuthen(), classRouter);


// app.use('/public', publicRouter);
// // app.use(verifyAuthen);
// app.use('/plot', verifyAuthen(), plotRouter);
// app.use('/plant', verifyAuthen(), plantRouter);
// app.use('/product', verifyAuthen(), productRouter);
// app.use('/species', verifyAuthen(), speciesRouter);
// app.use('/harvest', verifyAuthen(), harvestRouter);
// app.use('/fertilizer', verifyAuthen(), fertRouter);
// app.use('/pesticide', verifyAuthen(), pesRouter);
// app.use('/producer', verifyAuthen(), producerRouter);
// app.use('/class', verifyAuthen(), classRouter);
// app.use('/user', verifyAuthen(), userRouter);
// app.use('/history', verifyAuthen(), historyRouter);
// app.use('/auth', authRouter);

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