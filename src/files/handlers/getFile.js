const { redisClient } = require("../../common")

/**
 * create user
 * @param {import("express").Request} request 
 * @param {import("express").Response} response 
 * @returns user response
 */
module.exports = async (request, response) => {
    const metadataKey  =request.params.filename

    if (!metadataKey) {
        return response.status(400).send({ error: 'invalid filename' })
    }

    const metadata = await redisClient.get(metadataKey)
    const { file } = JSON.parse(metadata)

    const raw = await redisClient.get(file)

    if (!raw) {
        return response.status(404).send({ error: 'no such file' })
    }

    return response.status(200)
                   .contentType('image/png')
                   .end(Buffer.from(raw, 'base64'), 'binary')
}