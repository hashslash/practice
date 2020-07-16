var mongoose = require("mongoose")
var { Schema } = mongoose

mongoose.connect("mongodb://localhost:27017/todo", { useNewUrlParser: true, useUnifiedTopology: true })
var TodoSchema = new Schema({
    title: String
})

var UserSchema = new Schema({
    name: String,
    todos: [TodoSchema]
})

var Todo = mongoose.model('Todo', TodoSchema)
var User = mongoose.model('User', UserSchema)
module.exports = {
    mongoose,
    Todo,
    User
}