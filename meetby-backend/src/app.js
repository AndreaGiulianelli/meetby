require('dotenv').config()

const express = require('express')

const app = express()
const httpServer = require('http').createServer(app)

const serverPort = process.env.WEB_SERVER_PORT || 8080
httpServer.listen(serverPort, () => {
    console.log(`Web server is running on port ${serverPort}`)
})