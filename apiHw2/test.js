//Command to run:
//			nodemon C:\Users\Mez\Desktop\WebApi\apiHw2\test.js localhost 1337

var http = require('http');
var url = require('url');

function validParameters(urn, method) {
  
	if ( urn === '/gets' && method === 'GET'){
		return true;
	} else if ( urn === '/posts' && method === 'POST'){
		return true;
	} else if ( urn === '/puts' && method === 'PUT'){
		return true;
	} else if ( urn === '/deletes' && method === 'DELETE'){
		return true;
	} else {
		return false;
	}
}

http.createServer(function (req, res) {
	var parsedURL = url.parse(req.url);
	
	if( validParameters(parsedURL.pathname, req.method) ) {
		
		var response = {requestHeaders: req.headers, queryParams: parsedURL.query};

		res.writeHead(200, {'Content-Type': 'application/json'});
		res.end(JSON.stringify(response));
		
	} else {
		var httpStatus = parsedURL.pathname === '/' ? 400 : 405;
		var error = {message: 'Invalid Parameters'};
		res.writeHead(httpStatus, {'Content-Type': 'application/json'});
		res.end(JSON.stringify(error));
	}

}).listen(1337, '127.0.0.1');

console.log('Server running at http://127.0.0.1:1337/');