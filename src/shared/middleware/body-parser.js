const arc = require('@architect/functions');

module.exports = function bodyParser (request, _response, next) {
  request.body = arc.http.helpers.bodyParser(request);
  next();
}