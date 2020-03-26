const arc = require('@architect/functions');
const { basicAuth, defaults, pipeline } = require('@architect/shared/middleware');

async function updatePlayer (request) {
  try {
    const { playerId } = request.pathParameters;
    const { email, name, active = false } = request.body;

    const data = await arc.tables();

    await data.players.update({
      Key: { playerId },
      UpdateExpression: 'SET email = :email, #name = :name, active = :active',
      ExpressionAttributeNames: {
        '#name': 'name'
      },
      ExpressionAttributeValues: {
        ':email': email,
        ':name': name,
        ':active': active
      }
    });

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

exports.handler = pipeline(basicAuth, ...defaults(), updatePlayer);