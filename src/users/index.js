const express = require('express')

const createUser = require('./handlers/createUser')
const getUser = require('./handlers/getUser')

const parseJson = express.json()
const usersRoute = express.Router()

usersRoute.post('/users', parseJson, createUser)
usersRoute.get('/users', parseJson, getUser)

module.exports = filesRoute