var express = require('express')
var router = express.Router();
const UserModel = require('../utils/userModel')
const User = require('../utils/userModel')
const bcrypt = require('bcrypt')

const saltRounds = 10;

//new user register
router.post('/users',async (request,response) => {
    const username = request.body.username
    const password = request.body.password
    const room = request.body.room
    const hashPassword = bcrypt.hashSync(password,saltRounds)

    const newUser = {
        username:username,
        password:hashPassword,
        room:room
    }
    const account = new UserModel(newUser)

    try{
        const newu = await account.save()
        console.log(newu)
        response.sendStatus(200)

    }catch(err){
        response.status(500).send({message:"Username has been taken"})
    }
})

router.get('/users/:username',(request,response) => {
    let username = request.params.username
    User.find({username:username}, (err,user) => {
        if(err){
            response.status(400).json(err)
        }
        response.status(200).json(user)
    })

})

//login
router.post('/users/login/', async (request,response) => {
    console.log(request.body)
    let username = request.body.username
    let password = request.body.password
    try{
        const user = await User.findOne({username:username})
        let hash = user.password
        let results = await bcrypt.compare(password,hash, (err,results) => {
            if(results){
                response.sendStatus(200)
            }else{
                response.status(404).send({msg:'username or password was incorrect'})
            }
        })
    }catch(err){
        response.status(500).send({msg:'Internal server error'})
    }
})

router.get('/friends/all/:username', async (request,response) => {
    try{
    const username = request.params.username
    let res = await User.find({username:username})
    let friendsOnline = res[0].friends
    let send = []
    for(let i=0; i<friendsOnline.length;i++){
        let user = await User.findById(friendsOnline[i])
        let body = {
            username: user.username,
            online: user.online,
            room: user.room
        }
        send = send.concat(body)
    }
    response.json(send)
}
catch{
    console.log(err)
    response.status(404).send({message:'User not found'})
}
})

//removing friend reqeusts and adding to friends
router.put('/users/request', async(request,response) => {
    const body = request.body
    const sender = body.sender
    const to = body.to
    const state = body.state
    const senderUser = await User.find({username:sender})
    const senderFriends = senderUser[0].friends
    const toUser = await User.find({username:to}).catch(err => {
        response.status(404).send({message:'Username not found'})})
    let toFriends = toUser[0].friends
    let toRequests = toUser[0].friendrequest.slice()

    if(state){
        const index = toRequests.indexOf(sender)
        toRequests.splice(index,1)



        const res1 = await User.findOneAndUpdate({username:sender},
            {friends:senderFriends.concat(toUser[0]._id)},{new:true})
            .catch(err => response.status(500).send({message:'Internal Error'}))

        const res2 = await User.findOneAndUpdate({username:to},
            {friends:toFriends.concat(senderUser[0]._id),friendrequest:toRequests},
            {new:true})
            .catch(err => response.status(500).send({message:'Internal Error'}))

    }else{
        const index = toRequests.indexOf(sender)
        toRequests = toRequests.splice(index,1)

        const res2 = await User.findOneAndUpdate({username:to},
            {friendrequest:toRequests},
            {new:true})
        .catch(err => response.status(500).send({message:'Internal Error'}))

    }
    response.status(200).end()
})

//setting a user online and setting them a room
router.put('/users/online/:username',async (request,response) => {
    try{
        let username = request.params.username
        let state = request.body.state
        const result = await User.findOneAndUpdate({username:username},
            {online:state, room:request.body.room},{new:true})
        response.sendStatus(200).end()
    }catch(err){
        console.log(err)
        response.sendStatus(500).send({message:'Internal Server Error'})
    }
})

//handling friend requests
router.put(`/friends/friendrequest`, async (request,response) => {
    let sender = request.body.sender
    let to = request.body.to

    //if it is the same person
    if(sender === to){
        return response.status(500).send({message:'Cannot send friend request to self'})
    }

    const senderUser = await User.findOne({username:sender})

    //if user doesn't exist
    const toUser = await User.findOne({username:to})
    .catch(err => {
         response.status(404).send({message:'Unable to find User'})
    })
    let requests = toUser.friendrequest

    //if duplicate friend request
    const valid = requests.includes(sender)
    //if sender is already in friends list
    const valid2 = toUser.friends.includes(senderUser._id)

    if(valid2){
        return response.status(500).send({message:'You are already friends with user'})
    }else if(valid){
        return response.status(500).send({message:'Duplicate Friend Request'})
    }
    else{
        requests = requests.concat(sender)
        const result = await User.findOneAndUpdate({username:to},
            {friendrequest:requests},{new:true})
        .catch(err => {
            response.status(500).send({message:'unable to process request'})
        })
    }

})

//unfriending a friend
router.delete('/friends', async (request,response) => {
    try{
        const toDelete = await User.findOne({username:request.body.toDelete})
        const user = await User.findOne({username:request.body.user})

        let toDeleteFriends = toDelete.friends
        const toDeleteid = toDelete._id
        let userFriends = user.friends
        const userid = user._id

        let indexOfDelete = userFriends.indexOf(toDeleteid)
        let indexOfUser = toDeleteFriends.indexOf(userid)

        if(indexOfDelete > -1){
            userFriends.splice(indexOfDelete,1)
        }
        if(indexOfUser > -1){
            toDeleteFriends.splice(indexOfUser,1)
        }
        
        const res1 = await User.findByIdAndUpdate(userid,{friends:userFriends},{new:true})
        const res2 = await User.findByIdAndUpdate(toDeleteid,{friends:toDeleteFriends},{new:true})
        response.sendStatus(200)
}catch(error){
        console.log(error)
        response.status(500).send({message:'Internal Server Error 500'})
}
})

module.exports = router;