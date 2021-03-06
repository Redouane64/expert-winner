const { randomUUID } = require('crypto')
const { redisClient, http } = require("../../common")

/**
 * create user
 * @param {import("express").Request} request 
 * @param {import("express").Response} response 
 * @returns user response
 */
module.exports = async (request, response) => {

    const { file } = request

    if (!file) {
        return http.BAD_REQUST_RESPONSE(response, { error: 'file is missing'})
    }

    try {
        const fileMetadataKey = randomUUID()
        const fileKey = randomUUID()

        // save file metadata entry
        await redisClient.set(fileMetadataKey, JSON.stringify({ file: fileKey }))

        // save file
        await redisClient.set(fileKey, file.buffer.toString('base64')) 
        
        /* response.header('Location', file-path) */

        return http.CREATED_RESPONSE(response, {
            filename: fileMetadataKey
        })
    } catch(error) {
        return http.SERVER_ERROR_RESPONSE(response, { error: 'something went wrong :('})
    }
}