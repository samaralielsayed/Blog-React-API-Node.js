const mongoose = require('mongoose')
const ServerUrl = process.env.DB_URL;

const dbConnection = mongoose
    .connect(ServerUrl)
    .then(() => console.log('Connection stablished'))
    .catch((err) => console.log(err))


    module.exports = dbConnection