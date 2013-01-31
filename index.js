
/**
 * References to array helpers.
 */

var slice = [].slice
var map = [].map

/**
 * Exports Vector.
 */

module.exports = Vector

/**
 * Vector class.
 *
 * @param {mixed} [val]
 */

function Vector (val) {
  switch (typeof val) {
    case 'number': {
      val = map.call(arguments, Number)
      break
    }
    case 'string': {
      val = val.split(',').map(Number)
      break
    }
    case 'object': {
      if (val instanceof Vector) {
        val = val.toArray()
      }
      break
    }
    default:
      val = [0]
      break
  }

  if (!(this instanceof Vector)) {
    return new Vector(val)
  }

  Vector.count++

  this.set(val)

  return this
}

Vector.d2 = function (vec) { return Vector(vec || [0,0]) }
Vector.d3 = function (vec) { return Vector(vec || [0,0,0]) }

// static values.

Vector.maxDecimal = 2
Vector.count = 0

// getters

Vector.prototype.__defineGetter__('x', function () { return this[1] })
Vector.prototype.__defineGetter__('y', function () { return this[2] })
Vector.prototype.__defineGetter__('z', function () { return this[3] })
Vector.prototype.__defineGetter__('X', function () { return this[1] })
Vector.prototype.__defineGetter__('Y', function () { return this[2] })
Vector.prototype.__defineGetter__('Z', function () { return this[3] })

Vector.prototype.__defineGetter__('a', function () { return this[1] })
Vector.prototype.__defineGetter__('b', function () { return this[2] })
Vector.prototype.__defineGetter__('c', function () { return this[3] })
Vector.prototype.__defineGetter__('A', function () { return this[1] })
Vector.prototype.__defineGetter__('B', function () { return this[2] })
Vector.prototype.__defineGetter__('C', function () { return this[3] })

Vector.prototype.__defineGetter__('left', function () { return this[1] })
Vector.prototype.__defineGetter__('top', function () { return this[2] })

Vector.prototype.__defineGetter__('width', function () { return this[1] })
Vector.prototype.__defineGetter__('height', function () { return this[2] })

// setters

Vector.prototype.__defineSetter__('x', function (v) { this[1] = v })
Vector.prototype.__defineSetter__('y', function (v) { this[2] = v })
Vector.prototype.__defineSetter__('z', function (v) { this[3] = v })
Vector.prototype.__defineSetter__('X', function (v) { this[1] = v })
Vector.prototype.__defineSetter__('Y', function (v) { this[2] = v })
Vector.prototype.__defineSetter__('Z', function (v) { this[3] = v })

Vector.prototype.__defineSetter__('a', function (v) { this[1] = v })
Vector.prototype.__defineSetter__('b', function (v) { this[2] = v })
Vector.prototype.__defineSetter__('c', function (v) { this[3] = v })
Vector.prototype.__defineSetter__('A', function (v) { this[1] = v })
Vector.prototype.__defineSetter__('B', function (v) { this[2] = v })
Vector.prototype.__defineSetter__('C', function (v) { this[3] = v })

Vector.prototype.__defineSetter__('left', function (v) { this[1] = v })
Vector.prototype.__defineSetter__('top', function (v) { this[2] = v })

Vector.prototype.__defineSetter__('width', function (v) { this[1] = v })
Vector.prototype.__defineSetter__('height', function (v) { this[2] = v })

/**
 * Convert to array.
 * 
 * @return {Array}
 */

Vector.prototype.toArray = function () {
  var arr = []
  this.each(function (n) { arr.push(n) })
  return arr
}

/**
 * Convert to string.
 *
 * Returns a comma delimited
 * string of vector components
 * with fixed with `precision`.
 * 
 * @param {int} [precision]
 * @return {string}
 */

Vector.prototype.toString = function (precision) {
  var s = this.toArray().map(function (n) { return n.toFixed(precision) })
  return s.join(',')
}

/**
 * Getter.
 *
 * @return {Vector} this
 */

Vector.prototype.get = function () {
  return this
}

/**
 * Setter.
 * 
 * Sets values from an Array
 * or Vector object or arguments.
 *
 * @return {Vector} this
 */

Vector.prototype.set = function (arr) {
  if (arr instanceof Vector) arr = arr.toArray()
  if (!Array.isArray(arr)) arr = slice.call(arguments)
  this.length = arr.length
  for (var i = 1; i <= this.length; i++) {
    this[i] = arr[i-1]
  }
  return this
}

/**
 * Clone.
 * 
 * @return {Vector} cloned
 */

Vector.prototype.clone =
Vector.prototype.copy = function () {
  return new Vector(this)
}

/**
 * Interpolate with another
 * Vector given an amount `f`.
 *
 * @param {Vector} b
 * @param {float} f
 * @return {Vector} this
 */

Vector.prototype.interpolate = 
Vector.prototype.lerp = function (b, f) {
  this.plus(new Vector(b).minus(this).mul(f))
  return this
}

/**
 * Limit with another vector
 * or within a rectangle.
 *
 * @param {Vector|Rect} r
 * @return {Vector} this
 */

Vector.prototype.limit = function (r) {
  if (r instanceof Vector) {
    this.max(r[1])
    this.min(r[2])
  }
  else {
    this.max(r.pos)
    this.min(r.size)
  }
  return this
}

/**
 * Iterate using `fn`.
 *
 * It will be called with `(vector, index)`.
 *
 * @param {fn} fn
 * @return {Vector} this
 */

Vector.prototype.each = function (fn) {
  for (var i = 1; i <= this.length; i++) {
    fn(this[i], i)
  }
  return this
}

/**
 * Map using `fn`.
 * 
 * It will be called with `(vector, index)`.
 * The returned values will be mapped
 * to this vector.
 *
 * @param {fn} fn 
 * @return {Vector} this
 */

