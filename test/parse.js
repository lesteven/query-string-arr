const assert = require('assert')
const qsarr = require('../src/query-string-arr')

const { parse } = qsarr

describe('parse', () => {
  it('returns empty array if not string', (done) => {
    const notStr = 123
    assert.deepStrictEqual(parse(notStr), [])
    done()
  })
  it('returns empty array if string = ?', (done) => {
    const str = '?'
    assert.deepStrictEqual(parse(str), [])
    done()
  })
  it('turns string to array', (done) => {
    const arr = [['a', 1]]
    const str = '?a=1'
    assert.deepStrictEqual(parse(str), arr)
    done()
  })
  it('turns string to array 2 values', (done) => {
    const arr = [['z', 10], ['a', 1]]
    const str = '?z=10&a=1'
    assert.deepStrictEqual(parse(str), arr)
    done()
  })
})
