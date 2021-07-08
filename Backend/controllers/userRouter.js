var express = require('express')
var router = express.Router();
const UserModel = require('../utils/userModel')
const User = require('../utils/userModel')

router.post('/users',async (request,response) => {
    const username = request.body.username
    const password = request.body.password
    const room = request.body.room

    const newUser = {
        username:username,
        password:password,
        room:room
    }
    const account = new UserModel(newUser)
    account.save()
    .catch(err => console.log(err))
    response.sendStatus(200)
})

router.get('/users/login/:username', (request,response) => {
    let username = request.params.username
    User.find({username:username}, (err,user) => {
        if(err){
            response.status(400).json(err)
        }
        response.status(200).json(user)
    })
})

router.get('/friends/all', async (request,response) => {
    const friendsOnline = await User.find({})
    response.json(friendsOnline)
})


router.put('/users/online/:username',async (request,response) => {
    let username = request.params.username
    let state = request.body.state
    const result = await User.findOneAndUpdate({username:username},
        {online:state, room:request.body.room},{new:true})
    response.sendStatus(200).end()
})

module.exports = router;