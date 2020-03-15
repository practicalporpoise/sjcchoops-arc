const arc = require('@architect/functions');
const Layout = require('@architect/views/layout') ;

async function listPlayers (_request) {
  const data = await arc.tables();
  const players = await data.players.scan({});

  return {
    headers: {'content-type': 'text/html; charset=utf8'},
    body: Layout(view(players.Items))
  };
}

function view(players) {
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

exports.handler = arc.http.async(listPlayers);
