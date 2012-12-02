
var os = require('os');

var address = [];
var interfaces = os.networkInterfaces();
Object.keys(interfaces).forEach(function (name) {
  interfaces[name].forEach(function (object) {
    address.push(object.address);
  });
});

module.exports = function (check) {
  return address.indexOf(check) !== -1;
};
