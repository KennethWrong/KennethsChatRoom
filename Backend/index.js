const express = require('express')
const cors = require('cors')
require('dotenv').config()
const app = express()
const UserModel = require('./utils/userModel')
const userFunction = require('./utils/userFunction')
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

    socket.on('leave',(user) => {
 
        userFunction.userExit(socket.id)
        socket.broadcast.emit('chat message',`${user.un} has left the chat`)
    })

    socket.on('join room', (sentUser) => {
        const user = {
            username:sentUser.un,
            room:sentUser.rm,
            id:socket.id
        }
        userFunction.userEnter(user)
        socket.join(sentUser.rm)
        io.emit('join room',sentUser.un)
        const users = userFunction.getAllUsers();
    })

    socket.on('logout',({username,rm}) => {
        const user = {
            username:username,
            room:rm,
            id:socket.id
        }
        userFunction.userExit(user)
    })
})

app.post('/users',async (request,response) => {
    const newUser = request.body
    const account = new UserModel(newUser)
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

app.get('/friends',(request,response) => {
    const friendsOnline = userFunction.getAllUsers()
    response.status(200).send(friendsOnline)
})



server.listen(process.env.PORT, () => {
    console.log('Running at Port 3080')
})