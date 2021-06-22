const express = require('express')
const cors = require('cors')
require('dotenv').config()
const mongoose = require(mongoose)
const app = express()
app.use(cors())
const http = require('http')
const path = require('path')
const server = http.createServer(app)
const {Server} = require('socket.io')
const io = new Server(server, {cors:{origin: 'http://localhost:3000'}})

mongoose.connect(process.env.MONGODB_URL);

io.on('connection', (socket) => {
    io.emit('chat message', 'a user has connected')

    socket.on('chat message', (msg) => {
        socket.broadcast.emit('chat message',msg)
    })

    socket.on('disconnect',() => {
        io.emit('chat message', 'a user has disconnected');
    })
})



server.listen(process.env.PORT, () => {
    console.log('Running at Port 3080')
})