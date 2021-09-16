const morgan = require('morgan')

module.exports = morgan(
    ':date[iso] :method :url :status :res[content-length] - :response-time ms'
)