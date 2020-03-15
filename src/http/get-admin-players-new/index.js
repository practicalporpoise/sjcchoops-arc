const arc = require('@architect/functions');
const Layout = require('@architect/views/layout') ;

async function newPlayer (req) {
  return {
    headers: {'content-type': 'text/html; charset=utf8'},
    body: Layout(view())
  };
}

function view() {
  return `
    <h2>Add a new player</h2>
    <form action="/admin/players" method="POST">
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

exports.handler = arc.http.async(newPlayer);