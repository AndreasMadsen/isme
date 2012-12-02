
var test = require('tap').test;
var isme = require('./isme.js');

test('localhost is me', function(t) {
  t.ok(isme('::1'), 'test loopback IPv6');
  t.ok(isme('127.0.0.1'), 'test loopback IPv4');
  t.end();
});
