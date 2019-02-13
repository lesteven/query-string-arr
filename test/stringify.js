const assert = require('assert')
const qsarr = require('../src/query-string-arr')

const { stringify } = qsarr

describe('stringify', () => {
  it('turns array to string', (done) => {
    const arr = [['d', '1'], ['a', '5']]
    const str = 'd=1&a=5'
    assert.strictEqual(stringify(arr), str)
    done()
  })
})

describe('stringify with objects', () => {
  it('turns obj to string', (done) => {
    const obj = { 'd':'1', 'a':'5' }
    const str = 'a=5&d=1'
    assert.strictEqual(stringify(obj), str)
    done()
  })
})
