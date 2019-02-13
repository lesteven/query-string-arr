const assert = require('assert')
const qsarr = require('../src/query-string-arr')

const { stringify } = qsarr

describe('stringify', () => {
  it('turns array to string (empty arr)', (done) => {
    const arr = []
    const str = ''
    assert.strictEqual(stringify(arr), str)
    done()
  })
  it('turns array to string (1)', (done) => {
    const arr = [['a', '5']]
    const str = 'a=5'
    assert.strictEqual(stringify(arr), str)
    done()
  })
  it('turns array to string (2)', (done) => {
    const arr = [['d', '1'], ['a', '5']]
    const str = 'd=1&a=5'
    assert.strictEqual(stringify(arr), str)
    done()
  })
  it('turns array to string (3)', (done) => {
    const arr = [['m', 20], ['d', '1'], ['a', '5']]
    const str = 'm=20&d=1&a=5'
    assert.strictEqual(stringify(arr), str)
    done()
  })
})

describe('stringify with objects', () => {
  it('turns obj to string (empty) ', (done) => {
    const obj = {}
    const str = ''
    assert.strictEqual(stringify(obj), str)
    done()
  })
  it('turns obj to string (1)', (done) => {
    const obj = {'a':'5' }
    const str = 'a=5'
    assert.strictEqual(stringify(obj), str)
    done()
  })
  it('turns obj to string (2)', (done) => {
    const obj = { 'd':'1', 'a':'5' }
    const str = 'a=5&d=1'
    assert.strictEqual(stringify(obj), str)
    done()
  })
  it('turns obj to string (3)', (done) => {
    const obj = { 'd':'1', 'z': 10, 'a':'5' }
    const str = 'a=5&d=1&z=10'
    assert.strictEqual(stringify(obj), str)
    done()
  })
})
