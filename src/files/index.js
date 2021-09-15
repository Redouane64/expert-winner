const express = require('express')

const createFile = require('./handlers/createFile')
const getFile = require('./handlers/getUser')

const filesRoute = express.Router({
   // TODO: add any options
})

usersRoute.post('/files', createFile)
usersRoute.get('/files', getFile)

module.exports = filesRoute