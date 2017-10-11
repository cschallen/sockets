var net = require('net');

var socket = net.Socket();
console.log('Conectando com servidor');
socket.on('data', function(data){
    console.log('Servidor mandou: ' + data.toString());
});

socket.connect(2001, '127.0.0.1');


setTimeout(function() {
    socket.write('Olaaaa');
    socket.end();
}, 3000);
