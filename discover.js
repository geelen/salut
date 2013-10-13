// import the module
var mdns = require('mdns');

// advertise a http server on port 54127
var ad = mdns.createAdvertisement(mdns.tcp('salut'), 5412, {txtRecord: "LOL"});
ad.start();

process.on('exit', function() {
  ad.stop();
  console.log('About to exit.');
});

// watch all http servers
//var browser = mdns.createBrowser(mdns.tcp('http'));
//browser.on('serviceUp', function(service) {
//  console.log("service up: ", service);
//});
//browser.on('serviceDown', function(service) {
//  console.log("service down: ", service);
//});
//browser.start();
//
// discover all available service types
//var browser = mdns.browseThemAll(); // all_the_types is just another browser...
//browser.on('serviceUp', function(service) {
//  console.log("service up: ", service);
//});
//browser.on('serviceDown', function(service) {
//  console.log("service down: ", service);
//});
//browser.start();
