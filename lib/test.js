/* eslint-env mocha */

const should = require('should')
const ibutton = require('../')

describe('ibutton', function () {
  it('should return iButton from String', function () {
    let button = ibutton.from('c400001759ddb101')
    button.toString('hex').toUpperCase().should.equal('C400001759DDB101')
  })
  it('should work for the zero iButton', function () {
    let button = ibutton.from('0000000000000000')
    button.toString('hex').toUpperCase().should.equal('0000000000000000')
  })
  it('should work for all the iButtons I have on my desk', function () {
    const buttons = [
      '0e0000010f111f08',
      'f0000013397c6101',
      'c400001759ddb101',
      '720000175a582801',
      'c600000121fcf908'
    ]
    for (let button of buttons) {
      let ib = ibutton.from(button)
      ib.toString('hex').toUpperCase().should.equal(button.toUpperCase())
    }
  })
  it('should return iButton from Array', function () {
    let button = ibutton.from([0xc4, 0, 0, 0x17, 0x59, 0xdd, 0xb1, 0x1])
    button.toString('hex').toUpperCase().should.equal('C400001759DDB101')
  })
  it('should return iButton from Buffer', function () {
    let button = ibutton.from(Buffer.from([0xc4, 0, 0, 0x17, 0x59, 0xdd, 0xb1, 0x1]))
    button.toString('hex').toUpperCase().should.equal('C400001759DDB101')
  })
  it('should implement byte-reversal detection', function () {
    let button = ibutton.from('01b1dd59170000c4')
    button.toString('hex').toUpperCase().should.equal('C400001759DDB101')
  })
  it('should return null for checksum errors', function () {
    let button = ibutton.from('01b1dd59170000c3')
    should.not.exist(button)
  })
  it('should return null for incorrect length', function () {
    let button = ibutton.from('01b1dd59170000c4a')
    should.not.exist(button)
  })
})
