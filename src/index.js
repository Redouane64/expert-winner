const express = require('express')

const HOST = process.env.HOST || '127.0.0.1'
const PORT = process.env.PORT || 5000

const app = express()

app.listen(PORT, HOST, () => {
    console.info(`Server runnin at ${HOST}:${PORT}`)
})