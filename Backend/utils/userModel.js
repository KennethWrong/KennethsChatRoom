let mongoose = require('mongoose')
require('dotenv').config()

mongoose.connect(process.env.MONGODB_URL,{useNewUrlParser: true,useUnifiedTopology:true})
.then(console.log('connection was successful'))

let userSchema = new mongoose.Schema({
    username: {
        type:String,
        require:true,
        unique:true,
    },
    password: {
        type:String,
        require:true,
    }
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

module.exports = mongoose.model('User',userSchema)