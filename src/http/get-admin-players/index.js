const arc = require('@architect/functions');
const Layout = require('@architect/views/layout') ;
const { basicAuth, defaults, pipeline } = require('@architect/shared/middleware');

async function listPlayers () {
  const data = await arc.tables();
  const players = await data.players.scan({});

  return {
    statusCode: 200,
    headers: {'content-type': 'text/html; charset=utf8'},
    body: Layout(view(players.Items)),
    isBase64Encoded: false,
  };
}

function view (players) {
  return `
    <div class="manage-header">
      <h1>Manage Players</h1>
      <a href="/admin/players/new" type="button">+</a>
    </div>
    <table class="manage-users">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Status</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        ${players.map(player => `
          <tr>
            <td>${player.name}</td>
            <td>${player.email}</td>
            <td>${player.active ? 'Active' : 'Inactive'}</td>
            <td align="center">
              <a href="/admin/players/${player.playerId}">Edit</a>
            </td>
          </tr>
        `)}
      </tbody>
    </table>
  `;
}

exports.handler = pipeline(basicAuth, ...defaults(), listPlayers);
