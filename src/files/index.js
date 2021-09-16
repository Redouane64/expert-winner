const express = require('express')

const createFile = require('./handlers/createFile')
const getFile = require('./handlers/getFile')

const routePrefix = '/files'
const parseForm = express.raw({ 
   type: 'multipart/form-data'
});
const filesRoute = express.Router()

filesRoute.post(routePrefix, parseForm, createFile)
filesRoute.get(routePrefix, parseForm, getFile)

module.exports = filesRoute