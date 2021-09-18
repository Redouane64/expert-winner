const { http } = require("../../common")

module.exports = (request, response) => {
    return http.OK_RESPONSE(response, request.user)
}