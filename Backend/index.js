const express = require('express')
const cors = require('cors')
const userRouter = require('./controllers/userRouter')
require('dotenv').config()
const app = express()
const userFunction = require('./utils/userFunction')
app.use(cors())
app.use(express.json())
const http = require('http')
const server = http.createServer(app)
const io = require('socket.io')(server, {cors:{origin: 'http://localhost:3000'}},{ wsEngine: 'ws' })

io.on('connection', (socket) => {

    socket.on('disconnect',() => {
        userFunction.userExit(socket.id)
    })

    socket.on('chat message', (msg,rm) => {
        socket.to(rm).emit('chat message',msg)
    })

    socket.on('leave',(user) => {
        userFunction.userExit(socket.id)
        socket.to(user.roomnumber).emit('chat message',`${user.username} has left the chat`)
    })

    socket.on('join room', (sentUser) => {
        const user = {
            username:sentUser.un,
            room:sentUser.rm,
            id:socket.id
        }
        userFunction.userEnter(user)
        socket.join(sentUser.rm)
        io.in(sentUser.rm).emit('join room',sentUser.un)
    })

    socket.on('logout',(user) => {
        socket.to(user.room).emit('chat message',`${user.userName} has left the chat`)
        userFunction.userExit(socket.id)
    })

    socket.on('change room',(room,username) => {
        socket.join(room)
        userFunction.findUserandUpdate(socket.id,room)
        
        socket.emit("change room");
        io.in(room).emit('join room',username)
    })
})

app.use('/',userRouter)

server.listen(process.env.PORT, () => {
    console.log('Running at Port 3080')
})