var mongoose = require("mongoose")
var { Schema, Types: { ObjectId } } = mongoose

mongoose.connect('mongodb://localhost:27017/todo', { useNewUrlParser: true, useUnifiedTopology: true })
var todoDb = mongoose.connection

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})

var TodoSchema = new mongoose.Schema({
    title: String,
    user: ObjectId
})
var UserSchema = new mongoose.Schema({
    id: ObjectId,
    name: String,
    todos: [TodoSchema]
})

var Todo = mongoose.model('Todo', TodoSchema)
var User = mongoose.model('User', UserSchema)

function run() {
    readline.question('1.User\n2.Todo\n3.all\n>', function (option) {
        if (option == 1) {
            readline.question('Name\n>', function (name) {
                User.create({ name }, function (err, user) {
                    if (err) throw err
                    console.log(user)
                    run()
                })
            })
        } else if (option == 2) {
            readline.question('Title\n>', function (title) {
                Todo.create({ title }, function (err, todo) {
                    console.log(todo)
                    readline.question('User Name\n>', function (name) {
                        User.findOne({ name }, function (err, user) {
                            console.log(user)
                            User.updateOne({ name }, { todos: [...user.todos, todo._id] }, function (err, res) {
                                console.log(res)
                                run()
                            })

                        })
                    })
                })
            })
        } else if (option == 3) {
            User.find({}, function (err, users) {
                console.log(users);
                run()
            })
        }
        else {
            process.exit(0)
        }
    })
}

todoDb.once('open', () => {
    run()
})
