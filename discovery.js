// import the module
var Q = require('q'),
  mdns = require('mdns'),
  net = require('net');

var port = 54127;
var connect = function (service) {
  return net.createConnection({host: service.host, port: service.port})
    .on('connect', function () {
      console.log("[" + service.host + "] CONNECTED");
    })
    .on('data', function (data) {
      console.log("[" + service.host + "] " + data.toString());
    })
};


module.exports = {
  connect: function (username, avatar) {
    var deferred = Q.defer();
    var Chat = {
      connections: {},
      onMessage: undefined, //bound once our server is up
      send: function (message) {
        var payload = JSON.stringify({username: username, avatar: avatar, body: message});
        Object.keys(Chat.connections).forEach(function (k) {
          Chat.connections[k].write(payload);
        });
      }
    };

    // Start our display server
    var display = net.createServer(function (socket) {
      Chat.onMessage = function (callback) {
        socket.on("data", function(data) {
          callback(JSON.parse(data));
        });
      };
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
        Chat.connections[service.name] = connect(service).on('connect', function () {
          this.write(JSON.stringify({username: username, avatar: avatar, body: "has joined the room"}));
        });
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
    };
    process.on('SIGINT', release);
    process.on('EXIT', release);

    return deferred.promise;
  }
};
