const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()
const Person = require('./models/person')

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(morgan('tiny'))

const PORT = process.env.PORT

persons = [
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
        name: "Mary Poppendieck",
        number: "39-23-6423122"
    }
]

app.get('/api/persons', (req, res) => {
    Person.find({}).then(people => {
        res.json(people)
    })
})

const getDate = () => {
    const now = new Date();

    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const monthsOfYear = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const dayOfWeek = daysOfWeek[now.getDay()];
    const month = monthsOfYear[now.getMonth()];
    const date = now.getDate();
    const year = now.getFullYear();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    const timeZone = now.toString().match(/\((.+)\)/)[1];

    const formattedDateTime = `${dayOfWeek} ${month} ${date} ${year} ${hours}:${minutes}:${seconds} GMT${now.getTimezoneOffset() > 0 ? '-' : '+'}${Math.abs(now.getTimezoneOffset() / 60).toString().padStart(2, '0')}${Math.abs(now.getTimezoneOffset() % 60).toString().padStart(2, '0')} (${timeZone})`;

    return (formattedDateTime)

}
app.get('/api/info', (req, res) => {
    const info = `<p>Phone has info for ${persons.length} people</p>
                  <p>${getDate()}</p>
                  `
    res.send(info)
})

app.get('/api/persons/:id', (req, res, next) => {
    Person.findById(req.params.id).then(person => {
        if (person) {
            res.json(person)
        } else {
            res.status(404).end()
        }
    })
        .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
    Person.findById(req.params.id).then(person => {
        person.number = req.body.number
        person.save()
            .then(savedPerson => {
                res.json(savedPerson)
            })
    })
})

app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndDelete(req.params.id).then(person => {
        res.json(person)
    })
        .catch(error => next(error))
})

const generateId = () => {
    const maxId = persons.length > 0
        ? Math.max(...persons.map(p => p.id))
        : 0
    return maxId + 1
}

const isEmpty = (str) => {
    return (!str || str.length === 0);
}

app.post('/api/persons', (req, res, next) => {
    const body = req.body
    console.log(body)
    
    const person = new Person({
        name: body.name,
        number: body.number
    })

    person.save()
        .then(savedPerson => {
            res.json(savedPerson)
        })
        .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
    if (error.name === 'castError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'validationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}

app.use(errorHandler)

app.listen(PORT)
console.log(`Server running on port ${PORT}`)