const { createToken, redisClient } = require('../../common')
/**
 * create user
 * @param {import("express").Request} request 
 * @param {import("express").Response} response 
 * @returns user response
 */
module.exports = async (request, response) => {

    /* request validation */
    const { username } = request.body

    if (!username) {
        return response.status(400).send({ error: 'invalid username' })
    }

    try {
        const { token, expiresIn } = createToken({ username })
        await redisClient.set(token, JSON.stringify({ username }), {
            EX: expiresIn
        })

        return response.status(201).send({
            accessToken: token,
            expiresIn: Date.now() + expiresIn * 1000
        })
    } catch (error) {
        return response.status(500).send({ error: 'something went wrong :(' })
    }

}