Vector.prototype.map = function (fn) {
  for (var i = 1; i <= this.length; i++) {
    this[i] = fn(this[i], i)
  }
  return this
}

/**
 * Absolute.
 */

Vector.prototype.abs = 
Vector.prototype.absolute = function () {
  return this.map(Math.abs)
}

/**
 * Negate.
 */

Vector.prototype.neg = 
Vector.prototype.negate = function () { return this.map(function (n) { return -n }) }

/**
 * Dividers/Multipliers.
 */

Vector.prototype.half = function () { return this.div(2) }
Vector.prototype.double = function () { return this.mul(2) }
Vector.prototype.triple = function () { return this.mul(3) }
Vector.prototype.quad = function () { return this.mul(4) }

/**
 * Math utilities.
 */

Vector.prototype.floor = function () { return this.map(Math.floor) }
Vector.prototype.round = function () { return this.map(Math.round) }
Vector.prototype.ceil = function () { return this.map(Math.ceil) }

Vector.prototype.pow = function (p) { return this.map(function (n) { return Math.pow(n, p) }) }
Vector.prototype.sqrt = function () { return this.map(Math.sqrt) }

Vector.prototype.atan2 = function () { return Math.atan2(this.y, this.x) }

/**
 * Modulus or magnitude.
 */

Vector.prototype.mod = 
Vector.prototype.modulus = 
Vector.prototype.mag =
Vector.prototype.magnitude = function () {
  return Math.sqrt(this.dot(this))
}

/**
 * Fill components up to a length.
 * 
 * @param {int} len
 * @return {Vector} this
 */

Vector.prototype.fill = function (len) {
  var x = 0, n
  for (var i = 1; i <= len; i++) {
    n = this[i]
    this[i] = 'undefined' != typeof n ? (x = n) : x
  }
  this.length = len
  return this
}

/**
 * Vector methods accepting vector as argument.
 */

var V = {}

/**
 * Math.max
 */

V.max = function (v) {
  return this.map(function (n,i) { return n < v[i] ? v[i] : n })
}

/**
 * Math.min
 */

V.min = function (v) {
  return this.map(function (n,i) { return n > v[i] ? v[i] : n })
}

/**
 * Compute dot product against a vector.
 *
 * @param {Vector} vec 
 * @return {float} product
 */

V.dot = function (vec) {
  var product = 0
  this.each(function (n,i) { product += n*vec[i] })
  return product
}

/**
 * Compute cross product against a vector.
 *
 * @param {Vector} B
 * @return {Vector} product
 */

V.cross = function (B) {
  var A = this
  return new Vector([
    (A[2] * B[3]) - (A[3] * B[2])
  , (A[3] * B[1]) - (A[1] * B[3])
  , (A[1] * B[2]) - (A[2] * B[1])
  ])
}

/**
 * Copy to another vector.
 *
 * @param {Vector} vec
 * @return {Vector} vec
 */

V.copyTo = function (vec) {
  this.each(function (n,i) { vec[i] = n })
  vec.length = this.length
  return vec
}

/**
 * Randomize values.
 *
 * Example:
 *   v(5,5,5).rand(1,0,1)
 *
 * Outputs:
 *   v(0.287438,5,0.898736)
 */

V.rand = function (vec) {
  return this.map(function (n,i) {
    if (i >= vec.length+1 || vec[i]) return Math.random()
    else return n
  })
}

/**
 * Add.
 */

V.add = V.plus = function (v) { return this.map(function (n,i) { return n+v[i] }) }

/**
 * Subtract.
 */

V.sub = V.minus = V.subtract = function (v) { return this.map(function (n,i) { return n-v[i] }) }

/**
 * Multiply.
 */

V.mul = V.times = V.x = function (v) { return this.map(function (n,i) { return n*v[i] }) }

/**
 * Divide.
 */

V.div = V.divide = function (v) { return this.map(function (n,i) { return n/v[i] }) }

/**
 * Equalities.
 */

V.eq = V.equals = V.equal = function (v) {
  var fail = this.length
  this.each(function (n,i) { if (n===v[i]) fail-- })
  return !fail
}

V.lt = function (v) {
  var fail = this.length
  this.each(function (n,i) { if (n<v[i]) fail-- })
  return !fail
}

V.gt = function (v) {
  var fail = this.length
  this.each(function (n,i) { if (n>v[i]) fail-- })
  return !fail
}

V.lte = function (v) {
  var fail = this.length
  this.each(function (n,i) { if (n<=v[i]) fail-- })
  return !fail
}

V.gte = function (v) {
  var fail = this.length
  this.each(function (n,i) { if (n>=v[i]) fail-- })
  return !fail
}

/**
 * Vector inherits from V.
 */

inherits(Vector, V, function (fn) { 
  return function (b) {
    var a = this
    b = new Vector(
      Array.isArray(b) || b instanceof Vector
        ? b
        : slice.call(arguments)
    )
    if (b.length < a.length) {
      b.fill(a.length)
    }
    else if (b.length > a.length) {
      a.fill(b.length)
    }
    return fn.call(this, b)
  }
})

// Levi-Civita

Vector.i = Vector.I = new Vector([1,0,0])
Vector.j = Vector.J = new Vector([0,1,0])
Vector.k = Vector.K = new Vector([0,0,1])

/**
 * Target inherits source methods but
 * with a special modifying function.
 * It is called with `(fn)`.
 * and must return a function.
 *
 * @param {object} t
 * @param {object} s 
 * @param {function} m
 * @return {object} t
 * @api private
 */

function inherits (t, s, m) {
  Object.keys(s).forEach(function (k) {
    var fn = s[k]
    t.prototype[k] = m(fn)
  })
  return t
}
