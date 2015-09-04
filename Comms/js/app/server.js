var TCPServer = function() {

  var clientSocketId = -1;
  var serverSocketId = -1;

  var callbacks = {
    received: function(info) {
      var command = ab2str(info.data).slice(0, -1);

      chrome.sockets.tcp.send(clientSocketId, str2ab("server echoes: " + command + "\n\r"), function(result) {
        console.dir(result);
      });
    },
    accepted: function(info) {
      console.dir(info);
      chrome.sockets.tcp.onReceive.addListener(callbacks.received);
      clientSocketId = info.clientSocketId;
      chrome.sockets.tcp.setPaused(clientSocketId, false);
    },
    listening: function(result) {
      if (result < 0) {
        console.log('Cannot set the server to listening mode.');
        return;
      }
      console.log('tcp server is listening');
      chrome.sockets.tcpServer.onAccept.addListener(callbacks.accepted);
    },
    created: function(createInfo) {
      if (chrome.runtime.lastError) {
        console.log("Cannot create tcp server.");
        console.dir(chrome.runtime.lastError);
        return;
      }
      console.dir(createInfo);
      console.log('tcp server created.');
      serverSocketId = createInfo.socketId;
      chrome.sockets.tcpServer.listen(serverSocketId, "127.0.0.1", 50000, 50, callbacks.listening);
    }
  };

  function start() {
    chrome.sockets.tcpServer.create({name: 'tcp-server'}, callbacks.created);
  }
  function stop() {
    chrome.sockets.tcpServer.close(serverSocketId, function() {
      console.log("server stopped");
    });
    
  }
  function closeConnection() {
    chrome.sockets.tcp.close(clientSocketId, function() {
      console.log("connection closed");
    });
  }
  return {
    start: start,
    stop: stop,
    close: closeConnection
  };

};