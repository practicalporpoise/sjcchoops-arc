const cookieSession = require('cookie-session');

const { ARC_ENV_SECRET } = process.env;

module.exports = function createCookieSession () {
  return cookieSession({
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    sameSite: true,
    secret: ARC_ENV_SECRET,
    secure: true,
  });
}