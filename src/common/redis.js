const redis = require('redis')

const REDIS_HOST = process.env.REDIS_HOST
const REDIS_PORT = process.env.REDIS_PORT

const client = redis.createClient({
    socket: {
        url: `redis://${REDIS_HOST}:${REDIS_PORT}`
    }
})

module.exports = client