(function() {

  var clientSocketId = -1;

  function close() {
    chrome.sockets.tcp.close(clientSocketId, function() {
      console.log("connection closed");
    });
  }

  function onReceiveCallback(info) {
    
    var command = ab2str(info.data).slice(0, -1);

    chrome.sockets.tcp.send(clientSocketId, str2ab("++" + command + "\n\r"), function(result) {
      console.dir(result);
      close();
    });
 
  }

  function onAcceptCallback(info) {
    console.dir(info);
    chrome.sockets.tcp.onReceive.addListener(onReceiveCallback);

    clientSocketId = info.clientSocketId;

    chrome.sockets.tcp.setPaused(clientSocketId, false);
  }

  function onListenCallback(result) {

    if (result < 0) {
      console.log('Cannot set the server to listening mode.');
      return;
    }
    console.log('tcp server is listening');
    chrome.sockets.tcpServer.onAccept.addListener(onAcceptCallback);

  }
  
  function onCreateCallback(createInfo) {

    if (chrome.runtime.lastError) {
      console.log("Cannot create tcp server.");
      console.dir(chrome.runtime.lastError);
      return;
    }

    console.dir(createInfo);
    console.log('tcp server created.');

    chrome.sockets.tcpServer.listen(createInfo.socketId, "127.0.0.1", 50000, 50, onListenCallback);

  }
  chrome.sockets.tcpServer.create({name: 'tcp-server'}, onCreateCallback);

})();