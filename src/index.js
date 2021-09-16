const express = require('express')
const cors = require('cors')

const HOST = process.env.HOST || '127.0.0.1'
const PORT = process.env.PORT || 5000

const app = express()

app.use(cors({
    methods: [ 'GET', 'HEAD', 'POST' ],
}))

app.listen(PORT, HOST, () => {
    console.info(`Server runnin at ${HOST}:${PORT}`)
})