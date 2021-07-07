const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const generateAccessToken = async (username,password) => {
    const hash = await bcrypt.hash(password,10)
    const user = new userSchema({
        username:username,
        password:hash
    })
}