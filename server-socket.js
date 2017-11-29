var net = require('net');
var fs = require('fs');

var getFileName = function(data){
  var headers = data.split("\n");
  var recParts = headers[0].split(" ");
  //console.log(headers);
  //console.log("Request: " + recParts[1]);
  return recParts[1];
}

var sendHeader = function(socket, statusCode){
  if(statusCode == 200){
    socket.write("HTTP/1.1 200 OK\r\n");
  }else if (statusCode == 404){
    socket.write("HTTP/1.1 404 NOT FOUND\r\n");
  }
  socket.write("Server: Apache/1.3.27 (Unix)  (Red-Hat/Linux)\r\n");
  socket.write("Last-Modified: Wed, 08 Jan 2003 23:11:55 GMT");
  socket.write("Connection: close\r\n");
  socket.write("Content-Type: text/html; charset=UTF-8\r\n");
  socket.write("\r\n");
}

var sendNotFound = function(socket){
  fs.readFile("404.html", "utf8", function (err, data){
    sendHeader(socket, 200);
    socket.write(data);
    socket.destroy();
  });
}

var server = net.createServer(function(socket){
  console.log('Entrou');

  socket.on('data', function(data){
    var fileName = getFileName(data.toString());
    fs.readFile("." + fileName, "utf8", function (err, fileData){
      if(err){
        sendNotFound(socket);
      } else {
        sendHeader(socket, 200);
        socket.write(fileData);
        socket.destroy();
      }
    });
  });

  socket.on('end', function(){
    console.log('Saiu');
  });
});

server.listen(2001, '127.0.0.1');
console.log('Subiu o server');
