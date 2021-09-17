const { randomUUID } = require('crypto')
const { redisClient } = require("../../common")

/**
 * create user
 * @param {import("express").Request} request 
 * @param {import("express").Response} response 
 * @returns user response
 */
module.exports = async (request, response) => {

    const { file } = request

    if (!file) {
        return response.status(400).send({ error: 'file is missing'})
    }

    try {
        const fileMetadataKey = randomUUID()
        const fileKey = randomUUID()

        // save file metadata entry
        await redisClient.set(fileMetadataKey, JSON.stringify({ file: fileKey }))

        // save file
        await redisClient.set(fileKey, file.buffer.toString('base64')) 
        
        /* response.header('Location', file-path) */

        return response.status(201).send({
            filename: fileMetadataKey
        })
    } catch(error) {
        return response.status(500).send({ error: 'something went wrong :('})
    }
}