const express = require('express')
const cors = require('cors')
require('dotenv').config()
const app = express()
const UserModel = require('./utils/userModel')
app.use(cors())
app.use(express.json())
const http = require('http')
const User = require('./utils/userModel')
const path = require('path')
const server = http.createServer(app)
const {Server} = require('socket.io')
const io = new Server(server, {cors:{origin: 'http://localhost:3000'}})


io.on('connection', (socket) => {

    socket.on('chat message', (msg) => {
        socket.broadcast.emit('chat message',msg)
    })

    socket.on('user enter',(username) => {
        socket.broadcast.emit('user enter',username)
    })

    socket.on('disconnect',() => {
        socket.broadcast.emit('chat message','a user has disconnected')
    })
})

app.post('/users',async (request,response) => {
    const newUser = request.body
    const account = new UserModel(newUser)
    console.log(account)
    account.save()
    .catch(err => console.log(err))
    response.sendStatus(200)
})

app.get('/users/:username', (request,response) => {
    let username = request.params.username
    User.find({username:username}, (err,user) => {
        if(err){
            response.status(400).json(err)
        }
        response.status(200).json(user)
    })
})



server.listen(process.env.PORT, () => {
    console.log('Running at Port 3080')
})