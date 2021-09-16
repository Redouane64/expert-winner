const express = require('express')
const cors = require('cors')
const users = require('./users')
const files = require('./files')


const HOST = process.env.HOST || '127.0.0.1'
const PORT = process.env.PORT || 5000

const app = express()

app.use(cors({
    methods: [ 'GET', 'HEAD', 'POST' ],
}))

app.disable('x-powered-by')

app.use(users)
app.use(files)

/* default route, must be last */
app.get('*', (_, response) => response.send({ ok: true }))

app.listen(PORT, HOST, () => {
    console.info(`Server running at ${HOST}:${PORT}`)
})