require("dotenv").config()
const express = require("express")
const cors = require("cors")
const morgan = require("morgan")

const Person = require("./models/person")

const app = express()


app.use(express.static("build"))
app.use(express.json())
app.use(cors())
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :postData"))

morgan.token("postData", function (request, response) {
    return JSON.stringify(request.body)
})

let persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-5323523"
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "12-43-234345"
    },
    {
        id: 4,
        name: "Mary Poppendick",
        number: "39-23-6423122"
    }
]

const generateId = () => Math.floor(Math.random() * 10000)

// Get API info
app.get("/info", (request, response) => {
    Person.find({}).then(persons => {
        response.send(`
            <p>Phonebook has info for ${persons.length} people</p>
            <p>${new Date()}</p>
        `)
    })
})

// List all persons
app.get("/api/persons", (request, response) => {
    Person.find({}).then(persons => response.json(persons))
})

// Get info from person
app.get("/api/persons/:id", (request, response, next) => {
    Person.findById(request.params.id)
        .then(person => {
            if (person) {
                return response.json(person)
            } else {
                return response.status(404).end()
            }
        })
        .catch(error => next(error))
})

// Delete person
app.delete("/api/persons/:id", (request, response, next) => {
    Person.findByIdAndDelete(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

// Add person
app.post("/api/persons", (request, response, next) => {
    const body = request.body
    console.log(request.body)

    if (!body.name) {
        return response.status(400).json({
            error: "name missing"
        })
    }

    if (!body.number) {
        return response.status(400).json({
            error: "phone number missing"
        })
    }

    if (persons.find(person => person.name === body.name)) {
        return response.status(400).json({
            error: "name must be unique"
        })
    }

    const person = new Person({
        name: body.name,
        number: body.number
    })

    person.save()
        .then(savedPerson => savedPerson.toJSON())
        .then(savedAndFormattedPerson => {
            console.log("person saved!")
            response.json(savedAndFormattedPerson)
        })
        .catch(error => next(error))
})

// Modify person
app.put("/api/persons/:id", (request, response, next) => {
    const body = request.body;
    console.log(request.body)

    if (!body.name) {
        return response.status(400).json({
            error: "name missing"
        })
    }

    if (!body.number) {
        return response.status(404).json({
            error: "phone number missing"
        })
    }

    const person = {
        name: body.name,
        number: body.number
    }

    Person.findByIdAndUpdate(request.params.id, person, { new: true, runValidators: true, context: "query" })
        .then(updatedPerson => {
            response.json(updatedPerson)
        })
        .catch(error => next(error))
})

// Create middlewares

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
    console.log("Hola")

    if (error.name === "CastError") {
        return response.status(400).send({ error: "malformatted id" })
    } else if (error.name === "ValidationError") {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}

app.use(errorHandler)

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: "unknown endpoint" })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
