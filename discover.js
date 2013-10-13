// import the module
var mdns = require('mdns'),
  net = require('net');

// advertise a http server on port 54127
var ad = mdns.createAdvertisement(mdns.tcp('salut'), 54127);
ad.start();

var clients = {};

var client = function (service) {
  return {
    service: service,
    socket: net.createConnection({host: service.host, port: service.port})
      .on('connect', function () {
        console.log("[" + service.host + "] CONNECTED");
        this.write("WHATUP!");
      })
      .on('data', function (data) {
        console.log("[" + service.host + "] " + data.toString());
      })
  }
};

var browser = mdns.createBrowser(mdns.tcp('salut'));
browser.on('serviceUp', function (service) {
  console.log("service up: ", service);
  clients[service.name] = client(service);
});
browser.on('serviceDown', function (service) {
  var client = clients[service.name];
  if (client) {
    delete clients[service.name];
    client.socket.end();
  }
  console.log("service down: ", service);
});
browser.start();


var server = net.createServer(function (socket) {
  socket.on("data", function(data) {
    console.log("DAT DATA: " + data.toString());
    socket.write("OK YOU FUCKERS")
  })
  console.log("Got us a socket!");
}).listen(54127);

var release = function () {
  Object.keys(clients).forEach(function (k) {
    clients[k].socket.end();
  });
  ad.stop();
  browser.stop();
  server.close();
  console.log('About to exit.');
};
process.on('SIGINT', release);
process.on('EXIT', release);
