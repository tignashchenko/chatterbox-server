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

var requestHandler = function(request, response) {

  var headers = {
    'access-control-allow-origin': '*',
    'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'access-control-allow-headers': 'content-type, accept',
    'access-control-max-age': 10, // Seconds.
    'content-type': 'application/json'
  };

  console.log('Serving request type ' + request.method + ' for url ' + request.url);

  if (request.method === 'POST') {
    var body = '';
    request.on('data', function(chunk) {
      responseBody.results.push(JSON.parse(chunk.toString()));
    });

    request.on('end', function(message) {
      response.writeHead(201, headers);
      //console.log(response.statusCode);
      response.end(JSON.stringify(responseBody));
    });
  } else if (request.method === 'GET' && (request.url).includes('/classes/messages')) {
    response.writeHead(200, headers);
    //console.log(response.responseBody);
    response.end(JSON.stringify(responseBody));
  } else if (request.method === 'OPTIONS') {
    response.writeHead(200, headers);
    //console.log(response.responseBody);
    response.end(JSON.stringify(responseBody));
  } else {
    response.writeHead(404, headers);
    //console.log(response.responseBody);
    response.end(JSON.stringify(responseBody));
  }
};

module.exports.requestHandler = requestHandler;
