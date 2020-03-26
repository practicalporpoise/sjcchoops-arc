const bodyParser = require('./body-parser');
const cookies = require('./cookies');
const csrf = require('./csrf');
const helmet = require('./helmet');

module.exports = () => [
  helmet(),
  bodyParser,
  cookies(),
  csrf()
];