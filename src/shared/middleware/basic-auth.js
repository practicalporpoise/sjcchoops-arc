const { BASIC_AUTH_USERNAME, BASIC_AUTH_PASSWORD } = process.env;

module.exports = function basicAuth ({ headers }, _response, next) {
  try {
    const authorization = headers.Authorization || headers.authorization;
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