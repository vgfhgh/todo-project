const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name:{type:String, required: true, trim: true},
    age:{type:Number, required: true},
    email:{type:String, required: true, trim: true},
    todos:[Todo]
})

const User = mongoose.model('User',userSchema)
module.exports = User;

