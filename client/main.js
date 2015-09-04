window.onload = function() {
  document.querySelector('#greeting').innerText =
    'TCP Client';
  $('#box').hide();
  $('#btn-connect').click(function(e) {
    e.preventDefault();
    Client.connectToServer();
    $('#box').show();
  });
  $('#btn-send').click(function(e) {
    e.preventDefault();
    Client.sendMessage($('#txt-message').val());
  });
};
