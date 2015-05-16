// Log memory usage before doing GC. Seems to blow up the file limit sooner than without.
var gcLog = function () {
  console.log(new Date().toISOString() + JSON.stringify(process.memoryUsage()));
  gc();
};

// Tell original client how many clients are connected
var reporter = function () {
  if (this.clients[0]) this.clients[0].send(this.clients.length.toString());
};

// Garbage collect every 30 seconds
setInterval(gc, 30 * 1000);

// Create the WS server
new (require('ws').Server)({

  // Attach it to an HTTP server that serves a tiny web client
  server: require('http').createServer(function (req, res) {

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<script>new WebSocket("ws://"+location.host).onmessage=function(msg){document.body.innerText=msg.data;};</script>');

  }).listen(process.env.PORT || 5000)

// Call the reporter on connection and close events
}).on('connection', function (connection) {
  reporter.call(this);
  connection.on('close', reporter.bind(this));
});
