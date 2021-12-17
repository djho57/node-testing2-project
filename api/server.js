const express = require('express')
const server = express()

server.use(express.json())

const Students = require('./students/students-model')

server.get('/', (req, res) => {
    res.status(200).json({message: "working"})
})
server.get('/students', (req, res, next) => {
    Students.getAll()
        .then(student => {
            res.status(200).json(student)
        })
        .catch(next)
})

server.get('/students/:id', (req, res, next) => {
    Students.getById(req.params.id)
        .then(student => {
            res.status(200).json(student)
        })
        .catch(next)
})

server.post('/students', (req, res, next) => {
    Students.make(req.body)
        .then(student => {
            res.status(201).json(student)
        })
        .catch(next)
})

server.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message,
        stack: err.stack,
    })
})

module.exports = server