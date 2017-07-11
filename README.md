# Maxim iButton® reading

Ensure you have correct iButton® serial number, even if the bytes come to you
reversed.

## Usage

```javascript
const iButton = require('ibutton')
let button
button = iButton.from('C400001759DDB101') // same as Buffer.from('C400001759DDB101')
button = iButton.from('01B1DD59170000C4') // same Buffer, although bytes reversed
button = iButton.from('0000001759DDB101') // null (bad checksum)
button = iButton.from('C400001759DDB1')   // null (wrong length)
```

## API

### ibutton.from(string|Array|Buffer)

Given a hex string, a byte Array or a Buffer, returns:
- null, if data cannot be a valid iButton®
- Buffer, if data is valid iButton® serial number (see note about byte order)

### ibutton.crc(Buffer)

Given a Buffer, returns
the [CRC](https://www.maximintegrated.com/en/app-notes/index.mvp/id/27)
calculated for Maxim 1-Wire & iButton® products. For a valid iButton®, this will
be zero.

## Byte order (a.k.a. why this library exists)

When you look at an iButton®, the serial number is printed something like this:

```text
  C4        01
  00001759DDB1
```

The `C4` on the upper left is the checksum value, and `01` on the upper right is
a "family code" that identifies the iButton® product.

In Maxim's documentation, the checksum is Byte 7 and the family code is Byte 0.

I think most people would read this serial number as "C400001759DDB101".

This library treats this intuitive order as the "correct" one, i.e. the Buffer
returned from `iButton.from()` will be in this order.

Also, `iButton.crc()` expects this order, for example:

```javascript
iButton.crc(Buffer.from('00001759DDB101', 'hex')) // 0xC4
iButton.crc(Buffer.from('C400001759DDB101', 'hex')) // zero
```

In fact, this library mostly exists because of differences in the way data is
reported by various GPS tracking devices sold by my
employer, [Bornemann AG](http://www.bornemann.net/).

If you need your bytes the other way around:

```javascript
Array.prototype.reverse.call(buttonBuffer)
```
