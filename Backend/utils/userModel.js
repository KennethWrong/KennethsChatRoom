let mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URL,{useNewUrlParser: true,useUnifiedTopology:true})
.then(console.log('connection was successful'))

let userSchema = new mongoose.Schema({
    userName: {
        type:String,
        require:true,
        unique:true,
    },
    Password: {
        type:String,
        require:true,
    }
})

module.exports = mongoose.model('User',userSchema)