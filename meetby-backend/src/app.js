require('dotenv').config()

const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')

const routes = require('./routes')


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

    const io = require('socket.io')(httpServer, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    })
    const sockets = require('./services/sockets').sockets
    const socketIoMiddleware = require('./middlewares/socketIoMiddleware')
    io.use(socketIoMiddleware.verify)
    io.on('connection', (socket) => {
        console.log('New client socket connected')
        sockets.set(socket.userId, socket)

        socket.on("disconnect", (reason) => {
            console.log('Client socket disconnected')
            sockets.delete(socket.userId)
        })
    })
}

main().catch(error => {
    console.log(`An error occurred: ${error}`)
})
