const express = require('express')

const createUser = require('./handlers/createUser')
const getUser = require('./handlers/getUser')

const usersRoute = express.Router({
   // TODO: add any options
})

usersRoute.post('/users', createUser)
usersRoute.get('/users', getUser)

module.exports = filesRoute