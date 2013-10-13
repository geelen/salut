// import the module
var mdns = require('mdns');

// advertise a http server on port 54127
var ad = mdns.createAdvertisement(mdns.tcp('salut'), 54127);
ad.start();

process.on('SIGINT', function() {
  ad.stop();
  console.log('About to exit.');
});

var browser = mdns.createBrowser(mdns.tcp('salut'));
browser.on('serviceUp', function(service) {
  console.log("service up: ", service);
});
browser.on('serviceDown', function(service) {
  console.log("service down: ", service);
});
browser.start();
