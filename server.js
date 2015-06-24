var fs = require('fs');
var ws = require('ws');
var http = require('http');
var randomBytes = require('crypto').randomBytes;

var html = fs.readFileSync('./index.html');
var browsers = [];

var www = http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(html);
}).listen(process.env.PORT || 5000);

var wss = new ws.Server({
  server: www
}).on('connection', function (socket) {
  socket.on('message', onmessage);
  socket.on('close', logSocketCount);
  logSocketCount();
});

// Log memory usage before doing GC. Seems to blow up the file limit sooner than without.
setInterval(logMemoryUsage, 30 * 1000);

function logMemoryUsage () {
  console.log(new Date().toISOString() + JSON.stringify(process.memoryUsage()));
  gc();
}

function getSocketCount () {
  return wss.clients.length.toString();
}

function logSocketCount () {
  var n = getSocketCount();
  browsers.forEach(function (b) {
    b.readyState === 1 && b.send(n);
  });
  console.log(n);
}

function onmessage (message) {
  if (message === 'browser') {
    this.removeListener('message', onmessage);
    browsers.push(this);
    this.on('close', function () {
      browsers.splice(browsers.indexOf(this), 1);
    });
    this.send(getSocketCount());
  } else {
    var self = this;
    setTimeout(function () {
      if (self.readyState === 1) {
        self.send(randomBytes(message.length));
      }
    }, Math.random() * 1000);
  }
}
