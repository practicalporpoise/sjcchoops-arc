const Layout = require('@architect/views/layout');
const { basicAuth, defaults, pipeline } = require('@architect/shared/middleware');

async function newPlayer (request) {
  return {
    headers: {'content-type': 'text/html; charset=utf8'},
    body: Layout(view(request.csrfToken()))
  };
}

function view (csrfToken) {
  return `
    <h2>Add a new player</h2>
    <form action="/admin/players" method="POST">
      <input type="hidden" name="_csrf" value="${csrfToken}"/>
      <label>
        Name: <input type="text" name="name" required/>
      </label>

      <label>
        Email: <input type="email" name="email" required/>
      </label>

      <button type="submit" style="margin-right: 1rem;">Add</button>
      <a href="/admin/players" class="button">Cancel</a>
    </form>
  `
}

exports.handler = pipeline(basicAuth, ...defaults(), newPlayer);