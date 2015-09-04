var TCPClient = function() {
  
  var sk = -1;
  var address = '';
  var port = -1;
  
  var callbacks = {
    created: function(createInfo) {
      console.log("Socket creato");
      console.dir(createInfo);
      sk = createInfo.socketId;
      chrome.sockets.tcp.connect(sk, address, port, callbacks.connected);
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
      console.log(ab2str(info.data).trim());
    }
  };
  
  function connectToServer(address) {
    console.log('Inizio connessione con: ' + address);
    this.address = address;
    this.port = 50000;
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
  
};