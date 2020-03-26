const { BASIC_AUTH_USERNAME, BASIC_AUTH_PASSWORD } = process.env;

module.exports = async function basicAuth (request, _response, next) {
  try {
    const { Authorization: authorization } = request.headers;
    const [_scheme, rawCredentials] = authorization.split(' ');
    const credentials = new Buffer(rawCredentials, 'base64').toString();
    const [username, password] = credentials.split(':');
    if (username !== BASIC_AUTH_USERNAME || password !== BASIC_AUTH_PASSWORD) {
      throw new Error('basic authentication failed');
    }
    next();
  } catch (error) {
    return {
      statusCode: 401,
      headers: { 'WWW-Authenticate': 'Basic realm="SJCCHoops"' },
    }
  }
}