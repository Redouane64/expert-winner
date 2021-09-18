const { redisClient, http } = require("../../common")

/**
 * create user
 * @param {import("express").Request} request 
 * @param {import("express").Response} response 
 * @returns user response
 */
module.exports = async (request, response) => {
    const metadataKey  =request.params.filename

    if (!metadataKey) {
        return http.BAD_REQUST_RESPONSE(response, { error: 'invalid filename' })
    }

    try {
        const metadata = await redisClient.get(metadataKey)
        if (!metadata) {
            return http.NOT_FOUND_RESPONSE(response, { error: 'no such file' })
        }
    
        const { file } = JSON.parse(metadata)
    
        const raw = await redisClient.get(file)
    
        if (!raw) {
            return http.NOT_FOUND_RESPONSE(response, { error: 'no such file' })
        }

        return http.OK_FILE_RESPONSE(response, raw)
    } catch (error) {
        return http.SERVER_ERROR_RESPONSE(response, { error: 'something went wrong :('})
    }
}