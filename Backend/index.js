const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())
const http = require('http')
const path = require('path')
const server = http.createServer(app)
const {Server} = require('socket.io')
const io = new Server(server, {cors:{origin: 'http://localhost:3000'}})


app.get('/', (request,response) => {
    response.sendFile(path.join(__dirname,'index.html'));
})

io.on('connection', (socket) => {
    io.emit('chat message', 'a user has connected')

    socket.on('chat message', (msg) => {
        console.log('chat message:'+msg)
        io.emit('chat message',msg)
    })

    socket.on('disconnect',() => {
        io.emit('chat message', 'a user has disconnected');
    })
})



server.listen(3080, () => {
    console.log('Running at Port 3080')
})