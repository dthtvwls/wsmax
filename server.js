// Set up WS server and a simple HTML/JS client
var wss = new (require('ws').Server)({ server: require('http').createServer(function (req, res) {

  res.writeHead(200, { 'Content-Type': 'text/html' })
  res.end('<script>\
  new WebSocket("ws://" + location.host).onmessage = function (event) {\
    console.log(event.data);\
  }\
  </script>');

}).listen(process.env.PORT || 5000) });

// Broadcast number of connected clients
var souljaBoyTellEm = function () {
  wss.clients.forEach(function (client) {
    client.send(wss.clients.length.toString());
  });
};

// Establish listeners for connect & disconnect events
wss.on('connection', function (ws) {
  ws.on('close', souljaBoyTellEm);
  souljaBoyTellEm();
});

// Manually collect garbage every 30 seconds
setInterval(global.gc, 30 * 1000);
