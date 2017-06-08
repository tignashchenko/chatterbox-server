/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
var responseBody = {
  results: []
};

var headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'content-type': 'text/plain'
};

var requestHandler = function(request, response) {

  console.log('Serving request type ' + request.method + ' for url ' + request.url);

  var successCode = 200;
  var postCode = 201;
  var errorCode = 404;

  if (request.method === 'POST') {
    request.on('data', function(chunk) {
      responseBody.results.push(JSON.parse(chunk.toString()));
    });

    request.on('end', function(message) {
      response.writeHead(postCode, headers);
      response.end(JSON.stringify(responseBody));
    });
  } else if (request.method === 'GET' && request.url === '/classes/messages') {
    response.writeHead(successCode, headers);
    response.end(JSON.stringify(responseBody));
  } else if (request.method === 'OPTIONS') {
    response.writeHead(successCode, headers);
    response.end(JSON.stringify(responseBody));
  } else {
    response.statusCode = errorCode;
    response.end();
  }
  console.log(request.url);
};

module.exports= requestHandler;
