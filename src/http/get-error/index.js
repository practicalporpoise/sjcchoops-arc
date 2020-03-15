const arc = require('@architect/functions');
const Layout = require('@architect/views/layout');

async function error (req) {
  return {
    headers: {'content-type': 'text/html; charset=utf8'},
    body: Layout(view())
  }
}

function view() {
  return `
    <h1>Sorry, something unexpected happened, try again later.</h1>
  `
}

exports.handler = arc.http.async(error);