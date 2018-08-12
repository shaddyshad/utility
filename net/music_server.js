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

server.listen(8192, '233.12.83.110' ,function(){
  //listening mode
  console.log(`Server bound on - ${JSON.stringify(server.address())}`);
});

server.on('error', function(err){
  //Handle generic server errors

  switch (err.code) {
    case 'EADDRINUSE':{
      console.log("Address in use. Retrying...\n");
      setTimeout(function(){
        server.close();
        server.listen(8192);
      });
    }
      break;
      //Add more handlers
    default:
    throw err;
  }
});

server.on('close', function(err){
  console.log("Error on close");
})
