let mongoose = require('mongoose')
let validator = require('validator')


let userSchema = new mongoose.Schema({
    userName: {
        type:String,
        require:true,
        unique:true,
        validate: (value) => {
            return validator.isEmail(value)
          }
    },
    Password: {
        type:String,
        require:true,
        validate: (value) => {
            return validator.isEmail(value)
          }
    }
})

module.exports = mongoose.model('User',userSchema)