const arc = require('@architect/functions');
const Layout = require('@architect/views/layout');

async function editPlayer (request) {
  const { playerId } = request.pathParameters;
  
  const data = await arc.tables();

  const player = await data.players.get({ playerId });
  
  return {
    headers: {'content-type': 'text/html; charset=utf8'},
    body: Layout(view(player))
  };
}

function view(player) {
  return `
    <h2>Add a new player</h2>
    <form action="/admin/players/${player.playerId}" method="POST">
      <label>
        Name: <input type="text" name="name" value="${player.name}" required/>
      </label>

      <label>
        Email: <input type="email" name="email" value="${player.email}" required/>
      </label>

      <label>
        Active: <input type="checkbox" name="active" ${player.active ? 'checked' : ''}/>
      </label>

      <button type="submit" style="margin-right: 1rem;">Update</button>
      <a href="/admin/players" class="button">Cancel</a>
    </form>
  `
}

exports.handler = arc.http.async(editPlayer);