const users = []

const getAllUsers = () => {
    return users
}

const getUserById = (id) => {
    return users.find(user => user.id === id)
}

const userEnter = (user) => {
    users.push(user)
    return user
}

const userExit = (id) => {
    const index = users.findIndex(tuser => tuser.id === id)

    if(index !== -1){
        return users.splice(index,1)[0];
    }
}

const findUserandUpdate = (id,rm) => {
    const index = users.findIndex(tuser => tuser.id === id)

    if(index !== -1){
        users[index].room = rm
    }

}

module.exports ={
    getAllUsers,
    getUserById,
    userEnter,
    userExit,
    findUserandUpdate
}