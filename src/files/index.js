const express = require('express')

const createFile = require('./handlers/createFile')
const getFile = require('./handlers/getFile')

const parseForm = express.raw({ 
   type: 'multipart/form-data'
});
const filesRoute = express.Router()

filesRoute.post('/files', parseForm, createFile)
filesRoute.get('/files', parseForm, getFile)

module.exports = filesRoute