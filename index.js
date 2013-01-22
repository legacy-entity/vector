
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
 * @param {Vector} [vector]
 * or
 * @param {String} [s]
 * or
 * @param {int} x 
 * @param {int} y 
 * @param {int} z 
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

/**
 * Static values.
 */

Vector.maxDecimal = 2
Vector._dt = Math.floor(1000/60)
Vector.count = 0

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

Vector.prototype.toArray = function () {
  var arr = []
  this.each(function (n) { arr.push(n) })
  return arr
}

/**
 * Vector utils.
 */

Vector.prototype.dt = function (f) {
  if (f) return (Vector._dt = f)
  return this.copy().mul(Vector._dt)
}

/**
 * v.toString()
 * -or-
 * var str = "vector: "+v // casts
 *
 * Returns the Vector as a comma delimited
 * string of vector values.
 * 
 * @param {float} precision
 *
 * @return {String} comma delimited string of vector values
 */

Vector.prototype.toString = function (precision) {
  var s = this.toArray().map(function (n) { return n.toFixed() })
  return s.join(',')
}

/**
 * Returns this.
 *
 * @return {Vector} this
 */

Vector.prototype.get = function () {
  return this
}

/**
 * v.set(0,4,15)
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
 * v2 = v.copy()
 * 
 * Returns a copy of the Vector.
 *
 * @return {Vector} copy
 */

Vector.prototype.clone = 
Vector.prototype.copy = function () {
  return new Vector(this)
}



/**
 * a.interpolate(b, 0.75) // v(0,0).interpolate(v(4,4), 0.75) => v(3,3)
 */

Vector.prototype.interpolate = 
Vector.prototype.lerp = function (b, f) {
  this.plus(new Vector(b).minus(this).mul(f))
  return this
}

/**
 * v.limit(rectangle)
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
 * v.each(fn)
 */

Vector.prototype.each = function (fn) {
  for (var i = 1; i <= this.length; i++) {
    fn(this[i], i)
  }
  return this
}

/**
 * v.map(fn)
 */

Vector.prototype.map = function (fn) {
  for (var i = 1; i <= this.length; i++) {
    this[i] = fn(this[i], i)
  }
  return this
}

/**
 * v.abs() // -5 => 5, 5 => 5
 */

Vector.prototype.abs = 
Vector.prototype.absolute = function () {
  return this.map(Math.abs)
}

/**
 * v.neg() // 5 => -5
 */

Vector.prototype.neg = 
Vector.prototype.negate = function () { return this.map(function (n) { return -n }) }

Vector.prototype.half = function () { return this.div(2) }
Vector.prototype.double = function () { return this.mul(2) }
Vector.prototype.triple = function () { return this.mul(3) }
Vector.prototype.quad = function () { return this.mul(4) }

Vector.prototype.floor = function () { return this.map(Math.floor) }
Vector.prototype.round = function () { return this.map(Math.round) }
Vector.prototype.ceil = function () { return this.map(Math.ceil) }

Vector.prototype.pow = function (n) { return this.map(Math.pow.bind(this, n)) }
Vector.prototype.sqrt = function () { return this.map(Math.sqrt) }

Vector.prototype.atan2 = function () { return Math.atan2(this.y, this.x) }

/**
 * Return the modulus of this vector.
 */

Vector.prototype.mod = 
Vector.prototype.modulus = function () {
  return Math.sqrt(this.dot(this))
}

Vector.prototype.fill = function (len) {
  var x = 0, n
  for (var i = 1; i <= len; i++) {
    n = this[i]
    this[i] = 'undefined' != typeof n ? (x = n) : x
  }
}

/**
 * Vector methods accepting vector as argument.
 */

var V = {}

/**
 * v.max(-5) // -8 => -5, -2 => -2
 */

V.max = function (v) {
  return this.map(function (n,i) { return n < v[i] ? v[i] : n })
}

/**
 * v.min(5) // 8 => 5, 2 => 2
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
  var n = this.length + 1
  while (--n) {
    product += this[n] * vec[n]
  }
  return product
}

/**
 * Compute cross product against a vector.
 *
 * @param {Vector} b 
 * @return {Vector}
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
 * v.copyTo(vec)
 * 
 * Copies this vector's values and length
 * to another one and returns the other
 * vector.
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
 * v.rand(vec) // v(5,5,5).rand(1,0,1) => v(0.287438,5,0.898736)
 */

V.rand = function (vec) {
  return this.map(function (n,i) {
    if (i >= vec.length+1 || vec[i]) return Math.random()
    else return n
  })
}

V.add = V.plus = function (v) { return this.map(function (n,i) { return n+v[i] }) }
V.sub = V.minus = V.subtract = function (v) { return this.map(function (n,i) { return n-v[i] }) }

V.mul = V.times = V.x = function (v) { return this.map(function (n,i) { return n*v[i] }) }
V.div = V.divide = function (v) { return this.map(function (n,i) { return n/v[i] }) }

/*
V.lt = function (x, y, z) {
  return (this.x < x && this.y < y && this.z < z)
}

V.gt = function (x, y, z) {
  return (this.x > x && this.y > y && this.z > z)
}

V.lte = function (x, y, z) {
  return (this.x <= x && this.y <= y && this.z <= z)
}

V.gte = function (x, y, z) {
  return (this.x >= x && this.y >= y && this.z >= z)
}

V.eq =
V.equals = function (x, y, z) {
  return (this.x === x && this.y === y && this.z === z)
}
*/

/**
 * Vector inherits from V.
 */

inherits(Vector, V, function (fn) { 
  return function (b) {
    var a = this
    b = new Vector(b)
    if (b.length < a.length) {
      b.fill(a.length)
    }
    else if (b.length > a.length) {
      a.fill(b.length)
    }
    return fn.call(this, b)
  }
})

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
