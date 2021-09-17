
module.exports = (request, response) => {
    return response.status(200).send(request.user)
}