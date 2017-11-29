var fs = require("fs");
var net = require('net');

var getFileName = function(data){
	var headers = data.split("\n");
	var parts = headers[0].split(" ");
	return parts[1];
}

var sendHeader = function(clientSocket, statusCode){
	if(statusCode == 200){
		clientSocket.write("HTTP/1.1 200 OK\r\n");
	}else if (statusCode == 404){
		clientSocket.write("HTTP/1.1 404 NOT FOUND\r\n");
	}
}

var sendNotFound = function(clientSocket){
	fs.readFile("./404.html", "utf8", function (err, data){
		sendHeader(clientSocket, 404);
		clientSocket.write(data);
		clientSocket.destroy();
	});
}

var server = net.createServer(function(clientSocket){
    console.log('Client connected');

    clientSocket.on('data', function(data){
        //console.log('Client sent: ' + data.toString());
		var fileName = getFileName(data.toString());
		fs.readFile("." + fileName, function (err, fileData){
			if (err){
				sendNotFound(clientSocket);
				return console.log(err); //error
			}
			sendHeader(clientSocket, 200);
			clientSocket.write(fileData);
			clientSocket.destroy();
		});
    });
});

server.listen(2001, '127.0.0.1');
console.log('Subiu o server');
