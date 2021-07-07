var express = require('express')
var router = express.Router();
const UserModel = require('../utils/userModel')
const User = require('../utils/userModel')
const userFunction = require('../utils/userFunction')

router.post('/users',async (request,response) => {
    const username = request.body.username
    const password = request.body.password
    const account = new UserModel(newUser)
    account.save()
    .catch(err => console.log(err))
    response.sendStatus(200)
})

router.get('/users/:username', (request,response) => {
    let username = request.params.username
    User.find({username:username}, (err,user) => {
        if(err){
            response.status(400).json(err)
        }
        response.status(200).json(user)
    })
})

router.get('/friends',(request,response) => {
    const friendsOnline = userFunction.getAllUsers()
    response.json(friendsOnline)
})

module.exports = router;