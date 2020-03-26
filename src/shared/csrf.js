const arc = require('@architect/functions');
const Tokens = require('csrf');

const tokens = new Tokens();

async function csrf (request) {
  const session = await arc.http.session.read(request);
  if (!session._csrfSecret) {
    session._csrfSecret = tokens.secretSync();
  }
  const cookie = await arc.http.session.write(session);
  request.csrfToken = () => tokens.create(session._csrfSecret);
  return request;
}

async function verifyCsrf (request) {
  try {
    const { _csrfSecret } = await arc.http.session.read(request);
    const { csrfToken } = request.body
    if (!tokens.verify(_csrfSecret, csrfToken)) {
      throw new Error('invalid csrf token');
    }
  } catch (error) {
    console.error(error);
  }
  return {
    statusCode: 302,
    headers: {'content-type': 'test/html; charset=utf8'},
    location: '/error'
  }
}

module.exports = { csrf, verifyCsrf }