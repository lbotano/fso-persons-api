const mongoose = require("mongoose")

if (process.argv.length < 3) {
    console.log("Syntax: node mongo.js <password> <name> <phone>")
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@cluster0.pkgdx.mongodb.net/phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})

const personSchema = new mongoose.Schema({
    name: String,
    number: Number
})

const Person = mongoose.model("Person", personSchema)

const newPerson = new Person({
    name: process.argv[3],
    number: process.argv[4]
})

newPerson.save().then(result => {
    console.log(`added ${result.name} number ${result.number} to phonebook`)
    mongoose.connection.close()
})
