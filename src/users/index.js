const express = require('express')

const createUser = require('./handlers/createUser')
const getUser = require('./handlers/getUser')

const routePrefix = '/users'

const parseJson = express.json()
const usersRoute = express.Router()

usersRoute.post(routePrefix, parseJson, createUser)
usersRoute.get(routePrefix, parseJson, getUser)

module.exports = usersRoute