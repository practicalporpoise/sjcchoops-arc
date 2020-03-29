const Layout = require('@architect/views/layout');
const { defaults, pipeline } = require('@architect/shared/middleware');

async function error () {
  return {
    statusCode: 200,
    headers: {'content-type': 'text/html; charset=utf8'},
    body: Layout(view())
  }
}

function view() {
  return `
    <h1>Sorry, something unexpected happened, try again later.</h1>
  `
}

exports.handler = pipeline(...defaults(), error);