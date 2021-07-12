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
    .catch(err => response.status(500).send('could not create new User'))
    response.sendStatus(200)
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

router.get('/users/login/:username', (request,response) => {
    let username = request.params.username
    User.find({username:username}, (err,user) => {
        if(err){
            response.status(400).json(err)
        }
        response.status(200).json(user)
    })
})

router.get('/friends/all/:username', async (request,response) => {
    const username = request.params.username
    let res = await User.find({username:username})
    .catch(err => response.status(404).send('User not found'))
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
})

router.put('/users/request', async(request,response) => {
    const body = request.body
    const sender = body.sender
    const to = body.to
    const state = body.state
    const senderUser = await User.find({username:sender})
    const senderFriends = senderUser[0].friends
    const toUser = await User.find({username:to})
    let toFriends = toUser[0].friends
    let toRequests = toUser[0].friendrequest.slice()

    if(state){
        const index = toRequests.indexOf(sender)
        toRequests = toRequests.splice(index+1,1)



        const res1 = await User.findOneAndUpdate({username:sender},
            {friends:senderFriends.concat(toUser[0]._id)},{new:true})
            .catch(err => response.status(500).send('Internal Error'))

        const res2 = await User.findOneAndUpdate({username:to},
            {friends:toFriends.concat(senderUser[0]._id),friendrequest:toRequests},
            {new:true})
            .catch(err => response.status(500).send('Internal Error'))

    }else{
        const index = toRequests.indexOf(sender)
        toRequests = toRequests.splice(index+1,1)

        const res2 = await User.findOneAndUpdate({username:to},
            {friendrequest:toRequests},
            {new:true})
        .catch(err => response.status(500).send('Internal Error'))

    }
    response.status(200).end()
})


router.put('/users/online/:username',async (request,response) => {
    let username = request.params.username
    let state = request.body.state
    const result = await User.findOneAndUpdate({username:username},
        {online:state, room:request.body.room},{new:true})
    response.sendStatus(200).end()
})

router.put(`/friends/friendrequest`, async (request,response) => {
    let sender = request.body.sender
    let to = request.body.to

    //if it is the same person
    if(sender === to){
        return response.status(500).send('Cannot send message to self')
    }

    //if user doesn't exist
    const toUser = await User.findOne({username:to})
    .catch(err => response.status(404).send('Unable to find User'))
    let requests = toUser.friendrequest

    //if duplicate friend request
    const valid = requests.includes(sender)
    //if sender is already in friends list
    const valid2 = toUser.friends.includes({username:sender})

    if(valid){
        response.status(500).send('Duplicate Friend Request')
    }else if(valid2){
        response.status(500).send('You are already friends with user')
    }
    else{
        requests = requests.concat(sender)
        const result = await User.findOneAndUpdate({username:to},
            {friendrequest:requests},{new:true})
        .catch(err => response.status(500).send('unable to process request'))
    }

})

module.exports = router;