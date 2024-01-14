require('dotenv').config()

const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')

const routes = require('./routes/routes')


async function main() {
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING)
    console.log('MongoDB connected successfully')
    const app = express()
    const httpServer = require('http').createServer(app)

    app.use(cors())
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }));

    routes(app)

    const serverPort = process.env.WEB_SERVER_PORT || 8080
    httpServer.listen(serverPort, () => {
        console.log(`Web server is running on port ${serverPort}`)
    })
}

main().catch(error => {
    console.log(`An error occurred: ${error}`)
})
