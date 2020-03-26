module.exports = function pipeline (...fns) {
  return async function (request, context) {
    request.context = context;
    const response = {
      body: '',
      headers: {},
      isBase64Encoded: false,
      statusCode: 200,
      getHeader: function (key) {
        return this.headers[key];
      },
      removeHeader: function (key) {
        delete this.headers[key];
      },
      setHeader: function (key, value) {
        this.headers[key] = value;
      },
    };

    let result = {};

    for (const fn of fns) {
      let nextCalled = false;
      const next = () => { nextCalled = true };
      
      const resultOrPromise = fn(request, response, next);
      result = (resultOrPromise instanceof Promise
        ? await resultOrPromise
        : resultOrPromise) || {};
      
      if (!nextCalled) {
        smartMerge(response, result);
        break;
      }

      if (result instanceof Error) {
        smartMerge(response, {
          body: result.message,
          headers: result.headers,
          statusCode: result.statusCode || result.status || 500,
        });
        break
      }
    }

    return format(response);
  }
}

function smartMerge(response, result) {
  response.body = result.body || response.body;
  response.isBase64Encoded = result.isBase64Encoded || response.isBase64Encoded;
  response.location = result.location || response.location;
  response.statusCode = result.statusCode || response.statusCode;
  response.headers = { ...response.headers, ...result.headers };
}

function format({ body, headers, isBase64Encoded, location, statusCode }) {
  const response = { body, headers, isBase64Encoded, statusCode };
  if (location) {
    response.statusCode = 302;
    response.headers.Location = location;
  }
  return response;
}