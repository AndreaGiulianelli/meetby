require('dotenv').config()

const mongoose = require('mongoose')
const express = require('express')


async function main() {
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING)
    const app = express()
    const httpServer = require('http').createServer(app)

    const serverPort = process.env.WEB_SERVER_PORT || 8080
    httpServer.listen(serverPort, () => {
        console.log(`Web server is running on port ${serverPort}`)
    })
}

main().catch(error => {
    console.log(`An error occurred: ${error}`)
})
