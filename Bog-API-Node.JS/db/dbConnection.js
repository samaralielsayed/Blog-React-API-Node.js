const mongoose = require('mongoose')
const ServerUrl = 'mongodb+srv://engsamar105:SEQdLv1li8N9lKll@cluster0.oisswi8.mongodb.net/blog_react'

const dbConnection = mongoose
    .connect(ServerUrl)
    .then(() => console.log('Connection stablished'))
    .catch((err) => console.log(err))


    module.exports = dbConnection