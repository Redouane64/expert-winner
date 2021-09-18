
/**
 * HTTP 401 unauthorized response
 * @param {import("express").Response} response 
 * @param {object} error error object
 */
const UNAUTHORIZED_RESPONSE = (response, error) => response.status(401).send(error)

/**
 * HTTP 400 bad request response
 * @param {import("express").Response} response 
 * @param {object} error response error object 
 */
const BAD_REQUST_RESPONSE = (response, error) => response.status(400).send(error)

/**
 * HTTP 404 not found response
 * @param {import("express").Response} response 
 * @param {object} body response body 
 */
const NOT_FOUND_RESPONSE = (response, body) => response.status(404).send(body)

/**
* HTTP 201 created response
* @param {import("express").Response} response 
* @param {object} body response body 
*/
const CREATED_RESPONSE = (response, body) => response.status(201).send(body)

/**
* HTTP 200 ok response
* @param {import("express").Response} response 
* @param {object} body response body 
*/
const OK_RESPONSE = (response, body) => response.status(200).send(body)

/**
* HTTP 500 server error response
* @param {import("express").Response} response 
* @param {object} body response body 
*/
const SERVER_ERROR_RESPONSE = (response, body) => response.status(500).send(body)

/**
* HTTP 200 of with file response
* @param {import("express").Response} response 
* @param {string} file file as base64 string
*/
const OK_FILE_RESPONSE = (response, file) =>
    response.status(200)
        .contentType('image/png')
        .end(Buffer.from(file, 'base64'), 'binary')

module.exports = {
    BAD_REQUST_RESPONSE,
    CREATED_RESPONSE,
    NOT_FOUND_RESPONSE,
    OK_FILE_RESPONSE,
    OK_RESPONSE,
    SERVER_ERROR_RESPONSE,
    UNAUTHORIZED_RESPONSE
}
