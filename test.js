
var os = require('os');
var test = require('tap').test;
var isme = require('./isme.js');

var publicIp = (function () {
  var interfaces = os.networkInterfaces();
  for (var name in interfaces) {
    if (interfaces.hasOwnProperty(name) === false) continue;

    var addresses = interfaces[name];
    for (var i = 0; i < addresses.length; i++) {
      if (addresses[i].internal === false) {
        return addresses[i].address;
      }
    }
  }

  return '0.0.0.0';
})();

test('all match is default', function(t) {
  t.equal(isme('::1'), true, 'test loopback IPv6');
  t.equal(isme('127.0.0.1'), true, 'test loopback IPv4');

  t.equal(isme('::0'), true, 'test any IPv6');
  t.equal(isme('0.0.0.0'), true, 'test any IPv4');

  t.equal(isme(publicIp), true, 'test loopback');
  t.end();
});

test('local address only', function(t) {
  t.equal(isme('::1', 'local'), true, 'test loopback IPv6');
  t.equal(isme('127.0.0.1', 'local'), true, 'test loopback IPv4');

  t.equal(isme('::0', 'local'), true, 'test any IPv6');
  t.equal(isme('0.0.0.0', 'local'), true, 'test any IPv4');

  t.equal(isme(publicIp, 'local'), false, 'test public IP');
  t.end();
});

test('public address only', function(t) {
  t.equal(isme('::1', 'public'), false, 'test loopback IPv6');
  t.equal(isme('127.0.0.1', 'public'), false, 'test loopback IPv4');

  t.equal(isme('::0', 'public'), true, 'test any IPv6');
  t.equal(isme('0.0.0.0', 'public'), true, 'test any IPv4');

  t.equal(isme(publicIp, 'public'), true, 'test public IP');
  t.end();
});

test('any address only', function(t) {
  t.equal(isme('::1', 'any'), false, 'test loopback IPv6');
  t.equal(isme('127.0.0.1', 'any'), false, 'test loopback IPv4');

  t.equal(isme('::0', 'any'), true, 'test any IPv6');
  t.equal(isme('0.0.0.0', 'any'), true, 'test any IPv4');

  t.equal(isme(publicIp, 'any'), false, 'test public IP');
  t.end();
});

test('feature address only', function(t) {
  t.equal(isme('::1', 'any'), false, 'test loopback IPv6');
  t.equal(isme('127.0.0.1', 'any'), false, 'test loopback IPv4');

  t.equal(isme('::0', 'any'), true, 'test any IPv6');
  t.equal(isme('0.0.0.0', 'any'), true, 'test any IPv4');

  t.equal(isme(publicIp, 'any'), false, 'test public IP');
  t.end();
});

test('invalid IP throws', function(t) {
  try {
    isme('12321');
  } catch (e) {
    t.equal(e.message, 'first arguemnt is an invalid IP address');
  }

  t.end();
});

test('invalid where argument throws', function(t) {
  try {
    isme('::1', 'invalid');
  } catch (e) {
    t.equal(e.message, 'second arguemnt has an invalid value');
  }

  t.end();
});
