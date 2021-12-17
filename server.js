const express = require('express')
const server = express()
const studentsRouter = require('./api/studentsRouter.js')

server.use(express.json())
server.use('/students', studentsRouter)

module.exports = server
