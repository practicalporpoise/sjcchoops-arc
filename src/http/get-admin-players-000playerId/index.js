const arc = require('@architect/functions');
const Layout = require('@architect/views/layout');
const { basicAuth, defaults, pipeline } = require('@architect/shared/middleware');

async function editPlayer (request) {
  const { playerId } = request.pathParameters;
  
  const data = await arc.tables();

  const player = await data.players.get({ playerId });
  
  return {
    headers: {'content-type': 'text/html; charset=utf8'},
    body: Layout(view(player, request.csrfToken()))
  };
}

function view (player, csrfToken) {
  return `
    <h2>Add a new player</h2>
    <form action="/admin/players/${player.playerId}" method="POST">
      <input type="hidden" name="_csrf" value="${csrfToken}"/>
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

exports.handler = pipeline(basicAuth, ...defaults(), editPlayer);