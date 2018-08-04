"use strict";

const net = require('net');

function handleConnections(sock){
  console.log("Connection established. \n");

  sock.on('data', function(req){
    //handle the request
    console.log(`Requested - ${req.toString()}\n`);
    sock.write("Ok \r\n");
  });

  sock.on('error', function(err){
    console.error(err);
  });

  sock.on('close', function(err){
    if(err) throw err;
    console.log("Connection closed.\n");
  });

  sock.on('end', function(){
    console.log("Connection ended.\n")
  });
}

const server = net.createServer(handleConnections);

server.listen(8192, function(){
  console.log("Server bound");
});
