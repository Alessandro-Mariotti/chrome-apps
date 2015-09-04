window.onload = function() {
 
  var server = new TCPServer();
  var client = new TCPClient();
  
  $('#btn-server-start').click(function(e) {
    e.preventDefault();
    document.getElementById("span-server-status").innerHTML = "&nbsp;";
    document.getElementById("span-server-status").innerHTML = "Server started<br/>Waiting for connections on port 50000.";
    server.start();
  });
  $('#btn-server-stop').click(function(e) {
    e.preventDefault();
    document.getElementById("span-server-status").innerHTML = "&nbsp;";
    document.getElementById("span-server-status").innerHTML = "Server stopped.";
    server.stop();
  });
  
  $('#ip-address').submit(function(e) {
    e.preventDefault();
    console.log($('#address').val());
    client.connectToServer($('#address').val());
  });
  
};
