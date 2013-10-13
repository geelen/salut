// import the module
var Q = require('q'),
  mdns = require('mdns'),
  net = require('net'),
  JsonSocket = require('json-socket'),
  EventEmitter = require('events').EventEmitter;

var port = 54127;
var connect = function (service) {
  return new JsonSocket(net.createConnection({host: service.host, port: service.port}));
};

module.exports = {
  connect: function (username, avatar) {
    var deferred = Q.defer();

    var Chat = new EventEmitter();
    Chat.connections = {};
    Chat.send = function (message) {
      Object.keys(Chat.connections).forEach(function (k) {
        Chat.connections[k].sendMessage({username: username, avatar: avatar, body: message});
      });
    };

    // Start our display server
    var display = net.createServer(function (_socket) {
      var socket = new JsonSocket(_socket);
      socket.on("message", function (m) {
        Chat.emit("message", m);
      });
      // Our server is up, our methods are bound, we're good to go.
      deferred.resolve(Chat);
    }).listen(port);

    // advertise our display
    var ad = mdns.createAdvertisement(mdns.tcp('salut'), port);
    ad.start();

    // Look for other chatters
    var browser = mdns.createBrowser(mdns.tcp('salut'));
    browser.on('serviceUp', function (service) {
      console.log("Service UP: " + service.name);
      var connection = Chat.connections[service.name];
      if (!connection) {
        connection = connect(service);
        connection.on('connect', function () {
          connection.sendMessage({username: username, avatar: avatar, body: "has joined the room"});
        });
        Chat.connections[service.name] = connection;
      }
    });
    browser.on('serviceDown', function (service) {
      console.log("Service DOWN: " + service.name)
      var connection = Chat.connections[service.name];
      if (connection) {
        delete Chat.connections[service.name];
        connection.end();
      }
    });
    browser.start();

    // Cleanup
    var release = function () {
      Object.keys(Chat.connections).forEach(function (k) {
        Chat.connections[k].end();
      });
      ad.stop();
      browser.stop();
      display.close();
      console.log('Everything stopped. Exiting.');
      process.exit();
    };
    process.on('SIGINT', release);
    process.on('EXIT', release);

    return deferred.promise;
  }
};
