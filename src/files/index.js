const express = require('express')

const createFile = require('./handlers/createFile')
const getFile = require('./handlers/getUser')

const parseForm = express.raw({ 
   type: 'multipart/form-data'
});
const filesRoute = express.Router()

usersRoute.post('/files', parseForm, createFile)
usersRoute.get('/files', parseForm, getFile)

module.exports = filesRoute