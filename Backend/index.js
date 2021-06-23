const express = require('express')
const cors = require('cors')
require('dotenv').config()
const app = express()
const UserModel = require('./utils/userModel')
app.use(cors())
app.use(express.json())
const http = require('http')
const path = require('path')
const server = http.createServer(app)
const {Server} = require('socket.io')
const io = new Server(server, {cors:{origin: 'http://localhost:3000'}})


io.on('connection', (socket) => {

    socket.on('chat message', (msg) => {
        socket.broadcast.emit('chat message',msg)
    })

    socket.on('disconnect',() => {
        io.emit('chat message', 'a user has disconnected');
    })

    socket.on('user enter',(username) => {
        io.emit('user enter',username)
    })
})

app.post('/users',async (request,response) => {
    const account = new UserModel(request.body)
    account.save()
    .catch(err => console.log(err))
    console.log('Personal data was successfully saved')
    response.sendStatus(200)

})



server.listen(process.env.PORT, () => {
    console.log('Running at Port 3080')
})