var Client = (function() {
  
  var sk = -1;
  
  var callbacks = {
    created: function(createInfo) {
      console.log("Socket creato");
      console.dir(createInfo);
      sk = createInfo.socketId;
      chrome.sockets.tcp.connect(sk, "192.168.10.144", 50000, callbacks.connected);
    },
    
    connected: function(result) {
      console.log("Connesso");
      console.dir(result);
    },
    
    sent: function(sendInfo) {
      console.log("Messaggio inviato");
      console.dir(sendInfo);
    },
    
    received: function(info) {
      console.log(ab2str(info.data).slice(0, -1));
    }
  };
  
  function connectToServer() {
    console.log('Inizio connessione con: ' + $('#txt-address').val());
    
    chrome.sockets.tcp.create({}, callbacks.created);
    
  }
  
  function sendMessage(message) {
    chrome.sockets.tcp.send(sk, str2ab(message), callbacks.sent);
  }
  
  chrome.sockets.tcp.onReceive.addListener(callbacks.received);
  return {
    connectToServer: connectToServer,
    sendMessage: sendMessage
  };
  
})();