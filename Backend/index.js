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
const User = require('./utils/userModel')
const io = require('socket.io')(server, {cors:{origin: 'http://localhost:3000'}},{ wsEngine: 'ws' })

io.on('connection', (socket) => {

    socket.on('disconnect',async () => {
        const user = userFunction.getUserById(socket.id)
        if(user){
            await User.findOneAndUpdate({username:user.username}
                ,{online:false,room:''},{new:true})
            .catch(err => console.log(err))
            io.in(user.room)
            .emit('leave',`User ${user.username} has left the chat`)
            userFunction.userExit(socket.id)
        }
    })

    socket.on('chat message', (msg,rm,username) => {
        socket.to(rm).emit('chat message',msg,username)
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

    socket.on('logout',async () => {
        const user = userFunction.getUserById(socket.id)
        socket.to(user.room).emit('leave',`User ${user.username} has left the chat`)
        await User.findOneAndUpdate({username:user.username},
            {online:false,room:''},{new:true})
        userFunction.userExit(user.id)
    })

    socket.on('change room',async (room) => {
        const userOriginal = userFunction.getUserById(socket.id)
        socket.to(userOriginal.room).emit('leave',`User ${userOriginal.username} has switched to room ${room}`)
        userFunction.findUserandUpdate(socket.id,room)
        socket.join(room)
        await User.findOneAndUpdate({username:userOriginal.username},
            {room:room},{new:true})
        
        socket.emit("change room");
        io.in(room).emit('join room',userOriginal.username)
    })
})

app.use('/',userRouter)

server.listen(process.env.PORT, () => {
    console.log('Running at Port 3080')
})