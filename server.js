// Set up WS server and a simple HTML/JS client
var server = new (require('ws').Server)({ server: require('http').createServer(function (req, res) {

  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end('<script>\
  var client = new WebSocket("ws://" + location.host);\
  client.onmessage = function (event) { document.body.innerText = event.data; };\
  onkeypress = function (event) { client.send(""); };\
  </script>');

}).listen(process.env.PORT || 5000) });

// Respond to messages with number of connected clients
server.on('connection', function (connection) {
  connection.on('message', function () {
    connection.send(server.clients.length.toString());
  });
});

// Manually collect garbage every 30 seconds
setInterval(gc, 30 * 1000);
