const { createToken, redisClient, http } = require('../../common')
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
        return http.BAD_REQUST_RESPONSE(response, { error: 'invalid username' })
    }

    try {
        const { token, expiresIn } = createToken({ username })
        await redisClient.set(token, JSON.stringify({ username }), {
            EX: expiresIn
        })

        return http.OK_RESPONSE(response, {
            accessToken: token,
            expiresIn: Date.now() + expiresIn * 1000
        })
    } catch (error) {
        return http.SERVER_ERROR_RESPONSE(response, { error: 'something went wrong :(' })
    }

}