var net = require('net');
var fs = require('fs');

var server = net.createServer(function(socket){
    console.log('Entrou');
    socket.write('Estamos conectado!');

    socket.on('end', function(){
        console.log('Saiu');
    });
    socket.on('data', function(data){
        console.log('Cliente disse: ' + data.toString());
        fs.readFile("./sockets/trabalho.html", "utf8", function (err, data){
          console.log(data);
        });
    });
});

server.listen(2001, '127.0.0.1');
console.log('Subiu o server');
