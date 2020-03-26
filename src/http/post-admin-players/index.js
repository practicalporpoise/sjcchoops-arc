const HashIds = require('hashids/cjs');
const arc = require('@architect/functions');
const { basicAuth, defaults, pipeline } = require('@architect/shared/middleware');

const hashIds = new HashIds();

async function createPlayer (request) {
  try {
    const { email, name } = request.body;

    const data = await arc.tables();

    const existingPlayers = await data.players.query({
      IndexName: 'email-index',
      KeyConditionExpression: 'email = :email',
      ExpressionAttributeValues: {
        ':email': email
      },
      Limit: 1
    });

    if (existingPlayers.Count === 0) {
      await data.players.put(buildPlayer(email, name));
    }

    return {
      statusCode: 302,
      headers: {'content-type': 'text/html; charset=utf8'},
      location: '/admin/players'
    };

  } catch(error) {
    console.error(error);
    return {
      statusCode: 302,
      headers: {'content-type': 'test/html; charset=utf8'},
      location: '/error'
    }
  }
}

function buildPlayer(email, name) {
  const now = Date.now();
  return {
    playerId: hashIds.encode(now),
    email,
    name,
    active: true,
    createdAt: now,
    updatedAt: now
  };
}

exports.handler = pipeline(basicAuth, ...defaults(), createPlayer);