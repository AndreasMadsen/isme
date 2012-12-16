
var os = require('os');
var net = require('net');

function matchType(internal, where) {
  switch (where) {
    case 'local': return internal === true;
    case 'public': return internal === false;
    default: return true;
  }

  return true;
}

module.exports = function (address, where) {
  if (where !== undefined &&
      ['any', 'local', 'public'].indexOf(where) === -1) {
    throw new Error('second arguemnt has an invalid value');
  }

  if (net.isIP(address) === 0) {
    throw new Error('first arguemnt is an invalid IP address');
  }

  if (address === '0.0.0.0' || address === '::0') return true;
  if (where === 'any') return false;

  var interfaces = os.networkInterfaces();
  for (var name in interfaces) {
    if (interfaces.hasOwnProperty(name) === false) continue;

    var addresses = interfaces[name];
    for (var i = 0; i < addresses.length; i++) {
      if (addresses[i].address === address &&
          matchType(addresses[i].internal, where)) {
        return true;
      }
    }
  }

  return false;
};
