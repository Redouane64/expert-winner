
/**
 * create user
 * @param {import("express").Request} request 
 * @param {import("express").Response} response 
 * @returns user response
 */
module.exports = (request, response) => {

    const { username } = request.body

    return response.send({ ok: true })
}