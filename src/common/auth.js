const jwt = require('jsonwebtoken')
const redisClient = require('./redis.js')

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET
const accessTokenLifeTime = Number(process.env.ACCESS_TOKEN_LIFETIME)

const createToken = (payload) => {
    const token = jwt.sign(payload, accessTokenSecret, { expiresIn: accessTokenLifeTime })
    return { token, expiresIn: accessTokenLifeTime }
}

/**
 * authorization middleware to verify user identity
 * @param {import('express').Request} request 
 * @param {import('express').Response} response 
 * @param {import('express').NextFunction} next 
 */
const authorize = async (request, response, next) => {
    const { authorization = null } = request.headers

    if (authorization === null) {
        return response.status(401).send({ error: 'unauthorized access' })
    }

    /* Authorize: bearer XXX */
    const [, token] = authorization.split(' ')
    let payload
    try {
        payload = jwt.verify(token, accessTokenSecret, { 
            ignoreExpiration: false
        })
    } catch(error) {
        return response.status(401).send({ error: 'unauthorized access' })
    }

    if (!payload) {
        return response.status(401).send({ error: 'unauthorized access' })
    }

    const data = await redisClient.get(token);
    
    if (!data) {
        return response.status(401).send({ error: 'unauthorized access' })
    }

    const user = JSON.parse(data)
    request.user = user
    
    next()
}

module.exports = {
    authorize,
    createToken
}