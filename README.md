#isme

> Check that ip match this computer

## Installation

```sheel
npm install isme
```

## Documentation

`isme` takes a ip string, and returns `true` if is was recognised as a network
interface address. There is a second optional argument there limits the scan,
it can be `local`, `public` or `any`.

```JavaScript
  var isme = require('isme');
  var assert = require('assert');

  assert.ok(isme('127.0.0.1')); // IPv4 works
  assert.ok(isme('::1')); // IPv6 works
  assert.ok(isme('0.0.0.0')); // any IPv4 works
  assert.ok(isme('::0')); // any IPv6 works
  assert.ok(isme('192.168.0.198')); // public IPv4

  //'local' only matchs loopback addresses
  assert.equal(isme('::1', 'local'), true);
  assert.equal(isme('192.168.0.198', 'local'), false);

  //'public' only matchs public addresses
  assert.equal(isme('::1', 'local'), false);
  assert.equal(isme('192.168.0.198', 'local'), true);

  //'any' only matchs any addresses
  assert.equal(isme('0.0.0.0', 'any'), true);
  assert.equal(isme('::0', 'any'), true);
  assert.equal(isme('127.0.0.1', 'any'), false); // anything else fails
```

##License

**The software is license under "MIT"**

> Copyright (c) 2012 Andreas Madsen
>
> Permission is hereby granted, free of charge, to any person obtaining a copy
> of this software and associated documentation files (the "Software"), to deal
> in the Software without restriction, including without limitation the rights
> to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
> copies of the Software, and to permit persons to whom the Software is
> furnished to do so, subject to the following conditions:
>
> The above copyright notice and this permission notice shall be included in
> all copies or substantial portions of the Software.
>
> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
> IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
> FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
> AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
> LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
> OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
> THE SOFTWARE.
