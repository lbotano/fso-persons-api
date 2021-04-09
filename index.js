const express = require("express")
const cors = require("cors")
const morgan = require("morgan")

const app = express()

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
    response.send(`
        <p>Phonebook has info for ${persons.length} people</p>
        <p>${new Date()}</p>
    `)
})

// List all persons
app.get("/api/persons", (request, response) => response.json(persons))

// Get info from person
app.get("/api/persons/:id", (request, response) => {
    const person = persons.find(person => person.id === Number(request.params.id))

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

// Delete person
app.delete("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

// Add person
app.post("/api/persons", (request, response) => {
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

    const person = {
        id: generateId(),
        name: body.name,
        number: body.number
    }

    persons = persons.concat(person)

    response.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})