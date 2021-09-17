const express = require('express')
const multer = require('multer')

const createFile = require('./handlers/createFile')
const getFile = require('./handlers/getFile')

const routePrefix = '/files'
const upload = multer({
   limits: {
      fileSize: 1024 * 1024 * 8 // 8mb
   },
   fileFilter: (request, file, callback) => {
      if (file.mimetype === 'image/png') {
         callback(null, true)
      }

      callback(null, false)
   }
})
const filesRoute = express.Router()

filesRoute.post(routePrefix, upload.single('file'), createFile)
filesRoute.get(`${routePrefix}/:filename`, getFile)

module.exports = filesRoute