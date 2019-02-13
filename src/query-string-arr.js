const strictUriEncode = require('strict-uri-encode')
const decodeComponent = require('decode-uri-component')

// code heavily borrowed from https://github.com/sindresorhus/query-string

function parserForArrayFormat() {
  return (key, value, accumulator) => {
    if (accumulator[key] === undefined) {
      accumulator[key] = value
      return
    }

    accumulator[key] = [].concat(accumulator[key], value)
  }
}

function encode(value, options) {
  if (options.encode) {
    return options.strict ? strictUriEncode(value) : encodeURIComponent(value)
  }

  return value
}

function encoderForArrayFormat(options) {
  return (key, value) => (value === null ? encode(key, options) : [
    encode(key, options),
    '=',
    encode(value, options),
  ].join(''))
}

function decode(value, options) {
  if (options.decode) {
    return decodeComponent(value)
  }

  return value
}

function keysSorter(input) {
  if (Array.isArray(input)) {
    return input.sort()
  }

  if (typeof input === 'object') {
    return keysSorter(Object.keys(input))
      .sort((a, b) => Number(a) - Number(b))
      .map(key => input[key])
  }

  return input
}

function parse(input, type) {
  const options = Object.assign({ decode: true, arrayFormat: 'none' })

  const formatter = parserForArrayFormat(options)

  const ret = {}
  if (typeof input !== 'string') {
    if (type !== undefined && type.array) return []
    return ret
  }

  input = input.trim().replace(/^[?#&]/, '')

  if (!input) {
    if (type !== undefined && type.array) return []
    return ret
  }

  const keyOrder = []
  for (const param of input.split('&')) {
    let [key, value] = param.replace(/\+/g, ' ').split('=')

    // Missing `=` should be `null`:
    // http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
    value = value === undefined ? null : decode(value, options)
    key = decode(key, options)
    if (ret[key] === undefined) {
      keyOrder.push(key)
    }
    formatter(key, value, ret)
  }

  if (type !== undefined && type.array) {
    const arr = []
    for (key of keyOrder) {
      arr.push([key, ret[key]])
    }
    return arr
  }

  return Object.keys(ret).sort().reduce((result, key) => {
    const value = ret[key]
    if (Boolean(value) && typeof value === 'object' && !Array.isArray(value)) {
      // Sort object keys, not values
      result[key] = keysSorter(value)
    } else {
      result[key] = value
    }

    return result
  }, Object.create(null))
}

exports.parse = parse
