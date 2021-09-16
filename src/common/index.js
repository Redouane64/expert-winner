const jwt = require('jsonwebtoken')
const redisClient = require('./redis')


/* auth */
const accessTokenSecret = process.env.SECRET
const accessTokenLifeTime = Number(process.env.ACCESS_TOKEN_LIFETIME)

const createToken = (payload) => {
    const token = jwt.sign(payload, accessTokenSecret, { expiresIn: accessTokenLifeTime })
    return token
}

/**
 * middleware to verify if request is authenticated
 * @param {import('express').Request} request 
 * @param {import('express').Response} response 
 * @param {import('express').NextFunction} next 
 */
const authorize = (request, response, next) => {
    const { Authorize = null } = request.headers

    if (Authorize === null) {
        return response.status(401).send({ error: 'unauthorized access' })
    }

    /* Authorize: bearer XXX */
    const [, token] = Authorize.split(' ')

    const payload = jwt.verify(token, accessTokenSecret)

    if (!payload) {
        return response.status(401).send({ error: 'unauthorized access' })
    }

    request.user = {
        user: payload.username
    }

    next()
}