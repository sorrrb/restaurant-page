(self["webpackChunkrestaurant_page"] = self["webpackChunkrestaurant_page"] || []).push([["index"],{

/***/ "./node_modules/assert/build/assert.js":
/*!*********************************************!*\
  !*** ./node_modules/assert/build/assert.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/* provided dependency */ var process = __webpack_require__(/*! ./node_modules/process/browser.js */ "./node_modules/process/browser.js");
/* provided dependency */ var console = __webpack_require__(/*! ./node_modules/console-browserify/index.js */ "./node_modules/console-browserify/index.js");
// Currently in sync with Node.js lib/assert.js
// https://github.com/nodejs/node/commit/2a51ae424a513ec9a6aa3466baa0cc1d55dd4f3b

// Originally from narwhal.js (http://narwhaljs.org)
// Copyright (c) 2009 Thomas Robinson <280north.com>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the 'Software'), to
// deal in the Software without restriction, including without limitation the
// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
// sell copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
// ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.



function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
var _require = __webpack_require__(/*! ./internal/errors */ "./node_modules/assert/build/internal/errors.js"),
  _require$codes = _require.codes,
  ERR_AMBIGUOUS_ARGUMENT = _require$codes.ERR_AMBIGUOUS_ARGUMENT,
  ERR_INVALID_ARG_TYPE = _require$codes.ERR_INVALID_ARG_TYPE,
  ERR_INVALID_ARG_VALUE = _require$codes.ERR_INVALID_ARG_VALUE,
  ERR_INVALID_RETURN_VALUE = _require$codes.ERR_INVALID_RETURN_VALUE,
  ERR_MISSING_ARGS = _require$codes.ERR_MISSING_ARGS;
var AssertionError = __webpack_require__(/*! ./internal/assert/assertion_error */ "./node_modules/assert/build/internal/assert/assertion_error.js");
var _require2 = __webpack_require__(/*! util/ */ "./node_modules/util/util.js"),
  inspect = _require2.inspect;
var _require$types = (__webpack_require__(/*! util/ */ "./node_modules/util/util.js").types),
  isPromise = _require$types.isPromise,
  isRegExp = _require$types.isRegExp;
var objectAssign = __webpack_require__(/*! object.assign/polyfill */ "./node_modules/object.assign/polyfill.js")();
var objectIs = __webpack_require__(/*! object-is/polyfill */ "./node_modules/object-is/polyfill.js")();
var RegExpPrototypeTest = __webpack_require__(/*! call-bind/callBound */ "./node_modules/call-bind/callBound.js")('RegExp.prototype.test');
var errorCache = new Map();
var isDeepEqual;
var isDeepStrictEqual;
var parseExpressionAt;
var findNodeAround;
var decoder;
function lazyLoadComparison() {
  var comparison = __webpack_require__(/*! ./internal/util/comparisons */ "./node_modules/assert/build/internal/util/comparisons.js");
  isDeepEqual = comparison.isDeepEqual;
  isDeepStrictEqual = comparison.isDeepStrictEqual;
}

// Escape control characters but not \n and \t to keep the line breaks and
// indentation intact.
// eslint-disable-next-line no-control-regex
var escapeSequencesRegExp = /[\x00-\x08\x0b\x0c\x0e-\x1f]/g;
var meta = ["\\u0000", "\\u0001", "\\u0002", "\\u0003", "\\u0004", "\\u0005", "\\u0006", "\\u0007", '\\b', '', '', "\\u000b", '\\f', '', "\\u000e", "\\u000f", "\\u0010", "\\u0011", "\\u0012", "\\u0013", "\\u0014", "\\u0015", "\\u0016", "\\u0017", "\\u0018", "\\u0019", "\\u001a", "\\u001b", "\\u001c", "\\u001d", "\\u001e", "\\u001f"];
var escapeFn = function escapeFn(str) {
  return meta[str.charCodeAt(0)];
};
var warned = false;

// The assert module provides functions that throw
// AssertionError's when particular conditions are not met. The
// assert module must conform to the following interface.

var assert = module.exports = ok;
var NO_EXCEPTION_SENTINEL = {};

// All of the following functions must throw an AssertionError
// when a corresponding condition is not met, with a message that
// may be undefined if not provided. All assertion methods provide
// both the actual and expected values to the assertion error for
// display purposes.

function innerFail(obj) {
  if (obj.message instanceof Error) throw obj.message;
  throw new AssertionError(obj);
}
function fail(actual, expected, message, operator, stackStartFn) {
  var argsLen = arguments.length;
  var internalMessage;
  if (argsLen === 0) {
    internalMessage = 'Failed';
  } else if (argsLen === 1) {
    message = actual;
    actual = undefined;
  } else {
    if (warned === false) {
      warned = true;
      var warn = process.emitWarning ? process.emitWarning : console.warn.bind(console);
      warn('assert.fail() with more than one argument is deprecated. ' + 'Please use assert.strictEqual() instead or only pass a message.', 'DeprecationWarning', 'DEP0094');
    }
    if (argsLen === 2) operator = '!=';
  }
  if (message instanceof Error) throw message;
  var errArgs = {
    actual: actual,
    expected: expected,
    operator: operator === undefined ? 'fail' : operator,
    stackStartFn: stackStartFn || fail
  };
  if (message !== undefined) {
    errArgs.message = message;
  }
  var err = new AssertionError(errArgs);
  if (internalMessage) {
    err.message = internalMessage;
    err.generatedMessage = true;
  }
  throw err;
}
assert.fail = fail;

// The AssertionError is defined in internal/error.
assert.AssertionError = AssertionError;
function innerOk(fn, argLen, value, message) {
  if (!value) {
    var generatedMessage = false;
    if (argLen === 0) {
      generatedMessage = true;
      message = 'No value argument passed to `assert.ok()`';
    } else if (message instanceof Error) {
      throw message;
    }
    var err = new AssertionError({
      actual: value,
      expected: true,
      message: message,
      operator: '==',
      stackStartFn: fn
    });
    err.generatedMessage = generatedMessage;
    throw err;
  }
}

// Pure assertion tests whether a value is truthy, as determined
// by !!value.
function ok() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  innerOk.apply(void 0, [ok, args.length].concat(args));
}
assert.ok = ok;

// The equality assertion tests shallow, coercive equality with ==.
/* eslint-disable no-restricted-properties */
assert.equal = function equal(actual, expected, message) {
  if (arguments.length < 2) {
    throw new ERR_MISSING_ARGS('actual', 'expected');
  }
  // eslint-disable-next-line eqeqeq
  if (actual != expected) {
    innerFail({
      actual: actual,
      expected: expected,
      message: message,
      operator: '==',
      stackStartFn: equal
    });
  }
};

// The non-equality assertion tests for whether two objects are not
// equal with !=.
assert.notEqual = function notEqual(actual, expected, message) {
  if (arguments.length < 2) {
    throw new ERR_MISSING_ARGS('actual', 'expected');
  }
  // eslint-disable-next-line eqeqeq
  if (actual == expected) {
    innerFail({
      actual: actual,
      expected: expected,
      message: message,
      operator: '!=',
      stackStartFn: notEqual
    });
  }
};

// The equivalence assertion tests a deep equality relation.
assert.deepEqual = function deepEqual(actual, expected, message) {
  if (arguments.length < 2) {
    throw new ERR_MISSING_ARGS('actual', 'expected');
  }
  if (isDeepEqual === undefined) lazyLoadComparison();
  if (!isDeepEqual(actual, expected)) {
    innerFail({
      actual: actual,
      expected: expected,
      message: message,
      operator: 'deepEqual',
      stackStartFn: deepEqual
    });
  }
};

// The non-equivalence assertion tests for any deep inequality.
assert.notDeepEqual = function notDeepEqual(actual, expected, message) {
  if (arguments.length < 2) {
    throw new ERR_MISSING_ARGS('actual', 'expected');
  }
  if (isDeepEqual === undefined) lazyLoadComparison();
  if (isDeepEqual(actual, expected)) {
    innerFail({
      actual: actual,
      expected: expected,
      message: message,
      operator: 'notDeepEqual',
      stackStartFn: notDeepEqual
    });
  }
};
/* eslint-enable */

assert.deepStrictEqual = function deepStrictEqual(actual, expected, message) {
  if (arguments.length < 2) {
    throw new ERR_MISSING_ARGS('actual', 'expected');
  }
  if (isDeepEqual === undefined) lazyLoadComparison();
  if (!isDeepStrictEqual(actual, expected)) {
    innerFail({
      actual: actual,
      expected: expected,
      message: message,
      operator: 'deepStrictEqual',
      stackStartFn: deepStrictEqual
    });
  }
};
assert.notDeepStrictEqual = notDeepStrictEqual;
function notDeepStrictEqual(actual, expected, message) {
  if (arguments.length < 2) {
    throw new ERR_MISSING_ARGS('actual', 'expected');
  }
  if (isDeepEqual === undefined) lazyLoadComparison();
  if (isDeepStrictEqual(actual, expected)) {
    innerFail({
      actual: actual,
      expected: expected,
      message: message,
      operator: 'notDeepStrictEqual',
      stackStartFn: notDeepStrictEqual
    });
  }
}
assert.strictEqual = function strictEqual(actual, expected, message) {
  if (arguments.length < 2) {
    throw new ERR_MISSING_ARGS('actual', 'expected');
  }
  if (!objectIs(actual, expected)) {
    innerFail({
      actual: actual,
      expected: expected,
      message: message,
      operator: 'strictEqual',
      stackStartFn: strictEqual
    });
  }
};
assert.notStrictEqual = function notStrictEqual(actual, expected, message) {
  if (arguments.length < 2) {
    throw new ERR_MISSING_ARGS('actual', 'expected');
  }
  if (objectIs(actual, expected)) {
    innerFail({
      actual: actual,
      expected: expected,
      message: message,
      operator: 'notStrictEqual',
      stackStartFn: notStrictEqual
    });
  }
};
var Comparison = /*#__PURE__*/_createClass(function Comparison(obj, keys, actual) {
  var _this = this;
  _classCallCheck(this, Comparison);
  keys.forEach(function (key) {
    if (key in obj) {
      if (actual !== undefined && typeof actual[key] === 'string' && isRegExp(obj[key]) && RegExpPrototypeTest(obj[key], actual[key])) {
        _this[key] = actual[key];
      } else {
        _this[key] = obj[key];
      }
    }
  });
});
function compareExceptionKey(actual, expected, key, message, keys, fn) {
  if (!(key in actual) || !isDeepStrictEqual(actual[key], expected[key])) {
    if (!message) {
      // Create placeholder objects to create a nice output.
      var a = new Comparison(actual, keys);
      var b = new Comparison(expected, keys, actual);
      var err = new AssertionError({
        actual: a,
        expected: b,
        operator: 'deepStrictEqual',
        stackStartFn: fn
      });
      err.actual = actual;
      err.expected = expected;
      err.operator = fn.name;
      throw err;
    }
    innerFail({
      actual: actual,
      expected: expected,
      message: message,
      operator: fn.name,
      stackStartFn: fn
    });
  }
}
function expectedException(actual, expected, msg, fn) {
  if (typeof expected !== 'function') {
    if (isRegExp(expected)) return RegExpPrototypeTest(expected, actual);
    // assert.doesNotThrow does not accept objects.
    if (arguments.length === 2) {
      throw new ERR_INVALID_ARG_TYPE('expected', ['Function', 'RegExp'], expected);
    }

    // Handle primitives properly.
    if (_typeof(actual) !== 'object' || actual === null) {
      var err = new AssertionError({
        actual: actual,
        expected: expected,
        message: msg,
        operator: 'deepStrictEqual',
        stackStartFn: fn
      });
      err.operator = fn.name;
      throw err;
    }
    var keys = Object.keys(expected);
    // Special handle errors to make sure the name and the message are compared
    // as well.
    if (expected instanceof Error) {
      keys.push('name', 'message');
    } else if (keys.length === 0) {
      throw new ERR_INVALID_ARG_VALUE('error', expected, 'may not be an empty object');
    }
    if (isDeepEqual === undefined) lazyLoadComparison();
    keys.forEach(function (key) {
      if (typeof actual[key] === 'string' && isRegExp(expected[key]) && RegExpPrototypeTest(expected[key], actual[key])) {
        return;
      }
      compareExceptionKey(actual, expected, key, msg, keys, fn);
    });
    return true;
  }
  // Guard instanceof against arrow functions as they don't have a prototype.
  if (expected.prototype !== undefined && actual instanceof expected) {
    return true;
  }
  if (Error.isPrototypeOf(expected)) {
    return false;
  }
  return expected.call({}, actual) === true;
}
function getActual(fn) {
  if (typeof fn !== 'function') {
    throw new ERR_INVALID_ARG_TYPE('fn', 'Function', fn);
  }
  try {
    fn();
  } catch (e) {
    return e;
  }
  return NO_EXCEPTION_SENTINEL;
}
function checkIsPromise(obj) {
  // Accept native ES6 promises and promises that are implemented in a similar
  // way. Do not accept thenables that use a function as `obj` and that have no
  // `catch` handler.

  // TODO: thenables are checked up until they have the correct methods,
  // but according to documentation, the `then` method should receive
  // the `fulfill` and `reject` arguments as well or it may be never resolved.

  return isPromise(obj) || obj !== null && _typeof(obj) === 'object' && typeof obj.then === 'function' && typeof obj.catch === 'function';
}
function waitForActual(promiseFn) {
  return Promise.resolve().then(function () {
    var resultPromise;
    if (typeof promiseFn === 'function') {
      // Return a rejected promise if `promiseFn` throws synchronously.
      resultPromise = promiseFn();
      // Fail in case no promise is returned.
      if (!checkIsPromise(resultPromise)) {
        throw new ERR_INVALID_RETURN_VALUE('instance of Promise', 'promiseFn', resultPromise);
      }
    } else if (checkIsPromise(promiseFn)) {
      resultPromise = promiseFn;
    } else {
      throw new ERR_INVALID_ARG_TYPE('promiseFn', ['Function', 'Promise'], promiseFn);
    }
    return Promise.resolve().then(function () {
      return resultPromise;
    }).then(function () {
      return NO_EXCEPTION_SENTINEL;
    }).catch(function (e) {
      return e;
    });
  });
}
function expectsError(stackStartFn, actual, error, message) {
  if (typeof error === 'string') {
    if (arguments.length === 4) {
      throw new ERR_INVALID_ARG_TYPE('error', ['Object', 'Error', 'Function', 'RegExp'], error);
    }
    if (_typeof(actual) === 'object' && actual !== null) {
      if (actual.message === error) {
        throw new ERR_AMBIGUOUS_ARGUMENT('error/message', "The error message \"".concat(actual.message, "\" is identical to the message."));
      }
    } else if (actual === error) {
      throw new ERR_AMBIGUOUS_ARGUMENT('error/message', "The error \"".concat(actual, "\" is identical to the message."));
    }
    message = error;
    error = undefined;
  } else if (error != null && _typeof(error) !== 'object' && typeof error !== 'function') {
    throw new ERR_INVALID_ARG_TYPE('error', ['Object', 'Error', 'Function', 'RegExp'], error);
  }
  if (actual === NO_EXCEPTION_SENTINEL) {
    var details = '';
    if (error && error.name) {
      details += " (".concat(error.name, ")");
    }
    details += message ? ": ".concat(message) : '.';
    var fnType = stackStartFn.name === 'rejects' ? 'rejection' : 'exception';
    innerFail({
      actual: undefined,
      expected: error,
      operator: stackStartFn.name,
      message: "Missing expected ".concat(fnType).concat(details),
      stackStartFn: stackStartFn
    });
  }
  if (error && !expectedException(actual, error, message, stackStartFn)) {
    throw actual;
  }
}
function expectsNoError(stackStartFn, actual, error, message) {
  if (actual === NO_EXCEPTION_SENTINEL) return;
  if (typeof error === 'string') {
    message = error;
    error = undefined;
  }
  if (!error || expectedException(actual, error)) {
    var details = message ? ": ".concat(message) : '.';
    var fnType = stackStartFn.name === 'doesNotReject' ? 'rejection' : 'exception';
    innerFail({
      actual: actual,
      expected: error,
      operator: stackStartFn.name,
      message: "Got unwanted ".concat(fnType).concat(details, "\n") + "Actual message: \"".concat(actual && actual.message, "\""),
      stackStartFn: stackStartFn
    });
  }
  throw actual;
}
assert.throws = function throws(promiseFn) {
  for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    args[_key2 - 1] = arguments[_key2];
  }
  expectsError.apply(void 0, [throws, getActual(promiseFn)].concat(args));
};
assert.rejects = function rejects(promiseFn) {
  for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
    args[_key3 - 1] = arguments[_key3];
  }
  return waitForActual(promiseFn).then(function (result) {
    return expectsError.apply(void 0, [rejects, result].concat(args));
  });
};
assert.doesNotThrow = function doesNotThrow(fn) {
  for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
    args[_key4 - 1] = arguments[_key4];
  }
  expectsNoError.apply(void 0, [doesNotThrow, getActual(fn)].concat(args));
};
assert.doesNotReject = function doesNotReject(fn) {
  for (var _len5 = arguments.length, args = new Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
    args[_key5 - 1] = arguments[_key5];
  }
  return waitForActual(fn).then(function (result) {
    return expectsNoError.apply(void 0, [doesNotReject, result].concat(args));
  });
};
assert.ifError = function ifError(err) {
  if (err !== null && err !== undefined) {
    var message = 'ifError got unwanted exception: ';
    if (_typeof(err) === 'object' && typeof err.message === 'string') {
      if (err.message.length === 0 && err.constructor) {
        message += err.constructor.name;
      } else {
        message += err.message;
      }
    } else {
      message += inspect(err);
    }
    var newErr = new AssertionError({
      actual: err,
      expected: null,
      operator: 'ifError',
      message: message,
      stackStartFn: ifError
    });

    // Make sure we actually have a stack trace!
    var origStack = err.stack;
    if (typeof origStack === 'string') {
      // This will remove any duplicated frames from the error frames taken
      // from within `ifError` and add the original error frames to the newly
      // created ones.
      var tmp2 = origStack.split('\n');
      tmp2.shift();
      // Filter all frames existing in err.stack.
      var tmp1 = newErr.stack.split('\n');
      for (var i = 0; i < tmp2.length; i++) {
        // Find the first occurrence of the frame.
        var pos = tmp1.indexOf(tmp2[i]);
        if (pos !== -1) {
          // Only keep new frames.
          tmp1 = tmp1.slice(0, pos);
          break;
        }
      }
      newErr.stack = "".concat(tmp1.join('\n'), "\n").concat(tmp2.join('\n'));
    }
    throw newErr;
  }
};

// Currently in sync with Node.js lib/assert.js
// https://github.com/nodejs/node/commit/2a871df3dfb8ea663ef5e1f8f62701ec51384ecb
function internalMatch(string, regexp, message, fn, fnName) {
  if (!isRegExp(regexp)) {
    throw new ERR_INVALID_ARG_TYPE('regexp', 'RegExp', regexp);
  }
  var match = fnName === 'match';
  if (typeof string !== 'string' || RegExpPrototypeTest(regexp, string) !== match) {
    if (message instanceof Error) {
      throw message;
    }
    var generatedMessage = !message;

    // 'The input was expected to not match the regular expression ' +
    message = message || (typeof string !== 'string' ? 'The "string" argument must be of type string. Received type ' + "".concat(_typeof(string), " (").concat(inspect(string), ")") : (match ? 'The input did not match the regular expression ' : 'The input was expected to not match the regular expression ') + "".concat(inspect(regexp), ". Input:\n\n").concat(inspect(string), "\n"));
    var err = new AssertionError({
      actual: string,
      expected: regexp,
      message: message,
      operator: fnName,
      stackStartFn: fn
    });
    err.generatedMessage = generatedMessage;
    throw err;
  }
}
assert.match = function match(string, regexp, message) {
  internalMatch(string, regexp, message, match, 'match');
};
assert.doesNotMatch = function doesNotMatch(string, regexp, message) {
  internalMatch(string, regexp, message, doesNotMatch, 'doesNotMatch');
};

// Expose a strict only variant of assert
function strict() {
  for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
    args[_key6] = arguments[_key6];
  }
  innerOk.apply(void 0, [strict, args.length].concat(args));
}
assert.strict = objectAssign(strict, assert, {
  equal: assert.strictEqual,
  deepEqual: assert.deepStrictEqual,
  notEqual: assert.notStrictEqual,
  notDeepEqual: assert.notDeepStrictEqual
});
assert.strict.strict = assert.strict;

/***/ }),

/***/ "./node_modules/assert/build/internal/assert/assertion_error.js":
/*!**********************************************************************!*\
  !*** ./node_modules/assert/build/internal/assert/assertion_error.js ***!
  \**********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/* provided dependency */ var process = __webpack_require__(/*! ./node_modules/process/browser.js */ "./node_modules/process/browser.js");
// Currently in sync with Node.js lib/internal/assert/assertion_error.js
// https://github.com/nodejs/node/commit/0817840f775032169ddd70c85ac059f18ffcc81c



function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }
function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct.bind(); } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _require = __webpack_require__(/*! util/ */ "./node_modules/util/util.js"),
  inspect = _require.inspect;
var _require2 = __webpack_require__(/*! ../errors */ "./node_modules/assert/build/internal/errors.js"),
  ERR_INVALID_ARG_TYPE = _require2.codes.ERR_INVALID_ARG_TYPE;

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith
function endsWith(str, search, this_len) {
  if (this_len === undefined || this_len > str.length) {
    this_len = str.length;
  }
  return str.substring(this_len - search.length, this_len) === search;
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/repeat
function repeat(str, count) {
  count = Math.floor(count);
  if (str.length == 0 || count == 0) return '';
  var maxCount = str.length * count;
  count = Math.floor(Math.log(count) / Math.log(2));
  while (count) {
    str += str;
    count--;
  }
  str += str.substring(0, maxCount - str.length);
  return str;
}
var blue = '';
var green = '';
var red = '';
var white = '';
var kReadableOperator = {
  deepStrictEqual: 'Expected values to be strictly deep-equal:',
  strictEqual: 'Expected values to be strictly equal:',
  strictEqualObject: 'Expected "actual" to be reference-equal to "expected":',
  deepEqual: 'Expected values to be loosely deep-equal:',
  equal: 'Expected values to be loosely equal:',
  notDeepStrictEqual: 'Expected "actual" not to be strictly deep-equal to:',
  notStrictEqual: 'Expected "actual" to be strictly unequal to:',
  notStrictEqualObject: 'Expected "actual" not to be reference-equal to "expected":',
  notDeepEqual: 'Expected "actual" not to be loosely deep-equal to:',
  notEqual: 'Expected "actual" to be loosely unequal to:',
  notIdentical: 'Values identical but not reference-equal:'
};

// Comparing short primitives should just show === / !== instead of using the
// diff.
var kMaxShortLength = 10;
function copyError(source) {
  var keys = Object.keys(source);
  var target = Object.create(Object.getPrototypeOf(source));
  keys.forEach(function (key) {
    target[key] = source[key];
  });
  Object.defineProperty(target, 'message', {
    value: source.message
  });
  return target;
}
function inspectValue(val) {
  // The util.inspect default values could be changed. This makes sure the
  // error messages contain the necessary information nevertheless.
  return inspect(val, {
    compact: false,
    customInspect: false,
    depth: 1000,
    maxArrayLength: Infinity,
    // Assert compares only enumerable properties (with a few exceptions).
    showHidden: false,
    // Having a long line as error is better than wrapping the line for
    // comparison for now.
    // TODO(BridgeAR): `breakLength` should be limited as soon as soon as we
    // have meta information about the inspected properties (i.e., know where
    // in what line the property starts and ends).
    breakLength: Infinity,
    // Assert does not detect proxies currently.
    showProxy: false,
    sorted: true,
    // Inspect getters as we also check them when comparing entries.
    getters: true
  });
}
function createErrDiff(actual, expected, operator) {
  var other = '';
  var res = '';
  var lastPos = 0;
  var end = '';
  var skipped = false;
  var actualInspected = inspectValue(actual);
  var actualLines = actualInspected.split('\n');
  var expectedLines = inspectValue(expected).split('\n');
  var i = 0;
  var indicator = '';

  // In case both values are objects explicitly mark them as not reference equal
  // for the `strictEqual` operator.
  if (operator === 'strictEqual' && _typeof(actual) === 'object' && _typeof(expected) === 'object' && actual !== null && expected !== null) {
    operator = 'strictEqualObject';
  }

  // If "actual" and "expected" fit on a single line and they are not strictly
  // equal, check further special handling.
  if (actualLines.length === 1 && expectedLines.length === 1 && actualLines[0] !== expectedLines[0]) {
    var inputLength = actualLines[0].length + expectedLines[0].length;
    // If the character length of "actual" and "expected" together is less than
    // kMaxShortLength and if neither is an object and at least one of them is
    // not `zero`, use the strict equal comparison to visualize the output.
    if (inputLength <= kMaxShortLength) {
      if ((_typeof(actual) !== 'object' || actual === null) && (_typeof(expected) !== 'object' || expected === null) && (actual !== 0 || expected !== 0)) {
        // -0 === +0
        return "".concat(kReadableOperator[operator], "\n\n") + "".concat(actualLines[0], " !== ").concat(expectedLines[0], "\n");
      }
    } else if (operator !== 'strictEqualObject') {
      // If the stderr is a tty and the input length is lower than the current
      // columns per line, add a mismatch indicator below the output. If it is
      // not a tty, use a default value of 80 characters.
      var maxLength = process.stderr && process.stderr.isTTY ? process.stderr.columns : 80;
      if (inputLength < maxLength) {
        while (actualLines[0][i] === expectedLines[0][i]) {
          i++;
        }
        // Ignore the first characters.
        if (i > 2) {
          // Add position indicator for the first mismatch in case it is a
          // single line and the input length is less than the column length.
          indicator = "\n  ".concat(repeat(' ', i), "^");
          i = 0;
        }
      }
    }
  }

  // Remove all ending lines that match (this optimizes the output for
  // readability by reducing the number of total changed lines).
  var a = actualLines[actualLines.length - 1];
  var b = expectedLines[expectedLines.length - 1];
  while (a === b) {
    if (i++ < 2) {
      end = "\n  ".concat(a).concat(end);
    } else {
      other = a;
    }
    actualLines.pop();
    expectedLines.pop();
    if (actualLines.length === 0 || expectedLines.length === 0) break;
    a = actualLines[actualLines.length - 1];
    b = expectedLines[expectedLines.length - 1];
  }
  var maxLines = Math.max(actualLines.length, expectedLines.length);
  // Strict equal with identical objects that are not identical by reference.
  // E.g., assert.deepStrictEqual({ a: Symbol() }, { a: Symbol() })
  if (maxLines === 0) {
    // We have to get the result again. The lines were all removed before.
    var _actualLines = actualInspected.split('\n');

    // Only remove lines in case it makes sense to collapse those.
    // TODO: Accept env to always show the full error.
    if (_actualLines.length > 30) {
      _actualLines[26] = "".concat(blue, "...").concat(white);
      while (_actualLines.length > 27) {
        _actualLines.pop();
      }
    }
    return "".concat(kReadableOperator.notIdentical, "\n\n").concat(_actualLines.join('\n'), "\n");
  }
  if (i > 3) {
    end = "\n".concat(blue, "...").concat(white).concat(end);
    skipped = true;
  }
  if (other !== '') {
    end = "\n  ".concat(other).concat(end);
    other = '';
  }
  var printedLines = 0;
  var msg = kReadableOperator[operator] + "\n".concat(green, "+ actual").concat(white, " ").concat(red, "- expected").concat(white);
  var skippedMsg = " ".concat(blue, "...").concat(white, " Lines skipped");
  for (i = 0; i < maxLines; i++) {
    // Only extra expected lines exist
    var cur = i - lastPos;
    if (actualLines.length < i + 1) {
      // If the last diverging line is more than one line above and the
      // current line is at least line three, add some of the former lines and
      // also add dots to indicate skipped entries.
      if (cur > 1 && i > 2) {
        if (cur > 4) {
          res += "\n".concat(blue, "...").concat(white);
          skipped = true;
        } else if (cur > 3) {
          res += "\n  ".concat(expectedLines[i - 2]);
          printedLines++;
        }
        res += "\n  ".concat(expectedLines[i - 1]);
        printedLines++;
      }
      // Mark the current line as the last diverging one.
      lastPos = i;
      // Add the expected line to the cache.
      other += "\n".concat(red, "-").concat(white, " ").concat(expectedLines[i]);
      printedLines++;
      // Only extra actual lines exist
    } else if (expectedLines.length < i + 1) {
      // If the last diverging line is more than one line above and the
      // current line is at least line three, add some of the former lines and
      // also add dots to indicate skipped entries.
      if (cur > 1 && i > 2) {
        if (cur > 4) {
          res += "\n".concat(blue, "...").concat(white);
          skipped = true;
        } else if (cur > 3) {
          res += "\n  ".concat(actualLines[i - 2]);
          printedLines++;
        }
        res += "\n  ".concat(actualLines[i - 1]);
        printedLines++;
      }
      // Mark the current line as the last diverging one.
      lastPos = i;
      // Add the actual line to the result.
      res += "\n".concat(green, "+").concat(white, " ").concat(actualLines[i]);
      printedLines++;
      // Lines diverge
    } else {
      var expectedLine = expectedLines[i];
      var actualLine = actualLines[i];
      // If the lines diverge, specifically check for lines that only diverge by
      // a trailing comma. In that case it is actually identical and we should
      // mark it as such.
      var divergingLines = actualLine !== expectedLine && (!endsWith(actualLine, ',') || actualLine.slice(0, -1) !== expectedLine);
      // If the expected line has a trailing comma but is otherwise identical,
      // add a comma at the end of the actual line. Otherwise the output could
      // look weird as in:
      //
      //   [
      //     1         // No comma at the end!
      // +   2
      //   ]
      //
      if (divergingLines && endsWith(expectedLine, ',') && expectedLine.slice(0, -1) === actualLine) {
        divergingLines = false;
        actualLine += ',';
      }
      if (divergingLines) {
        // If the last diverging line is more than one line above and the
        // current line is at least line three, add some of the former lines and
        // also add dots to indicate skipped entries.
        if (cur > 1 && i > 2) {
          if (cur > 4) {
            res += "\n".concat(blue, "...").concat(white);
            skipped = true;
          } else if (cur > 3) {
            res += "\n  ".concat(actualLines[i - 2]);
            printedLines++;
          }
          res += "\n  ".concat(actualLines[i - 1]);
          printedLines++;
        }
        // Mark the current line as the last diverging one.
        lastPos = i;
        // Add the actual line to the result and cache the expected diverging
        // line so consecutive diverging lines show up as +++--- and not +-+-+-.
        res += "\n".concat(green, "+").concat(white, " ").concat(actualLine);
        other += "\n".concat(red, "-").concat(white, " ").concat(expectedLine);
        printedLines += 2;
        // Lines are identical
      } else {
        // Add all cached information to the result before adding other things
        // and reset the cache.
        res += other;
        other = '';
        // If the last diverging line is exactly one line above or if it is the
        // very first line, add the line to the result.
        if (cur === 1 || i === 0) {
          res += "\n  ".concat(actualLine);
          printedLines++;
        }
      }
    }
    // Inspected object to big (Show ~20 rows max)
    if (printedLines > 20 && i < maxLines - 2) {
      return "".concat(msg).concat(skippedMsg, "\n").concat(res, "\n").concat(blue, "...").concat(white).concat(other, "\n") + "".concat(blue, "...").concat(white);
    }
  }
  return "".concat(msg).concat(skipped ? skippedMsg : '', "\n").concat(res).concat(other).concat(end).concat(indicator);
}
var AssertionError = /*#__PURE__*/function (_Error, _inspect$custom) {
  _inherits(AssertionError, _Error);
  var _super = _createSuper(AssertionError);
  function AssertionError(options) {
    var _this;
    _classCallCheck(this, AssertionError);
    if (_typeof(options) !== 'object' || options === null) {
      throw new ERR_INVALID_ARG_TYPE('options', 'Object', options);
    }
    var message = options.message,
      operator = options.operator,
      stackStartFn = options.stackStartFn;
    var actual = options.actual,
      expected = options.expected;
    var limit = Error.stackTraceLimit;
    Error.stackTraceLimit = 0;
    if (message != null) {
      _this = _super.call(this, String(message));
    } else {
      if (process.stderr && process.stderr.isTTY) {
        // Reset on each call to make sure we handle dynamically set environment
        // variables correct.
        if (process.stderr && process.stderr.getColorDepth && process.stderr.getColorDepth() !== 1) {
          blue = "\x1B[34m";
          green = "\x1B[32m";
          white = "\x1B[39m";
          red = "\x1B[31m";
        } else {
          blue = '';
          green = '';
          white = '';
          red = '';
        }
      }
      // Prevent the error stack from being visible by duplicating the error
      // in a very close way to the original in case both sides are actually
      // instances of Error.
      if (_typeof(actual) === 'object' && actual !== null && _typeof(expected) === 'object' && expected !== null && 'stack' in actual && actual instanceof Error && 'stack' in expected && expected instanceof Error) {
        actual = copyError(actual);
        expected = copyError(expected);
      }
      if (operator === 'deepStrictEqual' || operator === 'strictEqual') {
        _this = _super.call(this, createErrDiff(actual, expected, operator));
      } else if (operator === 'notDeepStrictEqual' || operator === 'notStrictEqual') {
        // In case the objects are equal but the operator requires unequal, show
        // the first object and say A equals B
        var base = kReadableOperator[operator];
        var res = inspectValue(actual).split('\n');

        // In case "actual" is an object, it should not be reference equal.
        if (operator === 'notStrictEqual' && _typeof(actual) === 'object' && actual !== null) {
          base = kReadableOperator.notStrictEqualObject;
        }

        // Only remove lines in case it makes sense to collapse those.
        // TODO: Accept env to always show the full error.
        if (res.length > 30) {
          res[26] = "".concat(blue, "...").concat(white);
          while (res.length > 27) {
            res.pop();
          }
        }

        // Only print a single input.
        if (res.length === 1) {
          _this = _super.call(this, "".concat(base, " ").concat(res[0]));
        } else {
          _this = _super.call(this, "".concat(base, "\n\n").concat(res.join('\n'), "\n"));
        }
      } else {
        var _res = inspectValue(actual);
        var other = '';
        var knownOperators = kReadableOperator[operator];
        if (operator === 'notDeepEqual' || operator === 'notEqual') {
          _res = "".concat(kReadableOperator[operator], "\n\n").concat(_res);
          if (_res.length > 1024) {
            _res = "".concat(_res.slice(0, 1021), "...");
          }
        } else {
          other = "".concat(inspectValue(expected));
          if (_res.length > 512) {
            _res = "".concat(_res.slice(0, 509), "...");
          }
          if (other.length > 512) {
            other = "".concat(other.slice(0, 509), "...");
          }
          if (operator === 'deepEqual' || operator === 'equal') {
            _res = "".concat(knownOperators, "\n\n").concat(_res, "\n\nshould equal\n\n");
          } else {
            other = " ".concat(operator, " ").concat(other);
          }
        }
        _this = _super.call(this, "".concat(_res).concat(other));
      }
    }
    Error.stackTraceLimit = limit;
    _this.generatedMessage = !message;
    Object.defineProperty(_assertThisInitialized(_this), 'name', {
      value: 'AssertionError [ERR_ASSERTION]',
      enumerable: false,
      writable: true,
      configurable: true
    });
    _this.code = 'ERR_ASSERTION';
    _this.actual = actual;
    _this.expected = expected;
    _this.operator = operator;
    if (Error.captureStackTrace) {
      // eslint-disable-next-line no-restricted-syntax
      Error.captureStackTrace(_assertThisInitialized(_this), stackStartFn);
    }
    // Create error message including the error code in the name.
    _this.stack;
    // Reset the name.
    _this.name = 'AssertionError';
    return _possibleConstructorReturn(_this);
  }
  _createClass(AssertionError, [{
    key: "toString",
    value: function toString() {
      return "".concat(this.name, " [").concat(this.code, "]: ").concat(this.message);
    }
  }, {
    key: _inspect$custom,
    value: function value(recurseTimes, ctx) {
      // This limits the `actual` and `expected` property default inspection to
      // the minimum depth. Otherwise those values would be too verbose compared
      // to the actual error message which contains a combined view of these two
      // input values.
      return inspect(this, _objectSpread(_objectSpread({}, ctx), {}, {
        customInspect: false,
        depth: 0
      }));
    }
  }]);
  return AssertionError;
}( /*#__PURE__*/_wrapNativeSuper(Error), inspect.custom);
module.exports = AssertionError;

/***/ }),

/***/ "./node_modules/assert/build/internal/errors.js":
/*!******************************************************!*\
  !*** ./node_modules/assert/build/internal/errors.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
// Currently in sync with Node.js lib/internal/errors.js
// https://github.com/nodejs/node/commit/3b044962c48fe313905877a96b5d0894a5404f6f

/* eslint node-core/documented-errors: "error" */
/* eslint node-core/alphabetize-errors: "error" */
/* eslint node-core/prefer-util-format-errors: "error" */



// The whole point behind this internal module is to allow Node.js to no
// longer be forced to treat every error message change as a semver-major
// change. The NodeError classes here all expose a `code` property whose
// value statically and permanently identifies the error. While the error
// message may change, the code should not.
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
var codes = {};

// Lazy loaded
var assert;
var util;
function createErrorType(code, message, Base) {
  if (!Base) {
    Base = Error;
  }
  function getMessage(arg1, arg2, arg3) {
    if (typeof message === 'string') {
      return message;
    } else {
      return message(arg1, arg2, arg3);
    }
  }
  var NodeError = /*#__PURE__*/function (_Base) {
    _inherits(NodeError, _Base);
    var _super = _createSuper(NodeError);
    function NodeError(arg1, arg2, arg3) {
      var _this;
      _classCallCheck(this, NodeError);
      _this = _super.call(this, getMessage(arg1, arg2, arg3));
      _this.code = code;
      return _this;
    }
    return _createClass(NodeError);
  }(Base);
  codes[code] = NodeError;
}

// https://github.com/nodejs/node/blob/v10.8.0/lib/internal/errors.js
function oneOf(expected, thing) {
  if (Array.isArray(expected)) {
    var len = expected.length;
    expected = expected.map(function (i) {
      return String(i);
    });
    if (len > 2) {
      return "one of ".concat(thing, " ").concat(expected.slice(0, len - 1).join(', '), ", or ") + expected[len - 1];
    } else if (len === 2) {
      return "one of ".concat(thing, " ").concat(expected[0], " or ").concat(expected[1]);
    } else {
      return "of ".concat(thing, " ").concat(expected[0]);
    }
  } else {
    return "of ".concat(thing, " ").concat(String(expected));
  }
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith
function startsWith(str, search, pos) {
  return str.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search;
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith
function endsWith(str, search, this_len) {
  if (this_len === undefined || this_len > str.length) {
    this_len = str.length;
  }
  return str.substring(this_len - search.length, this_len) === search;
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes
function includes(str, search, start) {
  if (typeof start !== 'number') {
    start = 0;
  }
  if (start + search.length > str.length) {
    return false;
  } else {
    return str.indexOf(search, start) !== -1;
  }
}
createErrorType('ERR_AMBIGUOUS_ARGUMENT', 'The "%s" argument is ambiguous. %s', TypeError);
createErrorType('ERR_INVALID_ARG_TYPE', function (name, expected, actual) {
  if (assert === undefined) assert = __webpack_require__(/*! ../assert */ "./node_modules/assert/build/assert.js");
  assert(typeof name === 'string', "'name' must be a string");

  // determiner: 'must be' or 'must not be'
  var determiner;
  if (typeof expected === 'string' && startsWith(expected, 'not ')) {
    determiner = 'must not be';
    expected = expected.replace(/^not /, '');
  } else {
    determiner = 'must be';
  }
  var msg;
  if (endsWith(name, ' argument')) {
    // For cases like 'first argument'
    msg = "The ".concat(name, " ").concat(determiner, " ").concat(oneOf(expected, 'type'));
  } else {
    var type = includes(name, '.') ? 'property' : 'argument';
    msg = "The \"".concat(name, "\" ").concat(type, " ").concat(determiner, " ").concat(oneOf(expected, 'type'));
  }

  // TODO(BridgeAR): Improve the output by showing `null` and similar.
  msg += ". Received type ".concat(_typeof(actual));
  return msg;
}, TypeError);
createErrorType('ERR_INVALID_ARG_VALUE', function (name, value) {
  var reason = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'is invalid';
  if (util === undefined) util = __webpack_require__(/*! util/ */ "./node_modules/util/util.js");
  var inspected = util.inspect(value);
  if (inspected.length > 128) {
    inspected = "".concat(inspected.slice(0, 128), "...");
  }
  return "The argument '".concat(name, "' ").concat(reason, ". Received ").concat(inspected);
}, TypeError, RangeError);
createErrorType('ERR_INVALID_RETURN_VALUE', function (input, name, value) {
  var type;
  if (value && value.constructor && value.constructor.name) {
    type = "instance of ".concat(value.constructor.name);
  } else {
    type = "type ".concat(_typeof(value));
  }
  return "Expected ".concat(input, " to be returned from the \"").concat(name, "\"") + " function but got ".concat(type, ".");
}, TypeError);
createErrorType('ERR_MISSING_ARGS', function () {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  if (assert === undefined) assert = __webpack_require__(/*! ../assert */ "./node_modules/assert/build/assert.js");
  assert(args.length > 0, 'At least one arg needs to be specified');
  var msg = 'The ';
  var len = args.length;
  args = args.map(function (a) {
    return "\"".concat(a, "\"");
  });
  switch (len) {
    case 1:
      msg += "".concat(args[0], " argument");
      break;
    case 2:
      msg += "".concat(args[0], " and ").concat(args[1], " arguments");
      break;
    default:
      msg += args.slice(0, len - 1).join(', ');
      msg += ", and ".concat(args[len - 1], " arguments");
      break;
  }
  return "".concat(msg, " must be specified");
}, TypeError);
module.exports.codes = codes;

/***/ }),

/***/ "./node_modules/assert/build/internal/util/comparisons.js":
/*!****************************************************************!*\
  !*** ./node_modules/assert/build/internal/util/comparisons.js ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
// Currently in sync with Node.js lib/internal/util/comparisons.js
// https://github.com/nodejs/node/commit/112cc7c27551254aa2b17098fb774867f05ed0d9



function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var regexFlagsSupported = /a/g.flags !== undefined;
var arrayFromSet = function arrayFromSet(set) {
  var array = [];
  set.forEach(function (value) {
    return array.push(value);
  });
  return array;
};
var arrayFromMap = function arrayFromMap(map) {
  var array = [];
  map.forEach(function (value, key) {
    return array.push([key, value]);
  });
  return array;
};
var objectIs = Object.is ? Object.is : __webpack_require__(/*! object-is */ "./node_modules/object-is/index.js");
var objectGetOwnPropertySymbols = Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols : function () {
  return [];
};
var numberIsNaN = Number.isNaN ? Number.isNaN : __webpack_require__(/*! is-nan */ "./node_modules/is-nan/index.js");
function uncurryThis(f) {
  return f.call.bind(f);
}
var hasOwnProperty = uncurryThis(Object.prototype.hasOwnProperty);
var propertyIsEnumerable = uncurryThis(Object.prototype.propertyIsEnumerable);
var objectToString = uncurryThis(Object.prototype.toString);
var _require$types = (__webpack_require__(/*! util/ */ "./node_modules/util/util.js").types),
  isAnyArrayBuffer = _require$types.isAnyArrayBuffer,
  isArrayBufferView = _require$types.isArrayBufferView,
  isDate = _require$types.isDate,
  isMap = _require$types.isMap,
  isRegExp = _require$types.isRegExp,
  isSet = _require$types.isSet,
  isNativeError = _require$types.isNativeError,
  isBoxedPrimitive = _require$types.isBoxedPrimitive,
  isNumberObject = _require$types.isNumberObject,
  isStringObject = _require$types.isStringObject,
  isBooleanObject = _require$types.isBooleanObject,
  isBigIntObject = _require$types.isBigIntObject,
  isSymbolObject = _require$types.isSymbolObject,
  isFloat32Array = _require$types.isFloat32Array,
  isFloat64Array = _require$types.isFloat64Array;
function isNonIndex(key) {
  if (key.length === 0 || key.length > 10) return true;
  for (var i = 0; i < key.length; i++) {
    var code = key.charCodeAt(i);
    if (code < 48 || code > 57) return true;
  }
  // The maximum size for an array is 2 ** 32 -1.
  return key.length === 10 && key >= Math.pow(2, 32);
}
function getOwnNonIndexProperties(value) {
  return Object.keys(value).filter(isNonIndex).concat(objectGetOwnPropertySymbols(value).filter(Object.prototype.propertyIsEnumerable.bind(value)));
}

// Taken from https://github.com/feross/buffer/blob/680e9e5e488f22aac27599a57dc844a6315928dd/index.js
// original notice:
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
function compare(a, b) {
  if (a === b) {
    return 0;
  }
  var x = a.length;
  var y = b.length;
  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i];
      y = b[i];
      break;
    }
  }
  if (x < y) {
    return -1;
  }
  if (y < x) {
    return 1;
  }
  return 0;
}
var ONLY_ENUMERABLE = undefined;
var kStrict = true;
var kLoose = false;
var kNoIterator = 0;
var kIsArray = 1;
var kIsSet = 2;
var kIsMap = 3;

// Check if they have the same source and flags
function areSimilarRegExps(a, b) {
  return regexFlagsSupported ? a.source === b.source && a.flags === b.flags : RegExp.prototype.toString.call(a) === RegExp.prototype.toString.call(b);
}
function areSimilarFloatArrays(a, b) {
  if (a.byteLength !== b.byteLength) {
    return false;
  }
  for (var offset = 0; offset < a.byteLength; offset++) {
    if (a[offset] !== b[offset]) {
      return false;
    }
  }
  return true;
}
function areSimilarTypedArrays(a, b) {
  if (a.byteLength !== b.byteLength) {
    return false;
  }
  return compare(new Uint8Array(a.buffer, a.byteOffset, a.byteLength), new Uint8Array(b.buffer, b.byteOffset, b.byteLength)) === 0;
}
function areEqualArrayBuffers(buf1, buf2) {
  return buf1.byteLength === buf2.byteLength && compare(new Uint8Array(buf1), new Uint8Array(buf2)) === 0;
}
function isEqualBoxedPrimitive(val1, val2) {
  if (isNumberObject(val1)) {
    return isNumberObject(val2) && objectIs(Number.prototype.valueOf.call(val1), Number.prototype.valueOf.call(val2));
  }
  if (isStringObject(val1)) {
    return isStringObject(val2) && String.prototype.valueOf.call(val1) === String.prototype.valueOf.call(val2);
  }
  if (isBooleanObject(val1)) {
    return isBooleanObject(val2) && Boolean.prototype.valueOf.call(val1) === Boolean.prototype.valueOf.call(val2);
  }
  if (isBigIntObject(val1)) {
    return isBigIntObject(val2) && BigInt.prototype.valueOf.call(val1) === BigInt.prototype.valueOf.call(val2);
  }
  return isSymbolObject(val2) && Symbol.prototype.valueOf.call(val1) === Symbol.prototype.valueOf.call(val2);
}

// Notes: Type tags are historical [[Class]] properties that can be set by
// FunctionTemplate::SetClassName() in C++ or Symbol.toStringTag in JS
// and retrieved using Object.prototype.toString.call(obj) in JS
// See https://tc39.github.io/ecma262/#sec-object.prototype.tostring
// for a list of tags pre-defined in the spec.
// There are some unspecified tags in the wild too (e.g. typed array tags).
// Since tags can be altered, they only serve fast failures
//
// Typed arrays and buffers are checked by comparing the content in their
// underlying ArrayBuffer. This optimization requires that it's
// reasonable to interpret their underlying memory in the same way,
// which is checked by comparing their type tags.
// (e.g. a Uint8Array and a Uint16Array with the same memory content
// could still be different because they will be interpreted differently).
//
// For strict comparison, objects should have
// a) The same built-in type tags
// b) The same prototypes.

function innerDeepEqual(val1, val2, strict, memos) {
  // All identical values are equivalent, as determined by ===.
  if (val1 === val2) {
    if (val1 !== 0) return true;
    return strict ? objectIs(val1, val2) : true;
  }

  // Check more closely if val1 and val2 are equal.
  if (strict) {
    if (_typeof(val1) !== 'object') {
      return typeof val1 === 'number' && numberIsNaN(val1) && numberIsNaN(val2);
    }
    if (_typeof(val2) !== 'object' || val1 === null || val2 === null) {
      return false;
    }
    if (Object.getPrototypeOf(val1) !== Object.getPrototypeOf(val2)) {
      return false;
    }
  } else {
    if (val1 === null || _typeof(val1) !== 'object') {
      if (val2 === null || _typeof(val2) !== 'object') {
        // eslint-disable-next-line eqeqeq
        return val1 == val2;
      }
      return false;
    }
    if (val2 === null || _typeof(val2) !== 'object') {
      return false;
    }
  }
  var val1Tag = objectToString(val1);
  var val2Tag = objectToString(val2);
  if (val1Tag !== val2Tag) {
    return false;
  }
  if (Array.isArray(val1)) {
    // Check for sparse arrays and general fast path
    if (val1.length !== val2.length) {
      return false;
    }
    var keys1 = getOwnNonIndexProperties(val1, ONLY_ENUMERABLE);
    var keys2 = getOwnNonIndexProperties(val2, ONLY_ENUMERABLE);
    if (keys1.length !== keys2.length) {
      return false;
    }
    return keyCheck(val1, val2, strict, memos, kIsArray, keys1);
  }
  // [browserify] This triggers on certain types in IE (Map/Set) so we don't
  // wan't to early return out of the rest of the checks. However we can check
  // if the second value is one of these values and the first isn't.
  if (val1Tag === '[object Object]') {
    // return keyCheck(val1, val2, strict, memos, kNoIterator);
    if (!isMap(val1) && isMap(val2) || !isSet(val1) && isSet(val2)) {
      return false;
    }
  }
  if (isDate(val1)) {
    if (!isDate(val2) || Date.prototype.getTime.call(val1) !== Date.prototype.getTime.call(val2)) {
      return false;
    }
  } else if (isRegExp(val1)) {
    if (!isRegExp(val2) || !areSimilarRegExps(val1, val2)) {
      return false;
    }
  } else if (isNativeError(val1) || val1 instanceof Error) {
    // Do not compare the stack as it might differ even though the error itself
    // is otherwise identical.
    if (val1.message !== val2.message || val1.name !== val2.name) {
      return false;
    }
  } else if (isArrayBufferView(val1)) {
    if (!strict && (isFloat32Array(val1) || isFloat64Array(val1))) {
      if (!areSimilarFloatArrays(val1, val2)) {
        return false;
      }
    } else if (!areSimilarTypedArrays(val1, val2)) {
      return false;
    }
    // Buffer.compare returns true, so val1.length === val2.length. If they both
    // only contain numeric keys, we don't need to exam further than checking
    // the symbols.
    var _keys = getOwnNonIndexProperties(val1, ONLY_ENUMERABLE);
    var _keys2 = getOwnNonIndexProperties(val2, ONLY_ENUMERABLE);
    if (_keys.length !== _keys2.length) {
      return false;
    }
    return keyCheck(val1, val2, strict, memos, kNoIterator, _keys);
  } else if (isSet(val1)) {
    if (!isSet(val2) || val1.size !== val2.size) {
      return false;
    }
    return keyCheck(val1, val2, strict, memos, kIsSet);
  } else if (isMap(val1)) {
    if (!isMap(val2) || val1.size !== val2.size) {
      return false;
    }
    return keyCheck(val1, val2, strict, memos, kIsMap);
  } else if (isAnyArrayBuffer(val1)) {
    if (!areEqualArrayBuffers(val1, val2)) {
      return false;
    }
  } else if (isBoxedPrimitive(val1) && !isEqualBoxedPrimitive(val1, val2)) {
    return false;
  }
  return keyCheck(val1, val2, strict, memos, kNoIterator);
}
function getEnumerables(val, keys) {
  return keys.filter(function (k) {
    return propertyIsEnumerable(val, k);
  });
}
function keyCheck(val1, val2, strict, memos, iterationType, aKeys) {
  // For all remaining Object pairs, including Array, objects and Maps,
  // equivalence is determined by having:
  // a) The same number of owned enumerable properties
  // b) The same set of keys/indexes (although not necessarily the same order)
  // c) Equivalent values for every corresponding key/index
  // d) For Sets and Maps, equal contents
  // Note: this accounts for both named and indexed properties on Arrays.
  if (arguments.length === 5) {
    aKeys = Object.keys(val1);
    var bKeys = Object.keys(val2);

    // The pair must have the same number of owned properties.
    if (aKeys.length !== bKeys.length) {
      return false;
    }
  }

  // Cheap key test
  var i = 0;
  for (; i < aKeys.length; i++) {
    if (!hasOwnProperty(val2, aKeys[i])) {
      return false;
    }
  }
  if (strict && arguments.length === 5) {
    var symbolKeysA = objectGetOwnPropertySymbols(val1);
    if (symbolKeysA.length !== 0) {
      var count = 0;
      for (i = 0; i < symbolKeysA.length; i++) {
        var key = symbolKeysA[i];
        if (propertyIsEnumerable(val1, key)) {
          if (!propertyIsEnumerable(val2, key)) {
            return false;
          }
          aKeys.push(key);
          count++;
        } else if (propertyIsEnumerable(val2, key)) {
          return false;
        }
      }
      var symbolKeysB = objectGetOwnPropertySymbols(val2);
      if (symbolKeysA.length !== symbolKeysB.length && getEnumerables(val2, symbolKeysB).length !== count) {
        return false;
      }
    } else {
      var _symbolKeysB = objectGetOwnPropertySymbols(val2);
      if (_symbolKeysB.length !== 0 && getEnumerables(val2, _symbolKeysB).length !== 0) {
        return false;
      }
    }
  }
  if (aKeys.length === 0 && (iterationType === kNoIterator || iterationType === kIsArray && val1.length === 0 || val1.size === 0)) {
    return true;
  }

  // Use memos to handle cycles.
  if (memos === undefined) {
    memos = {
      val1: new Map(),
      val2: new Map(),
      position: 0
    };
  } else {
    // We prevent up to two map.has(x) calls by directly retrieving the value
    // and checking for undefined. The map can only contain numbers, so it is
    // safe to check for undefined only.
    var val2MemoA = memos.val1.get(val1);
    if (val2MemoA !== undefined) {
      var val2MemoB = memos.val2.get(val2);
      if (val2MemoB !== undefined) {
        return val2MemoA === val2MemoB;
      }
    }
    memos.position++;
  }
  memos.val1.set(val1, memos.position);
  memos.val2.set(val2, memos.position);
  var areEq = objEquiv(val1, val2, strict, aKeys, memos, iterationType);
  memos.val1.delete(val1);
  memos.val2.delete(val2);
  return areEq;
}
function setHasEqualElement(set, val1, strict, memo) {
  // Go looking.
  var setValues = arrayFromSet(set);
  for (var i = 0; i < setValues.length; i++) {
    var val2 = setValues[i];
    if (innerDeepEqual(val1, val2, strict, memo)) {
      // Remove the matching element to make sure we do not check that again.
      set.delete(val2);
      return true;
    }
  }
  return false;
}

// See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness#Loose_equality_using
// Sadly it is not possible to detect corresponding values properly in case the
// type is a string, number, bigint or boolean. The reason is that those values
// can match lots of different string values (e.g., 1n == '+00001').
function findLooseMatchingPrimitives(prim) {
  switch (_typeof(prim)) {
    case 'undefined':
      return null;
    case 'object':
      // Only pass in null as object!
      return undefined;
    case 'symbol':
      return false;
    case 'string':
      prim = +prim;
    // Loose equal entries exist only if the string is possible to convert to
    // a regular number and not NaN.
    // Fall through
    case 'number':
      if (numberIsNaN(prim)) {
        return false;
      }
  }
  return true;
}
function setMightHaveLoosePrim(a, b, prim) {
  var altValue = findLooseMatchingPrimitives(prim);
  if (altValue != null) return altValue;
  return b.has(altValue) && !a.has(altValue);
}
function mapMightHaveLoosePrim(a, b, prim, item, memo) {
  var altValue = findLooseMatchingPrimitives(prim);
  if (altValue != null) {
    return altValue;
  }
  var curB = b.get(altValue);
  if (curB === undefined && !b.has(altValue) || !innerDeepEqual(item, curB, false, memo)) {
    return false;
  }
  return !a.has(altValue) && innerDeepEqual(item, curB, false, memo);
}
function setEquiv(a, b, strict, memo) {
  // This is a lazily initiated Set of entries which have to be compared
  // pairwise.
  var set = null;
  var aValues = arrayFromSet(a);
  for (var i = 0; i < aValues.length; i++) {
    var val = aValues[i];
    // Note: Checking for the objects first improves the performance for object
    // heavy sets but it is a minor slow down for primitives. As they are fast
    // to check this improves the worst case scenario instead.
    if (_typeof(val) === 'object' && val !== null) {
      if (set === null) {
        set = new Set();
      }
      // If the specified value doesn't exist in the second set its an not null
      // object (or non strict only: a not matching primitive) we'll need to go
      // hunting for something thats deep-(strict-)equal to it. To make this
      // O(n log n) complexity we have to copy these values in a new set first.
      set.add(val);
    } else if (!b.has(val)) {
      if (strict) return false;

      // Fast path to detect missing string, symbol, undefined and null values.
      if (!setMightHaveLoosePrim(a, b, val)) {
        return false;
      }
      if (set === null) {
        set = new Set();
      }
      set.add(val);
    }
  }
  if (set !== null) {
    var bValues = arrayFromSet(b);
    for (var _i = 0; _i < bValues.length; _i++) {
      var _val = bValues[_i];
      // We have to check if a primitive value is already
      // matching and only if it's not, go hunting for it.
      if (_typeof(_val) === 'object' && _val !== null) {
        if (!setHasEqualElement(set, _val, strict, memo)) return false;
      } else if (!strict && !a.has(_val) && !setHasEqualElement(set, _val, strict, memo)) {
        return false;
      }
    }
    return set.size === 0;
  }
  return true;
}
function mapHasEqualEntry(set, map, key1, item1, strict, memo) {
  // To be able to handle cases like:
  //   Map([[{}, 'a'], [{}, 'b']]) vs Map([[{}, 'b'], [{}, 'a']])
  // ... we need to consider *all* matching keys, not just the first we find.
  var setValues = arrayFromSet(set);
  for (var i = 0; i < setValues.length; i++) {
    var key2 = setValues[i];
    if (innerDeepEqual(key1, key2, strict, memo) && innerDeepEqual(item1, map.get(key2), strict, memo)) {
      set.delete(key2);
      return true;
    }
  }
  return false;
}
function mapEquiv(a, b, strict, memo) {
  var set = null;
  var aEntries = arrayFromMap(a);
  for (var i = 0; i < aEntries.length; i++) {
    var _aEntries$i = _slicedToArray(aEntries[i], 2),
      key = _aEntries$i[0],
      item1 = _aEntries$i[1];
    if (_typeof(key) === 'object' && key !== null) {
      if (set === null) {
        set = new Set();
      }
      set.add(key);
    } else {
      // By directly retrieving the value we prevent another b.has(key) check in
      // almost all possible cases.
      var item2 = b.get(key);
      if (item2 === undefined && !b.has(key) || !innerDeepEqual(item1, item2, strict, memo)) {
        if (strict) return false;
        // Fast path to detect missing string, symbol, undefined and null
        // keys.
        if (!mapMightHaveLoosePrim(a, b, key, item1, memo)) return false;
        if (set === null) {
          set = new Set();
        }
        set.add(key);
      }
    }
  }
  if (set !== null) {
    var bEntries = arrayFromMap(b);
    for (var _i2 = 0; _i2 < bEntries.length; _i2++) {
      var _bEntries$_i = _slicedToArray(bEntries[_i2], 2),
        _key = _bEntries$_i[0],
        item = _bEntries$_i[1];
      if (_typeof(_key) === 'object' && _key !== null) {
        if (!mapHasEqualEntry(set, a, _key, item, strict, memo)) return false;
      } else if (!strict && (!a.has(_key) || !innerDeepEqual(a.get(_key), item, false, memo)) && !mapHasEqualEntry(set, a, _key, item, false, memo)) {
        return false;
      }
    }
    return set.size === 0;
  }
  return true;
}
function objEquiv(a, b, strict, keys, memos, iterationType) {
  // Sets and maps don't have their entries accessible via normal object
  // properties.
  var i = 0;
  if (iterationType === kIsSet) {
    if (!setEquiv(a, b, strict, memos)) {
      return false;
    }
  } else if (iterationType === kIsMap) {
    if (!mapEquiv(a, b, strict, memos)) {
      return false;
    }
  } else if (iterationType === kIsArray) {
    for (; i < a.length; i++) {
      if (hasOwnProperty(a, i)) {
        if (!hasOwnProperty(b, i) || !innerDeepEqual(a[i], b[i], strict, memos)) {
          return false;
        }
      } else if (hasOwnProperty(b, i)) {
        return false;
      } else {
        // Array is sparse.
        var keysA = Object.keys(a);
        for (; i < keysA.length; i++) {
          var key = keysA[i];
          if (!hasOwnProperty(b, key) || !innerDeepEqual(a[key], b[key], strict, memos)) {
            return false;
          }
        }
        if (keysA.length !== Object.keys(b).length) {
          return false;
        }
        return true;
      }
    }
  }

  // The pair must have equivalent values for every corresponding key.
  // Possibly expensive deep test:
  for (i = 0; i < keys.length; i++) {
    var _key2 = keys[i];
    if (!innerDeepEqual(a[_key2], b[_key2], strict, memos)) {
      return false;
    }
  }
  return true;
}
function isDeepEqual(val1, val2) {
  return innerDeepEqual(val1, val2, kLoose);
}
function isDeepStrictEqual(val1, val2) {
  return innerDeepEqual(val1, val2, kStrict);
}
module.exports = {
  isDeepEqual: isDeepEqual,
  isDeepStrictEqual: isDeepStrictEqual
};

/***/ }),

/***/ "./node_modules/call-bind/callBound.js":
/*!*********************************************!*\
  !*** ./node_modules/call-bind/callBound.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var GetIntrinsic = __webpack_require__(/*! get-intrinsic */ "./node_modules/get-intrinsic/index.js");

var callBind = __webpack_require__(/*! ./ */ "./node_modules/call-bind/index.js");

var $indexOf = callBind(GetIntrinsic('String.prototype.indexOf'));

module.exports = function callBoundIntrinsic(name, allowMissing) {
	var intrinsic = GetIntrinsic(name, !!allowMissing);
	if (typeof intrinsic === 'function' && $indexOf(name, '.prototype.') > -1) {
		return callBind(intrinsic);
	}
	return intrinsic;
};


/***/ }),

/***/ "./node_modules/call-bind/index.js":
/*!*****************************************!*\
  !*** ./node_modules/call-bind/index.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var bind = __webpack_require__(/*! function-bind */ "./node_modules/function-bind/index.js");
var GetIntrinsic = __webpack_require__(/*! get-intrinsic */ "./node_modules/get-intrinsic/index.js");
var setFunctionLength = __webpack_require__(/*! set-function-length */ "./node_modules/set-function-length/index.js");

var $TypeError = GetIntrinsic('%TypeError%');
var $apply = GetIntrinsic('%Function.prototype.apply%');
var $call = GetIntrinsic('%Function.prototype.call%');
var $reflectApply = GetIntrinsic('%Reflect.apply%', true) || bind.call($call, $apply);

var $defineProperty = GetIntrinsic('%Object.defineProperty%', true);
var $max = GetIntrinsic('%Math.max%');

if ($defineProperty) {
	try {
		$defineProperty({}, 'a', { value: 1 });
	} catch (e) {
		// IE 8 has a broken defineProperty
		$defineProperty = null;
	}
}

module.exports = function callBind(originalFunction) {
	if (typeof originalFunction !== 'function') {
		throw new $TypeError('a function is required');
	}
	var func = $reflectApply(bind, $call, arguments);
	return setFunctionLength(
		func,
		1 + $max(0, originalFunction.length - (arguments.length - 1)),
		true
	);
};

var applyBind = function applyBind() {
	return $reflectApply(bind, $apply, arguments);
};

if ($defineProperty) {
	$defineProperty(module.exports, 'apply', { value: applyBind });
} else {
	module.exports.apply = applyBind;
}


/***/ }),

/***/ "./node_modules/console-browserify/index.js":
/*!**************************************************!*\
  !*** ./node_modules/console-browserify/index.js ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/*global window, global*/
var util = __webpack_require__(/*! util */ "./node_modules/util/util.js")
var assert = __webpack_require__(/*! assert */ "./node_modules/assert/build/assert.js")
function now() { return new Date().getTime() }

var slice = Array.prototype.slice
var console
var times = {}

if (typeof __webpack_require__.g !== "undefined" && __webpack_require__.g.console) {
    console = __webpack_require__.g.console
} else if (typeof window !== "undefined" && window.console) {
    console = window.console
} else {
    console = {}
}

var functions = [
    [log, "log"],
    [info, "info"],
    [warn, "warn"],
    [error, "error"],
    [time, "time"],
    [timeEnd, "timeEnd"],
    [trace, "trace"],
    [dir, "dir"],
    [consoleAssert, "assert"]
]

for (var i = 0; i < functions.length; i++) {
    var tuple = functions[i]
    var f = tuple[0]
    var name = tuple[1]

    if (!console[name]) {
        console[name] = f
    }
}

module.exports = console

function log() {}

function info() {
    console.log.apply(console, arguments)
}

function warn() {
    console.log.apply(console, arguments)
}

function error() {
    console.warn.apply(console, arguments)
}

function time(label) {
    times[label] = now()
}

function timeEnd(label) {
    var time = times[label]
    if (!time) {
        throw new Error("No such label: " + label)
    }

    delete times[label]
    var duration = now() - time
    console.log(label + ": " + duration + "ms")
}

function trace() {
    var err = new Error()
    err.name = "Trace"
    err.message = util.format.apply(null, arguments)
    console.error(err.stack)
}

function dir(object) {
    console.log(util.inspect(object) + "\n")
}

function consoleAssert(expression) {
    if (!expression) {
        var arr = slice.call(arguments, 1)
        assert.ok(false, util.format.apply(null, arr))
    }
}


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/style.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/style.css ***!
  \*************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ./assets/minecraft-logo.ttf */ "./src/assets/minecraft-logo.ttf"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_1___ = new URL(/* asset import */ __webpack_require__(/*! ./assets/minecraft.otf */ "./src/assets/minecraft.otf"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_2___ = new URL(/* asset import */ __webpack_require__(/*! ./assets/minecraft-italic.otf */ "./src/assets/minecraft-italic.otf"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_3___ = new URL(/* asset import */ __webpack_require__(/*! ./assets/minecraft-bold.otf */ "./src/assets/minecraft-bold.otf"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_4___ = new URL(/* asset import */ __webpack_require__(/*! ./assets/minecraft-bold-italic.otf */ "./src/assets/minecraft-bold-italic.otf"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_5___ = new URL(/* asset import */ __webpack_require__(/*! ./assets/hero-bg.jpg */ "./src/assets/hero-bg.jpg"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_6___ = new URL(/* asset import */ __webpack_require__(/*! ./assets/head-foot-bg.jpg */ "./src/assets/head-foot-bg.jpg"), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
var ___CSS_LOADER_URL_REPLACEMENT_1___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_1___);
var ___CSS_LOADER_URL_REPLACEMENT_2___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_2___);
var ___CSS_LOADER_URL_REPLACEMENT_3___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_3___);
var ___CSS_LOADER_URL_REPLACEMENT_4___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_4___);
var ___CSS_LOADER_URL_REPLACEMENT_5___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_5___);
var ___CSS_LOADER_URL_REPLACEMENT_6___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_6___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `@font-face {
  font-family: 'LogoFont';
  src: url(${___CSS_LOADER_URL_REPLACEMENT_0___});
}

@font-face {
  font-family: 'InterfaceFont';
  src: url(${___CSS_LOADER_URL_REPLACEMENT_1___}), url(${___CSS_LOADER_URL_REPLACEMENT_2___}), url(${___CSS_LOADER_URL_REPLACEMENT_3___}), url(${___CSS_LOADER_URL_REPLACEMENT_4___});
}

* {
  box-sizing: border-box;
}

::-webkit-scrollbar {
  display: none;
}

h1, h2, h3, h4, h5, h6 {
  margin: 0;
  padding: 0;
}

body {
  margin: 0;
  padding: 0;

  min-height: 100vh;
  display: flex;
  flex-direction: column;

  font-family: Verdana, Geneva, Tahoma, sans-serif;
  background-image: url(${___CSS_LOADER_URL_REPLACEMENT_5___});
  background-size: cover;
  backdrop-filter: blur(8px);
}

a {
  text-decoration: none;
  color: inherit;
}

button:hover, a:hover {
  cursor: pointer;
}



#content {
  display: flex;
  flex-direction: column;
  flex: 1;
}



.header, .footer {
  background-image: url(${___CSS_LOADER_URL_REPLACEMENT_6___});
}

.header {
  padding-block: 24px;
  padding-inline: 48px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 -6px 10px 5px rgba(0,0,0,0.5);
  border-bottom: 2px solid #87c5fe;
}

.header > h1 {
  font-size: 2.5rem;
  letter-spacing: 2px;
}

.header > h1, .nav > button {
  font-family: 'LogoFont';
}

.nav {
  display: flex;
  gap: 48px;
}

.nav > button {
  padding: 8px 16px;

  border: 1px solid black;
  border-radius: 4px;
  font-size: 1.25rem;
  letter-spacing: 1px;
}

nav > .active {
  background-color: #9dcdfb50;
  backdrop-filter: blur(4px);
  box-shadow: 0 0 36px #ffffff;
  border: 1px solid black;
  color: black;
}



.page-content {
  flex: 1;
  display: flex;
  justify-content: center;

  font-family: 'InterfaceFont';
  text-align: center;
}

.hero {
  margin: 24px 0;
  padding: 16px;

  min-width: 75%;

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  background-color: #00000025;
  border: 1px solid #efefef;
  border-radius: 4px;
  color: #efefef;
}

.divider {
  width: 500px;
}

.hero-head {
  margin: 0;
  padding: 0;
}

.hero-para-title {
  text-decoration: underline;
}

.hero-slide-text {
  margin: 0;
  padding: 0;
  position: relative;
  top: 32px;
  font-size: 1.25rem;
}

.hero-slide {
  margin: 0;
  padding: 0;
  display: none;
}

.hero-slide-active {
  display: block;
}

.hero-slide-active img {
  border: 1px solid white;
  position: relative;
  z-index: -1;
}

.hero-slide-image {
  margin: 0;
  padding: 0;
}

.hero-slide-next, .hero-slide-previous {
  top: 8px;
  position: relative;
  padding: 2px 6px 6px 6px;
  border: 1px solid white;
  border-radius: 8px;
  font-size: 2rem;
  font-weight: bold;
}

.hero-slide-next {
  left: 24px;
}

.hero-slide-previous {
  right: 24px;
}

.hero-menu {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 16px;
  row-gap: 8px;
  justify-content: start;
}

.menu-notice {
  text-decoration: underline;
}

.menu-warning {
  font-weight: bold;
}

.menu-card {
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
  background-color: #295791;
  border-radius: 4px;
  border: 1px solid #efefef;
}

.menu-card:nth-of-type(1), .menu-card:nth-of-type(4), .menu-card:nth-of-type(5), .menu-card:nth-of-type(8), .menu-card:nth-of-type(9), .menu-card:nth-of-type(12) {
  background-color: #c75a35;
}

.hero > img {
  border: 1px solid #efefef;
  border-radius: 4px;
}

.card-left, .card-right {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.card-left {
  align-items: start;
  text-align: start;
}

.card-left > h4, .card-right > h4, .card-right > p {
  margin: 0;
}

.card-right {
  align-items: end;
  text-align: end;
}

.contact-form {
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(2, 1fr);
  row-gap: 8px;
}

.contact-form > label, .contact-form > input {
  text-align: start;
  font-size: 1.25rem;
}

.form-button {
  margin-top: 24px;
  padding: 8px 24px;
  font-family: 'InterfaceFont';
  font-size: 1.125rem;
  border: 1px solid white;
  border-radius: 4px;
}



.footer {
  display: flex;
  justify-content: center;
  align-items: center;
  
  font-family: 'InterfaceFont';
  font-size: 1.25rem;
  border-top: 2px solid #5a9332;
  background-position: bottom;
}

.footer-source {
  display: flex;
  align-items: center;
  gap: 8px;
}

.footer-logo {
  height: 25px;
}

.foot-text {
  margin: 6px 0;
  font-weight: bold;
}`, "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"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","sourcesContent":["@font-face {\n  font-family: 'LogoFont';\n  src: url('./assets/minecraft-logo.ttf');\n}\n\n@font-face {\n  font-family: 'InterfaceFont';\n  src: url('./assets/minecraft.otf'), url('./assets/minecraft-italic.otf'), url('./assets/minecraft-bold.otf'), url('./assets/minecraft-bold-italic.otf');\n}\n\n* {\n  box-sizing: border-box;\n}\n\n::-webkit-scrollbar {\n  display: none;\n}\n\nh1, h2, h3, h4, h5, h6 {\n  margin: 0;\n  padding: 0;\n}\n\nbody {\n  margin: 0;\n  padding: 0;\n\n  min-height: 100vh;\n  display: flex;\n  flex-direction: column;\n\n  font-family: Verdana, Geneva, Tahoma, sans-serif;\n  background-image: url(./assets/hero-bg.jpg);\n  background-size: cover;\n  backdrop-filter: blur(8px);\n}\n\na {\n  text-decoration: none;\n  color: inherit;\n}\n\nbutton:hover, a:hover {\n  cursor: pointer;\n}\n\n\n\n#content {\n  display: flex;\n  flex-direction: column;\n  flex: 1;\n}\n\n\n\n.header, .footer {\n  background-image: url(./assets/head-foot-bg.jpg);\n}\n\n.header {\n  padding-block: 24px;\n  padding-inline: 48px;\n\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  box-shadow: 0 -6px 10px 5px rgba(0,0,0,0.5);\n  border-bottom: 2px solid #87c5fe;\n}\n\n.header > h1 {\n  font-size: 2.5rem;\n  letter-spacing: 2px;\n}\n\n.header > h1, .nav > button {\n  font-family: 'LogoFont';\n}\n\n.nav {\n  display: flex;\n  gap: 48px;\n}\n\n.nav > button {\n  padding: 8px 16px;\n\n  border: 1px solid black;\n  border-radius: 4px;\n  font-size: 1.25rem;\n  letter-spacing: 1px;\n}\n\nnav > .active {\n  background-color: #9dcdfb50;\n  backdrop-filter: blur(4px);\n  box-shadow: 0 0 36px #ffffff;\n  border: 1px solid black;\n  color: black;\n}\n\n\n\n.page-content {\n  flex: 1;\n  display: flex;\n  justify-content: center;\n\n  font-family: 'InterfaceFont';\n  text-align: center;\n}\n\n.hero {\n  margin: 24px 0;\n  padding: 16px;\n\n  min-width: 75%;\n\n  display: flex;\n  flex-direction: column;\n  justify-content: space-evenly;\n  align-items: center;\n  background-color: #00000025;\n  border: 1px solid #efefef;\n  border-radius: 4px;\n  color: #efefef;\n}\n\n.divider {\n  width: 500px;\n}\n\n.hero-head {\n  margin: 0;\n  padding: 0;\n}\n\n.hero-para-title {\n  text-decoration: underline;\n}\n\n.hero-slide-text {\n  margin: 0;\n  padding: 0;\n  position: relative;\n  top: 32px;\n  font-size: 1.25rem;\n}\n\n.hero-slide {\n  margin: 0;\n  padding: 0;\n  display: none;\n}\n\n.hero-slide-active {\n  display: block;\n}\n\n.hero-slide-active img {\n  border: 1px solid white;\n  position: relative;\n  z-index: -1;\n}\n\n.hero-slide-image {\n  margin: 0;\n  padding: 0;\n}\n\n.hero-slide-next, .hero-slide-previous {\n  top: 8px;\n  position: relative;\n  padding: 2px 6px 6px 6px;\n  border: 1px solid white;\n  border-radius: 8px;\n  font-size: 2rem;\n  font-weight: bold;\n}\n\n.hero-slide-next {\n  left: 24px;\n}\n\n.hero-slide-previous {\n  right: 24px;\n}\n\n.hero-menu {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  column-gap: 16px;\n  row-gap: 8px;\n  justify-content: start;\n}\n\n.menu-notice {\n  text-decoration: underline;\n}\n\n.menu-warning {\n  font-weight: bold;\n}\n\n.menu-card {\n  padding: 16px;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 24px;\n  background-color: #295791;\n  border-radius: 4px;\n  border: 1px solid #efefef;\n}\n\n.menu-card:nth-of-type(1), .menu-card:nth-of-type(4), .menu-card:nth-of-type(5), .menu-card:nth-of-type(8), .menu-card:nth-of-type(9), .menu-card:nth-of-type(12) {\n  background-color: #c75a35;\n}\n\n.hero > img {\n  border: 1px solid #efefef;\n  border-radius: 4px;\n}\n\n.card-left, .card-right {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n\n.card-left {\n  align-items: start;\n  text-align: start;\n}\n\n.card-left > h4, .card-right > h4, .card-right > p {\n  margin: 0;\n}\n\n.card-right {\n  align-items: end;\n  text-align: end;\n}\n\n.contact-form {\n  display: grid;\n  justify-content: center;\n  grid-template-columns: repeat(2, 1fr);\n  row-gap: 8px;\n}\n\n.contact-form > label, .contact-form > input {\n  text-align: start;\n  font-size: 1.25rem;\n}\n\n.form-button {\n  margin-top: 24px;\n  padding: 8px 24px;\n  font-family: 'InterfaceFont';\n  font-size: 1.125rem;\n  border: 1px solid white;\n  border-radius: 4px;\n}\n\n\n\n.footer {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  \n  font-family: 'InterfaceFont';\n  font-size: 1.25rem;\n  border-top: 2px solid #5a9332;\n  background-position: bottom;\n}\n\n.footer-source {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n\n.footer-logo {\n  height: 25px;\n}\n\n.foot-text {\n  margin: 6px 0;\n  font-weight: bold;\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/getUrl.js":
/*!********************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/getUrl.js ***!
  \********************************************************/
/***/ ((module) => {

"use strict";


module.exports = function (url, options) {
  if (!options) {
    options = {};
  }
  if (!url) {
    return url;
  }
  url = String(url.__esModule ? url.default : url);

  // If url is already wrapped in quotes, remove them
  if (/^['"].*['"]$/.test(url)) {
    url = url.slice(1, -1);
  }
  if (options.hash) {
    url += options.hash;
  }

  // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls
  if (/["'() \t\n]|(%20)/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }
  return url;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {

"use strict";


module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./node_modules/define-data-property/index.js":
/*!****************************************************!*\
  !*** ./node_modules/define-data-property/index.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var hasPropertyDescriptors = __webpack_require__(/*! has-property-descriptors */ "./node_modules/has-property-descriptors/index.js")();

var GetIntrinsic = __webpack_require__(/*! get-intrinsic */ "./node_modules/get-intrinsic/index.js");

var $defineProperty = hasPropertyDescriptors && GetIntrinsic('%Object.defineProperty%', true);
if ($defineProperty) {
	try {
		$defineProperty({}, 'a', { value: 1 });
	} catch (e) {
		// IE 8 has a broken defineProperty
		$defineProperty = false;
	}
}

var $SyntaxError = GetIntrinsic('%SyntaxError%');
var $TypeError = GetIntrinsic('%TypeError%');

var gopd = __webpack_require__(/*! gopd */ "./node_modules/gopd/index.js");

/** @type {(obj: Record<PropertyKey, unknown>, property: PropertyKey, value: unknown, nonEnumerable?: boolean | null, nonWritable?: boolean | null, nonConfigurable?: boolean | null, loose?: boolean) => void} */
module.exports = function defineDataProperty(
	obj,
	property,
	value
) {
	if (!obj || (typeof obj !== 'object' && typeof obj !== 'function')) {
		throw new $TypeError('`obj` must be an object or a function`');
	}
	if (typeof property !== 'string' && typeof property !== 'symbol') {
		throw new $TypeError('`property` must be a string or a symbol`');
	}
	if (arguments.length > 3 && typeof arguments[3] !== 'boolean' && arguments[3] !== null) {
		throw new $TypeError('`nonEnumerable`, if provided, must be a boolean or null');
	}
	if (arguments.length > 4 && typeof arguments[4] !== 'boolean' && arguments[4] !== null) {
		throw new $TypeError('`nonWritable`, if provided, must be a boolean or null');
	}
	if (arguments.length > 5 && typeof arguments[5] !== 'boolean' && arguments[5] !== null) {
		throw new $TypeError('`nonConfigurable`, if provided, must be a boolean or null');
	}
	if (arguments.length > 6 && typeof arguments[6] !== 'boolean') {
		throw new $TypeError('`loose`, if provided, must be a boolean');
	}

	var nonEnumerable = arguments.length > 3 ? arguments[3] : null;
	var nonWritable = arguments.length > 4 ? arguments[4] : null;
	var nonConfigurable = arguments.length > 5 ? arguments[5] : null;
	var loose = arguments.length > 6 ? arguments[6] : false;

	/* @type {false | TypedPropertyDescriptor<unknown>} */
	var desc = !!gopd && gopd(obj, property);

	if ($defineProperty) {
		$defineProperty(obj, property, {
			configurable: nonConfigurable === null && desc ? desc.configurable : !nonConfigurable,
			enumerable: nonEnumerable === null && desc ? desc.enumerable : !nonEnumerable,
			value: value,
			writable: nonWritable === null && desc ? desc.writable : !nonWritable
		});
	} else if (loose || (!nonEnumerable && !nonWritable && !nonConfigurable)) {
		// must fall back to [[Set]], and was not explicitly asked to make non-enumerable, non-writable, or non-configurable
		obj[property] = value; // eslint-disable-line no-param-reassign
	} else {
		throw new $SyntaxError('This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.');
	}
};


/***/ }),

/***/ "./node_modules/define-properties/index.js":
/*!*************************************************!*\
  !*** ./node_modules/define-properties/index.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var keys = __webpack_require__(/*! object-keys */ "./node_modules/object-keys/index.js");
var hasSymbols = typeof Symbol === 'function' && typeof Symbol('foo') === 'symbol';

var toStr = Object.prototype.toString;
var concat = Array.prototype.concat;
var defineDataProperty = __webpack_require__(/*! define-data-property */ "./node_modules/define-data-property/index.js");

var isFunction = function (fn) {
	return typeof fn === 'function' && toStr.call(fn) === '[object Function]';
};

var supportsDescriptors = __webpack_require__(/*! has-property-descriptors */ "./node_modules/has-property-descriptors/index.js")();

var defineProperty = function (object, name, value, predicate) {
	if (name in object) {
		if (predicate === true) {
			if (object[name] === value) {
				return;
			}
		} else if (!isFunction(predicate) || !predicate()) {
			return;
		}
	}

	if (supportsDescriptors) {
		defineDataProperty(object, name, value, true);
	} else {
		defineDataProperty(object, name, value);
	}
};

var defineProperties = function (object, map) {
	var predicates = arguments.length > 2 ? arguments[2] : {};
	var props = keys(map);
	if (hasSymbols) {
		props = concat.call(props, Object.getOwnPropertySymbols(map));
	}
	for (var i = 0; i < props.length; i += 1) {
		defineProperty(object, props[i], map[props[i]], predicates[props[i]]);
	}
};

defineProperties.supportsDescriptors = !!supportsDescriptors;

module.exports = defineProperties;


/***/ }),

/***/ "./node_modules/for-each/index.js":
/*!****************************************!*\
  !*** ./node_modules/for-each/index.js ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isCallable = __webpack_require__(/*! is-callable */ "./node_modules/is-callable/index.js");

var toStr = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

var forEachArray = function forEachArray(array, iterator, receiver) {
    for (var i = 0, len = array.length; i < len; i++) {
        if (hasOwnProperty.call(array, i)) {
            if (receiver == null) {
                iterator(array[i], i, array);
            } else {
                iterator.call(receiver, array[i], i, array);
            }
        }
    }
};

var forEachString = function forEachString(string, iterator, receiver) {
    for (var i = 0, len = string.length; i < len; i++) {
        // no such thing as a sparse string.
        if (receiver == null) {
            iterator(string.charAt(i), i, string);
        } else {
            iterator.call(receiver, string.charAt(i), i, string);
        }
    }
};

var forEachObject = function forEachObject(object, iterator, receiver) {
    for (var k in object) {
        if (hasOwnProperty.call(object, k)) {
            if (receiver == null) {
                iterator(object[k], k, object);
            } else {
                iterator.call(receiver, object[k], k, object);
            }
        }
    }
};

var forEach = function forEach(list, iterator, thisArg) {
    if (!isCallable(iterator)) {
        throw new TypeError('iterator must be a function');
    }

    var receiver;
    if (arguments.length >= 3) {
        receiver = thisArg;
    }

    if (toStr.call(list) === '[object Array]') {
        forEachArray(list, iterator, receiver);
    } else if (typeof list === 'string') {
        forEachString(list, iterator, receiver);
    } else {
        forEachObject(list, iterator, receiver);
    }
};

module.exports = forEach;


/***/ }),

/***/ "./node_modules/function-bind/implementation.js":
/*!******************************************************!*\
  !*** ./node_modules/function-bind/implementation.js ***!
  \******************************************************/
/***/ ((module) => {

"use strict";


/* eslint no-invalid-this: 1 */

var ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';
var toStr = Object.prototype.toString;
var max = Math.max;
var funcType = '[object Function]';

var concatty = function concatty(a, b) {
    var arr = [];

    for (var i = 0; i < a.length; i += 1) {
        arr[i] = a[i];
    }
    for (var j = 0; j < b.length; j += 1) {
        arr[j + a.length] = b[j];
    }

    return arr;
};

var slicy = function slicy(arrLike, offset) {
    var arr = [];
    for (var i = offset || 0, j = 0; i < arrLike.length; i += 1, j += 1) {
        arr[j] = arrLike[i];
    }
    return arr;
};

var joiny = function (arr, joiner) {
    var str = '';
    for (var i = 0; i < arr.length; i += 1) {
        str += arr[i];
        if (i + 1 < arr.length) {
            str += joiner;
        }
    }
    return str;
};

module.exports = function bind(that) {
    var target = this;
    if (typeof target !== 'function' || toStr.apply(target) !== funcType) {
        throw new TypeError(ERROR_MESSAGE + target);
    }
    var args = slicy(arguments, 1);

    var bound;
    var binder = function () {
        if (this instanceof bound) {
            var result = target.apply(
                this,
                concatty(args, arguments)
            );
            if (Object(result) === result) {
                return result;
            }
            return this;
        }
        return target.apply(
            that,
            concatty(args, arguments)
        );

    };

    var boundLength = max(0, target.length - args.length);
    var boundArgs = [];
    for (var i = 0; i < boundLength; i++) {
        boundArgs[i] = '$' + i;
    }

    bound = Function('binder', 'return function (' + joiny(boundArgs, ',') + '){ return binder.apply(this,arguments); }')(binder);

    if (target.prototype) {
        var Empty = function Empty() {};
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
    }

    return bound;
};


/***/ }),

/***/ "./node_modules/function-bind/index.js":
/*!*********************************************!*\
  !*** ./node_modules/function-bind/index.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var implementation = __webpack_require__(/*! ./implementation */ "./node_modules/function-bind/implementation.js");

module.exports = Function.prototype.bind || implementation;


/***/ }),

/***/ "./node_modules/get-intrinsic/index.js":
/*!*********************************************!*\
  !*** ./node_modules/get-intrinsic/index.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var undefined;

var $SyntaxError = SyntaxError;
var $Function = Function;
var $TypeError = TypeError;

// eslint-disable-next-line consistent-return
var getEvalledConstructor = function (expressionSyntax) {
	try {
		return $Function('"use strict"; return (' + expressionSyntax + ').constructor;')();
	} catch (e) {}
};

var $gOPD = Object.getOwnPropertyDescriptor;
if ($gOPD) {
	try {
		$gOPD({}, '');
	} catch (e) {
		$gOPD = null; // this is IE 8, which has a broken gOPD
	}
}

var throwTypeError = function () {
	throw new $TypeError();
};
var ThrowTypeError = $gOPD
	? (function () {
		try {
			// eslint-disable-next-line no-unused-expressions, no-caller, no-restricted-properties
			arguments.callee; // IE 8 does not throw here
			return throwTypeError;
		} catch (calleeThrows) {
			try {
				// IE 8 throws on Object.getOwnPropertyDescriptor(arguments, '')
				return $gOPD(arguments, 'callee').get;
			} catch (gOPDthrows) {
				return throwTypeError;
			}
		}
	}())
	: throwTypeError;

var hasSymbols = __webpack_require__(/*! has-symbols */ "./node_modules/has-symbols/index.js")();
var hasProto = __webpack_require__(/*! has-proto */ "./node_modules/has-proto/index.js")();

var getProto = Object.getPrototypeOf || (
	hasProto
		? function (x) { return x.__proto__; } // eslint-disable-line no-proto
		: null
);

var needsEval = {};

var TypedArray = typeof Uint8Array === 'undefined' || !getProto ? undefined : getProto(Uint8Array);

var INTRINSICS = {
	'%AggregateError%': typeof AggregateError === 'undefined' ? undefined : AggregateError,
	'%Array%': Array,
	'%ArrayBuffer%': typeof ArrayBuffer === 'undefined' ? undefined : ArrayBuffer,
	'%ArrayIteratorPrototype%': hasSymbols && getProto ? getProto([][Symbol.iterator]()) : undefined,
	'%AsyncFromSyncIteratorPrototype%': undefined,
	'%AsyncFunction%': needsEval,
	'%AsyncGenerator%': needsEval,
	'%AsyncGeneratorFunction%': needsEval,
	'%AsyncIteratorPrototype%': needsEval,
	'%Atomics%': typeof Atomics === 'undefined' ? undefined : Atomics,
	'%BigInt%': typeof BigInt === 'undefined' ? undefined : BigInt,
	'%BigInt64Array%': typeof BigInt64Array === 'undefined' ? undefined : BigInt64Array,
	'%BigUint64Array%': typeof BigUint64Array === 'undefined' ? undefined : BigUint64Array,
	'%Boolean%': Boolean,
	'%DataView%': typeof DataView === 'undefined' ? undefined : DataView,
	'%Date%': Date,
	'%decodeURI%': decodeURI,
	'%decodeURIComponent%': decodeURIComponent,
	'%encodeURI%': encodeURI,
	'%encodeURIComponent%': encodeURIComponent,
	'%Error%': Error,
	'%eval%': eval, // eslint-disable-line no-eval
	'%EvalError%': EvalError,
	'%Float32Array%': typeof Float32Array === 'undefined' ? undefined : Float32Array,
	'%Float64Array%': typeof Float64Array === 'undefined' ? undefined : Float64Array,
	'%FinalizationRegistry%': typeof FinalizationRegistry === 'undefined' ? undefined : FinalizationRegistry,
	'%Function%': $Function,
	'%GeneratorFunction%': needsEval,
	'%Int8Array%': typeof Int8Array === 'undefined' ? undefined : Int8Array,
	'%Int16Array%': typeof Int16Array === 'undefined' ? undefined : Int16Array,
	'%Int32Array%': typeof Int32Array === 'undefined' ? undefined : Int32Array,
	'%isFinite%': isFinite,
	'%isNaN%': isNaN,
	'%IteratorPrototype%': hasSymbols && getProto ? getProto(getProto([][Symbol.iterator]())) : undefined,
	'%JSON%': typeof JSON === 'object' ? JSON : undefined,
	'%Map%': typeof Map === 'undefined' ? undefined : Map,
	'%MapIteratorPrototype%': typeof Map === 'undefined' || !hasSymbols || !getProto ? undefined : getProto(new Map()[Symbol.iterator]()),
	'%Math%': Math,
	'%Number%': Number,
	'%Object%': Object,
	'%parseFloat%': parseFloat,
	'%parseInt%': parseInt,
	'%Promise%': typeof Promise === 'undefined' ? undefined : Promise,
	'%Proxy%': typeof Proxy === 'undefined' ? undefined : Proxy,
	'%RangeError%': RangeError,
	'%ReferenceError%': ReferenceError,
	'%Reflect%': typeof Reflect === 'undefined' ? undefined : Reflect,
	'%RegExp%': RegExp,
	'%Set%': typeof Set === 'undefined' ? undefined : Set,
	'%SetIteratorPrototype%': typeof Set === 'undefined' || !hasSymbols || !getProto ? undefined : getProto(new Set()[Symbol.iterator]()),
	'%SharedArrayBuffer%': typeof SharedArrayBuffer === 'undefined' ? undefined : SharedArrayBuffer,
	'%String%': String,
	'%StringIteratorPrototype%': hasSymbols && getProto ? getProto(''[Symbol.iterator]()) : undefined,
	'%Symbol%': hasSymbols ? Symbol : undefined,
	'%SyntaxError%': $SyntaxError,
	'%ThrowTypeError%': ThrowTypeError,
	'%TypedArray%': TypedArray,
	'%TypeError%': $TypeError,
	'%Uint8Array%': typeof Uint8Array === 'undefined' ? undefined : Uint8Array,
	'%Uint8ClampedArray%': typeof Uint8ClampedArray === 'undefined' ? undefined : Uint8ClampedArray,
	'%Uint16Array%': typeof Uint16Array === 'undefined' ? undefined : Uint16Array,
	'%Uint32Array%': typeof Uint32Array === 'undefined' ? undefined : Uint32Array,
	'%URIError%': URIError,
	'%WeakMap%': typeof WeakMap === 'undefined' ? undefined : WeakMap,
	'%WeakRef%': typeof WeakRef === 'undefined' ? undefined : WeakRef,
	'%WeakSet%': typeof WeakSet === 'undefined' ? undefined : WeakSet
};

if (getProto) {
	try {
		null.error; // eslint-disable-line no-unused-expressions
	} catch (e) {
		// https://github.com/tc39/proposal-shadowrealm/pull/384#issuecomment-1364264229
		var errorProto = getProto(getProto(e));
		INTRINSICS['%Error.prototype%'] = errorProto;
	}
}

var doEval = function doEval(name) {
	var value;
	if (name === '%AsyncFunction%') {
		value = getEvalledConstructor('async function () {}');
	} else if (name === '%GeneratorFunction%') {
		value = getEvalledConstructor('function* () {}');
	} else if (name === '%AsyncGeneratorFunction%') {
		value = getEvalledConstructor('async function* () {}');
	} else if (name === '%AsyncGenerator%') {
		var fn = doEval('%AsyncGeneratorFunction%');
		if (fn) {
			value = fn.prototype;
		}
	} else if (name === '%AsyncIteratorPrototype%') {
		var gen = doEval('%AsyncGenerator%');
		if (gen && getProto) {
			value = getProto(gen.prototype);
		}
	}

	INTRINSICS[name] = value;

	return value;
};

var LEGACY_ALIASES = {
	'%ArrayBufferPrototype%': ['ArrayBuffer', 'prototype'],
	'%ArrayPrototype%': ['Array', 'prototype'],
	'%ArrayProto_entries%': ['Array', 'prototype', 'entries'],
	'%ArrayProto_forEach%': ['Array', 'prototype', 'forEach'],
	'%ArrayProto_keys%': ['Array', 'prototype', 'keys'],
	'%ArrayProto_values%': ['Array', 'prototype', 'values'],
	'%AsyncFunctionPrototype%': ['AsyncFunction', 'prototype'],
	'%AsyncGenerator%': ['AsyncGeneratorFunction', 'prototype'],
	'%AsyncGeneratorPrototype%': ['AsyncGeneratorFunction', 'prototype', 'prototype'],
	'%BooleanPrototype%': ['Boolean', 'prototype'],
	'%DataViewPrototype%': ['DataView', 'prototype'],
	'%DatePrototype%': ['Date', 'prototype'],
	'%ErrorPrototype%': ['Error', 'prototype'],
	'%EvalErrorPrototype%': ['EvalError', 'prototype'],
	'%Float32ArrayPrototype%': ['Float32Array', 'prototype'],
	'%Float64ArrayPrototype%': ['Float64Array', 'prototype'],
	'%FunctionPrototype%': ['Function', 'prototype'],
	'%Generator%': ['GeneratorFunction', 'prototype'],
	'%GeneratorPrototype%': ['GeneratorFunction', 'prototype', 'prototype'],
	'%Int8ArrayPrototype%': ['Int8Array', 'prototype'],
	'%Int16ArrayPrototype%': ['Int16Array', 'prototype'],
	'%Int32ArrayPrototype%': ['Int32Array', 'prototype'],
	'%JSONParse%': ['JSON', 'parse'],
	'%JSONStringify%': ['JSON', 'stringify'],
	'%MapPrototype%': ['Map', 'prototype'],
	'%NumberPrototype%': ['Number', 'prototype'],
	'%ObjectPrototype%': ['Object', 'prototype'],
	'%ObjProto_toString%': ['Object', 'prototype', 'toString'],
	'%ObjProto_valueOf%': ['Object', 'prototype', 'valueOf'],
	'%PromisePrototype%': ['Promise', 'prototype'],
	'%PromiseProto_then%': ['Promise', 'prototype', 'then'],
	'%Promise_all%': ['Promise', 'all'],
	'%Promise_reject%': ['Promise', 'reject'],
	'%Promise_resolve%': ['Promise', 'resolve'],
	'%RangeErrorPrototype%': ['RangeError', 'prototype'],
	'%ReferenceErrorPrototype%': ['ReferenceError', 'prototype'],
	'%RegExpPrototype%': ['RegExp', 'prototype'],
	'%SetPrototype%': ['Set', 'prototype'],
	'%SharedArrayBufferPrototype%': ['SharedArrayBuffer', 'prototype'],
	'%StringPrototype%': ['String', 'prototype'],
	'%SymbolPrototype%': ['Symbol', 'prototype'],
	'%SyntaxErrorPrototype%': ['SyntaxError', 'prototype'],
	'%TypedArrayPrototype%': ['TypedArray', 'prototype'],
	'%TypeErrorPrototype%': ['TypeError', 'prototype'],
	'%Uint8ArrayPrototype%': ['Uint8Array', 'prototype'],
	'%Uint8ClampedArrayPrototype%': ['Uint8ClampedArray', 'prototype'],
	'%Uint16ArrayPrototype%': ['Uint16Array', 'prototype'],
	'%Uint32ArrayPrototype%': ['Uint32Array', 'prototype'],
	'%URIErrorPrototype%': ['URIError', 'prototype'],
	'%WeakMapPrototype%': ['WeakMap', 'prototype'],
	'%WeakSetPrototype%': ['WeakSet', 'prototype']
};

var bind = __webpack_require__(/*! function-bind */ "./node_modules/function-bind/index.js");
var hasOwn = __webpack_require__(/*! hasown */ "./node_modules/hasown/index.js");
var $concat = bind.call(Function.call, Array.prototype.concat);
var $spliceApply = bind.call(Function.apply, Array.prototype.splice);
var $replace = bind.call(Function.call, String.prototype.replace);
var $strSlice = bind.call(Function.call, String.prototype.slice);
var $exec = bind.call(Function.call, RegExp.prototype.exec);

/* adapted from https://github.com/lodash/lodash/blob/4.17.15/dist/lodash.js#L6735-L6744 */
var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
var reEscapeChar = /\\(\\)?/g; /** Used to match backslashes in property paths. */
var stringToPath = function stringToPath(string) {
	var first = $strSlice(string, 0, 1);
	var last = $strSlice(string, -1);
	if (first === '%' && last !== '%') {
		throw new $SyntaxError('invalid intrinsic syntax, expected closing `%`');
	} else if (last === '%' && first !== '%') {
		throw new $SyntaxError('invalid intrinsic syntax, expected opening `%`');
	}
	var result = [];
	$replace(string, rePropName, function (match, number, quote, subString) {
		result[result.length] = quote ? $replace(subString, reEscapeChar, '$1') : number || match;
	});
	return result;
};
/* end adaptation */

var getBaseIntrinsic = function getBaseIntrinsic(name, allowMissing) {
	var intrinsicName = name;
	var alias;
	if (hasOwn(LEGACY_ALIASES, intrinsicName)) {
		alias = LEGACY_ALIASES[intrinsicName];
		intrinsicName = '%' + alias[0] + '%';
	}

	if (hasOwn(INTRINSICS, intrinsicName)) {
		var value = INTRINSICS[intrinsicName];
		if (value === needsEval) {
			value = doEval(intrinsicName);
		}
		if (typeof value === 'undefined' && !allowMissing) {
			throw new $TypeError('intrinsic ' + name + ' exists, but is not available. Please file an issue!');
		}

		return {
			alias: alias,
			name: intrinsicName,
			value: value
		};
	}

	throw new $SyntaxError('intrinsic ' + name + ' does not exist!');
};

module.exports = function GetIntrinsic(name, allowMissing) {
	if (typeof name !== 'string' || name.length === 0) {
		throw new $TypeError('intrinsic name must be a non-empty string');
	}
	if (arguments.length > 1 && typeof allowMissing !== 'boolean') {
		throw new $TypeError('"allowMissing" argument must be a boolean');
	}

	if ($exec(/^%?[^%]*%?$/, name) === null) {
		throw new $SyntaxError('`%` may not be present anywhere but at the beginning and end of the intrinsic name');
	}
	var parts = stringToPath(name);
	var intrinsicBaseName = parts.length > 0 ? parts[0] : '';

	var intrinsic = getBaseIntrinsic('%' + intrinsicBaseName + '%', allowMissing);
	var intrinsicRealName = intrinsic.name;
	var value = intrinsic.value;
	var skipFurtherCaching = false;

	var alias = intrinsic.alias;
	if (alias) {
		intrinsicBaseName = alias[0];
		$spliceApply(parts, $concat([0, 1], alias));
	}

	for (var i = 1, isOwn = true; i < parts.length; i += 1) {
		var part = parts[i];
		var first = $strSlice(part, 0, 1);
		var last = $strSlice(part, -1);
		if (
			(
				(first === '"' || first === "'" || first === '`')
				|| (last === '"' || last === "'" || last === '`')
			)
			&& first !== last
		) {
			throw new $SyntaxError('property names with quotes must have matching quotes');
		}
		if (part === 'constructor' || !isOwn) {
			skipFurtherCaching = true;
		}

		intrinsicBaseName += '.' + part;
		intrinsicRealName = '%' + intrinsicBaseName + '%';

		if (hasOwn(INTRINSICS, intrinsicRealName)) {
			value = INTRINSICS[intrinsicRealName];
		} else if (value != null) {
			if (!(part in value)) {
				if (!allowMissing) {
					throw new $TypeError('base intrinsic for ' + name + ' exists, but the property is not available.');
				}
				return void undefined;
			}
			if ($gOPD && (i + 1) >= parts.length) {
				var desc = $gOPD(value, part);
				isOwn = !!desc;

				// By convention, when a data property is converted to an accessor
				// property to emulate a data property that does not suffer from
				// the override mistake, that accessor's getter is marked with
				// an `originalValue` property. Here, when we detect this, we
				// uphold the illusion by pretending to see that original data
				// property, i.e., returning the value rather than the getter
				// itself.
				if (isOwn && 'get' in desc && !('originalValue' in desc.get)) {
					value = desc.get;
				} else {
					value = value[part];
				}
			} else {
				isOwn = hasOwn(value, part);
				value = value[part];
			}

			if (isOwn && !skipFurtherCaching) {
				INTRINSICS[intrinsicRealName] = value;
			}
		}
	}
	return value;
};


/***/ }),

/***/ "./node_modules/gopd/index.js":
/*!************************************!*\
  !*** ./node_modules/gopd/index.js ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var GetIntrinsic = __webpack_require__(/*! get-intrinsic */ "./node_modules/get-intrinsic/index.js");

var $gOPD = GetIntrinsic('%Object.getOwnPropertyDescriptor%', true);

if ($gOPD) {
	try {
		$gOPD([], 'length');
	} catch (e) {
		// IE 8 has a broken gOPD
		$gOPD = null;
	}
}

module.exports = $gOPD;


/***/ }),

/***/ "./node_modules/has-property-descriptors/index.js":
/*!********************************************************!*\
  !*** ./node_modules/has-property-descriptors/index.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var GetIntrinsic = __webpack_require__(/*! get-intrinsic */ "./node_modules/get-intrinsic/index.js");

var $defineProperty = GetIntrinsic('%Object.defineProperty%', true);

var hasPropertyDescriptors = function hasPropertyDescriptors() {
	if ($defineProperty) {
		try {
			$defineProperty({}, 'a', { value: 1 });
			return true;
		} catch (e) {
			// IE 8 has a broken defineProperty
			return false;
		}
	}
	return false;
};

hasPropertyDescriptors.hasArrayLengthDefineBug = function hasArrayLengthDefineBug() {
	// node v0.6 has a bug where array lengths can be Set but not Defined
	if (!hasPropertyDescriptors()) {
		return null;
	}
	try {
		return $defineProperty([], 'length', { value: 1 }).length !== 1;
	} catch (e) {
		// In Firefox 4-22, defining length on an array throws an exception.
		return true;
	}
};

module.exports = hasPropertyDescriptors;


/***/ }),

/***/ "./node_modules/has-proto/index.js":
/*!*****************************************!*\
  !*** ./node_modules/has-proto/index.js ***!
  \*****************************************/
/***/ ((module) => {

"use strict";


var test = {
	foo: {}
};

var $Object = Object;

module.exports = function hasProto() {
	return { __proto__: test }.foo === test.foo && !({ __proto__: null } instanceof $Object);
};


/***/ }),

/***/ "./node_modules/has-symbols/index.js":
/*!*******************************************!*\
  !*** ./node_modules/has-symbols/index.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var origSymbol = typeof Symbol !== 'undefined' && Symbol;
var hasSymbolSham = __webpack_require__(/*! ./shams */ "./node_modules/has-symbols/shams.js");

module.exports = function hasNativeSymbols() {
	if (typeof origSymbol !== 'function') { return false; }
	if (typeof Symbol !== 'function') { return false; }
	if (typeof origSymbol('foo') !== 'symbol') { return false; }
	if (typeof Symbol('bar') !== 'symbol') { return false; }

	return hasSymbolSham();
};


/***/ }),

/***/ "./node_modules/has-symbols/shams.js":
/*!*******************************************!*\
  !*** ./node_modules/has-symbols/shams.js ***!
  \*******************************************/
/***/ ((module) => {

"use strict";


/* eslint complexity: [2, 18], max-statements: [2, 33] */
module.exports = function hasSymbols() {
	if (typeof Symbol !== 'function' || typeof Object.getOwnPropertySymbols !== 'function') { return false; }
	if (typeof Symbol.iterator === 'symbol') { return true; }

	var obj = {};
	var sym = Symbol('test');
	var symObj = Object(sym);
	if (typeof sym === 'string') { return false; }

	if (Object.prototype.toString.call(sym) !== '[object Symbol]') { return false; }
	if (Object.prototype.toString.call(symObj) !== '[object Symbol]') { return false; }

	// temp disabled per https://github.com/ljharb/object.assign/issues/17
	// if (sym instanceof Symbol) { return false; }
	// temp disabled per https://github.com/WebReflection/get-own-property-symbols/issues/4
	// if (!(symObj instanceof Symbol)) { return false; }

	// if (typeof Symbol.prototype.toString !== 'function') { return false; }
	// if (String(sym) !== Symbol.prototype.toString.call(sym)) { return false; }

	var symVal = 42;
	obj[sym] = symVal;
	for (sym in obj) { return false; } // eslint-disable-line no-restricted-syntax, no-unreachable-loop
	if (typeof Object.keys === 'function' && Object.keys(obj).length !== 0) { return false; }

	if (typeof Object.getOwnPropertyNames === 'function' && Object.getOwnPropertyNames(obj).length !== 0) { return false; }

	var syms = Object.getOwnPropertySymbols(obj);
	if (syms.length !== 1 || syms[0] !== sym) { return false; }

	if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) { return false; }

	if (typeof Object.getOwnPropertyDescriptor === 'function') {
		var descriptor = Object.getOwnPropertyDescriptor(obj, sym);
		if (descriptor.value !== symVal || descriptor.enumerable !== true) { return false; }
	}

	return true;
};


/***/ }),

/***/ "./node_modules/has-tostringtag/shams.js":
/*!***********************************************!*\
  !*** ./node_modules/has-tostringtag/shams.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var hasSymbols = __webpack_require__(/*! has-symbols/shams */ "./node_modules/has-symbols/shams.js");

module.exports = function hasToStringTagShams() {
	return hasSymbols() && !!Symbol.toStringTag;
};


/***/ }),

/***/ "./node_modules/hasown/index.js":
/*!**************************************!*\
  !*** ./node_modules/hasown/index.js ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var call = Function.prototype.call;
var $hasOwn = Object.prototype.hasOwnProperty;
var bind = __webpack_require__(/*! function-bind */ "./node_modules/function-bind/index.js");

/** @type {(o: {}, p: PropertyKey) => p is keyof o} */
module.exports = bind.call(call, $hasOwn);


/***/ }),

/***/ "./node_modules/inherits/inherits_browser.js":
/*!***************************************************!*\
  !*** ./node_modules/inherits/inherits_browser.js ***!
  \***************************************************/
/***/ ((module) => {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor
      ctor.prototype = Object.create(superCtor.prototype, {
        constructor: {
          value: ctor,
          enumerable: false,
          writable: true,
          configurable: true
        }
      })
    }
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor
      var TempCtor = function () {}
      TempCtor.prototype = superCtor.prototype
      ctor.prototype = new TempCtor()
      ctor.prototype.constructor = ctor
    }
  }
}


/***/ }),

/***/ "./node_modules/is-arguments/index.js":
/*!********************************************!*\
  !*** ./node_modules/is-arguments/index.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var hasToStringTag = __webpack_require__(/*! has-tostringtag/shams */ "./node_modules/has-tostringtag/shams.js")();
var callBound = __webpack_require__(/*! call-bind/callBound */ "./node_modules/call-bind/callBound.js");

var $toString = callBound('Object.prototype.toString');

var isStandardArguments = function isArguments(value) {
	if (hasToStringTag && value && typeof value === 'object' && Symbol.toStringTag in value) {
		return false;
	}
	return $toString(value) === '[object Arguments]';
};

var isLegacyArguments = function isArguments(value) {
	if (isStandardArguments(value)) {
		return true;
	}
	return value !== null &&
		typeof value === 'object' &&
		typeof value.length === 'number' &&
		value.length >= 0 &&
		$toString(value) !== '[object Array]' &&
		$toString(value.callee) === '[object Function]';
};

var supportsStandardArguments = (function () {
	return isStandardArguments(arguments);
}());

isStandardArguments.isLegacyArguments = isLegacyArguments; // for tests

module.exports = supportsStandardArguments ? isStandardArguments : isLegacyArguments;


/***/ }),

/***/ "./node_modules/is-callable/index.js":
/*!*******************************************!*\
  !*** ./node_modules/is-callable/index.js ***!
  \*******************************************/
/***/ ((module) => {

"use strict";


var fnToStr = Function.prototype.toString;
var reflectApply = typeof Reflect === 'object' && Reflect !== null && Reflect.apply;
var badArrayLike;
var isCallableMarker;
if (typeof reflectApply === 'function' && typeof Object.defineProperty === 'function') {
	try {
		badArrayLike = Object.defineProperty({}, 'length', {
			get: function () {
				throw isCallableMarker;
			}
		});
		isCallableMarker = {};
		// eslint-disable-next-line no-throw-literal
		reflectApply(function () { throw 42; }, null, badArrayLike);
	} catch (_) {
		if (_ !== isCallableMarker) {
			reflectApply = null;
		}
	}
} else {
	reflectApply = null;
}

var constructorRegex = /^\s*class\b/;
var isES6ClassFn = function isES6ClassFunction(value) {
	try {
		var fnStr = fnToStr.call(value);
		return constructorRegex.test(fnStr);
	} catch (e) {
		return false; // not a function
	}
};

var tryFunctionObject = function tryFunctionToStr(value) {
	try {
		if (isES6ClassFn(value)) { return false; }
		fnToStr.call(value);
		return true;
	} catch (e) {
		return false;
	}
};
var toStr = Object.prototype.toString;
var objectClass = '[object Object]';
var fnClass = '[object Function]';
var genClass = '[object GeneratorFunction]';
var ddaClass = '[object HTMLAllCollection]'; // IE 11
var ddaClass2 = '[object HTML document.all class]';
var ddaClass3 = '[object HTMLCollection]'; // IE 9-10
var hasToStringTag = typeof Symbol === 'function' && !!Symbol.toStringTag; // better: use `has-tostringtag`

var isIE68 = !(0 in [,]); // eslint-disable-line no-sparse-arrays, comma-spacing

var isDDA = function isDocumentDotAll() { return false; };
if (typeof document === 'object') {
	// Firefox 3 canonicalizes DDA to undefined when it's not accessed directly
	var all = document.all;
	if (toStr.call(all) === toStr.call(document.all)) {
		isDDA = function isDocumentDotAll(value) {
			/* globals document: false */
			// in IE 6-8, typeof document.all is "object" and it's truthy
			if ((isIE68 || !value) && (typeof value === 'undefined' || typeof value === 'object')) {
				try {
					var str = toStr.call(value);
					return (
						str === ddaClass
						|| str === ddaClass2
						|| str === ddaClass3 // opera 12.16
						|| str === objectClass // IE 6-8
					) && value('') == null; // eslint-disable-line eqeqeq
				} catch (e) { /**/ }
			}
			return false;
		};
	}
}

module.exports = reflectApply
	? function isCallable(value) {
		if (isDDA(value)) { return true; }
		if (!value) { return false; }
		if (typeof value !== 'function' && typeof value !== 'object') { return false; }
		try {
			reflectApply(value, null, badArrayLike);
		} catch (e) {
			if (e !== isCallableMarker) { return false; }
		}
		return !isES6ClassFn(value) && tryFunctionObject(value);
	}
	: function isCallable(value) {
		if (isDDA(value)) { return true; }
		if (!value) { return false; }
		if (typeof value !== 'function' && typeof value !== 'object') { return false; }
		if (hasToStringTag) { return tryFunctionObject(value); }
		if (isES6ClassFn(value)) { return false; }
		var strClass = toStr.call(value);
		if (strClass !== fnClass && strClass !== genClass && !(/^\[object HTML/).test(strClass)) { return false; }
		return tryFunctionObject(value);
	};


/***/ }),

/***/ "./node_modules/is-generator-function/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/is-generator-function/index.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var toStr = Object.prototype.toString;
var fnToStr = Function.prototype.toString;
var isFnRegex = /^\s*(?:function)?\*/;
var hasToStringTag = __webpack_require__(/*! has-tostringtag/shams */ "./node_modules/has-tostringtag/shams.js")();
var getProto = Object.getPrototypeOf;
var getGeneratorFunc = function () { // eslint-disable-line consistent-return
	if (!hasToStringTag) {
		return false;
	}
	try {
		return Function('return function*() {}')();
	} catch (e) {
	}
};
var GeneratorFunction;

module.exports = function isGeneratorFunction(fn) {
	if (typeof fn !== 'function') {
		return false;
	}
	if (isFnRegex.test(fnToStr.call(fn))) {
		return true;
	}
	if (!hasToStringTag) {
		var str = toStr.call(fn);
		return str === '[object GeneratorFunction]';
	}
	if (!getProto) {
		return false;
	}
	if (typeof GeneratorFunction === 'undefined') {
		var generatorFunc = getGeneratorFunc();
		GeneratorFunction = generatorFunc ? getProto(generatorFunc) : false;
	}
	return getProto(fn) === GeneratorFunction;
};


/***/ }),

/***/ "./node_modules/is-nan/implementation.js":
/*!***********************************************!*\
  !*** ./node_modules/is-nan/implementation.js ***!
  \***********************************************/
/***/ ((module) => {

"use strict";


/* http://www.ecma-international.org/ecma-262/6.0/#sec-number.isnan */

module.exports = function isNaN(value) {
	return value !== value;
};


/***/ }),

/***/ "./node_modules/is-nan/index.js":
/*!**************************************!*\
  !*** ./node_modules/is-nan/index.js ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var callBind = __webpack_require__(/*! call-bind */ "./node_modules/call-bind/index.js");
var define = __webpack_require__(/*! define-properties */ "./node_modules/define-properties/index.js");

var implementation = __webpack_require__(/*! ./implementation */ "./node_modules/is-nan/implementation.js");
var getPolyfill = __webpack_require__(/*! ./polyfill */ "./node_modules/is-nan/polyfill.js");
var shim = __webpack_require__(/*! ./shim */ "./node_modules/is-nan/shim.js");

var polyfill = callBind(getPolyfill(), Number);

/* http://www.ecma-international.org/ecma-262/6.0/#sec-number.isnan */

define(polyfill, {
	getPolyfill: getPolyfill,
	implementation: implementation,
	shim: shim
});

module.exports = polyfill;


/***/ }),

/***/ "./node_modules/is-nan/polyfill.js":
/*!*****************************************!*\
  !*** ./node_modules/is-nan/polyfill.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var implementation = __webpack_require__(/*! ./implementation */ "./node_modules/is-nan/implementation.js");

module.exports = function getPolyfill() {
	if (Number.isNaN && Number.isNaN(NaN) && !Number.isNaN('a')) {
		return Number.isNaN;
	}
	return implementation;
};


/***/ }),

/***/ "./node_modules/is-nan/shim.js":
/*!*************************************!*\
  !*** ./node_modules/is-nan/shim.js ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var define = __webpack_require__(/*! define-properties */ "./node_modules/define-properties/index.js");
var getPolyfill = __webpack_require__(/*! ./polyfill */ "./node_modules/is-nan/polyfill.js");

/* http://www.ecma-international.org/ecma-262/6.0/#sec-number.isnan */

module.exports = function shimNumberIsNaN() {
	var polyfill = getPolyfill();
	define(Number, { isNaN: polyfill }, {
		isNaN: function testIsNaN() {
			return Number.isNaN !== polyfill;
		}
	});
	return polyfill;
};


/***/ }),

/***/ "./node_modules/is-typed-array/index.js":
/*!**********************************************!*\
  !*** ./node_modules/is-typed-array/index.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var whichTypedArray = __webpack_require__(/*! which-typed-array */ "./node_modules/which-typed-array/index.js");

module.exports = function isTypedArray(value) {
	return !!whichTypedArray(value);
};


/***/ }),

/***/ "./node_modules/object-is/implementation.js":
/*!**************************************************!*\
  !*** ./node_modules/object-is/implementation.js ***!
  \**************************************************/
/***/ ((module) => {

"use strict";


var numberIsNaN = function (value) {
	return value !== value;
};

module.exports = function is(a, b) {
	if (a === 0 && b === 0) {
		return 1 / a === 1 / b;
	}
	if (a === b) {
		return true;
	}
	if (numberIsNaN(a) && numberIsNaN(b)) {
		return true;
	}
	return false;
};



/***/ }),

/***/ "./node_modules/object-is/index.js":
/*!*****************************************!*\
  !*** ./node_modules/object-is/index.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var define = __webpack_require__(/*! define-properties */ "./node_modules/define-properties/index.js");
var callBind = __webpack_require__(/*! call-bind */ "./node_modules/call-bind/index.js");

var implementation = __webpack_require__(/*! ./implementation */ "./node_modules/object-is/implementation.js");
var getPolyfill = __webpack_require__(/*! ./polyfill */ "./node_modules/object-is/polyfill.js");
var shim = __webpack_require__(/*! ./shim */ "./node_modules/object-is/shim.js");

var polyfill = callBind(getPolyfill(), Object);

define(polyfill, {
	getPolyfill: getPolyfill,
	implementation: implementation,
	shim: shim
});

module.exports = polyfill;


/***/ }),

/***/ "./node_modules/object-is/polyfill.js":
/*!********************************************!*\
  !*** ./node_modules/object-is/polyfill.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var implementation = __webpack_require__(/*! ./implementation */ "./node_modules/object-is/implementation.js");

module.exports = function getPolyfill() {
	return typeof Object.is === 'function' ? Object.is : implementation;
};


/***/ }),

/***/ "./node_modules/object-is/shim.js":
/*!****************************************!*\
  !*** ./node_modules/object-is/shim.js ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var getPolyfill = __webpack_require__(/*! ./polyfill */ "./node_modules/object-is/polyfill.js");
var define = __webpack_require__(/*! define-properties */ "./node_modules/define-properties/index.js");

module.exports = function shimObjectIs() {
	var polyfill = getPolyfill();
	define(Object, { is: polyfill }, {
		is: function testObjectIs() {
			return Object.is !== polyfill;
		}
	});
	return polyfill;
};


/***/ }),

/***/ "./node_modules/object-keys/implementation.js":
/*!****************************************************!*\
  !*** ./node_modules/object-keys/implementation.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var keysShim;
if (!Object.keys) {
	// modified from https://github.com/es-shims/es5-shim
	var has = Object.prototype.hasOwnProperty;
	var toStr = Object.prototype.toString;
	var isArgs = __webpack_require__(/*! ./isArguments */ "./node_modules/object-keys/isArguments.js"); // eslint-disable-line global-require
	var isEnumerable = Object.prototype.propertyIsEnumerable;
	var hasDontEnumBug = !isEnumerable.call({ toString: null }, 'toString');
	var hasProtoEnumBug = isEnumerable.call(function () {}, 'prototype');
	var dontEnums = [
		'toString',
		'toLocaleString',
		'valueOf',
		'hasOwnProperty',
		'isPrototypeOf',
		'propertyIsEnumerable',
		'constructor'
	];
	var equalsConstructorPrototype = function (o) {
		var ctor = o.constructor;
		return ctor && ctor.prototype === o;
	};
	var excludedKeys = {
		$applicationCache: true,
		$console: true,
		$external: true,
		$frame: true,
		$frameElement: true,
		$frames: true,
		$innerHeight: true,
		$innerWidth: true,
		$onmozfullscreenchange: true,
		$onmozfullscreenerror: true,
		$outerHeight: true,
		$outerWidth: true,
		$pageXOffset: true,
		$pageYOffset: true,
		$parent: true,
		$scrollLeft: true,
		$scrollTop: true,
		$scrollX: true,
		$scrollY: true,
		$self: true,
		$webkitIndexedDB: true,
		$webkitStorageInfo: true,
		$window: true
	};
	var hasAutomationEqualityBug = (function () {
		/* global window */
		if (typeof window === 'undefined') { return false; }
		for (var k in window) {
			try {
				if (!excludedKeys['$' + k] && has.call(window, k) && window[k] !== null && typeof window[k] === 'object') {
					try {
						equalsConstructorPrototype(window[k]);
					} catch (e) {
						return true;
					}
				}
			} catch (e) {
				return true;
			}
		}
		return false;
	}());
	var equalsConstructorPrototypeIfNotBuggy = function (o) {
		/* global window */
		if (typeof window === 'undefined' || !hasAutomationEqualityBug) {
			return equalsConstructorPrototype(o);
		}
		try {
			return equalsConstructorPrototype(o);
		} catch (e) {
			return false;
		}
	};

	keysShim = function keys(object) {
		var isObject = object !== null && typeof object === 'object';
		var isFunction = toStr.call(object) === '[object Function]';
		var isArguments = isArgs(object);
		var isString = isObject && toStr.call(object) === '[object String]';
		var theKeys = [];

		if (!isObject && !isFunction && !isArguments) {
			throw new TypeError('Object.keys called on a non-object');
		}

		var skipProto = hasProtoEnumBug && isFunction;
		if (isString && object.length > 0 && !has.call(object, 0)) {
			for (var i = 0; i < object.length; ++i) {
				theKeys.push(String(i));
			}
		}

		if (isArguments && object.length > 0) {
			for (var j = 0; j < object.length; ++j) {
				theKeys.push(String(j));
			}
		} else {
			for (var name in object) {
				if (!(skipProto && name === 'prototype') && has.call(object, name)) {
					theKeys.push(String(name));
				}
			}
		}

		if (hasDontEnumBug) {
			var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);

			for (var k = 0; k < dontEnums.length; ++k) {
				if (!(skipConstructor && dontEnums[k] === 'constructor') && has.call(object, dontEnums[k])) {
					theKeys.push(dontEnums[k]);
				}
			}
		}
		return theKeys;
	};
}
module.exports = keysShim;


/***/ }),

/***/ "./node_modules/object-keys/index.js":
/*!*******************************************!*\
  !*** ./node_modules/object-keys/index.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var slice = Array.prototype.slice;
var isArgs = __webpack_require__(/*! ./isArguments */ "./node_modules/object-keys/isArguments.js");

var origKeys = Object.keys;
var keysShim = origKeys ? function keys(o) { return origKeys(o); } : __webpack_require__(/*! ./implementation */ "./node_modules/object-keys/implementation.js");

var originalKeys = Object.keys;

keysShim.shim = function shimObjectKeys() {
	if (Object.keys) {
		var keysWorksWithArguments = (function () {
			// Safari 5.0 bug
			var args = Object.keys(arguments);
			return args && args.length === arguments.length;
		}(1, 2));
		if (!keysWorksWithArguments) {
			Object.keys = function keys(object) { // eslint-disable-line func-name-matching
				if (isArgs(object)) {
					return originalKeys(slice.call(object));
				}
				return originalKeys(object);
			};
		}
	} else {
		Object.keys = keysShim;
	}
	return Object.keys || keysShim;
};

module.exports = keysShim;


/***/ }),

/***/ "./node_modules/object-keys/isArguments.js":
/*!*************************************************!*\
  !*** ./node_modules/object-keys/isArguments.js ***!
  \*************************************************/
/***/ ((module) => {

"use strict";


var toStr = Object.prototype.toString;

module.exports = function isArguments(value) {
	var str = toStr.call(value);
	var isArgs = str === '[object Arguments]';
	if (!isArgs) {
		isArgs = str !== '[object Array]' &&
			value !== null &&
			typeof value === 'object' &&
			typeof value.length === 'number' &&
			value.length >= 0 &&
			toStr.call(value.callee) === '[object Function]';
	}
	return isArgs;
};


/***/ }),

/***/ "./node_modules/object.assign/implementation.js":
/*!******************************************************!*\
  !*** ./node_modules/object.assign/implementation.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


// modified from https://github.com/es-shims/es6-shim
var objectKeys = __webpack_require__(/*! object-keys */ "./node_modules/object-keys/index.js");
var hasSymbols = __webpack_require__(/*! has-symbols/shams */ "./node_modules/has-symbols/shams.js")();
var callBound = __webpack_require__(/*! call-bind/callBound */ "./node_modules/call-bind/callBound.js");
var toObject = Object;
var $push = callBound('Array.prototype.push');
var $propIsEnumerable = callBound('Object.prototype.propertyIsEnumerable');
var originalGetSymbols = hasSymbols ? Object.getOwnPropertySymbols : null;

// eslint-disable-next-line no-unused-vars
module.exports = function assign(target, source1) {
	if (target == null) { throw new TypeError('target must be an object'); }
	var to = toObject(target); // step 1
	if (arguments.length === 1) {
		return to; // step 2
	}
	for (var s = 1; s < arguments.length; ++s) {
		var from = toObject(arguments[s]); // step 3.a.i

		// step 3.a.ii:
		var keys = objectKeys(from);
		var getSymbols = hasSymbols && (Object.getOwnPropertySymbols || originalGetSymbols);
		if (getSymbols) {
			var syms = getSymbols(from);
			for (var j = 0; j < syms.length; ++j) {
				var key = syms[j];
				if ($propIsEnumerable(from, key)) {
					$push(keys, key);
				}
			}
		}

		// step 3.a.iii:
		for (var i = 0; i < keys.length; ++i) {
			var nextKey = keys[i];
			if ($propIsEnumerable(from, nextKey)) { // step 3.a.iii.2
				var propValue = from[nextKey]; // step 3.a.iii.2.a
				to[nextKey] = propValue; // step 3.a.iii.2.b
			}
		}
	}

	return to; // step 4
};


/***/ }),

/***/ "./node_modules/object.assign/polyfill.js":
/*!************************************************!*\
  !*** ./node_modules/object.assign/polyfill.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var implementation = __webpack_require__(/*! ./implementation */ "./node_modules/object.assign/implementation.js");

var lacksProperEnumerationOrder = function () {
	if (!Object.assign) {
		return false;
	}
	/*
	 * v8, specifically in node 4.x, has a bug with incorrect property enumeration order
	 * note: this does not detect the bug unless there's 20 characters
	 */
	var str = 'abcdefghijklmnopqrst';
	var letters = str.split('');
	var map = {};
	for (var i = 0; i < letters.length; ++i) {
		map[letters[i]] = letters[i];
	}
	var obj = Object.assign({}, map);
	var actual = '';
	for (var k in obj) {
		actual += k;
	}
	return str !== actual;
};

var assignHasPendingExceptions = function () {
	if (!Object.assign || !Object.preventExtensions) {
		return false;
	}
	/*
	 * Firefox 37 still has "pending exception" logic in its Object.assign implementation,
	 * which is 72% slower than our shim, and Firefox 40's native implementation.
	 */
	var thrower = Object.preventExtensions({ 1: 2 });
	try {
		Object.assign(thrower, 'xy');
	} catch (e) {
		return thrower[1] === 'y';
	}
	return false;
};

module.exports = function getPolyfill() {
	if (!Object.assign) {
		return implementation;
	}
	if (lacksProperEnumerationOrder()) {
		return implementation;
	}
	if (assignHasPendingExceptions()) {
		return implementation;
	}
	return Object.assign;
};


/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/***/ ((module) => {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/set-function-length/index.js":
/*!***************************************************!*\
  !*** ./node_modules/set-function-length/index.js ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var GetIntrinsic = __webpack_require__(/*! get-intrinsic */ "./node_modules/get-intrinsic/index.js");
var define = __webpack_require__(/*! define-data-property */ "./node_modules/define-data-property/index.js");
var hasDescriptors = __webpack_require__(/*! has-property-descriptors */ "./node_modules/has-property-descriptors/index.js")();
var gOPD = __webpack_require__(/*! gopd */ "./node_modules/gopd/index.js");

var $TypeError = GetIntrinsic('%TypeError%');
var $floor = GetIntrinsic('%Math.floor%');

module.exports = function setFunctionLength(fn, length) {
	if (typeof fn !== 'function') {
		throw new $TypeError('`fn` is not a function');
	}
	if (typeof length !== 'number' || length < 0 || length > 0xFFFFFFFF || $floor(length) !== length) {
		throw new $TypeError('`length` must be a positive 32-bit integer');
	}

	var loose = arguments.length > 2 && !!arguments[2];

	var functionLengthIsConfigurable = true;
	var functionLengthIsWritable = true;
	if ('length' in fn && gOPD) {
		var desc = gOPD(fn, 'length');
		if (desc && !desc.configurable) {
			functionLengthIsConfigurable = false;
		}
		if (desc && !desc.writable) {
			functionLengthIsWritable = false;
		}
	}

	if (functionLengthIsConfigurable || functionLengthIsWritable || !loose) {
		if (hasDescriptors) {
			define(fn, 'length', length, true, true);
		} else {
			define(fn, 'length', length);
		}
	}
	return fn;
};


/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./style.css */ "./node_modules/css-loader/dist/cjs.js!./src/style.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

"use strict";


var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";


var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ }),

/***/ "./node_modules/util/support/isBufferBrowser.js":
/*!******************************************************!*\
  !*** ./node_modules/util/support/isBufferBrowser.js ***!
  \******************************************************/
/***/ ((module) => {

module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}

/***/ }),

/***/ "./node_modules/util/support/types.js":
/*!********************************************!*\
  !*** ./node_modules/util/support/types.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
// Currently in sync with Node.js lib/internal/util/types.js
// https://github.com/nodejs/node/commit/112cc7c27551254aa2b17098fb774867f05ed0d9



var isArgumentsObject = __webpack_require__(/*! is-arguments */ "./node_modules/is-arguments/index.js");
var isGeneratorFunction = __webpack_require__(/*! is-generator-function */ "./node_modules/is-generator-function/index.js");
var whichTypedArray = __webpack_require__(/*! which-typed-array */ "./node_modules/which-typed-array/index.js");
var isTypedArray = __webpack_require__(/*! is-typed-array */ "./node_modules/is-typed-array/index.js");

function uncurryThis(f) {
  return f.call.bind(f);
}

var BigIntSupported = typeof BigInt !== 'undefined';
var SymbolSupported = typeof Symbol !== 'undefined';

var ObjectToString = uncurryThis(Object.prototype.toString);

var numberValue = uncurryThis(Number.prototype.valueOf);
var stringValue = uncurryThis(String.prototype.valueOf);
var booleanValue = uncurryThis(Boolean.prototype.valueOf);

if (BigIntSupported) {
  var bigIntValue = uncurryThis(BigInt.prototype.valueOf);
}

if (SymbolSupported) {
  var symbolValue = uncurryThis(Symbol.prototype.valueOf);
}

function checkBoxedPrimitive(value, prototypeValueOf) {
  if (typeof value !== 'object') {
    return false;
  }
  try {
    prototypeValueOf(value);
    return true;
  } catch(e) {
    return false;
  }
}

exports.isArgumentsObject = isArgumentsObject;
exports.isGeneratorFunction = isGeneratorFunction;
exports.isTypedArray = isTypedArray;

// Taken from here and modified for better browser support
// https://github.com/sindresorhus/p-is-promise/blob/cda35a513bda03f977ad5cde3a079d237e82d7ef/index.js
function isPromise(input) {
	return (
		(
			typeof Promise !== 'undefined' &&
			input instanceof Promise
		) ||
		(
			input !== null &&
			typeof input === 'object' &&
			typeof input.then === 'function' &&
			typeof input.catch === 'function'
		)
	);
}
exports.isPromise = isPromise;

function isArrayBufferView(value) {
  if (typeof ArrayBuffer !== 'undefined' && ArrayBuffer.isView) {
    return ArrayBuffer.isView(value);
  }

  return (
    isTypedArray(value) ||
    isDataView(value)
  );
}
exports.isArrayBufferView = isArrayBufferView;


function isUint8Array(value) {
  return whichTypedArray(value) === 'Uint8Array';
}
exports.isUint8Array = isUint8Array;

function isUint8ClampedArray(value) {
  return whichTypedArray(value) === 'Uint8ClampedArray';
}
exports.isUint8ClampedArray = isUint8ClampedArray;

function isUint16Array(value) {
  return whichTypedArray(value) === 'Uint16Array';
}
exports.isUint16Array = isUint16Array;

function isUint32Array(value) {
  return whichTypedArray(value) === 'Uint32Array';
}
exports.isUint32Array = isUint32Array;

function isInt8Array(value) {
  return whichTypedArray(value) === 'Int8Array';
}
exports.isInt8Array = isInt8Array;

function isInt16Array(value) {
  return whichTypedArray(value) === 'Int16Array';
}
exports.isInt16Array = isInt16Array;

function isInt32Array(value) {
  return whichTypedArray(value) === 'Int32Array';
}
exports.isInt32Array = isInt32Array;

function isFloat32Array(value) {
  return whichTypedArray(value) === 'Float32Array';
}
exports.isFloat32Array = isFloat32Array;

function isFloat64Array(value) {
  return whichTypedArray(value) === 'Float64Array';
}
exports.isFloat64Array = isFloat64Array;

function isBigInt64Array(value) {
  return whichTypedArray(value) === 'BigInt64Array';
}
exports.isBigInt64Array = isBigInt64Array;

function isBigUint64Array(value) {
  return whichTypedArray(value) === 'BigUint64Array';
}
exports.isBigUint64Array = isBigUint64Array;

function isMapToString(value) {
  return ObjectToString(value) === '[object Map]';
}
isMapToString.working = (
  typeof Map !== 'undefined' &&
  isMapToString(new Map())
);

function isMap(value) {
  if (typeof Map === 'undefined') {
    return false;
  }

  return isMapToString.working
    ? isMapToString(value)
    : value instanceof Map;
}
exports.isMap = isMap;

function isSetToString(value) {
  return ObjectToString(value) === '[object Set]';
}
isSetToString.working = (
  typeof Set !== 'undefined' &&
  isSetToString(new Set())
);
function isSet(value) {
  if (typeof Set === 'undefined') {
    return false;
  }

  return isSetToString.working
    ? isSetToString(value)
    : value instanceof Set;
}
exports.isSet = isSet;

function isWeakMapToString(value) {
  return ObjectToString(value) === '[object WeakMap]';
}
isWeakMapToString.working = (
  typeof WeakMap !== 'undefined' &&
  isWeakMapToString(new WeakMap())
);
function isWeakMap(value) {
  if (typeof WeakMap === 'undefined') {
    return false;
  }

  return isWeakMapToString.working
    ? isWeakMapToString(value)
    : value instanceof WeakMap;
}
exports.isWeakMap = isWeakMap;

function isWeakSetToString(value) {
  return ObjectToString(value) === '[object WeakSet]';
}
isWeakSetToString.working = (
  typeof WeakSet !== 'undefined' &&
  isWeakSetToString(new WeakSet())
);
function isWeakSet(value) {
  return isWeakSetToString(value);
}
exports.isWeakSet = isWeakSet;

function isArrayBufferToString(value) {
  return ObjectToString(value) === '[object ArrayBuffer]';
}
isArrayBufferToString.working = (
  typeof ArrayBuffer !== 'undefined' &&
  isArrayBufferToString(new ArrayBuffer())
);
function isArrayBuffer(value) {
  if (typeof ArrayBuffer === 'undefined') {
    return false;
  }

  return isArrayBufferToString.working
    ? isArrayBufferToString(value)
    : value instanceof ArrayBuffer;
}
exports.isArrayBuffer = isArrayBuffer;

function isDataViewToString(value) {
  return ObjectToString(value) === '[object DataView]';
}
isDataViewToString.working = (
  typeof ArrayBuffer !== 'undefined' &&
  typeof DataView !== 'undefined' &&
  isDataViewToString(new DataView(new ArrayBuffer(1), 0, 1))
);
function isDataView(value) {
  if (typeof DataView === 'undefined') {
    return false;
  }

  return isDataViewToString.working
    ? isDataViewToString(value)
    : value instanceof DataView;
}
exports.isDataView = isDataView;

// Store a copy of SharedArrayBuffer in case it's deleted elsewhere
var SharedArrayBufferCopy = typeof SharedArrayBuffer !== 'undefined' ? SharedArrayBuffer : undefined;
function isSharedArrayBufferToString(value) {
  return ObjectToString(value) === '[object SharedArrayBuffer]';
}
function isSharedArrayBuffer(value) {
  if (typeof SharedArrayBufferCopy === 'undefined') {
    return false;
  }

  if (typeof isSharedArrayBufferToString.working === 'undefined') {
    isSharedArrayBufferToString.working = isSharedArrayBufferToString(new SharedArrayBufferCopy());
  }

  return isSharedArrayBufferToString.working
    ? isSharedArrayBufferToString(value)
    : value instanceof SharedArrayBufferCopy;
}
exports.isSharedArrayBuffer = isSharedArrayBuffer;

function isAsyncFunction(value) {
  return ObjectToString(value) === '[object AsyncFunction]';
}
exports.isAsyncFunction = isAsyncFunction;

function isMapIterator(value) {
  return ObjectToString(value) === '[object Map Iterator]';
}
exports.isMapIterator = isMapIterator;

function isSetIterator(value) {
  return ObjectToString(value) === '[object Set Iterator]';
}
exports.isSetIterator = isSetIterator;

function isGeneratorObject(value) {
  return ObjectToString(value) === '[object Generator]';
}
exports.isGeneratorObject = isGeneratorObject;

function isWebAssemblyCompiledModule(value) {
  return ObjectToString(value) === '[object WebAssembly.Module]';
}
exports.isWebAssemblyCompiledModule = isWebAssemblyCompiledModule;

function isNumberObject(value) {
  return checkBoxedPrimitive(value, numberValue);
}
exports.isNumberObject = isNumberObject;

function isStringObject(value) {
  return checkBoxedPrimitive(value, stringValue);
}
exports.isStringObject = isStringObject;

function isBooleanObject(value) {
  return checkBoxedPrimitive(value, booleanValue);
}
exports.isBooleanObject = isBooleanObject;

function isBigIntObject(value) {
  return BigIntSupported && checkBoxedPrimitive(value, bigIntValue);
}
exports.isBigIntObject = isBigIntObject;

function isSymbolObject(value) {
  return SymbolSupported && checkBoxedPrimitive(value, symbolValue);
}
exports.isSymbolObject = isSymbolObject;

function isBoxedPrimitive(value) {
  return (
    isNumberObject(value) ||
    isStringObject(value) ||
    isBooleanObject(value) ||
    isBigIntObject(value) ||
    isSymbolObject(value)
  );
}
exports.isBoxedPrimitive = isBoxedPrimitive;

function isAnyArrayBuffer(value) {
  return typeof Uint8Array !== 'undefined' && (
    isArrayBuffer(value) ||
    isSharedArrayBuffer(value)
  );
}
exports.isAnyArrayBuffer = isAnyArrayBuffer;

['isProxy', 'isExternal', 'isModuleNamespaceObject'].forEach(function(method) {
  Object.defineProperty(exports, method, {
    enumerable: false,
    value: function() {
      throw new Error(method + ' is not supported in userland');
    }
  });
});


/***/ }),

/***/ "./node_modules/util/util.js":
/*!***********************************!*\
  !*** ./node_modules/util/util.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/* provided dependency */ var process = __webpack_require__(/*! ./node_modules/process/browser.js */ "./node_modules/process/browser.js");
/* provided dependency */ var console = __webpack_require__(/*! ./node_modules/console-browserify/index.js */ "./node_modules/console-browserify/index.js");
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var getOwnPropertyDescriptors = Object.getOwnPropertyDescriptors ||
  function getOwnPropertyDescriptors(obj) {
    var keys = Object.keys(obj);
    var descriptors = {};
    for (var i = 0; i < keys.length; i++) {
      descriptors[keys[i]] = Object.getOwnPropertyDescriptor(obj, keys[i]);
    }
    return descriptors;
  };

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  if (typeof process !== 'undefined' && process.noDeprecation === true) {
    return fn;
  }

  // Allow for deprecating things in the process of starting up.
  if (typeof process === 'undefined') {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnvRegex = /^$/;

if (process.env.NODE_DEBUG) {
  var debugEnv = process.env.NODE_DEBUG;
  debugEnv = debugEnv.replace(/[|\\{}()[\]^$+?.]/g, '\\$&')
    .replace(/\*/g, '.*')
    .replace(/,/g, '$|^')
    .toUpperCase();
  debugEnvRegex = new RegExp('^' + debugEnv + '$', 'i');
}
exports.debuglog = function(set) {
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (debugEnvRegex.test(set)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').slice(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.slice(1, -1);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
exports.types = __webpack_require__(/*! ./support/types */ "./node_modules/util/support/types.js");

function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;
exports.types.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;
exports.types.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;
exports.types.isNativeError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = __webpack_require__(/*! ./support/isBuffer */ "./node_modules/util/support/isBufferBrowser.js");

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = __webpack_require__(/*! inherits */ "./node_modules/inherits/inherits_browser.js");

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

var kCustomPromisifiedSymbol = typeof Symbol !== 'undefined' ? Symbol('util.promisify.custom') : undefined;

exports.promisify = function promisify(original) {
  if (typeof original !== 'function')
    throw new TypeError('The "original" argument must be of type Function');

  if (kCustomPromisifiedSymbol && original[kCustomPromisifiedSymbol]) {
    var fn = original[kCustomPromisifiedSymbol];
    if (typeof fn !== 'function') {
      throw new TypeError('The "util.promisify.custom" argument must be of type Function');
    }
    Object.defineProperty(fn, kCustomPromisifiedSymbol, {
      value: fn, enumerable: false, writable: false, configurable: true
    });
    return fn;
  }

  function fn() {
    var promiseResolve, promiseReject;
    var promise = new Promise(function (resolve, reject) {
      promiseResolve = resolve;
      promiseReject = reject;
    });

    var args = [];
    for (var i = 0; i < arguments.length; i++) {
      args.push(arguments[i]);
    }
    args.push(function (err, value) {
      if (err) {
        promiseReject(err);
      } else {
        promiseResolve(value);
      }
    });

    try {
      original.apply(this, args);
    } catch (err) {
      promiseReject(err);
    }

    return promise;
  }

  Object.setPrototypeOf(fn, Object.getPrototypeOf(original));

  if (kCustomPromisifiedSymbol) Object.defineProperty(fn, kCustomPromisifiedSymbol, {
    value: fn, enumerable: false, writable: false, configurable: true
  });
  return Object.defineProperties(
    fn,
    getOwnPropertyDescriptors(original)
  );
}

exports.promisify.custom = kCustomPromisifiedSymbol

function callbackifyOnRejected(reason, cb) {
  // `!reason` guard inspired by bluebird (Ref: https://goo.gl/t5IS6M).
  // Because `null` is a special error value in callbacks which means "no error
  // occurred", we error-wrap so the callback consumer can distinguish between
  // "the promise rejected with null" or "the promise fulfilled with undefined".
  if (!reason) {
    var newReason = new Error('Promise was rejected with a falsy value');
    newReason.reason = reason;
    reason = newReason;
  }
  return cb(reason);
}

function callbackify(original) {
  if (typeof original !== 'function') {
    throw new TypeError('The "original" argument must be of type Function');
  }

  // We DO NOT return the promise as it gives the user a false sense that
  // the promise is actually somehow related to the callback's execution
  // and that the callback throwing will reject the promise.
  function callbackified() {
    var args = [];
    for (var i = 0; i < arguments.length; i++) {
      args.push(arguments[i]);
    }

    var maybeCb = args.pop();
    if (typeof maybeCb !== 'function') {
      throw new TypeError('The last argument must be of type Function');
    }
    var self = this;
    var cb = function() {
      return maybeCb.apply(self, arguments);
    };
    // In true node style we process the callback on `nextTick` with all the
    // implications (stack, `uncaughtException`, `async_hooks`)
    original.apply(this, args)
      .then(function(ret) { process.nextTick(cb.bind(null, null, ret)) },
            function(rej) { process.nextTick(callbackifyOnRejected.bind(null, rej, cb)) });
  }

  Object.setPrototypeOf(callbackified, Object.getPrototypeOf(original));
  Object.defineProperties(callbackified,
                          getOwnPropertyDescriptors(original));
  return callbackified;
}
exports.callbackify = callbackify;


/***/ }),

/***/ "./node_modules/which-typed-array/index.js":
/*!*************************************************!*\
  !*** ./node_modules/which-typed-array/index.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var forEach = __webpack_require__(/*! for-each */ "./node_modules/for-each/index.js");
var availableTypedArrays = __webpack_require__(/*! available-typed-arrays */ "./node_modules/available-typed-arrays/index.js");
var callBind = __webpack_require__(/*! call-bind */ "./node_modules/call-bind/index.js");
var callBound = __webpack_require__(/*! call-bind/callBound */ "./node_modules/call-bind/callBound.js");
var gOPD = __webpack_require__(/*! gopd */ "./node_modules/gopd/index.js");

var $toString = callBound('Object.prototype.toString');
var hasToStringTag = __webpack_require__(/*! has-tostringtag/shams */ "./node_modules/has-tostringtag/shams.js")();

var g = typeof globalThis === 'undefined' ? __webpack_require__.g : globalThis;
var typedArrays = availableTypedArrays();

var $slice = callBound('String.prototype.slice');
var getPrototypeOf = Object.getPrototypeOf; // require('getprototypeof');

var $indexOf = callBound('Array.prototype.indexOf', true) || function indexOf(array, value) {
	for (var i = 0; i < array.length; i += 1) {
		if (array[i] === value) {
			return i;
		}
	}
	return -1;
};
var cache = { __proto__: null };
if (hasToStringTag && gOPD && getPrototypeOf) {
	forEach(typedArrays, function (typedArray) {
		var arr = new g[typedArray]();
		if (Symbol.toStringTag in arr) {
			var proto = getPrototypeOf(arr);
			var descriptor = gOPD(proto, Symbol.toStringTag);
			if (!descriptor) {
				var superProto = getPrototypeOf(proto);
				descriptor = gOPD(superProto, Symbol.toStringTag);
			}
			cache['$' + typedArray] = callBind(descriptor.get);
		}
	});
} else {
	forEach(typedArrays, function (typedArray) {
		var arr = new g[typedArray]();
		var fn = arr.slice || arr.set;
		if (fn) {
			cache['$' + typedArray] = callBind(fn);
		}
	});
}

var tryTypedArrays = function tryAllTypedArrays(value) {
	var found = false;
	forEach(cache, function (getter, typedArray) {
		if (!found) {
			try {
				if ('$' + getter(value) === typedArray) {
					found = $slice(typedArray, 1);
				}
			} catch (e) { /**/ }
		}
	});
	return found;
};

var trySlices = function tryAllSlices(value) {
	var found = false;
	forEach(cache, function (getter, name) {
		if (!found) {
			try {
				getter(value);
				found = $slice(name, 1);
			} catch (e) { /**/ }
		}
	});
	return found;
};

module.exports = function whichTypedArray(value) {
	if (!value || typeof value !== 'object') { return false; }
	if (!hasToStringTag) {
		var tag = $slice($toString(value), 8, -1);
		if ($indexOf(typedArrays, tag) > -1) {
			return tag;
		}
		if (tag !== 'Object') {
			return false;
		}
		// node < 0.6 hits here on real Typed Arrays
		return trySlices(value);
	}
	if (!gOPD) { return null; } // unknown engine
	return tryTypedArrays(value);
};


/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ "./src/style.css");
/* harmony import */ var _pageload__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pageload */ "./src/pageload.js");
/* harmony import */ var _modules_home__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/home */ "./src/modules/home.js");
/* harmony import */ var _modules_menu__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/menu */ "./src/modules/menu.js");
/* harmony import */ var _modules_contact__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/contact */ "./src/modules/contact.js");
/* provided dependency */ var console = __webpack_require__(/*! ./node_modules/console-browserify/index.js */ "./node_modules/console-browserify/index.js");






// Handle tab listening logic
// Get element references
// Add event listeners from modules
// Modules replace logListen
function addEventHandlers() {
  const home = document.getElementById('home-btn');
  const nav = document.getElementById('menu-btn');
  const contact = document.getElementById('contact-btn');

  home.addEventListener('click', _modules_home__WEBPACK_IMPORTED_MODULE_2__["default"]);
  nav.addEventListener('click', _modules_menu__WEBPACK_IMPORTED_MODULE_3__["default"]);
  contact.addEventListener('click', _modules_contact__WEBPACK_IMPORTED_MODULE_4__["default"]);
}

function init() {
  // Main content generated dynamically by JS to append elements
  const content = document.createElement('div');
  content.id = 'content';
  document.body.appendChild(content);

  // Calls to load page, load home and handle tab-switching logic
  (0,_pageload__WEBPACK_IMPORTED_MODULE_1__["default"])();
  (0,_modules_home__WEBPACK_IMPORTED_MODULE_2__["default"])();
  addEventHandlers();
}

function logListen(e) {
  console.log(e);
}

init(); // Handle initial pageload

/***/ }),

/***/ "./src/modules/contact.js":
/*!********************************!*\
  !*** ./src/modules/contact.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function createMenuSection() {
  const hero = document.createElement('section');
  hero.classList.add('hero');

  const heroHeader = document.createElement('div');
  heroHeader.classList.add('hero-head');

  const heroTitle = document.createElement('h2');
  heroTitle.classList.add('section-title');
  heroTitle.textContent = 'Contact';
  heroHeader.appendChild(heroTitle);

  const divider = document.createElement('hr');
  divider.classList.add('divider');
  heroHeader.appendChild(divider);

  const heroFormInfo = document.createElement('div');
  heroFormInfo.classList.add('hero-form');

  const para = document.createElement('p');
  para.classList.add('hero-para');
  para.textContent = 'Need to contact us? Fill out this form below:'
  heroFormInfo.appendChild(para);

  const formFields = ['Username', 'First Name', 'Last Name', 'Email Address', 'Phone Number', 'Message'];
  const form = createForm(formFields);
  form.classList.add('contact-form');

  function createForm(inputArray) {
    const output = document.createElement('form');
    inputArray.forEach((field) => {
      if (field === 'Message') {
        const messageLabel = document.createElement('label');
        messageLabel.textContent = `${field}:`;
        const messageInput = document.createElement('textarea');
        messageInput.rows = 8;
        output.appendChild(messageLabel);
        output.appendChild(messageInput);
      }
      else {
        const formLabel = document.createElement('label');
        formLabel.textContent = `${field}:`;
        const formInput = document.createElement('input');
        formInput.type = 'text';
        formInput.size = 30;
        output.appendChild(formLabel);
        output.appendChild(formInput);
      }
    });

    return output;
  }

  const submitBtn = document.createElement('input');
  submitBtn.type = 'submit';
  submitBtn.classList.add('form-button');
  submitBtn.textContent = 'Submit';

  heroFormInfo.appendChild(form);
  heroFormInfo.append(submitBtn);

  heroHeader.appendChild(heroFormInfo);

  hero.appendChild(heroHeader);

  const disclaimer = document.createElement('p');
  disclaimer.classList.add('form-disclaimer');
  disclaimer.textContent = '*Please allow at least 7 business days for a timely response*';

  hero.appendChild(disclaimer);

  return hero;
}

function loadContact() {
  const content = document.querySelector('.page-content');
  content.textContent = '';

  const tabSwitch = document.querySelector('button.active');
  if (tabSwitch) tabSwitch.classList.toggle('active');

  const activeTab = document.getElementById('contact-btn');
  activeTab.classList.add('active');

  const hero = createMenuSection();

  content.appendChild(hero);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (loadContact);

/***/ }),

/***/ "./src/modules/home.js":
/*!*****************************!*\
  !*** ./src/modules/home.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _assets_rest_one_png__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../assets/rest-one.png */ "./src/assets/rest-one.png");
/* harmony import */ var _assets_rest_two_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../assets/rest-two.png */ "./src/assets/rest-two.png");
/* harmony import */ var _assets_rest_three_png__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../assets/rest-three.png */ "./src/assets/rest-three.png");
/* harmony import */ var _assets_rest_four_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../assets/rest-four.png */ "./src/assets/rest-four.png");
/* harmony import */ var _assets_rest_five_png__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../assets/rest-five.png */ "./src/assets/rest-five.png");






function createHeroSection() {
  const hero = document.createElement('section');
  hero.classList.add('hero');

  const heroHeader = document.createElement('div');
  heroHeader.classList.add('hero-head');

  const heroTitle = document.createElement('h2');
  heroTitle.classList.add('section-title');
  heroTitle.textContent = 'Bedrock & Java Menus Available!';
  heroHeader.appendChild(heroTitle);

  const divider = document.createElement('hr');
  divider.classList.add('divider');
  heroHeader.appendChild(divider);

  hero.appendChild(heroHeader);

  const heroInfo = document.createElement('div');
  heroInfo.classList.add('hero-info');

  const paraTitle = document.createElement('h4');
  paraTitle.classList.add('hero-para-title');
  paraTitle.textContent = 'Hours:';

  const paraOne = document.createElement('p');
  paraOne.classList.add('hero-para');
  paraOne.textContent = '10:00a - 9:00p / Mon thru Fri';

  const paraTwo = document.createElement('p');
  paraTwo.classList.add('hero-para');
  paraTwo.textContent = '10:00a - 11:00p / Sat & Sun';

  heroInfo.appendChild(paraTitle);
  heroInfo.appendChild(paraOne);
  heroInfo.appendChild(paraTwo);
  hero.appendChild(heroInfo);

  function createImageSlide(imageSrc, index) {
    const IMAGE_COUNT = 5;
    const imageContainer = document.createElement('div');
    imageContainer.classList.add('hero-slide');

    const textContainer = document.createElement('p');
    textContainer.classList.add('hero-slide-text');
    textContainer.textContent = `(${index} / ${IMAGE_COUNT})`;

    const imageOverlay = document.createElement('div');
    imageOverlay.classList.add('hero-slide-image');

    const image = new Image();
    image.src = imageSrc;
    image.height = '500';

    imageOverlay.appendChild(image);

    imageContainer.appendChild(textContainer);
    imageContainer.appendChild(imageOverlay);

    return imageContainer;
  }

  const imageGallery = document.createElement('div');
  imageGallery.classList.add('hero-slide-container');

  const imageOne = createImageSlide(_assets_rest_one_png__WEBPACK_IMPORTED_MODULE_0__, 1);
  imageOne.classList.add('hero-slide-active');

  const imageTwo = createImageSlide(_assets_rest_two_png__WEBPACK_IMPORTED_MODULE_1__, 2);
  const imageThree = createImageSlide(_assets_rest_three_png__WEBPACK_IMPORTED_MODULE_2__, 3);
  const imageFour = createImageSlide(_assets_rest_four_png__WEBPACK_IMPORTED_MODULE_3__, 4);
  const imageFive = createImageSlide(_assets_rest_five_png__WEBPACK_IMPORTED_MODULE_4__, 5);

  imageGallery.appendChild(imageOne);
  imageGallery.appendChild(imageTwo);
  imageGallery.appendChild(imageThree);
  imageGallery.appendChild(imageFour);
  imageGallery.appendChild(imageFive);
  
  function manageSlides(e) {
    const activeImage = document.querySelector('div.hero-slide-active');
    let index = activeImage.firstElementChild.textContent[1];
    const images = document.getElementsByClassName('hero-slide');

    if (e.target.classList.contains('hero-slide-next')) {
      for (let i = index-1; i < images.length; i++) {
        if (images[i] === activeImage) {
          const nextImage = (images[i].nextElementSibling);
          if (nextImage.tagName === 'A') return;
          images[i].nextElementSibling.classList.add('hero-slide-active');
          images[i].classList.toggle('hero-slide-active');
        }
      }
    }
    else if (e.target.classList.contains('hero-slide-previous')) {
      for (let i = index-1; i < images.length; i++) {
        if (images[i] === activeImage) {
          const prevImage = (images[i].previousElementSibling);
          if (!prevImage) return;
          images[i].previousElementSibling.classList.add('hero-slide-active');
          images[i].classList.toggle('hero-slide-active');
        }
      }
    }
  }

  const nextBtn = document.createElement('a');
  nextBtn.classList.add('hero-slide-next');
  nextBtn.innerHTML = '&#8250;';
  nextBtn.addEventListener('click', manageSlides);

  const prevBtn = document.createElement('a');
  prevBtn.classList.add('hero-slide-previous');
  prevBtn.innerHTML = '&#8249;';
  prevBtn.addEventListener('click', manageSlides);

  imageGallery.appendChild(prevBtn);
  imageGallery.appendChild(nextBtn);

  hero.appendChild(imageGallery);

  return hero;
}

function loadHome() {
  const content = document.querySelector('.page-content');
  content.textContent = '';

  const tabSwitch = document.querySelector('button.active');
  if (tabSwitch) tabSwitch.classList.toggle('active');

  const activeTab = document.getElementById('home-btn');
  activeTab.classList.add('active');

  const hero = createHeroSection();

  content.appendChild(hero);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (loadHome);

/***/ }),

/***/ "./src/modules/menu.js":
/*!*****************************!*\
  !*** ./src/modules/menu.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _assets_apple_png__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../assets/apple.png */ "./src/assets/apple.png");
/* harmony import */ var _assets_enchanted_apple_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../assets/enchanted-apple.png */ "./src/assets/enchanted-apple.png");
/* harmony import */ var _assets_golden_apple_png__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../assets/golden-apple.png */ "./src/assets/golden-apple.png");
/* harmony import */ var _assets_bread_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../assets/bread.png */ "./src/assets/bread.png");
/* harmony import */ var _assets_cookie_png__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../assets/cookie.png */ "./src/assets/cookie.png");
/* harmony import */ var _assets_stew_png__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../assets/stew.png */ "./src/assets/stew.png");
/* harmony import */ var _assets_mutton_png__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../assets/mutton.png */ "./src/assets/mutton.png");
/* harmony import */ var _assets_porkchop_png__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../assets/porkchop.png */ "./src/assets/porkchop.png");
/* harmony import */ var _assets_rabbit_png__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../assets/rabbit.png */ "./src/assets/rabbit.png");
/* harmony import */ var _assets_steak_png__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../assets/steak.png */ "./src/assets/steak.png");
/* harmony import */ var _assets_cod_png__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../assets/cod.png */ "./src/assets/cod.png");
/* harmony import */ var _assets_salmon_png__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../assets/salmon.png */ "./src/assets/salmon.png");













function createMenuSection() {
  const hero = document.createElement('section');
  hero.classList.add('hero');

  const heroHeader = document.createElement('div');
  heroHeader.classList.add('hero-head');

  const heroTitle = document.createElement('h2');
  heroTitle.classList.add('section-title');
  heroTitle.textContent = 'Menu';
  heroHeader.appendChild(heroTitle);

  const divider = document.createElement('hr');
  divider.classList.add('divider');
  heroHeader.appendChild(divider);

  hero.appendChild(heroHeader);

  const menuNoticeContainer = document.createElement('div');
  menuNoticeContainer.classList.add('menu-text-container');

  const menuNotice = document.createElement('p');
  menuNotice.classList.add('menu-notice');
  menuNotice.textContent = 'Please be advised that food prepared here may contain these ingredients:'

  const menuNoticeItems = document.createElement('p');
  menuNoticeItems.classList.add('menu-warning');
  menuNoticeItems.textContent = 'milk, eggs, wheat, soybean, peanuts, tree nuts, fish, and shellfish';

  menuNoticeContainer.appendChild(menuNotice);
  menuNoticeContainer.appendChild(menuNoticeItems);
  hero.appendChild(menuNoticeContainer);

  const cardContainer = document.createElement('div');
  cardContainer.classList.add('hero-menu');
  hero.appendChild(cardContainer);

  function makeNewCard(source, title, price, description) {
    const container = document.createElement('div');
    container.classList.add('menu-card');

    const leftCard = document.createElement('div');
    leftCard.classList.add('card-left');

    const rightCard = document.createElement('div');
    rightCard.classList.add('card-right');

    const foodTitle = document.createElement('h4');
    foodTitle.textContent = title;
    leftCard.appendChild(foodTitle);
    
    const priceTitle = document.createElement('h4');
    priceTitle.textContent = `Price: ${price}`;
    rightCard.appendChild(priceTitle)

    const newImage = new Image();
    newImage.src = source;
    newImage.height = 35;
    leftCard.appendChild(newImage);

    const foodDescription = document.createElement('p');
    foodDescription.classList.add('menu-description');
    foodDescription.textContent = description;
    rightCard.appendChild(foodDescription);

    container.appendChild(leftCard);
    container.appendChild(rightCard);

    return container;
  }

  const apple = makeNewCard(_assets_apple_png__WEBPACK_IMPORTED_MODULE_0__, "Apple", "$0.75", "Varieties available: Gala, Fuji, Golden Delicious, Honeycrisp, Granny Smith, Braeburn & McIntosh");
  cardContainer.appendChild(apple);

  const goldenApple = makeNewCard(_assets_golden_apple_png__WEBPACK_IMPORTED_MODULE_2__, "Golden Apple", "$9.99", "The best individual apples of our harvests, meticulously shrouded in 14K edible gold");
  cardContainer.appendChild(goldenApple);

  const enchantedApple = makeNewCard(_assets_enchanted_apple_png__WEBPACK_IMPORTED_MODULE_1__, "Enchanted Apple", "$19.99", "[NOTICE: WAIVER MUST BE SIGNED PRIOR TO PURCHASE/CONSUMPTION]");
  cardContainer.appendChild(enchantedApple);

  const bread = makeNewCard(_assets_bread_png__WEBPACK_IMPORTED_MODULE_3__, "Bread", "$2.99", "A finely baked (dare I say one of the finest baked) loaves of bread in all of the world");
  cardContainer.appendChild(bread);

  const cookie = makeNewCard(_assets_cookie_png__WEBPACK_IMPORTED_MODULE_4__, "Cookie", "$0.99", "The kind that makes you think of your mom's baked goods");
  cardContainer.appendChild(cookie);

  const stew = makeNewCard(_assets_stew_png__WEBPACK_IMPORTED_MODULE_5__, "Mushroom Stew", "$7.99", "Delicious blend of oyster, portabello, shiitake, cremini, porcini & lion's mane in a hearty stew");
  cardContainer.appendChild(stew);

  const mutton = makeNewCard(_assets_mutton_png__WEBPACK_IMPORTED_MODULE_6__, "Mutton", "$19.99", "Cut of free-range, grass fed adult lamb, grilled to your preferred internal temperature (Default: Medium Rare)");
  cardContainer.appendChild(mutton);

  const porkchop = makeNewCard(_assets_porkchop_png__WEBPACK_IMPORTED_MODULE_7__, "Porkchop", "$18.99", "Cut of free-range, grass fed pork, grilled to your preferred internal temperature (Default: Medium Rare)");
  cardContainer.appendChild(porkchop);

  const rabbit = makeNewCard(_assets_rabbit_png__WEBPACK_IMPORTED_MODULE_8__, "Rabbit", "$21.99", "Cut of free-range, grass fed rabbit, grilled to your preferred internal temperature (Default: Medium Rare)");
  cardContainer.appendChild(rabbit);

  const steak = makeNewCard(_assets_steak_png__WEBPACK_IMPORTED_MODULE_9__, "Steak", "$24.99", "Cut of free-range, grass fed beef, grilled to your preferred internal temperature (Default: Medium Rare)");
  cardContainer.appendChild(steak);

  const cod = makeNewCard(_assets_cod_png__WEBPACK_IMPORTED_MODULE_10__, "Cod", "$16.99", "Fresh daily, wild cod filet served with lemon and butter");
  cardContainer.appendChild(cod);

  const salmon = makeNewCard(_assets_salmon_png__WEBPACK_IMPORTED_MODULE_11__, "Salmon", "$19.99", "Fresh daily, wild salmon filet served with lemon and butter");
  cardContainer.appendChild(salmon);

  return hero;
}

function loadMenu() {
  const content = document.querySelector('.page-content');
  content.textContent = '';

  const tabSwitch = document.querySelector('button.active');
  if (tabSwitch) tabSwitch.classList.toggle('active');

  const activeTab = document.getElementById('menu-btn');
  activeTab.classList.add('active');

  const hero = createMenuSection();

  content.appendChild(hero);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (loadMenu);

/***/ }),

/***/ "./src/pageload.js":
/*!*************************!*\
  !*** ./src/pageload.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _assets_github_mark_png__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./assets/github-mark.png */ "./src/assets/github-mark.png");


// Helper - generate header
function createHead(headClass, logoText) {
  const header = document.createElement('header');
  header.classList.add(headClass);
  const logo = document.createElement('h1');
  logo.textContent = logoText;
  header.appendChild(logo);
  
  const nav = createNav('nav');
  header.appendChild(nav);
  return header;
}

// Helper - generate buttons (for navbar)
function createBtn(id, btnText) {
  const btn = document.createElement('button');
  btn.id = id;
  btn.textContent = btnText;
  return btn;
}

// Helper - generate nav links (for header)
function createNav(navClass) {
  const nav = document.createElement('nav');
  nav.classList.add(navClass);

  const homeBtn = createBtn('home-btn', 'Home');
  const menuBtn = createBtn('menu-btn', 'Menu');
  const contactBtn = createBtn('contact-btn', 'Contact');

  nav.appendChild(homeBtn);
  nav.appendChild(menuBtn);
  nav.appendChild(contactBtn);
  return nav;
}

// Helper - generate main content
function createMain(mainClass) {
  const main = document.createElement('main');
  main.classList.add(mainClass);
  return main;
}

// Helper - generate footer
function createFoot(footClass) {
  const footer = document.createElement('footer');
  footer.classList.add(footClass);

  const source = document.createElement('a');
  source.classList.add('footer-source');
  source.href = 'https://github.com/sorrrb';

  const gitHubLink = new Image();
  gitHubLink.src = _assets_github_mark_png__WEBPACK_IMPORTED_MODULE_0__;
  gitHubLink.classList.add('footer-logo')
  source.appendChild(gitHubLink);

  const footerText = document.createElement('p');
  footerText.classList.add('foot-text');
  footerText.textContent = 'sorrrb';
  source.appendChild(footerText);

  footer.appendChild(source);
  return footer;
}

// Module - generate page content using helpers
function loadPage() {
  const content = document.getElementById('content');

  const header = createHead('header', 'Yours & Mine: Craft Cuisine');
  content.appendChild(header);

  const main = createMain('page-content');
  content.appendChild(main);

  const footer = createFoot('footer');
  content.appendChild(footer);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (loadPage);

/***/ }),

/***/ "./src/assets/apple.png":
/*!******************************!*\
  !*** ./src/assets/apple.png ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "ea3f812103df57542a01.png";

/***/ }),

/***/ "./src/assets/bread.png":
/*!******************************!*\
  !*** ./src/assets/bread.png ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "ad74f96dbdcb149e2760.png";

/***/ }),

/***/ "./src/assets/cod.png":
/*!****************************!*\
  !*** ./src/assets/cod.png ***!
  \****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "71a88a30ce3fa89cd1df.png";

/***/ }),

/***/ "./src/assets/cookie.png":
/*!*******************************!*\
  !*** ./src/assets/cookie.png ***!
  \*******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "e77a36b94d9f2204f8b6.png";

/***/ }),

/***/ "./src/assets/enchanted-apple.png":
/*!****************************************!*\
  !*** ./src/assets/enchanted-apple.png ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "0f478f8e1f989800f087.png";

/***/ }),

/***/ "./src/assets/github-mark.png":
/*!************************************!*\
  !*** ./src/assets/github-mark.png ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "3524c849ab38de4be923.png";

/***/ }),

/***/ "./src/assets/golden-apple.png":
/*!*************************************!*\
  !*** ./src/assets/golden-apple.png ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "656aa5296684f4a927ca.png";

/***/ }),

/***/ "./src/assets/head-foot-bg.jpg":
/*!*************************************!*\
  !*** ./src/assets/head-foot-bg.jpg ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "df0378a338e090b6c757.jpg";

/***/ }),

/***/ "./src/assets/hero-bg.jpg":
/*!********************************!*\
  !*** ./src/assets/hero-bg.jpg ***!
  \********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "6b2f693f4276bc3dcf21.jpg";

/***/ }),

/***/ "./src/assets/minecraft-bold-italic.otf":
/*!**********************************************!*\
  !*** ./src/assets/minecraft-bold-italic.otf ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "9693305371d02954a88f.otf";

/***/ }),

/***/ "./src/assets/minecraft-bold.otf":
/*!***************************************!*\
  !*** ./src/assets/minecraft-bold.otf ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "a9b3bc2a90dd462c9c18.otf";

/***/ }),

/***/ "./src/assets/minecraft-italic.otf":
/*!*****************************************!*\
  !*** ./src/assets/minecraft-italic.otf ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "ce040688d15f830ad909.otf";

/***/ }),

/***/ "./src/assets/minecraft-logo.ttf":
/*!***************************************!*\
  !*** ./src/assets/minecraft-logo.ttf ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "cd1235551b5f89f4710f.ttf";

/***/ }),

/***/ "./src/assets/minecraft.otf":
/*!**********************************!*\
  !*** ./src/assets/minecraft.otf ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "82ba08919dc2add9422f.otf";

/***/ }),

/***/ "./src/assets/mutton.png":
/*!*******************************!*\
  !*** ./src/assets/mutton.png ***!
  \*******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "3ac4f10a533ce1be0493.png";

/***/ }),

/***/ "./src/assets/porkchop.png":
/*!*********************************!*\
  !*** ./src/assets/porkchop.png ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "5b66ae4c4c4ba535a764.png";

/***/ }),

/***/ "./src/assets/rabbit.png":
/*!*******************************!*\
  !*** ./src/assets/rabbit.png ***!
  \*******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "4152e8fbb47b10a38edc.png";

/***/ }),

/***/ "./src/assets/rest-five.png":
/*!**********************************!*\
  !*** ./src/assets/rest-five.png ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "152c55725b9540c3e86e.png";

/***/ }),

/***/ "./src/assets/rest-four.png":
/*!**********************************!*\
  !*** ./src/assets/rest-four.png ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "d5e37d68fb5740da5810.png";

/***/ }),

/***/ "./src/assets/rest-one.png":
/*!*********************************!*\
  !*** ./src/assets/rest-one.png ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "e82dce684c41072508a6.png";

/***/ }),

/***/ "./src/assets/rest-three.png":
/*!***********************************!*\
  !*** ./src/assets/rest-three.png ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "ea6e98c866a5a57c1f42.png";

/***/ }),

/***/ "./src/assets/rest-two.png":
/*!*********************************!*\
  !*** ./src/assets/rest-two.png ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "b7e57311a87cad2d13fe.png";

/***/ }),

/***/ "./src/assets/salmon.png":
/*!*******************************!*\
  !*** ./src/assets/salmon.png ***!
  \*******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "1a8fad45244739afb901.png";

/***/ }),

/***/ "./src/assets/steak.png":
/*!******************************!*\
  !*** ./src/assets/steak.png ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "3097b1301843ca937017.png";

/***/ }),

/***/ "./src/assets/stew.png":
/*!*****************************!*\
  !*** ./src/assets/stew.png ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "e2361697f15fecd54166.png";

/***/ }),

/***/ "./node_modules/available-typed-arrays/index.js":
/*!******************************************************!*\
  !*** ./node_modules/available-typed-arrays/index.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var possibleNames = [
	'BigInt64Array',
	'BigUint64Array',
	'Float32Array',
	'Float64Array',
	'Int16Array',
	'Int32Array',
	'Int8Array',
	'Uint16Array',
	'Uint32Array',
	'Uint8Array',
	'Uint8ClampedArray'
];

var g = typeof globalThis === 'undefined' ? __webpack_require__.g : globalThis;

module.exports = function availableTypedArrays() {
	var out = [];
	for (var i = 0; i < possibleNames.length; i++) {
		if (typeof g[possibleNames[i]] === 'function') {
			out[out.length] = possibleNames[i];
		}
	}
	return out;
};


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/index.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0MsYUFBYSxJQUFJLGFBQWE7QUFDbEU7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsY0FBYztBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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QUFDLDhDQUFRO0FBQ2hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQix1RUFBc0I7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixnQkFBZ0I7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsU0FBUztBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1Qix1QkFBdUI7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTLGtCQUFrQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLHdCQUF3QjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0Isc0JBQXNCO0FBQ3hDO0FBQ0E7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QTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDBCQUEwQixtQ0FBbUM7QUFDN0Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFJQTtBQUNBLDBCQUEwQixtQ0FBbUM7QUFDN0Q7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxPQUFPLGdGQUFnRixZQUFZLGFBQWEsT0FBTyxLQUFLLFlBQVksYUFBYSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssVUFBVSxNQUFNLEtBQUssVUFBVSxVQUFVLE1BQU0sS0FBSyxVQUFVLFdBQVcsWUFBWSxXQUFXLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxPQUFPLEtBQUssWUFBWSxXQUFXLE9BQU8sS0FBSyxVQUFVLFNBQVMsS0FBSyxVQUFVLFlBQVksV0FBVyxRQUFRLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxjQUFjLFdBQVcsWUFBWSxhQUFhLGFBQWEsYUFBYSxPQUFPLEtBQUssWUFBWSxhQUFhLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxVQUFVLFVBQVUsTUFBTSxLQUFLLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxPQUFPLEtBQUssWUFBWSxhQUFhLGFBQWEsYUFBYSxXQUFXLFFBQVEsS0FBSyxVQUFVLFVBQVUsYUFBYSxhQUFhLGFBQWEsT0FBTyxLQUFLLFVBQVUsV0FBVyxXQUFXLFVBQVUsWUFBWSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsV0FBVyxPQUFPLEtBQUssVUFBVSxNQUFNLEtBQUssVUFBVSxVQUFVLE1BQU0sS0FBSyxZQUFZLE9BQU8sS0FBSyxVQUFVLFVBQVUsWUFBWSxXQUFXLFlBQVksT0FBTyxLQUFLLFVBQVUsVUFBVSxVQUFVLE1BQU0sS0FBSyxVQUFVLE9BQU8sS0FBSyxZQUFZLGFBQWEsV0FBVyxN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QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLFdBQVcsUUFBUTtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlOzs7QUFHZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsNENBQTRDLEtBQUs7O0FBRWpEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTtB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QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxpRUFBZSxRQUFROzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbEZWOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDRDQUE0QyxxQkFBTTs7QUFFbEQ7QUFDQTtBQUNBLGlCQUFpQiwwQkFBMEI7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcmVzdGF1cmFudC1wYWdlLy4vbm9kZV9tb2R1bGVzL2Fzc2VydC9idWlsZC9hc3NlcnQuanMiLCJ3ZWJwYWNrOi8vcmVzdGF1cmFudC1wYWdlLy4vbm9kZV9tb2R1bGVzL2Fzc2VydC9idWlsZC9pbnRlcm5hbC9hc3NlcnQvYXNzZXJ0aW9uX2Vycm9yLmpzIiwid2VicGFjazovL3Jlc3RhdXJhbnQtcGFnZS8uL25vZGVfbW9kdWxlcy9hc3NlcnQvYnVpbGQvaW50ZXJuYWwvZXJyb3JzLmpzIiwid2VicGFjazovL3Jlc3RhdXJhbnQtcGFnZS8uL25vZGVfbW9kdWxlcy9hc3NlcnQvYnVpbGQvaW50ZXJuYWwvdXRpbC9jb21wYXJpc29ucy5qcyIsIndlYnBhY2s6Ly9yZXN0YXVyYW50LXBhZ2UvLi9ub2RlX21vZHVsZXMvY2FsbC1iaW5kL2NhbGxCb3VuZC5qcyIsIndlYnBhY2s6Ly9yZXN0YXVyYW50LXBhZ2UvLi9ub2RlX21vZHVsZXMvY2FsbC1iaW5kL2luZGV4LmpzIiwid2VicGFjazovL3Jlc3RhdXJhbnQtcGFnZS8uL25vZGVfbW9kdWxlcy9jb25zb2xlLWJyb3dzZXJpZnkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vcmVzdGF1cmFudC1wYWdlLy4vc3JjL3N0eWxlLmNzcyIsIndlYnBhY2s6Ly9yZXN0YXVyYW50LXBhZ2UvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL3Jlc3RhdXJhbnQtcGFnZS8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRVcmwuanMiLCJ3ZWJwYWNrOi8vcmVzdGF1cmFudC1wYWdlLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vcmVzdGF1cmFudC1wYWdlLy4vbm9kZV9tb2R1bGVzL2RlZmluZS1kYXRhLXByb3BlcnR5L2luZGV4LmpzIiwid2VicGFjazovL3Jlc3RhdXJhbnQtcGFnZS8uL25vZGVfbW9kdWxlcy9kZWZpbmUtcHJvcGVydGllcy9pbmRleC5qcyIsIndlYnBhY2s6Ly9yZXN0YXVyYW50LXBhZ2UvLi9ub2RlX21vZHVsZXMvZm9yLWVhY2gvaW5kZXguanMiLCJ3ZWJwYWNrOi8vcmVzdGF1cmFudC1wYWdlLy4vbm9kZV9tb2R1bGVzL2Z1bmN0aW9uLWJpbmQvaW1wbGVtZW50YXRpb24uanMiLCJ3ZWJwYWNrOi8vcmVzdGF1cmFudC1wYWdlLy4vbm9kZV9tb2R1bGVzL2Z1bmN0aW9uLWJpbmQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vcmVzdGF1cmFudC1wYWdlLy4vbm9kZV9tb2R1bGVzL2dldC1pbnRyaW5zaWMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vcmVzdGF1cmFudC1wYWdlLy4vbm9kZV9tb2R1bGVzL2dvcGQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vcmVzdGF1cmFudC1wYWdlLy4vbm9kZV9tb2R1bGVzL2hhcy1wcm9wZXJ0eS1kZXNjcmlwdG9ycy9pbmRleC5qcyIsIndlYnBhY2s6Ly9yZXN0YXVyYW50LXBhZ2UvLi9ub2RlX21vZHVsZXMvaGFzLXByb3RvL2luZGV4LmpzIiwid2VicGFjazovL3Jlc3RhdXJhbnQtcGFnZS8uL25vZGVfbW9kdWxlcy9oYXMtc3ltYm9scy9pbmRleC5qcyIsIndlYnBhY2s6Ly9yZXN0YXVyYW50LXBhZ2UvLi9ub2RlX21vZHVsZXMvaGFzLXN5bWJvbHMvc2hhbXMuanMiLCJ3ZWJwYWNrOi8vcmVzdGF1cmFudC1wYWdlLy4vbm9kZV9tb2R1bGVzL2hhcy10b3N0cmluZ3RhZy9zaGFtcy5qcyIsIndlYnBhY2s6Ly9yZXN0YXVyYW50LXBhZ2UvLi9ub2RlX21vZHVsZXMvaGFzb3duL2luZGV4LmpzIiwid2VicGFjazovL3Jlc3RhdXJhbnQtcGFnZS8uL25vZGVfbW9kdWxlcy9pbmhlcml0cy9pbmhlcml0c19icm93c2VyLmpzIiwid2VicGFjazovL3Jlc3RhdXJhbnQtcGFnZS8uL25vZGVfbW9kdWxlcy9pcy1hcmd1bWVudHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vcmVzdGF1cmFudC1wYWdlLy4vbm9kZV9tb2R1bGVzL2lzLWNhbGxhYmxlL2luZGV4LmpzIiwid2VicGFjazovL3Jlc3RhdXJhbnQtcGFnZS8uL25vZGVfbW9kdWxlcy9pcy1nZW5lcmF0b3ItZnVuY3Rpb24vaW5kZXguanMiLCJ3ZWJwYWNrOi8vcmVzdGF1cmFudC1wYWdlLy4vbm9kZV9tb2R1bGVzL2lzLW5hbi9pbXBsZW1lbnRhdGlvbi5qcyIsIndlYnBhY2s6Ly9yZXN0YXVyYW50LXBhZ2UvLi9ub2RlX21vZHVsZXMvaXMtbmFuL2luZGV4LmpzIiwid2VicGFjazovL3Jlc3RhdXJhbnQtcGFnZS8uL25vZGVfbW9kdWxlcy9pcy1uYW4vcG9seWZpbGwuanMiLCJ3ZWJwYWNrOi8vcmVzdGF1cmFudC1wYWdlLy4vbm9kZV9tb2R1bGVzL2lzLW5hbi9zaGltLmpzIiwid2VicGFjazovL3Jlc3RhdXJhbnQtcGFnZS8uL25vZGVfbW9kdWxlcy9pcy10eXBlZC1hcnJheS9pbmRleC5qcyIsIndlYnBhY2s6Ly9yZXN0YXVyYW50LXBhZ2UvLi9ub2RlX21vZHVsZXMvb2JqZWN0LWlzL2ltcGxlbWVudGF0aW9uLmpzIiwid2VicGFjazovL3Jlc3RhdXJhbnQtcGFnZS8uL25vZGVfbW9kdWxlcy9vYmplY3QtaXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vcmVzdGF1cmFudC1wYWdlLy4vbm9kZV9tb2R1bGVzL29iamVjdC1pcy9wb2x5ZmlsbC5qcyIsIndlYnBhY2s6Ly9yZXN0YXVyYW50LXBhZ2UvLi9ub2RlX21vZHVsZXMvb2JqZWN0LWlzL3NoaW0uanMiLCJ3ZWJwYWNrOi8vcmVzdGF1cmFudC1wYWdlLy4vbm9kZV9tb2R1bGVzL29iamVjdC1rZXlzL2ltcGxlbWVudGF0aW9uLmpzIiwid2VicGFjazovL3Jlc3RhdXJhbnQtcGFnZS8uL25vZGVfbW9kdWxlcy9vYmplY3Qta2V5cy9pbmRleC5qcyIsIndlYnBhY2s6Ly9yZXN0YXVyYW50LXBhZ2UvLi9ub2RlX21vZHVsZXMvb2JqZWN0LWtleXMvaXNBcmd1bWVudHMuanMiLCJ3ZWJwYWNrOi8vcmVzdGF1cmFudC1wYWdlLy4vbm9kZV9tb2R1bGVzL29iamVjdC5hc3NpZ24vaW1wbGVtZW50YXRpb24uanMiLCJ3ZWJwYWNrOi8vcmVzdGF1cmFudC1wYWdlLy4vbm9kZV9tb2R1bGVzL29iamVjdC5hc3NpZ24vcG9seWZpbGwuanMiLCJ3ZWJwYWNrOi8vcmVzdGF1cmFudC1wYWdlLy4vbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly9yZXN0YXVyYW50LXBhZ2UvLi9ub2RlX21vZHVsZXMvc2V0LWZ1bmN0aW9uLWxlbmd0aC9pbmRleC5qcyIsIndlYnBhY2s6Ly9yZXN0YXVyYW50LXBhZ2UvLi9zcmMvc3R5bGUuY3NzPzcxNjMiLCJ3ZWJwYWNrOi8vcmVzdGF1cmFudC1wYWdlLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL3Jlc3RhdXJhbnQtcGFnZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vcmVzdGF1cmFudC1wYWdlLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL3Jlc3RhdXJhbnQtcGFnZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9yZXN0YXVyYW50LXBhZ2UvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly9yZXN0YXVyYW50LXBhZ2UvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyIsIndlYnBhY2s6Ly9yZXN0YXVyYW50LXBhZ2UvLi9ub2RlX21vZHVsZXMvdXRpbC9zdXBwb3J0L2lzQnVmZmVyQnJvd3Nlci5qcyIsIndlYnBhY2s6Ly9yZXN0YXVyYW50LXBhZ2UvLi9ub2RlX21vZHVsZXMvdXRpbC9zdXBwb3J0L3R5cGVzLmpzIiwid2VicGFjazovL3Jlc3RhdXJhbnQtcGFnZS8uL25vZGVfbW9kdWxlcy91dGlsL3V0aWwuanMiLCJ3ZWJwYWNrOi8vcmVzdGF1cmFudC1wYWdlLy4vbm9kZV9tb2R1bGVzL3doaWNoLXR5cGVkLWFycmF5L2luZGV4LmpzIiwid2VicGFjazovL3Jlc3RhdXJhbnQtcGFnZS8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly9yZXN0YXVyYW50LXBhZ2UvLi9zcmMvbW9kdWxlcy9jb250YWN0LmpzIiwid2VicGFjazovL3Jlc3RhdXJhbnQtcGFnZS8uL3NyYy9tb2R1bGVzL2hvbWUuanMiLCJ3ZWJwYWNrOi8vcmVzdGF1cmFudC1wYWdlLy4vc3JjL21vZHVsZXMvbWVudS5qcyIsIndlYnBhY2s6Ly9yZXN0YXVyYW50LXBhZ2UvLi9zcmMvcGFnZWxvYWQuanMiLCJ3ZWJwYWNrOi8vcmVzdGF1cmFudC1wYWdlLy4vbm9kZV9tb2R1bGVzL2F2YWlsYWJsZS10eXBlZC1hcnJheXMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ3VycmVudGx5IGluIHN5bmMgd2l0aCBOb2RlLmpzIGxpYi9hc3NlcnQuanNcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9ub2RlanMvbm9kZS9jb21taXQvMmE1MWFlNDI0YTUxM2VjOWE2YWEzNDY2YmFhMGNjMWQ1NWRkNGYzYlxuXG4vLyBPcmlnaW5hbGx5IGZyb20gbmFyd2hhbC5qcyAoaHR0cDovL25hcndoYWxqcy5vcmcpXG4vLyBDb3B5cmlnaHQgKGMpIDIwMDkgVGhvbWFzIFJvYmluc29uIDwyODBub3J0aC5jb20+XG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgJ1NvZnR3YXJlJyksIHRvXG4vLyBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZVxuLy8gcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yXG4vLyBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEICdBUyBJUycsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTlxuLy8gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTlxuLy8gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gX3R5cGVvZihvKSB7IFwiQGJhYmVsL2hlbHBlcnMgLSB0eXBlb2ZcIjsgcmV0dXJuIF90eXBlb2YgPSBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIFN5bWJvbCAmJiBcInN5bWJvbFwiID09IHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPyBmdW5jdGlvbiAobykgeyByZXR1cm4gdHlwZW9mIG87IH0gOiBmdW5jdGlvbiAobykgeyByZXR1cm4gbyAmJiBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIFN5bWJvbCAmJiBvLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgbyAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2YgbzsgfSwgX3R5cGVvZihvKTsgfVxuZnVuY3Rpb24gX2RlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBfdG9Qcm9wZXJ0eUtleShkZXNjcmlwdG9yLmtleSksIGRlc2NyaXB0b3IpOyB9IH1cbmZ1bmN0aW9uIF9jcmVhdGVDbGFzcyhDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KENvbnN0cnVjdG9yLCBcInByb3RvdHlwZVwiLCB7IHdyaXRhYmxlOiBmYWxzZSB9KTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9XG5mdW5jdGlvbiBfdG9Qcm9wZXJ0eUtleShhcmcpIHsgdmFyIGtleSA9IF90b1ByaW1pdGl2ZShhcmcsIFwic3RyaW5nXCIpOyByZXR1cm4gX3R5cGVvZihrZXkpID09PSBcInN5bWJvbFwiID8ga2V5IDogU3RyaW5nKGtleSk7IH1cbmZ1bmN0aW9uIF90b1ByaW1pdGl2ZShpbnB1dCwgaGludCkgeyBpZiAoX3R5cGVvZihpbnB1dCkgIT09IFwib2JqZWN0XCIgfHwgaW5wdXQgPT09IG51bGwpIHJldHVybiBpbnB1dDsgdmFyIHByaW0gPSBpbnB1dFtTeW1ib2wudG9QcmltaXRpdmVdOyBpZiAocHJpbSAhPT0gdW5kZWZpbmVkKSB7IHZhciByZXMgPSBwcmltLmNhbGwoaW5wdXQsIGhpbnQgfHwgXCJkZWZhdWx0XCIpOyBpZiAoX3R5cGVvZihyZXMpICE9PSBcIm9iamVjdFwiKSByZXR1cm4gcmVzOyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQEB0b1ByaW1pdGl2ZSBtdXN0IHJldHVybiBhIHByaW1pdGl2ZSB2YWx1ZS5cIik7IH0gcmV0dXJuIChoaW50ID09PSBcInN0cmluZ1wiID8gU3RyaW5nIDogTnVtYmVyKShpbnB1dCk7IH1cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG52YXIgX3JlcXVpcmUgPSByZXF1aXJlKCcuL2ludGVybmFsL2Vycm9ycycpLFxuICBfcmVxdWlyZSRjb2RlcyA9IF9yZXF1aXJlLmNvZGVzLFxuICBFUlJfQU1CSUdVT1VTX0FSR1VNRU5UID0gX3JlcXVpcmUkY29kZXMuRVJSX0FNQklHVU9VU19BUkdVTUVOVCxcbiAgRVJSX0lOVkFMSURfQVJHX1RZUEUgPSBfcmVxdWlyZSRjb2Rlcy5FUlJfSU5WQUxJRF9BUkdfVFlQRSxcbiAgRVJSX0lOVkFMSURfQVJHX1ZBTFVFID0gX3JlcXVpcmUkY29kZXMuRVJSX0lOVkFMSURfQVJHX1ZBTFVFLFxuICBFUlJfSU5WQUxJRF9SRVRVUk5fVkFMVUUgPSBfcmVxdWlyZSRjb2Rlcy5FUlJfSU5WQUxJRF9SRVRVUk5fVkFMVUUsXG4gIEVSUl9NSVNTSU5HX0FSR1MgPSBfcmVxdWlyZSRjb2Rlcy5FUlJfTUlTU0lOR19BUkdTO1xudmFyIEFzc2VydGlvbkVycm9yID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9hc3NlcnQvYXNzZXJ0aW9uX2Vycm9yJyk7XG52YXIgX3JlcXVpcmUyID0gcmVxdWlyZSgndXRpbC8nKSxcbiAgaW5zcGVjdCA9IF9yZXF1aXJlMi5pbnNwZWN0O1xudmFyIF9yZXF1aXJlJHR5cGVzID0gcmVxdWlyZSgndXRpbC8nKS50eXBlcyxcbiAgaXNQcm9taXNlID0gX3JlcXVpcmUkdHlwZXMuaXNQcm9taXNlLFxuICBpc1JlZ0V4cCA9IF9yZXF1aXJlJHR5cGVzLmlzUmVnRXhwO1xudmFyIG9iamVjdEFzc2lnbiA9IHJlcXVpcmUoJ29iamVjdC5hc3NpZ24vcG9seWZpbGwnKSgpO1xudmFyIG9iamVjdElzID0gcmVxdWlyZSgnb2JqZWN0LWlzL3BvbHlmaWxsJykoKTtcbnZhciBSZWdFeHBQcm90b3R5cGVUZXN0ID0gcmVxdWlyZSgnY2FsbC1iaW5kL2NhbGxCb3VuZCcpKCdSZWdFeHAucHJvdG90eXBlLnRlc3QnKTtcbnZhciBlcnJvckNhY2hlID0gbmV3IE1hcCgpO1xudmFyIGlzRGVlcEVxdWFsO1xudmFyIGlzRGVlcFN0cmljdEVxdWFsO1xudmFyIHBhcnNlRXhwcmVzc2lvbkF0O1xudmFyIGZpbmROb2RlQXJvdW5kO1xudmFyIGRlY29kZXI7XG5mdW5jdGlvbiBsYXp5TG9hZENvbXBhcmlzb24oKSB7XG4gIHZhciBjb21wYXJpc29uID0gcmVxdWlyZSgnLi9pbnRlcm5hbC91dGlsL2NvbXBhcmlzb25zJyk7XG4gIGlzRGVlcEVxdWFsID0gY29tcGFyaXNvbi5pc0RlZXBFcXVhbDtcbiAgaXNEZWVwU3RyaWN0RXF1YWwgPSBjb21wYXJpc29uLmlzRGVlcFN0cmljdEVxdWFsO1xufVxuXG4vLyBFc2NhcGUgY29udHJvbCBjaGFyYWN0ZXJzIGJ1dCBub3QgXFxuIGFuZCBcXHQgdG8ga2VlcCB0aGUgbGluZSBicmVha3MgYW5kXG4vLyBpbmRlbnRhdGlvbiBpbnRhY3QuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29udHJvbC1yZWdleFxudmFyIGVzY2FwZVNlcXVlbmNlc1JlZ0V4cCA9IC9bXFx4MDAtXFx4MDhcXHgwYlxceDBjXFx4MGUtXFx4MWZdL2c7XG52YXIgbWV0YSA9IFtcIlxcXFx1MDAwMFwiLCBcIlxcXFx1MDAwMVwiLCBcIlxcXFx1MDAwMlwiLCBcIlxcXFx1MDAwM1wiLCBcIlxcXFx1MDAwNFwiLCBcIlxcXFx1MDAwNVwiLCBcIlxcXFx1MDAwNlwiLCBcIlxcXFx1MDAwN1wiLCAnXFxcXGInLCAnJywgJycsIFwiXFxcXHUwMDBiXCIsICdcXFxcZicsICcnLCBcIlxcXFx1MDAwZVwiLCBcIlxcXFx1MDAwZlwiLCBcIlxcXFx1MDAxMFwiLCBcIlxcXFx1MDAxMVwiLCBcIlxcXFx1MDAxMlwiLCBcIlxcXFx1MDAxM1wiLCBcIlxcXFx1MDAxNFwiLCBcIlxcXFx1MDAxNVwiLCBcIlxcXFx1MDAxNlwiLCBcIlxcXFx1MDAxN1wiLCBcIlxcXFx1MDAxOFwiLCBcIlxcXFx1MDAxOVwiLCBcIlxcXFx1MDAxYVwiLCBcIlxcXFx1MDAxYlwiLCBcIlxcXFx1MDAxY1wiLCBcIlxcXFx1MDAxZFwiLCBcIlxcXFx1MDAxZVwiLCBcIlxcXFx1MDAxZlwiXTtcbnZhciBlc2NhcGVGbiA9IGZ1bmN0aW9uIGVzY2FwZUZuKHN0cikge1xuICByZXR1cm4gbWV0YVtzdHIuY2hhckNvZGVBdCgwKV07XG59O1xudmFyIHdhcm5lZCA9IGZhbHNlO1xuXG4vLyBUaGUgYXNzZXJ0IG1vZHVsZSBwcm92aWRlcyBmdW5jdGlvbnMgdGhhdCB0aHJvd1xuLy8gQXNzZXJ0aW9uRXJyb3IncyB3aGVuIHBhcnRpY3VsYXIgY29uZGl0aW9ucyBhcmUgbm90IG1ldC4gVGhlXG4vLyBhc3NlcnQgbW9kdWxlIG11c3QgY29uZm9ybSB0byB0aGUgZm9sbG93aW5nIGludGVyZmFjZS5cblxudmFyIGFzc2VydCA9IG1vZHVsZS5leHBvcnRzID0gb2s7XG52YXIgTk9fRVhDRVBUSU9OX1NFTlRJTkVMID0ge307XG5cbi8vIEFsbCBvZiB0aGUgZm9sbG93aW5nIGZ1bmN0aW9ucyBtdXN0IHRocm93IGFuIEFzc2VydGlvbkVycm9yXG4vLyB3aGVuIGEgY29ycmVzcG9uZGluZyBjb25kaXRpb24gaXMgbm90IG1ldCwgd2l0aCBhIG1lc3NhZ2UgdGhhdFxuLy8gbWF5IGJlIHVuZGVmaW5lZCBpZiBub3QgcHJvdmlkZWQuIEFsbCBhc3NlcnRpb24gbWV0aG9kcyBwcm92aWRlXG4vLyBib3RoIHRoZSBhY3R1YWwgYW5kIGV4cGVjdGVkIHZhbHVlcyB0byB0aGUgYXNzZXJ0aW9uIGVycm9yIGZvclxuLy8gZGlzcGxheSBwdXJwb3Nlcy5cblxuZnVuY3Rpb24gaW5uZXJGYWlsKG9iaikge1xuICBpZiAob2JqLm1lc3NhZ2UgaW5zdGFuY2VvZiBFcnJvcikgdGhyb3cgb2JqLm1lc3NhZ2U7XG4gIHRocm93IG5ldyBBc3NlcnRpb25FcnJvcihvYmopO1xufVxuZnVuY3Rpb24gZmFpbChhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlLCBvcGVyYXRvciwgc3RhY2tTdGFydEZuKSB7XG4gIHZhciBhcmdzTGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgdmFyIGludGVybmFsTWVzc2FnZTtcbiAgaWYgKGFyZ3NMZW4gPT09IDApIHtcbiAgICBpbnRlcm5hbE1lc3NhZ2UgPSAnRmFpbGVkJztcbiAgfSBlbHNlIGlmIChhcmdzTGVuID09PSAxKSB7XG4gICAgbWVzc2FnZSA9IGFjdHVhbDtcbiAgICBhY3R1YWwgPSB1bmRlZmluZWQ7XG4gIH0gZWxzZSB7XG4gICAgaWYgKHdhcm5lZCA9PT0gZmFsc2UpIHtcbiAgICAgIHdhcm5lZCA9IHRydWU7XG4gICAgICB2YXIgd2FybiA9IHByb2Nlc3MuZW1pdFdhcm5pbmcgPyBwcm9jZXNzLmVtaXRXYXJuaW5nIDogY29uc29sZS53YXJuLmJpbmQoY29uc29sZSk7XG4gICAgICB3YXJuKCdhc3NlcnQuZmFpbCgpIHdpdGggbW9yZSB0aGFuIG9uZSBhcmd1bWVudCBpcyBkZXByZWNhdGVkLiAnICsgJ1BsZWFzZSB1c2UgYXNzZXJ0LnN0cmljdEVxdWFsKCkgaW5zdGVhZCBvciBvbmx5IHBhc3MgYSBtZXNzYWdlLicsICdEZXByZWNhdGlvbldhcm5pbmcnLCAnREVQMDA5NCcpO1xuICAgIH1cbiAgICBpZiAoYXJnc0xlbiA9PT0gMikgb3BlcmF0b3IgPSAnIT0nO1xuICB9XG4gIGlmIChtZXNzYWdlIGluc3RhbmNlb2YgRXJyb3IpIHRocm93IG1lc3NhZ2U7XG4gIHZhciBlcnJBcmdzID0ge1xuICAgIGFjdHVhbDogYWN0dWFsLFxuICAgIGV4cGVjdGVkOiBleHBlY3RlZCxcbiAgICBvcGVyYXRvcjogb3BlcmF0b3IgPT09IHVuZGVmaW5lZCA/ICdmYWlsJyA6IG9wZXJhdG9yLFxuICAgIHN0YWNrU3RhcnRGbjogc3RhY2tTdGFydEZuIHx8IGZhaWxcbiAgfTtcbiAgaWYgKG1lc3NhZ2UgIT09IHVuZGVmaW5lZCkge1xuICAgIGVyckFyZ3MubWVzc2FnZSA9IG1lc3NhZ2U7XG4gIH1cbiAgdmFyIGVyciA9IG5ldyBBc3NlcnRpb25FcnJvcihlcnJBcmdzKTtcbiAgaWYgKGludGVybmFsTWVzc2FnZSkge1xuICAgIGVyci5tZXNzYWdlID0gaW50ZXJuYWxNZXNzYWdlO1xuICAgIGVyci5nZW5lcmF0ZWRNZXNzYWdlID0gdHJ1ZTtcbiAgfVxuICB0aHJvdyBlcnI7XG59XG5hc3NlcnQuZmFpbCA9IGZhaWw7XG5cbi8vIFRoZSBBc3NlcnRpb25FcnJvciBpcyBkZWZpbmVkIGluIGludGVybmFsL2Vycm9yLlxuYXNzZXJ0LkFzc2VydGlvbkVycm9yID0gQXNzZXJ0aW9uRXJyb3I7XG5mdW5jdGlvbiBpbm5lck9rKGZuLCBhcmdMZW4sIHZhbHVlLCBtZXNzYWdlKSB7XG4gIGlmICghdmFsdWUpIHtcbiAgICB2YXIgZ2VuZXJhdGVkTWVzc2FnZSA9IGZhbHNlO1xuICAgIGlmIChhcmdMZW4gPT09IDApIHtcbiAgICAgIGdlbmVyYXRlZE1lc3NhZ2UgPSB0cnVlO1xuICAgICAgbWVzc2FnZSA9ICdObyB2YWx1ZSBhcmd1bWVudCBwYXNzZWQgdG8gYGFzc2VydC5vaygpYCc7XG4gICAgfSBlbHNlIGlmIChtZXNzYWdlIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgIHRocm93IG1lc3NhZ2U7XG4gICAgfVxuICAgIHZhciBlcnIgPSBuZXcgQXNzZXJ0aW9uRXJyb3Ioe1xuICAgICAgYWN0dWFsOiB2YWx1ZSxcbiAgICAgIGV4cGVjdGVkOiB0cnVlLFxuICAgICAgbWVzc2FnZTogbWVzc2FnZSxcbiAgICAgIG9wZXJhdG9yOiAnPT0nLFxuICAgICAgc3RhY2tTdGFydEZuOiBmblxuICAgIH0pO1xuICAgIGVyci5nZW5lcmF0ZWRNZXNzYWdlID0gZ2VuZXJhdGVkTWVzc2FnZTtcbiAgICB0aHJvdyBlcnI7XG4gIH1cbn1cblxuLy8gUHVyZSBhc3NlcnRpb24gdGVzdHMgd2hldGhlciBhIHZhbHVlIGlzIHRydXRoeSwgYXMgZGV0ZXJtaW5lZFxuLy8gYnkgISF2YWx1ZS5cbmZ1bmN0aW9uIG9rKCkge1xuICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuKSwgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICBhcmdzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICB9XG4gIGlubmVyT2suYXBwbHkodm9pZCAwLCBbb2ssIGFyZ3MubGVuZ3RoXS5jb25jYXQoYXJncykpO1xufVxuYXNzZXJ0Lm9rID0gb2s7XG5cbi8vIFRoZSBlcXVhbGl0eSBhc3NlcnRpb24gdGVzdHMgc2hhbGxvdywgY29lcmNpdmUgZXF1YWxpdHkgd2l0aCA9PS5cbi8qIGVzbGludC1kaXNhYmxlIG5vLXJlc3RyaWN0ZWQtcHJvcGVydGllcyAqL1xuYXNzZXJ0LmVxdWFsID0gZnVuY3Rpb24gZXF1YWwoYWN0dWFsLCBleHBlY3RlZCwgbWVzc2FnZSkge1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDIpIHtcbiAgICB0aHJvdyBuZXcgRVJSX01JU1NJTkdfQVJHUygnYWN0dWFsJywgJ2V4cGVjdGVkJyk7XG4gIH1cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVxZXFlcVxuICBpZiAoYWN0dWFsICE9IGV4cGVjdGVkKSB7XG4gICAgaW5uZXJGYWlsKHtcbiAgICAgIGFjdHVhbDogYWN0dWFsLFxuICAgICAgZXhwZWN0ZWQ6IGV4cGVjdGVkLFxuICAgICAgbWVzc2FnZTogbWVzc2FnZSxcbiAgICAgIG9wZXJhdG9yOiAnPT0nLFxuICAgICAgc3RhY2tTdGFydEZuOiBlcXVhbFxuICAgIH0pO1xuICB9XG59O1xuXG4vLyBUaGUgbm9uLWVxdWFsaXR5IGFzc2VydGlvbiB0ZXN0cyBmb3Igd2hldGhlciB0d28gb2JqZWN0cyBhcmUgbm90XG4vLyBlcXVhbCB3aXRoICE9LlxuYXNzZXJ0Lm5vdEVxdWFsID0gZnVuY3Rpb24gbm90RXF1YWwoYWN0dWFsLCBleHBlY3RlZCwgbWVzc2FnZSkge1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDIpIHtcbiAgICB0aHJvdyBuZXcgRVJSX01JU1NJTkdfQVJHUygnYWN0dWFsJywgJ2V4cGVjdGVkJyk7XG4gIH1cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVxZXFlcVxuICBpZiAoYWN0dWFsID09IGV4cGVjdGVkKSB7XG4gICAgaW5uZXJGYWlsKHtcbiAgICAgIGFjdHVhbDogYWN0dWFsLFxuICAgICAgZXhwZWN0ZWQ6IGV4cGVjdGVkLFxuICAgICAgbWVzc2FnZTogbWVzc2FnZSxcbiAgICAgIG9wZXJhdG9yOiAnIT0nLFxuICAgICAgc3RhY2tTdGFydEZuOiBub3RFcXVhbFxuICAgIH0pO1xuICB9XG59O1xuXG4vLyBUaGUgZXF1aXZhbGVuY2UgYXNzZXJ0aW9uIHRlc3RzIGEgZGVlcCBlcXVhbGl0eSByZWxhdGlvbi5cbmFzc2VydC5kZWVwRXF1YWwgPSBmdW5jdGlvbiBkZWVwRXF1YWwoYWN0dWFsLCBleHBlY3RlZCwgbWVzc2FnZSkge1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDIpIHtcbiAgICB0aHJvdyBuZXcgRVJSX01JU1NJTkdfQVJHUygnYWN0dWFsJywgJ2V4cGVjdGVkJyk7XG4gIH1cbiAgaWYgKGlzRGVlcEVxdWFsID09PSB1bmRlZmluZWQpIGxhenlMb2FkQ29tcGFyaXNvbigpO1xuICBpZiAoIWlzRGVlcEVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQpKSB7XG4gICAgaW5uZXJGYWlsKHtcbiAgICAgIGFjdHVhbDogYWN0dWFsLFxuICAgICAgZXhwZWN0ZWQ6IGV4cGVjdGVkLFxuICAgICAgbWVzc2FnZTogbWVzc2FnZSxcbiAgICAgIG9wZXJhdG9yOiAnZGVlcEVxdWFsJyxcbiAgICAgIHN0YWNrU3RhcnRGbjogZGVlcEVxdWFsXG4gICAgfSk7XG4gIH1cbn07XG5cbi8vIFRoZSBub24tZXF1aXZhbGVuY2UgYXNzZXJ0aW9uIHRlc3RzIGZvciBhbnkgZGVlcCBpbmVxdWFsaXR5LlxuYXNzZXJ0Lm5vdERlZXBFcXVhbCA9IGZ1bmN0aW9uIG5vdERlZXBFcXVhbChhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlKSB7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMikge1xuICAgIHRocm93IG5ldyBFUlJfTUlTU0lOR19BUkdTKCdhY3R1YWwnLCAnZXhwZWN0ZWQnKTtcbiAgfVxuICBpZiAoaXNEZWVwRXF1YWwgPT09IHVuZGVmaW5lZCkgbGF6eUxvYWRDb21wYXJpc29uKCk7XG4gIGlmIChpc0RlZXBFcXVhbChhY3R1YWwsIGV4cGVjdGVkKSkge1xuICAgIGlubmVyRmFpbCh7XG4gICAgICBhY3R1YWw6IGFjdHVhbCxcbiAgICAgIGV4cGVjdGVkOiBleHBlY3RlZCxcbiAgICAgIG1lc3NhZ2U6IG1lc3NhZ2UsXG4gICAgICBvcGVyYXRvcjogJ25vdERlZXBFcXVhbCcsXG4gICAgICBzdGFja1N0YXJ0Rm46IG5vdERlZXBFcXVhbFxuICAgIH0pO1xuICB9XG59O1xuLyogZXNsaW50LWVuYWJsZSAqL1xuXG5hc3NlcnQuZGVlcFN0cmljdEVxdWFsID0gZnVuY3Rpb24gZGVlcFN0cmljdEVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2UpIHtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAyKSB7XG4gICAgdGhyb3cgbmV3IEVSUl9NSVNTSU5HX0FSR1MoJ2FjdHVhbCcsICdleHBlY3RlZCcpO1xuICB9XG4gIGlmIChpc0RlZXBFcXVhbCA9PT0gdW5kZWZpbmVkKSBsYXp5TG9hZENvbXBhcmlzb24oKTtcbiAgaWYgKCFpc0RlZXBTdHJpY3RFcXVhbChhY3R1YWwsIGV4cGVjdGVkKSkge1xuICAgIGlubmVyRmFpbCh7XG4gICAgICBhY3R1YWw6IGFjdHVhbCxcbiAgICAgIGV4cGVjdGVkOiBleHBlY3RlZCxcbiAgICAgIG1lc3NhZ2U6IG1lc3NhZ2UsXG4gICAgICBvcGVyYXRvcjogJ2RlZXBTdHJpY3RFcXVhbCcsXG4gICAgICBzdGFja1N0YXJ0Rm46IGRlZXBTdHJpY3RFcXVhbFxuICAgIH0pO1xuICB9XG59O1xuYXNzZXJ0Lm5vdERlZXBTdHJpY3RFcXVhbCA9IG5vdERlZXBTdHJpY3RFcXVhbDtcbmZ1bmN0aW9uIG5vdERlZXBTdHJpY3RFcXVhbChhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlKSB7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMikge1xuICAgIHRocm93IG5ldyBFUlJfTUlTU0lOR19BUkdTKCdhY3R1YWwnLCAnZXhwZWN0ZWQnKTtcbiAgfVxuICBpZiAoaXNEZWVwRXF1YWwgPT09IHVuZGVmaW5lZCkgbGF6eUxvYWRDb21wYXJpc29uKCk7XG4gIGlmIChpc0RlZXBTdHJpY3RFcXVhbChhY3R1YWwsIGV4cGVjdGVkKSkge1xuICAgIGlubmVyRmFpbCh7XG4gICAgICBhY3R1YWw6IGFjdHVhbCxcbiAgICAgIGV4cGVjdGVkOiBleHBlY3RlZCxcbiAgICAgIG1lc3NhZ2U6IG1lc3NhZ2UsXG4gICAgICBvcGVyYXRvcjogJ25vdERlZXBTdHJpY3RFcXVhbCcsXG4gICAgICBzdGFja1N0YXJ0Rm46IG5vdERlZXBTdHJpY3RFcXVhbFxuICAgIH0pO1xuICB9XG59XG5hc3NlcnQuc3RyaWN0RXF1YWwgPSBmdW5jdGlvbiBzdHJpY3RFcXVhbChhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlKSB7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMikge1xuICAgIHRocm93IG5ldyBFUlJfTUlTU0lOR19BUkdTKCdhY3R1YWwnLCAnZXhwZWN0ZWQnKTtcbiAgfVxuICBpZiAoIW9iamVjdElzKGFjdHVhbCwgZXhwZWN0ZWQpKSB7XG4gICAgaW5uZXJGYWlsKHtcbiAgICAgIGFjdHVhbDogYWN0dWFsLFxuICAgICAgZXhwZWN0ZWQ6IGV4cGVjdGVkLFxuICAgICAgbWVzc2FnZTogbWVzc2FnZSxcbiAgICAgIG9wZXJhdG9yOiAnc3RyaWN0RXF1YWwnLFxuICAgICAgc3RhY2tTdGFydEZuOiBzdHJpY3RFcXVhbFxuICAgIH0pO1xuICB9XG59O1xuYXNzZXJ0Lm5vdFN0cmljdEVxdWFsID0gZnVuY3Rpb24gbm90U3RyaWN0RXF1YWwoYWN0dWFsLCBleHBlY3RlZCwgbWVzc2FnZSkge1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDIpIHtcbiAgICB0aHJvdyBuZXcgRVJSX01JU1NJTkdfQVJHUygnYWN0dWFsJywgJ2V4cGVjdGVkJyk7XG4gIH1cbiAgaWYgKG9iamVjdElzKGFjdHVhbCwgZXhwZWN0ZWQpKSB7XG4gICAgaW5uZXJGYWlsKHtcbiAgICAgIGFjdHVhbDogYWN0dWFsLFxuICAgICAgZXhwZWN0ZWQ6IGV4cGVjdGVkLFxuICAgICAgbWVzc2FnZTogbWVzc2FnZSxcbiAgICAgIG9wZXJhdG9yOiAnbm90U3RyaWN0RXF1YWwnLFxuICAgICAgc3RhY2tTdGFydEZuOiBub3RTdHJpY3RFcXVhbFxuICAgIH0pO1xuICB9XG59O1xudmFyIENvbXBhcmlzb24gPSAvKiNfX1BVUkVfXyovX2NyZWF0ZUNsYXNzKGZ1bmN0aW9uIENvbXBhcmlzb24ob2JqLCBrZXlzLCBhY3R1YWwpIHtcbiAgdmFyIF90aGlzID0gdGhpcztcbiAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIENvbXBhcmlzb24pO1xuICBrZXlzLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgIGlmIChrZXkgaW4gb2JqKSB7XG4gICAgICBpZiAoYWN0dWFsICE9PSB1bmRlZmluZWQgJiYgdHlwZW9mIGFjdHVhbFtrZXldID09PSAnc3RyaW5nJyAmJiBpc1JlZ0V4cChvYmpba2V5XSkgJiYgUmVnRXhwUHJvdG90eXBlVGVzdChvYmpba2V5XSwgYWN0dWFsW2tleV0pKSB7XG4gICAgICAgIF90aGlzW2tleV0gPSBhY3R1YWxba2V5XTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIF90aGlzW2tleV0gPSBvYmpba2V5XTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xufSk7XG5mdW5jdGlvbiBjb21wYXJlRXhjZXB0aW9uS2V5KGFjdHVhbCwgZXhwZWN0ZWQsIGtleSwgbWVzc2FnZSwga2V5cywgZm4pIHtcbiAgaWYgKCEoa2V5IGluIGFjdHVhbCkgfHwgIWlzRGVlcFN0cmljdEVxdWFsKGFjdHVhbFtrZXldLCBleHBlY3RlZFtrZXldKSkge1xuICAgIGlmICghbWVzc2FnZSkge1xuICAgICAgLy8gQ3JlYXRlIHBsYWNlaG9sZGVyIG9iamVjdHMgdG8gY3JlYXRlIGEgbmljZSBvdXRwdXQuXG4gICAgICB2YXIgYSA9IG5ldyBDb21wYXJpc29uKGFjdHVhbCwga2V5cyk7XG4gICAgICB2YXIgYiA9IG5ldyBDb21wYXJpc29uKGV4cGVjdGVkLCBrZXlzLCBhY3R1YWwpO1xuICAgICAgdmFyIGVyciA9IG5ldyBBc3NlcnRpb25FcnJvcih7XG4gICAgICAgIGFjdHVhbDogYSxcbiAgICAgICAgZXhwZWN0ZWQ6IGIsXG4gICAgICAgIG9wZXJhdG9yOiAnZGVlcFN0cmljdEVxdWFsJyxcbiAgICAgICAgc3RhY2tTdGFydEZuOiBmblxuICAgICAgfSk7XG4gICAgICBlcnIuYWN0dWFsID0gYWN0dWFsO1xuICAgICAgZXJyLmV4cGVjdGVkID0gZXhwZWN0ZWQ7XG4gICAgICBlcnIub3BlcmF0b3IgPSBmbi5uYW1lO1xuICAgICAgdGhyb3cgZXJyO1xuICAgIH1cbiAgICBpbm5lckZhaWwoe1xuICAgICAgYWN0dWFsOiBhY3R1YWwsXG4gICAgICBleHBlY3RlZDogZXhwZWN0ZWQsXG4gICAgICBtZXNzYWdlOiBtZXNzYWdlLFxuICAgICAgb3BlcmF0b3I6IGZuLm5hbWUsXG4gICAgICBzdGFja1N0YXJ0Rm46IGZuXG4gICAgfSk7XG4gIH1cbn1cbmZ1bmN0aW9uIGV4cGVjdGVkRXhjZXB0aW9uKGFjdHVhbCwgZXhwZWN0ZWQsIG1zZywgZm4pIHtcbiAgaWYgKHR5cGVvZiBleHBlY3RlZCAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIGlmIChpc1JlZ0V4cChleHBlY3RlZCkpIHJldHVybiBSZWdFeHBQcm90b3R5cGVUZXN0KGV4cGVjdGVkLCBhY3R1YWwpO1xuICAgIC8vIGFzc2VydC5kb2VzTm90VGhyb3cgZG9lcyBub3QgYWNjZXB0IG9iamVjdHMuXG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDIpIHtcbiAgICAgIHRocm93IG5ldyBFUlJfSU5WQUxJRF9BUkdfVFlQRSgnZXhwZWN0ZWQnLCBbJ0Z1bmN0aW9uJywgJ1JlZ0V4cCddLCBleHBlY3RlZCk7XG4gICAgfVxuXG4gICAgLy8gSGFuZGxlIHByaW1pdGl2ZXMgcHJvcGVybHkuXG4gICAgaWYgKF90eXBlb2YoYWN0dWFsKSAhPT0gJ29iamVjdCcgfHwgYWN0dWFsID09PSBudWxsKSB7XG4gICAgICB2YXIgZXJyID0gbmV3IEFzc2VydGlvbkVycm9yKHtcbiAgICAgICAgYWN0dWFsOiBhY3R1YWwsXG4gICAgICAgIGV4cGVjdGVkOiBleHBlY3RlZCxcbiAgICAgICAgbWVzc2FnZTogbXNnLFxuICAgICAgICBvcGVyYXRvcjogJ2RlZXBTdHJpY3RFcXVhbCcsXG4gICAgICAgIHN0YWNrU3RhcnRGbjogZm5cbiAgICAgIH0pO1xuICAgICAgZXJyLm9wZXJhdG9yID0gZm4ubmFtZTtcbiAgICAgIHRocm93IGVycjtcbiAgICB9XG4gICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhleHBlY3RlZCk7XG4gICAgLy8gU3BlY2lhbCBoYW5kbGUgZXJyb3JzIHRvIG1ha2Ugc3VyZSB0aGUgbmFtZSBhbmQgdGhlIG1lc3NhZ2UgYXJlIGNvbXBhcmVkXG4gICAgLy8gYXMgd2VsbC5cbiAgICBpZiAoZXhwZWN0ZWQgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAga2V5cy5wdXNoKCduYW1lJywgJ21lc3NhZ2UnKTtcbiAgICB9IGVsc2UgaWYgKGtleXMubGVuZ3RoID09PSAwKSB7XG4gICAgICB0aHJvdyBuZXcgRVJSX0lOVkFMSURfQVJHX1ZBTFVFKCdlcnJvcicsIGV4cGVjdGVkLCAnbWF5IG5vdCBiZSBhbiBlbXB0eSBvYmplY3QnKTtcbiAgICB9XG4gICAgaWYgKGlzRGVlcEVxdWFsID09PSB1bmRlZmluZWQpIGxhenlMb2FkQ29tcGFyaXNvbigpO1xuICAgIGtleXMuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICBpZiAodHlwZW9mIGFjdHVhbFtrZXldID09PSAnc3RyaW5nJyAmJiBpc1JlZ0V4cChleHBlY3RlZFtrZXldKSAmJiBSZWdFeHBQcm90b3R5cGVUZXN0KGV4cGVjdGVkW2tleV0sIGFjdHVhbFtrZXldKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjb21wYXJlRXhjZXB0aW9uS2V5KGFjdHVhbCwgZXhwZWN0ZWQsIGtleSwgbXNnLCBrZXlzLCBmbik7XG4gICAgfSk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgLy8gR3VhcmQgaW5zdGFuY2VvZiBhZ2FpbnN0IGFycm93IGZ1bmN0aW9ucyBhcyB0aGV5IGRvbid0IGhhdmUgYSBwcm90b3R5cGUuXG4gIGlmIChleHBlY3RlZC5wcm90b3R5cGUgIT09IHVuZGVmaW5lZCAmJiBhY3R1YWwgaW5zdGFuY2VvZiBleHBlY3RlZCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIGlmIChFcnJvci5pc1Byb3RvdHlwZU9mKGV4cGVjdGVkKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4gZXhwZWN0ZWQuY2FsbCh7fSwgYWN0dWFsKSA9PT0gdHJ1ZTtcbn1cbmZ1bmN0aW9uIGdldEFjdHVhbChmbikge1xuICBpZiAodHlwZW9mIGZuICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IEVSUl9JTlZBTElEX0FSR19UWVBFKCdmbicsICdGdW5jdGlvbicsIGZuKTtcbiAgfVxuICB0cnkge1xuICAgIGZuKCk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gZTtcbiAgfVxuICByZXR1cm4gTk9fRVhDRVBUSU9OX1NFTlRJTkVMO1xufVxuZnVuY3Rpb24gY2hlY2tJc1Byb21pc2Uob2JqKSB7XG4gIC8vIEFjY2VwdCBuYXRpdmUgRVM2IHByb21pc2VzIGFuZCBwcm9taXNlcyB0aGF0IGFyZSBpbXBsZW1lbnRlZCBpbiBhIHNpbWlsYXJcbiAgLy8gd2F5LiBEbyBub3QgYWNjZXB0IHRoZW5hYmxlcyB0aGF0IHVzZSBhIGZ1bmN0aW9uIGFzIGBvYmpgIGFuZCB0aGF0IGhhdmUgbm9cbiAgLy8gYGNhdGNoYCBoYW5kbGVyLlxuXG4gIC8vIFRPRE86IHRoZW5hYmxlcyBhcmUgY2hlY2tlZCB1cCB1bnRpbCB0aGV5IGhhdmUgdGhlIGNvcnJlY3QgbWV0aG9kcyxcbiAgLy8gYnV0IGFjY29yZGluZyB0byBkb2N1bWVudGF0aW9uLCB0aGUgYHRoZW5gIG1ldGhvZCBzaG91bGQgcmVjZWl2ZVxuICAvLyB0aGUgYGZ1bGZpbGxgIGFuZCBgcmVqZWN0YCBhcmd1bWVudHMgYXMgd2VsbCBvciBpdCBtYXkgYmUgbmV2ZXIgcmVzb2x2ZWQuXG5cbiAgcmV0dXJuIGlzUHJvbWlzZShvYmopIHx8IG9iaiAhPT0gbnVsbCAmJiBfdHlwZW9mKG9iaikgPT09ICdvYmplY3QnICYmIHR5cGVvZiBvYmoudGhlbiA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2Ygb2JqLmNhdGNoID09PSAnZnVuY3Rpb24nO1xufVxuZnVuY3Rpb24gd2FpdEZvckFjdHVhbChwcm9taXNlRm4pIHtcbiAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgIHZhciByZXN1bHRQcm9taXNlO1xuICAgIGlmICh0eXBlb2YgcHJvbWlzZUZuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAvLyBSZXR1cm4gYSByZWplY3RlZCBwcm9taXNlIGlmIGBwcm9taXNlRm5gIHRocm93cyBzeW5jaHJvbm91c2x5LlxuICAgICAgcmVzdWx0UHJvbWlzZSA9IHByb21pc2VGbigpO1xuICAgICAgLy8gRmFpbCBpbiBjYXNlIG5vIHByb21pc2UgaXMgcmV0dXJuZWQuXG4gICAgICBpZiAoIWNoZWNrSXNQcm9taXNlKHJlc3VsdFByb21pc2UpKSB7XG4gICAgICAgIHRocm93IG5ldyBFUlJfSU5WQUxJRF9SRVRVUk5fVkFMVUUoJ2luc3RhbmNlIG9mIFByb21pc2UnLCAncHJvbWlzZUZuJywgcmVzdWx0UHJvbWlzZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChjaGVja0lzUHJvbWlzZShwcm9taXNlRm4pKSB7XG4gICAgICByZXN1bHRQcm9taXNlID0gcHJvbWlzZUZuO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRVJSX0lOVkFMSURfQVJHX1RZUEUoJ3Byb21pc2VGbicsIFsnRnVuY3Rpb24nLCAnUHJvbWlzZSddLCBwcm9taXNlRm4pO1xuICAgIH1cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gcmVzdWx0UHJvbWlzZTtcbiAgICB9KS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBOT19FWENFUFRJT05fU0VOVElORUw7XG4gICAgfSkuY2F0Y2goZnVuY3Rpb24gKGUpIHtcbiAgICAgIHJldHVybiBlO1xuICAgIH0pO1xuICB9KTtcbn1cbmZ1bmN0aW9uIGV4cGVjdHNFcnJvcihzdGFja1N0YXJ0Rm4sIGFjdHVhbCwgZXJyb3IsIG1lc3NhZ2UpIHtcbiAgaWYgKHR5cGVvZiBlcnJvciA9PT0gJ3N0cmluZycpIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gNCkge1xuICAgICAgdGhyb3cgbmV3IEVSUl9JTlZBTElEX0FSR19UWVBFKCdlcnJvcicsIFsnT2JqZWN0JywgJ0Vycm9yJywgJ0Z1bmN0aW9uJywgJ1JlZ0V4cCddLCBlcnJvcik7XG4gICAgfVxuICAgIGlmIChfdHlwZW9mKGFjdHVhbCkgPT09ICdvYmplY3QnICYmIGFjdHVhbCAhPT0gbnVsbCkge1xuICAgICAgaWYgKGFjdHVhbC5tZXNzYWdlID09PSBlcnJvcikge1xuICAgICAgICB0aHJvdyBuZXcgRVJSX0FNQklHVU9VU19BUkdVTUVOVCgnZXJyb3IvbWVzc2FnZScsIFwiVGhlIGVycm9yIG1lc3NhZ2UgXFxcIlwiLmNvbmNhdChhY3R1YWwubWVzc2FnZSwgXCJcXFwiIGlzIGlkZW50aWNhbCB0byB0aGUgbWVzc2FnZS5cIikpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoYWN0dWFsID09PSBlcnJvcikge1xuICAgICAgdGhyb3cgbmV3IEVSUl9BTUJJR1VPVVNfQVJHVU1FTlQoJ2Vycm9yL21lc3NhZ2UnLCBcIlRoZSBlcnJvciBcXFwiXCIuY29uY2F0KGFjdHVhbCwgXCJcXFwiIGlzIGlkZW50aWNhbCB0byB0aGUgbWVzc2FnZS5cIikpO1xuICAgIH1cbiAgICBtZXNzYWdlID0gZXJyb3I7XG4gICAgZXJyb3IgPSB1bmRlZmluZWQ7XG4gIH0gZWxzZSBpZiAoZXJyb3IgIT0gbnVsbCAmJiBfdHlwZW9mKGVycm9yKSAhPT0gJ29iamVjdCcgJiYgdHlwZW9mIGVycm9yICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IEVSUl9JTlZBTElEX0FSR19UWVBFKCdlcnJvcicsIFsnT2JqZWN0JywgJ0Vycm9yJywgJ0Z1bmN0aW9uJywgJ1JlZ0V4cCddLCBlcnJvcik7XG4gIH1cbiAgaWYgKGFjdHVhbCA9PT0gTk9fRVhDRVBUSU9OX1NFTlRJTkVMKSB7XG4gICAgdmFyIGRldGFpbHMgPSAnJztcbiAgICBpZiAoZXJyb3IgJiYgZXJyb3IubmFtZSkge1xuICAgICAgZGV0YWlscyArPSBcIiAoXCIuY29uY2F0KGVycm9yLm5hbWUsIFwiKVwiKTtcbiAgICB9XG4gICAgZGV0YWlscyArPSBtZXNzYWdlID8gXCI6IFwiLmNvbmNhdChtZXNzYWdlKSA6ICcuJztcbiAgICB2YXIgZm5UeXBlID0gc3RhY2tTdGFydEZuLm5hbWUgPT09ICdyZWplY3RzJyA/ICdyZWplY3Rpb24nIDogJ2V4Y2VwdGlvbic7XG4gICAgaW5uZXJGYWlsKHtcbiAgICAgIGFjdHVhbDogdW5kZWZpbmVkLFxuICAgICAgZXhwZWN0ZWQ6IGVycm9yLFxuICAgICAgb3BlcmF0b3I6IHN0YWNrU3RhcnRGbi5uYW1lLFxuICAgICAgbWVzc2FnZTogXCJNaXNzaW5nIGV4cGVjdGVkIFwiLmNvbmNhdChmblR5cGUpLmNvbmNhdChkZXRhaWxzKSxcbiAgICAgIHN0YWNrU3RhcnRGbjogc3RhY2tTdGFydEZuXG4gICAgfSk7XG4gIH1cbiAgaWYgKGVycm9yICYmICFleHBlY3RlZEV4Y2VwdGlvbihhY3R1YWwsIGVycm9yLCBtZXNzYWdlLCBzdGFja1N0YXJ0Rm4pKSB7XG4gICAgdGhyb3cgYWN0dWFsO1xuICB9XG59XG5mdW5jdGlvbiBleHBlY3RzTm9FcnJvcihzdGFja1N0YXJ0Rm4sIGFjdHVhbCwgZXJyb3IsIG1lc3NhZ2UpIHtcbiAgaWYgKGFjdHVhbCA9PT0gTk9fRVhDRVBUSU9OX1NFTlRJTkVMKSByZXR1cm47XG4gIGlmICh0eXBlb2YgZXJyb3IgPT09ICdzdHJpbmcnKSB7XG4gICAgbWVzc2FnZSA9IGVycm9yO1xuICAgIGVycm9yID0gdW5kZWZpbmVkO1xuICB9XG4gIGlmICghZXJyb3IgfHwgZXhwZWN0ZWRFeGNlcHRpb24oYWN0dWFsLCBlcnJvcikpIHtcbiAgICB2YXIgZGV0YWlscyA9IG1lc3NhZ2UgPyBcIjogXCIuY29uY2F0KG1lc3NhZ2UpIDogJy4nO1xuICAgIHZhciBmblR5cGUgPSBzdGFja1N0YXJ0Rm4ubmFtZSA9PT0gJ2RvZXNOb3RSZWplY3QnID8gJ3JlamVjdGlvbicgOiAnZXhjZXB0aW9uJztcbiAgICBpbm5lckZhaWwoe1xuICAgICAgYWN0dWFsOiBhY3R1YWwsXG4gICAgICBleHBlY3RlZDogZXJyb3IsXG4gICAgICBvcGVyYXRvcjogc3RhY2tTdGFydEZuLm5hbWUsXG4gICAgICBtZXNzYWdlOiBcIkdvdCB1bndhbnRlZCBcIi5jb25jYXQoZm5UeXBlKS5jb25jYXQoZGV0YWlscywgXCJcXG5cIikgKyBcIkFjdHVhbCBtZXNzYWdlOiBcXFwiXCIuY29uY2F0KGFjdHVhbCAmJiBhY3R1YWwubWVzc2FnZSwgXCJcXFwiXCIpLFxuICAgICAgc3RhY2tTdGFydEZuOiBzdGFja1N0YXJ0Rm5cbiAgICB9KTtcbiAgfVxuICB0aHJvdyBhY3R1YWw7XG59XG5hc3NlcnQudGhyb3dzID0gZnVuY3Rpb24gdGhyb3dzKHByb21pc2VGbikge1xuICBmb3IgKHZhciBfbGVuMiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbjIgPiAxID8gX2xlbjIgLSAxIDogMCksIF9rZXkyID0gMTsgX2tleTIgPCBfbGVuMjsgX2tleTIrKykge1xuICAgIGFyZ3NbX2tleTIgLSAxXSA9IGFyZ3VtZW50c1tfa2V5Ml07XG4gIH1cbiAgZXhwZWN0c0Vycm9yLmFwcGx5KHZvaWQgMCwgW3Rocm93cywgZ2V0QWN0dWFsKHByb21pc2VGbildLmNvbmNhdChhcmdzKSk7XG59O1xuYXNzZXJ0LnJlamVjdHMgPSBmdW5jdGlvbiByZWplY3RzKHByb21pc2VGbikge1xuICBmb3IgKHZhciBfbGVuMyA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbjMgPiAxID8gX2xlbjMgLSAxIDogMCksIF9rZXkzID0gMTsgX2tleTMgPCBfbGVuMzsgX2tleTMrKykge1xuICAgIGFyZ3NbX2tleTMgLSAxXSA9IGFyZ3VtZW50c1tfa2V5M107XG4gIH1cbiAgcmV0dXJuIHdhaXRGb3JBY3R1YWwocHJvbWlzZUZuKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICByZXR1cm4gZXhwZWN0c0Vycm9yLmFwcGx5KHZvaWQgMCwgW3JlamVjdHMsIHJlc3VsdF0uY29uY2F0KGFyZ3MpKTtcbiAgfSk7XG59O1xuYXNzZXJ0LmRvZXNOb3RUaHJvdyA9IGZ1bmN0aW9uIGRvZXNOb3RUaHJvdyhmbikge1xuICBmb3IgKHZhciBfbGVuNCA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbjQgPiAxID8gX2xlbjQgLSAxIDogMCksIF9rZXk0ID0gMTsgX2tleTQgPCBfbGVuNDsgX2tleTQrKykge1xuICAgIGFyZ3NbX2tleTQgLSAxXSA9IGFyZ3VtZW50c1tfa2V5NF07XG4gIH1cbiAgZXhwZWN0c05vRXJyb3IuYXBwbHkodm9pZCAwLCBbZG9lc05vdFRocm93LCBnZXRBY3R1YWwoZm4pXS5jb25jYXQoYXJncykpO1xufTtcbmFzc2VydC5kb2VzTm90UmVqZWN0ID0gZnVuY3Rpb24gZG9lc05vdFJlamVjdChmbikge1xuICBmb3IgKHZhciBfbGVuNSA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbjUgPiAxID8gX2xlbjUgLSAxIDogMCksIF9rZXk1ID0gMTsgX2tleTUgPCBfbGVuNTsgX2tleTUrKykge1xuICAgIGFyZ3NbX2tleTUgLSAxXSA9IGFyZ3VtZW50c1tfa2V5NV07XG4gIH1cbiAgcmV0dXJuIHdhaXRGb3JBY3R1YWwoZm4pLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgIHJldHVybiBleHBlY3RzTm9FcnJvci5hcHBseSh2b2lkIDAsIFtkb2VzTm90UmVqZWN0LCByZXN1bHRdLmNvbmNhdChhcmdzKSk7XG4gIH0pO1xufTtcbmFzc2VydC5pZkVycm9yID0gZnVuY3Rpb24gaWZFcnJvcihlcnIpIHtcbiAgaWYgKGVyciAhPT0gbnVsbCAmJiBlcnIgIT09IHVuZGVmaW5lZCkge1xuICAgIHZhciBtZXNzYWdlID0gJ2lmRXJyb3IgZ290IHVud2FudGVkIGV4Y2VwdGlvbjogJztcbiAgICBpZiAoX3R5cGVvZihlcnIpID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgZXJyLm1lc3NhZ2UgPT09ICdzdHJpbmcnKSB7XG4gICAgICBpZiAoZXJyLm1lc3NhZ2UubGVuZ3RoID09PSAwICYmIGVyci5jb25zdHJ1Y3Rvcikge1xuICAgICAgICBtZXNzYWdlICs9IGVyci5jb25zdHJ1Y3Rvci5uYW1lO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbWVzc2FnZSArPSBlcnIubWVzc2FnZTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgbWVzc2FnZSArPSBpbnNwZWN0KGVycik7XG4gICAgfVxuICAgIHZhciBuZXdFcnIgPSBuZXcgQXNzZXJ0aW9uRXJyb3Ioe1xuICAgICAgYWN0dWFsOiBlcnIsXG4gICAgICBleHBlY3RlZDogbnVsbCxcbiAgICAgIG9wZXJhdG9yOiAnaWZFcnJvcicsXG4gICAgICBtZXNzYWdlOiBtZXNzYWdlLFxuICAgICAgc3RhY2tTdGFydEZuOiBpZkVycm9yXG4gICAgfSk7XG5cbiAgICAvLyBNYWtlIHN1cmUgd2UgYWN0dWFsbHkgaGF2ZSBhIHN0YWNrIHRyYWNlIVxuICAgIHZhciBvcmlnU3RhY2sgPSBlcnIuc3RhY2s7XG4gICAgaWYgKHR5cGVvZiBvcmlnU3RhY2sgPT09ICdzdHJpbmcnKSB7XG4gICAgICAvLyBUaGlzIHdpbGwgcmVtb3ZlIGFueSBkdXBsaWNhdGVkIGZyYW1lcyBmcm9tIHRoZSBlcnJvciBmcmFtZXMgdGFrZW5cbiAgICAgIC8vIGZyb20gd2l0aGluIGBpZkVycm9yYCBhbmQgYWRkIHRoZSBvcmlnaW5hbCBlcnJvciBmcmFtZXMgdG8gdGhlIG5ld2x5XG4gICAgICAvLyBjcmVhdGVkIG9uZXMuXG4gICAgICB2YXIgdG1wMiA9IG9yaWdTdGFjay5zcGxpdCgnXFxuJyk7XG4gICAgICB0bXAyLnNoaWZ0KCk7XG4gICAgICAvLyBGaWx0ZXIgYWxsIGZyYW1lcyBleGlzdGluZyBpbiBlcnIuc3RhY2suXG4gICAgICB2YXIgdG1wMSA9IG5ld0Vyci5zdGFjay5zcGxpdCgnXFxuJyk7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRtcDIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgLy8gRmluZCB0aGUgZmlyc3Qgb2NjdXJyZW5jZSBvZiB0aGUgZnJhbWUuXG4gICAgICAgIHZhciBwb3MgPSB0bXAxLmluZGV4T2YodG1wMltpXSk7XG4gICAgICAgIGlmIChwb3MgIT09IC0xKSB7XG4gICAgICAgICAgLy8gT25seSBrZWVwIG5ldyBmcmFtZXMuXG4gICAgICAgICAgdG1wMSA9IHRtcDEuc2xpY2UoMCwgcG9zKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbmV3RXJyLnN0YWNrID0gXCJcIi5jb25jYXQodG1wMS5qb2luKCdcXG4nKSwgXCJcXG5cIikuY29uY2F0KHRtcDIuam9pbignXFxuJykpO1xuICAgIH1cbiAgICB0aHJvdyBuZXdFcnI7XG4gIH1cbn07XG5cbi8vIEN1cnJlbnRseSBpbiBzeW5jIHdpdGggTm9kZS5qcyBsaWIvYXNzZXJ0LmpzXG4vLyBodHRwczovL2dpdGh1Yi5jb20vbm9kZWpzL25vZGUvY29tbWl0LzJhODcxZGYzZGZiOGVhNjYzZWY1ZTFmOGY2MjcwMWVjNTEzODRlY2JcbmZ1bmN0aW9uIGludGVybmFsTWF0Y2goc3RyaW5nLCByZWdleHAsIG1lc3NhZ2UsIGZuLCBmbk5hbWUpIHtcbiAgaWYgKCFpc1JlZ0V4cChyZWdleHApKSB7XG4gICAgdGhyb3cgbmV3IEVSUl9JTlZBTElEX0FSR19UWVBFKCdyZWdleHAnLCAnUmVnRXhwJywgcmVnZXhwKTtcbiAgfVxuICB2YXIgbWF0Y2ggPSBmbk5hbWUgPT09ICdtYXRjaCc7XG4gIGlmICh0eXBlb2Ygc3RyaW5nICE9PSAnc3RyaW5nJyB8fCBSZWdFeHBQcm90b3R5cGVUZXN0KHJlZ2V4cCwgc3RyaW5nKSAhPT0gbWF0Y2gpIHtcbiAgICBpZiAobWVzc2FnZSBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICB0aHJvdyBtZXNzYWdlO1xuICAgIH1cbiAgICB2YXIgZ2VuZXJhdGVkTWVzc2FnZSA9ICFtZXNzYWdlO1xuXG4gICAgLy8gJ1RoZSBpbnB1dCB3YXMgZXhwZWN0ZWQgdG8gbm90IG1hdGNoIHRoZSByZWd1bGFyIGV4cHJlc3Npb24gJyArXG4gICAgbWVzc2FnZSA9IG1lc3NhZ2UgfHwgKHR5cGVvZiBzdHJpbmcgIT09ICdzdHJpbmcnID8gJ1RoZSBcInN0cmluZ1wiIGFyZ3VtZW50IG11c3QgYmUgb2YgdHlwZSBzdHJpbmcuIFJlY2VpdmVkIHR5cGUgJyArIFwiXCIuY29uY2F0KF90eXBlb2Yoc3RyaW5nKSwgXCIgKFwiKS5jb25jYXQoaW5zcGVjdChzdHJpbmcpLCBcIilcIikgOiAobWF0Y2ggPyAnVGhlIGlucHV0IGRpZCBub3QgbWF0Y2ggdGhlIHJlZ3VsYXIgZXhwcmVzc2lvbiAnIDogJ1RoZSBpbnB1dCB3YXMgZXhwZWN0ZWQgdG8gbm90IG1hdGNoIHRoZSByZWd1bGFyIGV4cHJlc3Npb24gJykgKyBcIlwiLmNvbmNhdChpbnNwZWN0KHJlZ2V4cCksIFwiLiBJbnB1dDpcXG5cXG5cIikuY29uY2F0KGluc3BlY3Qoc3RyaW5nKSwgXCJcXG5cIikpO1xuICAgIHZhciBlcnIgPSBuZXcgQXNzZXJ0aW9uRXJyb3Ioe1xuICAgICAgYWN0dWFsOiBzdHJpbmcsXG4gICAgICBleHBlY3RlZDogcmVnZXhwLFxuICAgICAgbWVzc2FnZTogbWVzc2FnZSxcbiAgICAgIG9wZXJhdG9yOiBmbk5hbWUsXG4gICAgICBzdGFja1N0YXJ0Rm46IGZuXG4gICAgfSk7XG4gICAgZXJyLmdlbmVyYXRlZE1lc3NhZ2UgPSBnZW5lcmF0ZWRNZXNzYWdlO1xuICAgIHRocm93IGVycjtcbiAgfVxufVxuYXNzZXJ0Lm1hdGNoID0gZnVuY3Rpb24gbWF0Y2goc3RyaW5nLCByZWdleHAsIG1lc3NhZ2UpIHtcbiAgaW50ZXJuYWxNYXRjaChzdHJpbmcsIHJlZ2V4cCwgbWVzc2FnZSwgbWF0Y2gsICdtYXRjaCcpO1xufTtcbmFzc2VydC5kb2VzTm90TWF0Y2ggPSBmdW5jdGlvbiBkb2VzTm90TWF0Y2goc3RyaW5nLCByZWdleHAsIG1lc3NhZ2UpIHtcbiAgaW50ZXJuYWxNYXRjaChzdHJpbmcsIHJlZ2V4cCwgbWVzc2FnZSwgZG9lc05vdE1hdGNoLCAnZG9lc05vdE1hdGNoJyk7XG59O1xuXG4vLyBFeHBvc2UgYSBzdHJpY3Qgb25seSB2YXJpYW50IG9mIGFzc2VydFxuZnVuY3Rpb24gc3RyaWN0KCkge1xuICBmb3IgKHZhciBfbGVuNiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbjYpLCBfa2V5NiA9IDA7IF9rZXk2IDwgX2xlbjY7IF9rZXk2KyspIHtcbiAgICBhcmdzW19rZXk2XSA9IGFyZ3VtZW50c1tfa2V5Nl07XG4gIH1cbiAgaW5uZXJPay5hcHBseSh2b2lkIDAsIFtzdHJpY3QsIGFyZ3MubGVuZ3RoXS5jb25jYXQoYXJncykpO1xufVxuYXNzZXJ0LnN0cmljdCA9IG9iamVjdEFzc2lnbihzdHJpY3QsIGFzc2VydCwge1xuICBlcXVhbDogYXNzZXJ0LnN0cmljdEVxdWFsLFxuICBkZWVwRXF1YWw6IGFzc2VydC5kZWVwU3RyaWN0RXF1YWwsXG4gIG5vdEVxdWFsOiBhc3NlcnQubm90U3RyaWN0RXF1YWwsXG4gIG5vdERlZXBFcXVhbDogYXNzZXJ0Lm5vdERlZXBTdHJpY3RFcXVhbFxufSk7XG5hc3NlcnQuc3RyaWN0LnN0cmljdCA9IGFzc2VydC5zdHJpY3Q7IiwiLy8gQ3VycmVudGx5IGluIHN5bmMgd2l0aCBOb2RlLmpzIGxpYi9pbnRlcm5hbC9hc3NlcnQvYXNzZXJ0aW9uX2Vycm9yLmpzXG4vLyBodHRwczovL2dpdGh1Yi5jb20vbm9kZWpzL25vZGUvY29tbWl0LzA4MTc4NDBmNzc1MDMyMTY5ZGRkNzBjODVhYzA1OWYxOGZmY2M4MWNcblxuJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBvd25LZXlzKGUsIHIpIHsgdmFyIHQgPSBPYmplY3Qua2V5cyhlKTsgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHsgdmFyIG8gPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKGUpOyByICYmIChvID0gby5maWx0ZXIoZnVuY3Rpb24gKHIpIHsgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoZSwgcikuZW51bWVyYWJsZTsgfSkpLCB0LnB1c2guYXBwbHkodCwgbyk7IH0gcmV0dXJuIHQ7IH1cbmZ1bmN0aW9uIF9vYmplY3RTcHJlYWQoZSkgeyBmb3IgKHZhciByID0gMTsgciA8IGFyZ3VtZW50cy5sZW5ndGg7IHIrKykgeyB2YXIgdCA9IG51bGwgIT0gYXJndW1lbnRzW3JdID8gYXJndW1lbnRzW3JdIDoge307IHIgJSAyID8gb3duS2V5cyhPYmplY3QodCksICEwKS5mb3JFYWNoKGZ1bmN0aW9uIChyKSB7IF9kZWZpbmVQcm9wZXJ0eShlLCByLCB0W3JdKTsgfSkgOiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyA/IE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKGUsIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKHQpKSA6IG93bktleXMoT2JqZWN0KHQpKS5mb3JFYWNoKGZ1bmN0aW9uIChyKSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlLCByLCBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHQsIHIpKTsgfSk7IH0gcmV0dXJuIGU7IH1cbmZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgdmFsdWUpIHsga2V5ID0gX3RvUHJvcGVydHlLZXkoa2V5KTsgaWYgKGtleSBpbiBvYmopIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7IHZhbHVlOiB2YWx1ZSwgZW51bWVyYWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlLCB3cml0YWJsZTogdHJ1ZSB9KTsgfSBlbHNlIHsgb2JqW2tleV0gPSB2YWx1ZTsgfSByZXR1cm4gb2JqOyB9XG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuZnVuY3Rpb24gX2RlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBfdG9Qcm9wZXJ0eUtleShkZXNjcmlwdG9yLmtleSksIGRlc2NyaXB0b3IpOyB9IH1cbmZ1bmN0aW9uIF9jcmVhdGVDbGFzcyhDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KENvbnN0cnVjdG9yLCBcInByb3RvdHlwZVwiLCB7IHdyaXRhYmxlOiBmYWxzZSB9KTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9XG5mdW5jdGlvbiBfdG9Qcm9wZXJ0eUtleShhcmcpIHsgdmFyIGtleSA9IF90b1ByaW1pdGl2ZShhcmcsIFwic3RyaW5nXCIpOyByZXR1cm4gX3R5cGVvZihrZXkpID09PSBcInN5bWJvbFwiID8ga2V5IDogU3RyaW5nKGtleSk7IH1cbmZ1bmN0aW9uIF90b1ByaW1pdGl2ZShpbnB1dCwgaGludCkgeyBpZiAoX3R5cGVvZihpbnB1dCkgIT09IFwib2JqZWN0XCIgfHwgaW5wdXQgPT09IG51bGwpIHJldHVybiBpbnB1dDsgdmFyIHByaW0gPSBpbnB1dFtTeW1ib2wudG9QcmltaXRpdmVdOyBpZiAocHJpbSAhPT0gdW5kZWZpbmVkKSB7IHZhciByZXMgPSBwcmltLmNhbGwoaW5wdXQsIGhpbnQgfHwgXCJkZWZhdWx0XCIpOyBpZiAoX3R5cGVvZihyZXMpICE9PSBcIm9iamVjdFwiKSByZXR1cm4gcmVzOyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQEB0b1ByaW1pdGl2ZSBtdXN0IHJldHVybiBhIHByaW1pdGl2ZSB2YWx1ZS5cIik7IH0gcmV0dXJuIChoaW50ID09PSBcInN0cmluZ1wiID8gU3RyaW5nIDogTnVtYmVyKShpbnB1dCk7IH1cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvblwiKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShzdWJDbGFzcywgXCJwcm90b3R5cGVcIiwgeyB3cml0YWJsZTogZmFsc2UgfSk7IGlmIChzdXBlckNsYXNzKSBfc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpOyB9XG5mdW5jdGlvbiBfY3JlYXRlU3VwZXIoRGVyaXZlZCkgeyB2YXIgaGFzTmF0aXZlUmVmbGVjdENvbnN0cnVjdCA9IF9pc05hdGl2ZVJlZmxlY3RDb25zdHJ1Y3QoKTsgcmV0dXJuIGZ1bmN0aW9uIF9jcmVhdGVTdXBlckludGVybmFsKCkgeyB2YXIgU3VwZXIgPSBfZ2V0UHJvdG90eXBlT2YoRGVyaXZlZCksIHJlc3VsdDsgaWYgKGhhc05hdGl2ZVJlZmxlY3RDb25zdHJ1Y3QpIHsgdmFyIE5ld1RhcmdldCA9IF9nZXRQcm90b3R5cGVPZih0aGlzKS5jb25zdHJ1Y3RvcjsgcmVzdWx0ID0gUmVmbGVjdC5jb25zdHJ1Y3QoU3VwZXIsIGFyZ3VtZW50cywgTmV3VGFyZ2V0KTsgfSBlbHNlIHsgcmVzdWx0ID0gU3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTsgfSByZXR1cm4gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgcmVzdWx0KTsgfTsgfVxuZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkgeyBpZiAoY2FsbCAmJiAoX3R5cGVvZihjYWxsKSA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSkgeyByZXR1cm4gY2FsbDsgfSBlbHNlIGlmIChjYWxsICE9PSB2b2lkIDApIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkRlcml2ZWQgY29uc3RydWN0b3JzIG1heSBvbmx5IHJldHVybiBvYmplY3Qgb3IgdW5kZWZpbmVkXCIpOyB9IHJldHVybiBfYXNzZXJ0VGhpc0luaXRpYWxpemVkKHNlbGYpOyB9XG5mdW5jdGlvbiBfYXNzZXJ0VGhpc0luaXRpYWxpemVkKHNlbGYpIHsgaWYgKHNlbGYgPT09IHZvaWQgMCkgeyB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7IH0gcmV0dXJuIHNlbGY7IH1cbmZ1bmN0aW9uIF93cmFwTmF0aXZlU3VwZXIoQ2xhc3MpIHsgdmFyIF9jYWNoZSA9IHR5cGVvZiBNYXAgPT09IFwiZnVuY3Rpb25cIiA/IG5ldyBNYXAoKSA6IHVuZGVmaW5lZDsgX3dyYXBOYXRpdmVTdXBlciA9IGZ1bmN0aW9uIF93cmFwTmF0aXZlU3VwZXIoQ2xhc3MpIHsgaWYgKENsYXNzID09PSBudWxsIHx8ICFfaXNOYXRpdmVGdW5jdGlvbihDbGFzcykpIHJldHVybiBDbGFzczsgaWYgKHR5cGVvZiBDbGFzcyAhPT0gXCJmdW5jdGlvblwiKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvblwiKTsgfSBpZiAodHlwZW9mIF9jYWNoZSAhPT0gXCJ1bmRlZmluZWRcIikgeyBpZiAoX2NhY2hlLmhhcyhDbGFzcykpIHJldHVybiBfY2FjaGUuZ2V0KENsYXNzKTsgX2NhY2hlLnNldChDbGFzcywgV3JhcHBlcik7IH0gZnVuY3Rpb24gV3JhcHBlcigpIHsgcmV0dXJuIF9jb25zdHJ1Y3QoQ2xhc3MsIGFyZ3VtZW50cywgX2dldFByb3RvdHlwZU9mKHRoaXMpLmNvbnN0cnVjdG9yKTsgfSBXcmFwcGVyLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBXcmFwcGVyLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyByZXR1cm4gX3NldFByb3RvdHlwZU9mKFdyYXBwZXIsIENsYXNzKTsgfTsgcmV0dXJuIF93cmFwTmF0aXZlU3VwZXIoQ2xhc3MpOyB9XG5mdW5jdGlvbiBfY29uc3RydWN0KFBhcmVudCwgYXJncywgQ2xhc3MpIHsgaWYgKF9pc05hdGl2ZVJlZmxlY3RDb25zdHJ1Y3QoKSkgeyBfY29uc3RydWN0ID0gUmVmbGVjdC5jb25zdHJ1Y3QuYmluZCgpOyB9IGVsc2UgeyBfY29uc3RydWN0ID0gZnVuY3Rpb24gX2NvbnN0cnVjdChQYXJlbnQsIGFyZ3MsIENsYXNzKSB7IHZhciBhID0gW251bGxdOyBhLnB1c2guYXBwbHkoYSwgYXJncyk7IHZhciBDb25zdHJ1Y3RvciA9IEZ1bmN0aW9uLmJpbmQuYXBwbHkoUGFyZW50LCBhKTsgdmFyIGluc3RhbmNlID0gbmV3IENvbnN0cnVjdG9yKCk7IGlmIChDbGFzcykgX3NldFByb3RvdHlwZU9mKGluc3RhbmNlLCBDbGFzcy5wcm90b3R5cGUpOyByZXR1cm4gaW5zdGFuY2U7IH07IH0gcmV0dXJuIF9jb25zdHJ1Y3QuYXBwbHkobnVsbCwgYXJndW1lbnRzKTsgfVxuZnVuY3Rpb24gX2lzTmF0aXZlUmVmbGVjdENvbnN0cnVjdCgpIHsgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcInVuZGVmaW5lZFwiIHx8ICFSZWZsZWN0LmNvbnN0cnVjdCkgcmV0dXJuIGZhbHNlOyBpZiAoUmVmbGVjdC5jb25zdHJ1Y3Quc2hhbSkgcmV0dXJuIGZhbHNlOyBpZiAodHlwZW9mIFByb3h5ID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiB0cnVlOyB0cnkgeyBCb29sZWFuLnByb3RvdHlwZS52YWx1ZU9mLmNhbGwoUmVmbGVjdC5jb25zdHJ1Y3QoQm9vbGVhbiwgW10sIGZ1bmN0aW9uICgpIHt9KSk7IHJldHVybiB0cnVlOyB9IGNhdGNoIChlKSB7IHJldHVybiBmYWxzZTsgfSB9XG5mdW5jdGlvbiBfaXNOYXRpdmVGdW5jdGlvbihmbikgeyByZXR1cm4gRnVuY3Rpb24udG9TdHJpbmcuY2FsbChmbikuaW5kZXhPZihcIltuYXRpdmUgY29kZV1cIikgIT09IC0xOyB9XG5mdW5jdGlvbiBfc2V0UHJvdG90eXBlT2YobywgcCkgeyBfc2V0UHJvdG90eXBlT2YgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2YuYmluZCgpIDogZnVuY3Rpb24gX3NldFByb3RvdHlwZU9mKG8sIHApIHsgby5fX3Byb3RvX18gPSBwOyByZXR1cm4gbzsgfTsgcmV0dXJuIF9zZXRQcm90b3R5cGVPZihvLCBwKTsgfVxuZnVuY3Rpb24gX2dldFByb3RvdHlwZU9mKG8pIHsgX2dldFByb3RvdHlwZU9mID0gT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LmdldFByb3RvdHlwZU9mLmJpbmQoKSA6IGZ1bmN0aW9uIF9nZXRQcm90b3R5cGVPZihvKSB7IHJldHVybiBvLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2Yobyk7IH07IHJldHVybiBfZ2V0UHJvdG90eXBlT2Yobyk7IH1cbmZ1bmN0aW9uIF90eXBlb2YobykgeyBcIkBiYWJlbC9oZWxwZXJzIC0gdHlwZW9mXCI7IHJldHVybiBfdHlwZW9mID0gXCJmdW5jdGlvblwiID09IHR5cGVvZiBTeW1ib2wgJiYgXCJzeW1ib2xcIiA9PSB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID8gZnVuY3Rpb24gKG8pIHsgcmV0dXJuIHR5cGVvZiBvOyB9IDogZnVuY3Rpb24gKG8pIHsgcmV0dXJuIG8gJiYgXCJmdW5jdGlvblwiID09IHR5cGVvZiBTeW1ib2wgJiYgby5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG8gIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG87IH0sIF90eXBlb2Yobyk7IH1cbnZhciBfcmVxdWlyZSA9IHJlcXVpcmUoJ3V0aWwvJyksXG4gIGluc3BlY3QgPSBfcmVxdWlyZS5pbnNwZWN0O1xudmFyIF9yZXF1aXJlMiA9IHJlcXVpcmUoJy4uL2Vycm9ycycpLFxuICBFUlJfSU5WQUxJRF9BUkdfVFlQRSA9IF9yZXF1aXJlMi5jb2Rlcy5FUlJfSU5WQUxJRF9BUkdfVFlQRTtcblxuLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvU3RyaW5nL2VuZHNXaXRoXG5mdW5jdGlvbiBlbmRzV2l0aChzdHIsIHNlYXJjaCwgdGhpc19sZW4pIHtcbiAgaWYgKHRoaXNfbGVuID09PSB1bmRlZmluZWQgfHwgdGhpc19sZW4gPiBzdHIubGVuZ3RoKSB7XG4gICAgdGhpc19sZW4gPSBzdHIubGVuZ3RoO1xuICB9XG4gIHJldHVybiBzdHIuc3Vic3RyaW5nKHRoaXNfbGVuIC0gc2VhcmNoLmxlbmd0aCwgdGhpc19sZW4pID09PSBzZWFyY2g7XG59XG5cbi8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL1N0cmluZy9yZXBlYXRcbmZ1bmN0aW9uIHJlcGVhdChzdHIsIGNvdW50KSB7XG4gIGNvdW50ID0gTWF0aC5mbG9vcihjb3VudCk7XG4gIGlmIChzdHIubGVuZ3RoID09IDAgfHwgY291bnQgPT0gMCkgcmV0dXJuICcnO1xuICB2YXIgbWF4Q291bnQgPSBzdHIubGVuZ3RoICogY291bnQ7XG4gIGNvdW50ID0gTWF0aC5mbG9vcihNYXRoLmxvZyhjb3VudCkgLyBNYXRoLmxvZygyKSk7XG4gIHdoaWxlIChjb3VudCkge1xuICAgIHN0ciArPSBzdHI7XG4gICAgY291bnQtLTtcbiAgfVxuICBzdHIgKz0gc3RyLnN1YnN0cmluZygwLCBtYXhDb3VudCAtIHN0ci5sZW5ndGgpO1xuICByZXR1cm4gc3RyO1xufVxudmFyIGJsdWUgPSAnJztcbnZhciBncmVlbiA9ICcnO1xudmFyIHJlZCA9ICcnO1xudmFyIHdoaXRlID0gJyc7XG52YXIga1JlYWRhYmxlT3BlcmF0b3IgPSB7XG4gIGRlZXBTdHJpY3RFcXVhbDogJ0V4cGVjdGVkIHZhbHVlcyB0byBiZSBzdHJpY3RseSBkZWVwLWVxdWFsOicsXG4gIHN0cmljdEVxdWFsOiAnRXhwZWN0ZWQgdmFsdWVzIHRvIGJlIHN0cmljdGx5IGVxdWFsOicsXG4gIHN0cmljdEVxdWFsT2JqZWN0OiAnRXhwZWN0ZWQgXCJhY3R1YWxcIiB0byBiZSByZWZlcmVuY2UtZXF1YWwgdG8gXCJleHBlY3RlZFwiOicsXG4gIGRlZXBFcXVhbDogJ0V4cGVjdGVkIHZhbHVlcyB0byBiZSBsb29zZWx5IGRlZXAtZXF1YWw6JyxcbiAgZXF1YWw6ICdFeHBlY3RlZCB2YWx1ZXMgdG8gYmUgbG9vc2VseSBlcXVhbDonLFxuICBub3REZWVwU3RyaWN0RXF1YWw6ICdFeHBlY3RlZCBcImFjdHVhbFwiIG5vdCB0byBiZSBzdHJpY3RseSBkZWVwLWVxdWFsIHRvOicsXG4gIG5vdFN0cmljdEVxdWFsOiAnRXhwZWN0ZWQgXCJhY3R1YWxcIiB0byBiZSBzdHJpY3RseSB1bmVxdWFsIHRvOicsXG4gIG5vdFN0cmljdEVxdWFsT2JqZWN0OiAnRXhwZWN0ZWQgXCJhY3R1YWxcIiBub3QgdG8gYmUgcmVmZXJlbmNlLWVxdWFsIHRvIFwiZXhwZWN0ZWRcIjonLFxuICBub3REZWVwRXF1YWw6ICdFeHBlY3RlZCBcImFjdHVhbFwiIG5vdCB0byBiZSBsb29zZWx5IGRlZXAtZXF1YWwgdG86JyxcbiAgbm90RXF1YWw6ICdFeHBlY3RlZCBcImFjdHVhbFwiIHRvIGJlIGxvb3NlbHkgdW5lcXVhbCB0bzonLFxuICBub3RJZGVudGljYWw6ICdWYWx1ZXMgaWRlbnRpY2FsIGJ1dCBub3QgcmVmZXJlbmNlLWVxdWFsOidcbn07XG5cbi8vIENvbXBhcmluZyBzaG9ydCBwcmltaXRpdmVzIHNob3VsZCBqdXN0IHNob3cgPT09IC8gIT09IGluc3RlYWQgb2YgdXNpbmcgdGhlXG4vLyBkaWZmLlxudmFyIGtNYXhTaG9ydExlbmd0aCA9IDEwO1xuZnVuY3Rpb24gY29weUVycm9yKHNvdXJjZSkge1xuICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKHNvdXJjZSk7XG4gIHZhciB0YXJnZXQgPSBPYmplY3QuY3JlYXRlKE9iamVjdC5nZXRQcm90b3R5cGVPZihzb3VyY2UpKTtcbiAga2V5cy5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldO1xuICB9KTtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgJ21lc3NhZ2UnLCB7XG4gICAgdmFsdWU6IHNvdXJjZS5tZXNzYWdlXG4gIH0pO1xuICByZXR1cm4gdGFyZ2V0O1xufVxuZnVuY3Rpb24gaW5zcGVjdFZhbHVlKHZhbCkge1xuICAvLyBUaGUgdXRpbC5pbnNwZWN0IGRlZmF1bHQgdmFsdWVzIGNvdWxkIGJlIGNoYW5nZWQuIFRoaXMgbWFrZXMgc3VyZSB0aGVcbiAgLy8gZXJyb3IgbWVzc2FnZXMgY29udGFpbiB0aGUgbmVjZXNzYXJ5IGluZm9ybWF0aW9uIG5ldmVydGhlbGVzcy5cbiAgcmV0dXJuIGluc3BlY3QodmFsLCB7XG4gICAgY29tcGFjdDogZmFsc2UsXG4gICAgY3VzdG9tSW5zcGVjdDogZmFsc2UsXG4gICAgZGVwdGg6IDEwMDAsXG4gICAgbWF4QXJyYXlMZW5ndGg6IEluZmluaXR5LFxuICAgIC8vIEFzc2VydCBjb21wYXJlcyBvbmx5IGVudW1lcmFibGUgcHJvcGVydGllcyAod2l0aCBhIGZldyBleGNlcHRpb25zKS5cbiAgICBzaG93SGlkZGVuOiBmYWxzZSxcbiAgICAvLyBIYXZpbmcgYSBsb25nIGxpbmUgYXMgZXJyb3IgaXMgYmV0dGVyIHRoYW4gd3JhcHBpbmcgdGhlIGxpbmUgZm9yXG4gICAgLy8gY29tcGFyaXNvbiBmb3Igbm93LlxuICAgIC8vIFRPRE8oQnJpZGdlQVIpOiBgYnJlYWtMZW5ndGhgIHNob3VsZCBiZSBsaW1pdGVkIGFzIHNvb24gYXMgc29vbiBhcyB3ZVxuICAgIC8vIGhhdmUgbWV0YSBpbmZvcm1hdGlvbiBhYm91dCB0aGUgaW5zcGVjdGVkIHByb3BlcnRpZXMgKGkuZS4sIGtub3cgd2hlcmVcbiAgICAvLyBpbiB3aGF0IGxpbmUgdGhlIHByb3BlcnR5IHN0YXJ0cyBhbmQgZW5kcykuXG4gICAgYnJlYWtMZW5ndGg6IEluZmluaXR5LFxuICAgIC8vIEFzc2VydCBkb2VzIG5vdCBkZXRlY3QgcHJveGllcyBjdXJyZW50bHkuXG4gICAgc2hvd1Byb3h5OiBmYWxzZSxcbiAgICBzb3J0ZWQ6IHRydWUsXG4gICAgLy8gSW5zcGVjdCBnZXR0ZXJzIGFzIHdlIGFsc28gY2hlY2sgdGhlbSB3aGVuIGNvbXBhcmluZyBlbnRyaWVzLlxuICAgIGdldHRlcnM6IHRydWVcbiAgfSk7XG59XG5mdW5jdGlvbiBjcmVhdGVFcnJEaWZmKGFjdHVhbCwgZXhwZWN0ZWQsIG9wZXJhdG9yKSB7XG4gIHZhciBvdGhlciA9ICcnO1xuICB2YXIgcmVzID0gJyc7XG4gIHZhciBsYXN0UG9zID0gMDtcbiAgdmFyIGVuZCA9ICcnO1xuICB2YXIgc2tpcHBlZCA9IGZhbHNlO1xuICB2YXIgYWN0dWFsSW5zcGVjdGVkID0gaW5zcGVjdFZhbHVlKGFjdHVhbCk7XG4gIHZhciBhY3R1YWxMaW5lcyA9IGFjdHVhbEluc3BlY3RlZC5zcGxpdCgnXFxuJyk7XG4gIHZhciBleHBlY3RlZExpbmVzID0gaW5zcGVjdFZhbHVlKGV4cGVjdGVkKS5zcGxpdCgnXFxuJyk7XG4gIHZhciBpID0gMDtcbiAgdmFyIGluZGljYXRvciA9ICcnO1xuXG4gIC8vIEluIGNhc2UgYm90aCB2YWx1ZXMgYXJlIG9iamVjdHMgZXhwbGljaXRseSBtYXJrIHRoZW0gYXMgbm90IHJlZmVyZW5jZSBlcXVhbFxuICAvLyBmb3IgdGhlIGBzdHJpY3RFcXVhbGAgb3BlcmF0b3IuXG4gIGlmIChvcGVyYXRvciA9PT0gJ3N0cmljdEVxdWFsJyAmJiBfdHlwZW9mKGFjdHVhbCkgPT09ICdvYmplY3QnICYmIF90eXBlb2YoZXhwZWN0ZWQpID09PSAnb2JqZWN0JyAmJiBhY3R1YWwgIT09IG51bGwgJiYgZXhwZWN0ZWQgIT09IG51bGwpIHtcbiAgICBvcGVyYXRvciA9ICdzdHJpY3RFcXVhbE9iamVjdCc7XG4gIH1cblxuICAvLyBJZiBcImFjdHVhbFwiIGFuZCBcImV4cGVjdGVkXCIgZml0IG9uIGEgc2luZ2xlIGxpbmUgYW5kIHRoZXkgYXJlIG5vdCBzdHJpY3RseVxuICAvLyBlcXVhbCwgY2hlY2sgZnVydGhlciBzcGVjaWFsIGhhbmRsaW5nLlxuICBpZiAoYWN0dWFsTGluZXMubGVuZ3RoID09PSAxICYmIGV4cGVjdGVkTGluZXMubGVuZ3RoID09PSAxICYmIGFjdHVhbExpbmVzWzBdICE9PSBleHBlY3RlZExpbmVzWzBdKSB7XG4gICAgdmFyIGlucHV0TGVuZ3RoID0gYWN0dWFsTGluZXNbMF0ubGVuZ3RoICsgZXhwZWN0ZWRMaW5lc1swXS5sZW5ndGg7XG4gICAgLy8gSWYgdGhlIGNoYXJhY3RlciBsZW5ndGggb2YgXCJhY3R1YWxcIiBhbmQgXCJleHBlY3RlZFwiIHRvZ2V0aGVyIGlzIGxlc3MgdGhhblxuICAgIC8vIGtNYXhTaG9ydExlbmd0aCBhbmQgaWYgbmVpdGhlciBpcyBhbiBvYmplY3QgYW5kIGF0IGxlYXN0IG9uZSBvZiB0aGVtIGlzXG4gICAgLy8gbm90IGB6ZXJvYCwgdXNlIHRoZSBzdHJpY3QgZXF1YWwgY29tcGFyaXNvbiB0byB2aXN1YWxpemUgdGhlIG91dHB1dC5cbiAgICBpZiAoaW5wdXRMZW5ndGggPD0ga01heFNob3J0TGVuZ3RoKSB7XG4gICAgICBpZiAoKF90eXBlb2YoYWN0dWFsKSAhPT0gJ29iamVjdCcgfHwgYWN0dWFsID09PSBudWxsKSAmJiAoX3R5cGVvZihleHBlY3RlZCkgIT09ICdvYmplY3QnIHx8IGV4cGVjdGVkID09PSBudWxsKSAmJiAoYWN0dWFsICE9PSAwIHx8IGV4cGVjdGVkICE9PSAwKSkge1xuICAgICAgICAvLyAtMCA9PT0gKzBcbiAgICAgICAgcmV0dXJuIFwiXCIuY29uY2F0KGtSZWFkYWJsZU9wZXJhdG9yW29wZXJhdG9yXSwgXCJcXG5cXG5cIikgKyBcIlwiLmNvbmNhdChhY3R1YWxMaW5lc1swXSwgXCIgIT09IFwiKS5jb25jYXQoZXhwZWN0ZWRMaW5lc1swXSwgXCJcXG5cIik7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChvcGVyYXRvciAhPT0gJ3N0cmljdEVxdWFsT2JqZWN0Jykge1xuICAgICAgLy8gSWYgdGhlIHN0ZGVyciBpcyBhIHR0eSBhbmQgdGhlIGlucHV0IGxlbmd0aCBpcyBsb3dlciB0aGFuIHRoZSBjdXJyZW50XG4gICAgICAvLyBjb2x1bW5zIHBlciBsaW5lLCBhZGQgYSBtaXNtYXRjaCBpbmRpY2F0b3IgYmVsb3cgdGhlIG91dHB1dC4gSWYgaXQgaXNcbiAgICAgIC8vIG5vdCBhIHR0eSwgdXNlIGEgZGVmYXVsdCB2YWx1ZSBvZiA4MCBjaGFyYWN0ZXJzLlxuICAgICAgdmFyIG1heExlbmd0aCA9IHByb2Nlc3Muc3RkZXJyICYmIHByb2Nlc3Muc3RkZXJyLmlzVFRZID8gcHJvY2Vzcy5zdGRlcnIuY29sdW1ucyA6IDgwO1xuICAgICAgaWYgKGlucHV0TGVuZ3RoIDwgbWF4TGVuZ3RoKSB7XG4gICAgICAgIHdoaWxlIChhY3R1YWxMaW5lc1swXVtpXSA9PT0gZXhwZWN0ZWRMaW5lc1swXVtpXSkge1xuICAgICAgICAgIGkrKztcbiAgICAgICAgfVxuICAgICAgICAvLyBJZ25vcmUgdGhlIGZpcnN0IGNoYXJhY3RlcnMuXG4gICAgICAgIGlmIChpID4gMikge1xuICAgICAgICAgIC8vIEFkZCBwb3NpdGlvbiBpbmRpY2F0b3IgZm9yIHRoZSBmaXJzdCBtaXNtYXRjaCBpbiBjYXNlIGl0IGlzIGFcbiAgICAgICAgICAvLyBzaW5nbGUgbGluZSBhbmQgdGhlIGlucHV0IGxlbmd0aCBpcyBsZXNzIHRoYW4gdGhlIGNvbHVtbiBsZW5ndGguXG4gICAgICAgICAgaW5kaWNhdG9yID0gXCJcXG4gIFwiLmNvbmNhdChyZXBlYXQoJyAnLCBpKSwgXCJeXCIpO1xuICAgICAgICAgIGkgPSAwO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gUmVtb3ZlIGFsbCBlbmRpbmcgbGluZXMgdGhhdCBtYXRjaCAodGhpcyBvcHRpbWl6ZXMgdGhlIG91dHB1dCBmb3JcbiAgLy8gcmVhZGFiaWxpdHkgYnkgcmVkdWNpbmcgdGhlIG51bWJlciBvZiB0b3RhbCBjaGFuZ2VkIGxpbmVzKS5cbiAgdmFyIGEgPSBhY3R1YWxMaW5lc1thY3R1YWxMaW5lcy5sZW5ndGggLSAxXTtcbiAgdmFyIGIgPSBleHBlY3RlZExpbmVzW2V4cGVjdGVkTGluZXMubGVuZ3RoIC0gMV07XG4gIHdoaWxlIChhID09PSBiKSB7XG4gICAgaWYgKGkrKyA8IDIpIHtcbiAgICAgIGVuZCA9IFwiXFxuICBcIi5jb25jYXQoYSkuY29uY2F0KGVuZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG90aGVyID0gYTtcbiAgICB9XG4gICAgYWN0dWFsTGluZXMucG9wKCk7XG4gICAgZXhwZWN0ZWRMaW5lcy5wb3AoKTtcbiAgICBpZiAoYWN0dWFsTGluZXMubGVuZ3RoID09PSAwIHx8IGV4cGVjdGVkTGluZXMubGVuZ3RoID09PSAwKSBicmVhaztcbiAgICBhID0gYWN0dWFsTGluZXNbYWN0dWFsTGluZXMubGVuZ3RoIC0gMV07XG4gICAgYiA9IGV4cGVjdGVkTGluZXNbZXhwZWN0ZWRMaW5lcy5sZW5ndGggLSAxXTtcbiAgfVxuICB2YXIgbWF4TGluZXMgPSBNYXRoLm1heChhY3R1YWxMaW5lcy5sZW5ndGgsIGV4cGVjdGVkTGluZXMubGVuZ3RoKTtcbiAgLy8gU3RyaWN0IGVxdWFsIHdpdGggaWRlbnRpY2FsIG9iamVjdHMgdGhhdCBhcmUgbm90IGlkZW50aWNhbCBieSByZWZlcmVuY2UuXG4gIC8vIEUuZy4sIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwoeyBhOiBTeW1ib2woKSB9LCB7IGE6IFN5bWJvbCgpIH0pXG4gIGlmIChtYXhMaW5lcyA9PT0gMCkge1xuICAgIC8vIFdlIGhhdmUgdG8gZ2V0IHRoZSByZXN1bHQgYWdhaW4uIFRoZSBsaW5lcyB3ZXJlIGFsbCByZW1vdmVkIGJlZm9yZS5cbiAgICB2YXIgX2FjdHVhbExpbmVzID0gYWN0dWFsSW5zcGVjdGVkLnNwbGl0KCdcXG4nKTtcblxuICAgIC8vIE9ubHkgcmVtb3ZlIGxpbmVzIGluIGNhc2UgaXQgbWFrZXMgc2Vuc2UgdG8gY29sbGFwc2UgdGhvc2UuXG4gICAgLy8gVE9ETzogQWNjZXB0IGVudiB0byBhbHdheXMgc2hvdyB0aGUgZnVsbCBlcnJvci5cbiAgICBpZiAoX2FjdHVhbExpbmVzLmxlbmd0aCA+IDMwKSB7XG4gICAgICBfYWN0dWFsTGluZXNbMjZdID0gXCJcIi5jb25jYXQoYmx1ZSwgXCIuLi5cIikuY29uY2F0KHdoaXRlKTtcbiAgICAgIHdoaWxlIChfYWN0dWFsTGluZXMubGVuZ3RoID4gMjcpIHtcbiAgICAgICAgX2FjdHVhbExpbmVzLnBvcCgpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gXCJcIi5jb25jYXQoa1JlYWRhYmxlT3BlcmF0b3Iubm90SWRlbnRpY2FsLCBcIlxcblxcblwiKS5jb25jYXQoX2FjdHVhbExpbmVzLmpvaW4oJ1xcbicpLCBcIlxcblwiKTtcbiAgfVxuICBpZiAoaSA+IDMpIHtcbiAgICBlbmQgPSBcIlxcblwiLmNvbmNhdChibHVlLCBcIi4uLlwiKS5jb25jYXQod2hpdGUpLmNvbmNhdChlbmQpO1xuICAgIHNraXBwZWQgPSB0cnVlO1xuICB9XG4gIGlmIChvdGhlciAhPT0gJycpIHtcbiAgICBlbmQgPSBcIlxcbiAgXCIuY29uY2F0KG90aGVyKS5jb25jYXQoZW5kKTtcbiAgICBvdGhlciA9ICcnO1xuICB9XG4gIHZhciBwcmludGVkTGluZXMgPSAwO1xuICB2YXIgbXNnID0ga1JlYWRhYmxlT3BlcmF0b3Jbb3BlcmF0b3JdICsgXCJcXG5cIi5jb25jYXQoZ3JlZW4sIFwiKyBhY3R1YWxcIikuY29uY2F0KHdoaXRlLCBcIiBcIikuY29uY2F0KHJlZCwgXCItIGV4cGVjdGVkXCIpLmNvbmNhdCh3aGl0ZSk7XG4gIHZhciBza2lwcGVkTXNnID0gXCIgXCIuY29uY2F0KGJsdWUsIFwiLi4uXCIpLmNvbmNhdCh3aGl0ZSwgXCIgTGluZXMgc2tpcHBlZFwiKTtcbiAgZm9yIChpID0gMDsgaSA8IG1heExpbmVzOyBpKyspIHtcbiAgICAvLyBPbmx5IGV4dHJhIGV4cGVjdGVkIGxpbmVzIGV4aXN0XG4gICAgdmFyIGN1ciA9IGkgLSBsYXN0UG9zO1xuICAgIGlmIChhY3R1YWxMaW5lcy5sZW5ndGggPCBpICsgMSkge1xuICAgICAgLy8gSWYgdGhlIGxhc3QgZGl2ZXJnaW5nIGxpbmUgaXMgbW9yZSB0aGFuIG9uZSBsaW5lIGFib3ZlIGFuZCB0aGVcbiAgICAgIC8vIGN1cnJlbnQgbGluZSBpcyBhdCBsZWFzdCBsaW5lIHRocmVlLCBhZGQgc29tZSBvZiB0aGUgZm9ybWVyIGxpbmVzIGFuZFxuICAgICAgLy8gYWxzbyBhZGQgZG90cyB0byBpbmRpY2F0ZSBza2lwcGVkIGVudHJpZXMuXG4gICAgICBpZiAoY3VyID4gMSAmJiBpID4gMikge1xuICAgICAgICBpZiAoY3VyID4gNCkge1xuICAgICAgICAgIHJlcyArPSBcIlxcblwiLmNvbmNhdChibHVlLCBcIi4uLlwiKS5jb25jYXQod2hpdGUpO1xuICAgICAgICAgIHNraXBwZWQgPSB0cnVlO1xuICAgICAgICB9IGVsc2UgaWYgKGN1ciA+IDMpIHtcbiAgICAgICAgICByZXMgKz0gXCJcXG4gIFwiLmNvbmNhdChleHBlY3RlZExpbmVzW2kgLSAyXSk7XG4gICAgICAgICAgcHJpbnRlZExpbmVzKys7XG4gICAgICAgIH1cbiAgICAgICAgcmVzICs9IFwiXFxuICBcIi5jb25jYXQoZXhwZWN0ZWRMaW5lc1tpIC0gMV0pO1xuICAgICAgICBwcmludGVkTGluZXMrKztcbiAgICAgIH1cbiAgICAgIC8vIE1hcmsgdGhlIGN1cnJlbnQgbGluZSBhcyB0aGUgbGFzdCBkaXZlcmdpbmcgb25lLlxuICAgICAgbGFzdFBvcyA9IGk7XG4gICAgICAvLyBBZGQgdGhlIGV4cGVjdGVkIGxpbmUgdG8gdGhlIGNhY2hlLlxuICAgICAgb3RoZXIgKz0gXCJcXG5cIi5jb25jYXQocmVkLCBcIi1cIikuY29uY2F0KHdoaXRlLCBcIiBcIikuY29uY2F0KGV4cGVjdGVkTGluZXNbaV0pO1xuICAgICAgcHJpbnRlZExpbmVzKys7XG4gICAgICAvLyBPbmx5IGV4dHJhIGFjdHVhbCBsaW5lcyBleGlzdFxuICAgIH0gZWxzZSBpZiAoZXhwZWN0ZWRMaW5lcy5sZW5ndGggPCBpICsgMSkge1xuICAgICAgLy8gSWYgdGhlIGxhc3QgZGl2ZXJnaW5nIGxpbmUgaXMgbW9yZSB0aGFuIG9uZSBsaW5lIGFib3ZlIGFuZCB0aGVcbiAgICAgIC8vIGN1cnJlbnQgbGluZSBpcyBhdCBsZWFzdCBsaW5lIHRocmVlLCBhZGQgc29tZSBvZiB0aGUgZm9ybWVyIGxpbmVzIGFuZFxuICAgICAgLy8gYWxzbyBhZGQgZG90cyB0byBpbmRpY2F0ZSBza2lwcGVkIGVudHJpZXMuXG4gICAgICBpZiAoY3VyID4gMSAmJiBpID4gMikge1xuICAgICAgICBpZiAoY3VyID4gNCkge1xuICAgICAgICAgIHJlcyArPSBcIlxcblwiLmNvbmNhdChibHVlLCBcIi4uLlwiKS5jb25jYXQod2hpdGUpO1xuICAgICAgICAgIHNraXBwZWQgPSB0cnVlO1xuICAgICAgICB9IGVsc2UgaWYgKGN1ciA+IDMpIHtcbiAgICAgICAgICByZXMgKz0gXCJcXG4gIFwiLmNvbmNhdChhY3R1YWxMaW5lc1tpIC0gMl0pO1xuICAgICAgICAgIHByaW50ZWRMaW5lcysrO1xuICAgICAgICB9XG4gICAgICAgIHJlcyArPSBcIlxcbiAgXCIuY29uY2F0KGFjdHVhbExpbmVzW2kgLSAxXSk7XG4gICAgICAgIHByaW50ZWRMaW5lcysrO1xuICAgICAgfVxuICAgICAgLy8gTWFyayB0aGUgY3VycmVudCBsaW5lIGFzIHRoZSBsYXN0IGRpdmVyZ2luZyBvbmUuXG4gICAgICBsYXN0UG9zID0gaTtcbiAgICAgIC8vIEFkZCB0aGUgYWN0dWFsIGxpbmUgdG8gdGhlIHJlc3VsdC5cbiAgICAgIHJlcyArPSBcIlxcblwiLmNvbmNhdChncmVlbiwgXCIrXCIpLmNvbmNhdCh3aGl0ZSwgXCIgXCIpLmNvbmNhdChhY3R1YWxMaW5lc1tpXSk7XG4gICAgICBwcmludGVkTGluZXMrKztcbiAgICAgIC8vIExpbmVzIGRpdmVyZ2VcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGV4cGVjdGVkTGluZSA9IGV4cGVjdGVkTGluZXNbaV07XG4gICAgICB2YXIgYWN0dWFsTGluZSA9IGFjdHVhbExpbmVzW2ldO1xuICAgICAgLy8gSWYgdGhlIGxpbmVzIGRpdmVyZ2UsIHNwZWNpZmljYWxseSBjaGVjayBmb3IgbGluZXMgdGhhdCBvbmx5IGRpdmVyZ2UgYnlcbiAgICAgIC8vIGEgdHJhaWxpbmcgY29tbWEuIEluIHRoYXQgY2FzZSBpdCBpcyBhY3R1YWxseSBpZGVudGljYWwgYW5kIHdlIHNob3VsZFxuICAgICAgLy8gbWFyayBpdCBhcyBzdWNoLlxuICAgICAgdmFyIGRpdmVyZ2luZ0xpbmVzID0gYWN0dWFsTGluZSAhPT0gZXhwZWN0ZWRMaW5lICYmICghZW5kc1dpdGgoYWN0dWFsTGluZSwgJywnKSB8fCBhY3R1YWxMaW5lLnNsaWNlKDAsIC0xKSAhPT0gZXhwZWN0ZWRMaW5lKTtcbiAgICAgIC8vIElmIHRoZSBleHBlY3RlZCBsaW5lIGhhcyBhIHRyYWlsaW5nIGNvbW1hIGJ1dCBpcyBvdGhlcndpc2UgaWRlbnRpY2FsLFxuICAgICAgLy8gYWRkIGEgY29tbWEgYXQgdGhlIGVuZCBvZiB0aGUgYWN0dWFsIGxpbmUuIE90aGVyd2lzZSB0aGUgb3V0cHV0IGNvdWxkXG4gICAgICAvLyBsb29rIHdlaXJkIGFzIGluOlxuICAgICAgLy9cbiAgICAgIC8vICAgW1xuICAgICAgLy8gICAgIDEgICAgICAgICAvLyBObyBjb21tYSBhdCB0aGUgZW5kIVxuICAgICAgLy8gKyAgIDJcbiAgICAgIC8vICAgXVxuICAgICAgLy9cbiAgICAgIGlmIChkaXZlcmdpbmdMaW5lcyAmJiBlbmRzV2l0aChleHBlY3RlZExpbmUsICcsJykgJiYgZXhwZWN0ZWRMaW5lLnNsaWNlKDAsIC0xKSA9PT0gYWN0dWFsTGluZSkge1xuICAgICAgICBkaXZlcmdpbmdMaW5lcyA9IGZhbHNlO1xuICAgICAgICBhY3R1YWxMaW5lICs9ICcsJztcbiAgICAgIH1cbiAgICAgIGlmIChkaXZlcmdpbmdMaW5lcykge1xuICAgICAgICAvLyBJZiB0aGUgbGFzdCBkaXZlcmdpbmcgbGluZSBpcyBtb3JlIHRoYW4gb25lIGxpbmUgYWJvdmUgYW5kIHRoZVxuICAgICAgICAvLyBjdXJyZW50IGxpbmUgaXMgYXQgbGVhc3QgbGluZSB0aHJlZSwgYWRkIHNvbWUgb2YgdGhlIGZvcm1lciBsaW5lcyBhbmRcbiAgICAgICAgLy8gYWxzbyBhZGQgZG90cyB0byBpbmRpY2F0ZSBza2lwcGVkIGVudHJpZXMuXG4gICAgICAgIGlmIChjdXIgPiAxICYmIGkgPiAyKSB7XG4gICAgICAgICAgaWYgKGN1ciA+IDQpIHtcbiAgICAgICAgICAgIHJlcyArPSBcIlxcblwiLmNvbmNhdChibHVlLCBcIi4uLlwiKS5jb25jYXQod2hpdGUpO1xuICAgICAgICAgICAgc2tpcHBlZCA9IHRydWU7XG4gICAgICAgICAgfSBlbHNlIGlmIChjdXIgPiAzKSB7XG4gICAgICAgICAgICByZXMgKz0gXCJcXG4gIFwiLmNvbmNhdChhY3R1YWxMaW5lc1tpIC0gMl0pO1xuICAgICAgICAgICAgcHJpbnRlZExpbmVzKys7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJlcyArPSBcIlxcbiAgXCIuY29uY2F0KGFjdHVhbExpbmVzW2kgLSAxXSk7XG4gICAgICAgICAgcHJpbnRlZExpbmVzKys7XG4gICAgICAgIH1cbiAgICAgICAgLy8gTWFyayB0aGUgY3VycmVudCBsaW5lIGFzIHRoZSBsYXN0IGRpdmVyZ2luZyBvbmUuXG4gICAgICAgIGxhc3RQb3MgPSBpO1xuICAgICAgICAvLyBBZGQgdGhlIGFjdHVhbCBsaW5lIHRvIHRoZSByZXN1bHQgYW5kIGNhY2hlIHRoZSBleHBlY3RlZCBkaXZlcmdpbmdcbiAgICAgICAgLy8gbGluZSBzbyBjb25zZWN1dGl2ZSBkaXZlcmdpbmcgbGluZXMgc2hvdyB1cCBhcyArKystLS0gYW5kIG5vdCArLSstKy0uXG4gICAgICAgIHJlcyArPSBcIlxcblwiLmNvbmNhdChncmVlbiwgXCIrXCIpLmNvbmNhdCh3aGl0ZSwgXCIgXCIpLmNvbmNhdChhY3R1YWxMaW5lKTtcbiAgICAgICAgb3RoZXIgKz0gXCJcXG5cIi5jb25jYXQocmVkLCBcIi1cIikuY29uY2F0KHdoaXRlLCBcIiBcIikuY29uY2F0KGV4cGVjdGVkTGluZSk7XG4gICAgICAgIHByaW50ZWRMaW5lcyArPSAyO1xuICAgICAgICAvLyBMaW5lcyBhcmUgaWRlbnRpY2FsXG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBBZGQgYWxsIGNhY2hlZCBpbmZvcm1hdGlvbiB0byB0aGUgcmVzdWx0IGJlZm9yZSBhZGRpbmcgb3RoZXIgdGhpbmdzXG4gICAgICAgIC8vIGFuZCByZXNldCB0aGUgY2FjaGUuXG4gICAgICAgIHJlcyArPSBvdGhlcjtcbiAgICAgICAgb3RoZXIgPSAnJztcbiAgICAgICAgLy8gSWYgdGhlIGxhc3QgZGl2ZXJnaW5nIGxpbmUgaXMgZXhhY3RseSBvbmUgbGluZSBhYm92ZSBvciBpZiBpdCBpcyB0aGVcbiAgICAgICAgLy8gdmVyeSBmaXJzdCBsaW5lLCBhZGQgdGhlIGxpbmUgdG8gdGhlIHJlc3VsdC5cbiAgICAgICAgaWYgKGN1ciA9PT0gMSB8fCBpID09PSAwKSB7XG4gICAgICAgICAgcmVzICs9IFwiXFxuICBcIi5jb25jYXQoYWN0dWFsTGluZSk7XG4gICAgICAgICAgcHJpbnRlZExpbmVzKys7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgLy8gSW5zcGVjdGVkIG9iamVjdCB0byBiaWcgKFNob3cgfjIwIHJvd3MgbWF4KVxuICAgIGlmIChwcmludGVkTGluZXMgPiAyMCAmJiBpIDwgbWF4TGluZXMgLSAyKSB7XG4gICAgICByZXR1cm4gXCJcIi5jb25jYXQobXNnKS5jb25jYXQoc2tpcHBlZE1zZywgXCJcXG5cIikuY29uY2F0KHJlcywgXCJcXG5cIikuY29uY2F0KGJsdWUsIFwiLi4uXCIpLmNvbmNhdCh3aGl0ZSkuY29uY2F0KG90aGVyLCBcIlxcblwiKSArIFwiXCIuY29uY2F0KGJsdWUsIFwiLi4uXCIpLmNvbmNhdCh3aGl0ZSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBcIlwiLmNvbmNhdChtc2cpLmNvbmNhdChza2lwcGVkID8gc2tpcHBlZE1zZyA6ICcnLCBcIlxcblwiKS5jb25jYXQocmVzKS5jb25jYXQob3RoZXIpLmNvbmNhdChlbmQpLmNvbmNhdChpbmRpY2F0b3IpO1xufVxudmFyIEFzc2VydGlvbkVycm9yID0gLyojX19QVVJFX18qL2Z1bmN0aW9uIChfRXJyb3IsIF9pbnNwZWN0JGN1c3RvbSkge1xuICBfaW5oZXJpdHMoQXNzZXJ0aW9uRXJyb3IsIF9FcnJvcik7XG4gIHZhciBfc3VwZXIgPSBfY3JlYXRlU3VwZXIoQXNzZXJ0aW9uRXJyb3IpO1xuICBmdW5jdGlvbiBBc3NlcnRpb25FcnJvcihvcHRpb25zKSB7XG4gICAgdmFyIF90aGlzO1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBBc3NlcnRpb25FcnJvcik7XG4gICAgaWYgKF90eXBlb2Yob3B0aW9ucykgIT09ICdvYmplY3QnIHx8IG9wdGlvbnMgPT09IG51bGwpIHtcbiAgICAgIHRocm93IG5ldyBFUlJfSU5WQUxJRF9BUkdfVFlQRSgnb3B0aW9ucycsICdPYmplY3QnLCBvcHRpb25zKTtcbiAgICB9XG4gICAgdmFyIG1lc3NhZ2UgPSBvcHRpb25zLm1lc3NhZ2UsXG4gICAgICBvcGVyYXRvciA9IG9wdGlvbnMub3BlcmF0b3IsXG4gICAgICBzdGFja1N0YXJ0Rm4gPSBvcHRpb25zLnN0YWNrU3RhcnRGbjtcbiAgICB2YXIgYWN0dWFsID0gb3B0aW9ucy5hY3R1YWwsXG4gICAgICBleHBlY3RlZCA9IG9wdGlvbnMuZXhwZWN0ZWQ7XG4gICAgdmFyIGxpbWl0ID0gRXJyb3Iuc3RhY2tUcmFjZUxpbWl0O1xuICAgIEVycm9yLnN0YWNrVHJhY2VMaW1pdCA9IDA7XG4gICAgaWYgKG1lc3NhZ2UgIT0gbnVsbCkge1xuICAgICAgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBTdHJpbmcobWVzc2FnZSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAocHJvY2Vzcy5zdGRlcnIgJiYgcHJvY2Vzcy5zdGRlcnIuaXNUVFkpIHtcbiAgICAgICAgLy8gUmVzZXQgb24gZWFjaCBjYWxsIHRvIG1ha2Ugc3VyZSB3ZSBoYW5kbGUgZHluYW1pY2FsbHkgc2V0IGVudmlyb25tZW50XG4gICAgICAgIC8vIHZhcmlhYmxlcyBjb3JyZWN0LlxuICAgICAgICBpZiAocHJvY2Vzcy5zdGRlcnIgJiYgcHJvY2Vzcy5zdGRlcnIuZ2V0Q29sb3JEZXB0aCAmJiBwcm9jZXNzLnN0ZGVyci5nZXRDb2xvckRlcHRoKCkgIT09IDEpIHtcbiAgICAgICAgICBibHVlID0gXCJcXHgxQlszNG1cIjtcbiAgICAgICAgICBncmVlbiA9IFwiXFx4MUJbMzJtXCI7XG4gICAgICAgICAgd2hpdGUgPSBcIlxceDFCWzM5bVwiO1xuICAgICAgICAgIHJlZCA9IFwiXFx4MUJbMzFtXCI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYmx1ZSA9ICcnO1xuICAgICAgICAgIGdyZWVuID0gJyc7XG4gICAgICAgICAgd2hpdGUgPSAnJztcbiAgICAgICAgICByZWQgPSAnJztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgLy8gUHJldmVudCB0aGUgZXJyb3Igc3RhY2sgZnJvbSBiZWluZyB2aXNpYmxlIGJ5IGR1cGxpY2F0aW5nIHRoZSBlcnJvclxuICAgICAgLy8gaW4gYSB2ZXJ5IGNsb3NlIHdheSB0byB0aGUgb3JpZ2luYWwgaW4gY2FzZSBib3RoIHNpZGVzIGFyZSBhY3R1YWxseVxuICAgICAgLy8gaW5zdGFuY2VzIG9mIEVycm9yLlxuICAgICAgaWYgKF90eXBlb2YoYWN0dWFsKSA9PT0gJ29iamVjdCcgJiYgYWN0dWFsICE9PSBudWxsICYmIF90eXBlb2YoZXhwZWN0ZWQpID09PSAnb2JqZWN0JyAmJiBleHBlY3RlZCAhPT0gbnVsbCAmJiAnc3RhY2snIGluIGFjdHVhbCAmJiBhY3R1YWwgaW5zdGFuY2VvZiBFcnJvciAmJiAnc3RhY2snIGluIGV4cGVjdGVkICYmIGV4cGVjdGVkIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgYWN0dWFsID0gY29weUVycm9yKGFjdHVhbCk7XG4gICAgICAgIGV4cGVjdGVkID0gY29weUVycm9yKGV4cGVjdGVkKTtcbiAgICAgIH1cbiAgICAgIGlmIChvcGVyYXRvciA9PT0gJ2RlZXBTdHJpY3RFcXVhbCcgfHwgb3BlcmF0b3IgPT09ICdzdHJpY3RFcXVhbCcpIHtcbiAgICAgICAgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBjcmVhdGVFcnJEaWZmKGFjdHVhbCwgZXhwZWN0ZWQsIG9wZXJhdG9yKSk7XG4gICAgICB9IGVsc2UgaWYgKG9wZXJhdG9yID09PSAnbm90RGVlcFN0cmljdEVxdWFsJyB8fCBvcGVyYXRvciA9PT0gJ25vdFN0cmljdEVxdWFsJykge1xuICAgICAgICAvLyBJbiBjYXNlIHRoZSBvYmplY3RzIGFyZSBlcXVhbCBidXQgdGhlIG9wZXJhdG9yIHJlcXVpcmVzIHVuZXF1YWwsIHNob3dcbiAgICAgICAgLy8gdGhlIGZpcnN0IG9iamVjdCBhbmQgc2F5IEEgZXF1YWxzIEJcbiAgICAgICAgdmFyIGJhc2UgPSBrUmVhZGFibGVPcGVyYXRvcltvcGVyYXRvcl07XG4gICAgICAgIHZhciByZXMgPSBpbnNwZWN0VmFsdWUoYWN0dWFsKS5zcGxpdCgnXFxuJyk7XG5cbiAgICAgICAgLy8gSW4gY2FzZSBcImFjdHVhbFwiIGlzIGFuIG9iamVjdCwgaXQgc2hvdWxkIG5vdCBiZSByZWZlcmVuY2UgZXF1YWwuXG4gICAgICAgIGlmIChvcGVyYXRvciA9PT0gJ25vdFN0cmljdEVxdWFsJyAmJiBfdHlwZW9mKGFjdHVhbCkgPT09ICdvYmplY3QnICYmIGFjdHVhbCAhPT0gbnVsbCkge1xuICAgICAgICAgIGJhc2UgPSBrUmVhZGFibGVPcGVyYXRvci5ub3RTdHJpY3RFcXVhbE9iamVjdDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIE9ubHkgcmVtb3ZlIGxpbmVzIGluIGNhc2UgaXQgbWFrZXMgc2Vuc2UgdG8gY29sbGFwc2UgdGhvc2UuXG4gICAgICAgIC8vIFRPRE86IEFjY2VwdCBlbnYgdG8gYWx3YXlzIHNob3cgdGhlIGZ1bGwgZXJyb3IuXG4gICAgICAgIGlmIChyZXMubGVuZ3RoID4gMzApIHtcbiAgICAgICAgICByZXNbMjZdID0gXCJcIi5jb25jYXQoYmx1ZSwgXCIuLi5cIikuY29uY2F0KHdoaXRlKTtcbiAgICAgICAgICB3aGlsZSAocmVzLmxlbmd0aCA+IDI3KSB7XG4gICAgICAgICAgICByZXMucG9wKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gT25seSBwcmludCBhIHNpbmdsZSBpbnB1dC5cbiAgICAgICAgaWYgKHJlcy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIFwiXCIuY29uY2F0KGJhc2UsIFwiIFwiKS5jb25jYXQocmVzWzBdKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBcIlwiLmNvbmNhdChiYXNlLCBcIlxcblxcblwiKS5jb25jYXQocmVzLmpvaW4oJ1xcbicpLCBcIlxcblwiKSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBfcmVzID0gaW5zcGVjdFZhbHVlKGFjdHVhbCk7XG4gICAgICAgIHZhciBvdGhlciA9ICcnO1xuICAgICAgICB2YXIga25vd25PcGVyYXRvcnMgPSBrUmVhZGFibGVPcGVyYXRvcltvcGVyYXRvcl07XG4gICAgICAgIGlmIChvcGVyYXRvciA9PT0gJ25vdERlZXBFcXVhbCcgfHwgb3BlcmF0b3IgPT09ICdub3RFcXVhbCcpIHtcbiAgICAgICAgICBfcmVzID0gXCJcIi5jb25jYXQoa1JlYWRhYmxlT3BlcmF0b3Jbb3BlcmF0b3JdLCBcIlxcblxcblwiKS5jb25jYXQoX3Jlcyk7XG4gICAgICAgICAgaWYgKF9yZXMubGVuZ3RoID4gMTAyNCkge1xuICAgICAgICAgICAgX3JlcyA9IFwiXCIuY29uY2F0KF9yZXMuc2xpY2UoMCwgMTAyMSksIFwiLi4uXCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBvdGhlciA9IFwiXCIuY29uY2F0KGluc3BlY3RWYWx1ZShleHBlY3RlZCkpO1xuICAgICAgICAgIGlmIChfcmVzLmxlbmd0aCA+IDUxMikge1xuICAgICAgICAgICAgX3JlcyA9IFwiXCIuY29uY2F0KF9yZXMuc2xpY2UoMCwgNTA5KSwgXCIuLi5cIik7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChvdGhlci5sZW5ndGggPiA1MTIpIHtcbiAgICAgICAgICAgIG90aGVyID0gXCJcIi5jb25jYXQob3RoZXIuc2xpY2UoMCwgNTA5KSwgXCIuLi5cIik7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChvcGVyYXRvciA9PT0gJ2RlZXBFcXVhbCcgfHwgb3BlcmF0b3IgPT09ICdlcXVhbCcpIHtcbiAgICAgICAgICAgIF9yZXMgPSBcIlwiLmNvbmNhdChrbm93bk9wZXJhdG9ycywgXCJcXG5cXG5cIikuY29uY2F0KF9yZXMsIFwiXFxuXFxuc2hvdWxkIGVxdWFsXFxuXFxuXCIpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvdGhlciA9IFwiIFwiLmNvbmNhdChvcGVyYXRvciwgXCIgXCIpLmNvbmNhdChvdGhlcik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgXCJcIi5jb25jYXQoX3JlcykuY29uY2F0KG90aGVyKSk7XG4gICAgICB9XG4gICAgfVxuICAgIEVycm9yLnN0YWNrVHJhY2VMaW1pdCA9IGxpbWl0O1xuICAgIF90aGlzLmdlbmVyYXRlZE1lc3NhZ2UgPSAhbWVzc2FnZTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoX2Fzc2VydFRoaXNJbml0aWFsaXplZChfdGhpcyksICduYW1lJywge1xuICAgICAgdmFsdWU6ICdBc3NlcnRpb25FcnJvciBbRVJSX0FTU0VSVElPTl0nLFxuICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIF90aGlzLmNvZGUgPSAnRVJSX0FTU0VSVElPTic7XG4gICAgX3RoaXMuYWN0dWFsID0gYWN0dWFsO1xuICAgIF90aGlzLmV4cGVjdGVkID0gZXhwZWN0ZWQ7XG4gICAgX3RoaXMub3BlcmF0b3IgPSBvcGVyYXRvcjtcbiAgICBpZiAoRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UpIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuICAgICAgRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UoX2Fzc2VydFRoaXNJbml0aWFsaXplZChfdGhpcyksIHN0YWNrU3RhcnRGbik7XG4gICAgfVxuICAgIC8vIENyZWF0ZSBlcnJvciBtZXNzYWdlIGluY2x1ZGluZyB0aGUgZXJyb3IgY29kZSBpbiB0aGUgbmFtZS5cbiAgICBfdGhpcy5zdGFjaztcbiAgICAvLyBSZXNldCB0aGUgbmFtZS5cbiAgICBfdGhpcy5uYW1lID0gJ0Fzc2VydGlvbkVycm9yJztcbiAgICByZXR1cm4gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oX3RoaXMpO1xuICB9XG4gIF9jcmVhdGVDbGFzcyhBc3NlcnRpb25FcnJvciwgW3tcbiAgICBrZXk6IFwidG9TdHJpbmdcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgICByZXR1cm4gXCJcIi5jb25jYXQodGhpcy5uYW1lLCBcIiBbXCIpLmNvbmNhdCh0aGlzLmNvZGUsIFwiXTogXCIpLmNvbmNhdCh0aGlzLm1lc3NhZ2UpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogX2luc3BlY3QkY3VzdG9tLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB2YWx1ZShyZWN1cnNlVGltZXMsIGN0eCkge1xuICAgICAgLy8gVGhpcyBsaW1pdHMgdGhlIGBhY3R1YWxgIGFuZCBgZXhwZWN0ZWRgIHByb3BlcnR5IGRlZmF1bHQgaW5zcGVjdGlvbiB0b1xuICAgICAgLy8gdGhlIG1pbmltdW0gZGVwdGguIE90aGVyd2lzZSB0aG9zZSB2YWx1ZXMgd291bGQgYmUgdG9vIHZlcmJvc2UgY29tcGFyZWRcbiAgICAgIC8vIHRvIHRoZSBhY3R1YWwgZXJyb3IgbWVzc2FnZSB3aGljaCBjb250YWlucyBhIGNvbWJpbmVkIHZpZXcgb2YgdGhlc2UgdHdvXG4gICAgICAvLyBpbnB1dCB2YWx1ZXMuXG4gICAgICByZXR1cm4gaW5zcGVjdCh0aGlzLCBfb2JqZWN0U3ByZWFkKF9vYmplY3RTcHJlYWQoe30sIGN0eCksIHt9LCB7XG4gICAgICAgIGN1c3RvbUluc3BlY3Q6IGZhbHNlLFxuICAgICAgICBkZXB0aDogMFxuICAgICAgfSkpO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gQXNzZXJ0aW9uRXJyb3I7XG59KCAvKiNfX1BVUkVfXyovX3dyYXBOYXRpdmVTdXBlcihFcnJvciksIGluc3BlY3QuY3VzdG9tKTtcbm1vZHVsZS5leHBvcnRzID0gQXNzZXJ0aW9uRXJyb3I7IiwiLy8gQ3VycmVudGx5IGluIHN5bmMgd2l0aCBOb2RlLmpzIGxpYi9pbnRlcm5hbC9lcnJvcnMuanNcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9ub2RlanMvbm9kZS9jb21taXQvM2IwNDQ5NjJjNDhmZTMxMzkwNTg3N2E5NmI1ZDA4OTRhNTQwNGY2ZlxuXG4vKiBlc2xpbnQgbm9kZS1jb3JlL2RvY3VtZW50ZWQtZXJyb3JzOiBcImVycm9yXCIgKi9cbi8qIGVzbGludCBub2RlLWNvcmUvYWxwaGFiZXRpemUtZXJyb3JzOiBcImVycm9yXCIgKi9cbi8qIGVzbGludCBub2RlLWNvcmUvcHJlZmVyLXV0aWwtZm9ybWF0LWVycm9yczogXCJlcnJvclwiICovXG5cbid1c2Ugc3RyaWN0JztcblxuLy8gVGhlIHdob2xlIHBvaW50IGJlaGluZCB0aGlzIGludGVybmFsIG1vZHVsZSBpcyB0byBhbGxvdyBOb2RlLmpzIHRvIG5vXG4vLyBsb25nZXIgYmUgZm9yY2VkIHRvIHRyZWF0IGV2ZXJ5IGVycm9yIG1lc3NhZ2UgY2hhbmdlIGFzIGEgc2VtdmVyLW1ham9yXG4vLyBjaGFuZ2UuIFRoZSBOb2RlRXJyb3IgY2xhc3NlcyBoZXJlIGFsbCBleHBvc2UgYSBgY29kZWAgcHJvcGVydHkgd2hvc2Vcbi8vIHZhbHVlIHN0YXRpY2FsbHkgYW5kIHBlcm1hbmVudGx5IGlkZW50aWZpZXMgdGhlIGVycm9yLiBXaGlsZSB0aGUgZXJyb3Jcbi8vIG1lc3NhZ2UgbWF5IGNoYW5nZSwgdGhlIGNvZGUgc2hvdWxkIG5vdC5cbmZ1bmN0aW9uIF90eXBlb2YobykgeyBcIkBiYWJlbC9oZWxwZXJzIC0gdHlwZW9mXCI7IHJldHVybiBfdHlwZW9mID0gXCJmdW5jdGlvblwiID09IHR5cGVvZiBTeW1ib2wgJiYgXCJzeW1ib2xcIiA9PSB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID8gZnVuY3Rpb24gKG8pIHsgcmV0dXJuIHR5cGVvZiBvOyB9IDogZnVuY3Rpb24gKG8pIHsgcmV0dXJuIG8gJiYgXCJmdW5jdGlvblwiID09IHR5cGVvZiBTeW1ib2wgJiYgby5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG8gIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG87IH0sIF90eXBlb2Yobyk7IH1cbmZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgX3RvUHJvcGVydHlLZXkoZGVzY3JpcHRvci5rZXkpLCBkZXNjcmlwdG9yKTsgfSB9XG5mdW5jdGlvbiBfY3JlYXRlQ2xhc3MoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShDb25zdHJ1Y3RvciwgXCJwcm90b3R5cGVcIiwgeyB3cml0YWJsZTogZmFsc2UgfSk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfVxuZnVuY3Rpb24gX3RvUHJvcGVydHlLZXkoYXJnKSB7IHZhciBrZXkgPSBfdG9QcmltaXRpdmUoYXJnLCBcInN0cmluZ1wiKTsgcmV0dXJuIF90eXBlb2Yoa2V5KSA9PT0gXCJzeW1ib2xcIiA/IGtleSA6IFN0cmluZyhrZXkpOyB9XG5mdW5jdGlvbiBfdG9QcmltaXRpdmUoaW5wdXQsIGhpbnQpIHsgaWYgKF90eXBlb2YoaW5wdXQpICE9PSBcIm9iamVjdFwiIHx8IGlucHV0ID09PSBudWxsKSByZXR1cm4gaW5wdXQ7IHZhciBwcmltID0gaW5wdXRbU3ltYm9sLnRvUHJpbWl0aXZlXTsgaWYgKHByaW0gIT09IHVuZGVmaW5lZCkgeyB2YXIgcmVzID0gcHJpbS5jYWxsKGlucHV0LCBoaW50IHx8IFwiZGVmYXVsdFwiKTsgaWYgKF90eXBlb2YocmVzKSAhPT0gXCJvYmplY3RcIikgcmV0dXJuIHJlczsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkBAdG9QcmltaXRpdmUgbXVzdCByZXR1cm4gYSBwcmltaXRpdmUgdmFsdWUuXCIpOyB9IHJldHVybiAoaGludCA9PT0gXCJzdHJpbmdcIiA/IFN0cmluZyA6IE51bWJlcikoaW5wdXQpOyB9XG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uXCIpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHN1YkNsYXNzLCBcInByb3RvdHlwZVwiLCB7IHdyaXRhYmxlOiBmYWxzZSB9KTsgaWYgKHN1cGVyQ2xhc3MpIF9zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcyk7IH1cbmZ1bmN0aW9uIF9zZXRQcm90b3R5cGVPZihvLCBwKSB7IF9zZXRQcm90b3R5cGVPZiA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZi5iaW5kKCkgOiBmdW5jdGlvbiBfc2V0UHJvdG90eXBlT2YobywgcCkgeyBvLl9fcHJvdG9fXyA9IHA7IHJldHVybiBvOyB9OyByZXR1cm4gX3NldFByb3RvdHlwZU9mKG8sIHApOyB9XG5mdW5jdGlvbiBfY3JlYXRlU3VwZXIoRGVyaXZlZCkgeyB2YXIgaGFzTmF0aXZlUmVmbGVjdENvbnN0cnVjdCA9IF9pc05hdGl2ZVJlZmxlY3RDb25zdHJ1Y3QoKTsgcmV0dXJuIGZ1bmN0aW9uIF9jcmVhdGVTdXBlckludGVybmFsKCkgeyB2YXIgU3VwZXIgPSBfZ2V0UHJvdG90eXBlT2YoRGVyaXZlZCksIHJlc3VsdDsgaWYgKGhhc05hdGl2ZVJlZmxlY3RDb25zdHJ1Y3QpIHsgdmFyIE5ld1RhcmdldCA9IF9nZXRQcm90b3R5cGVPZih0aGlzKS5jb25zdHJ1Y3RvcjsgcmVzdWx0ID0gUmVmbGVjdC5jb25zdHJ1Y3QoU3VwZXIsIGFyZ3VtZW50cywgTmV3VGFyZ2V0KTsgfSBlbHNlIHsgcmVzdWx0ID0gU3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTsgfSByZXR1cm4gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgcmVzdWx0KTsgfTsgfVxuZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkgeyBpZiAoY2FsbCAmJiAoX3R5cGVvZihjYWxsKSA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSkgeyByZXR1cm4gY2FsbDsgfSBlbHNlIGlmIChjYWxsICE9PSB2b2lkIDApIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkRlcml2ZWQgY29uc3RydWN0b3JzIG1heSBvbmx5IHJldHVybiBvYmplY3Qgb3IgdW5kZWZpbmVkXCIpOyB9IHJldHVybiBfYXNzZXJ0VGhpc0luaXRpYWxpemVkKHNlbGYpOyB9XG5mdW5jdGlvbiBfYXNzZXJ0VGhpc0luaXRpYWxpemVkKHNlbGYpIHsgaWYgKHNlbGYgPT09IHZvaWQgMCkgeyB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7IH0gcmV0dXJuIHNlbGY7IH1cbmZ1bmN0aW9uIF9pc05hdGl2ZVJlZmxlY3RDb25zdHJ1Y3QoKSB7IGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJ1bmRlZmluZWRcIiB8fCAhUmVmbGVjdC5jb25zdHJ1Y3QpIHJldHVybiBmYWxzZTsgaWYgKFJlZmxlY3QuY29uc3RydWN0LnNoYW0pIHJldHVybiBmYWxzZTsgaWYgKHR5cGVvZiBQcm94eSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gdHJ1ZTsgdHJ5IHsgQm9vbGVhbi5wcm90b3R5cGUudmFsdWVPZi5jYWxsKFJlZmxlY3QuY29uc3RydWN0KEJvb2xlYW4sIFtdLCBmdW5jdGlvbiAoKSB7fSkpOyByZXR1cm4gdHJ1ZTsgfSBjYXRjaCAoZSkgeyByZXR1cm4gZmFsc2U7IH0gfVxuZnVuY3Rpb24gX2dldFByb3RvdHlwZU9mKG8pIHsgX2dldFByb3RvdHlwZU9mID0gT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LmdldFByb3RvdHlwZU9mLmJpbmQoKSA6IGZ1bmN0aW9uIF9nZXRQcm90b3R5cGVPZihvKSB7IHJldHVybiBvLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2Yobyk7IH07IHJldHVybiBfZ2V0UHJvdG90eXBlT2Yobyk7IH1cbnZhciBjb2RlcyA9IHt9O1xuXG4vLyBMYXp5IGxvYWRlZFxudmFyIGFzc2VydDtcbnZhciB1dGlsO1xuZnVuY3Rpb24gY3JlYXRlRXJyb3JUeXBlKGNvZGUsIG1lc3NhZ2UsIEJhc2UpIHtcbiAgaWYgKCFCYXNlKSB7XG4gICAgQmFzZSA9IEVycm9yO1xuICB9XG4gIGZ1bmN0aW9uIGdldE1lc3NhZ2UoYXJnMSwgYXJnMiwgYXJnMykge1xuICAgIGlmICh0eXBlb2YgbWVzc2FnZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiBtZXNzYWdlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbWVzc2FnZShhcmcxLCBhcmcyLCBhcmczKTtcbiAgICB9XG4gIH1cbiAgdmFyIE5vZGVFcnJvciA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoX0Jhc2UpIHtcbiAgICBfaW5oZXJpdHMoTm9kZUVycm9yLCBfQmFzZSk7XG4gICAgdmFyIF9zdXBlciA9IF9jcmVhdGVTdXBlcihOb2RlRXJyb3IpO1xuICAgIGZ1bmN0aW9uIE5vZGVFcnJvcihhcmcxLCBhcmcyLCBhcmczKSB7XG4gICAgICB2YXIgX3RoaXM7XG4gICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgTm9kZUVycm9yKTtcbiAgICAgIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgZ2V0TWVzc2FnZShhcmcxLCBhcmcyLCBhcmczKSk7XG4gICAgICBfdGhpcy5jb2RlID0gY29kZTtcbiAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIF9jcmVhdGVDbGFzcyhOb2RlRXJyb3IpO1xuICB9KEJhc2UpO1xuICBjb2Rlc1tjb2RlXSA9IE5vZGVFcnJvcjtcbn1cblxuLy8gaHR0cHM6Ly9naXRodWIuY29tL25vZGVqcy9ub2RlL2Jsb2IvdjEwLjguMC9saWIvaW50ZXJuYWwvZXJyb3JzLmpzXG5mdW5jdGlvbiBvbmVPZihleHBlY3RlZCwgdGhpbmcpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoZXhwZWN0ZWQpKSB7XG4gICAgdmFyIGxlbiA9IGV4cGVjdGVkLmxlbmd0aDtcbiAgICBleHBlY3RlZCA9IGV4cGVjdGVkLm1hcChmdW5jdGlvbiAoaSkge1xuICAgICAgcmV0dXJuIFN0cmluZyhpKTtcbiAgICB9KTtcbiAgICBpZiAobGVuID4gMikge1xuICAgICAgcmV0dXJuIFwib25lIG9mIFwiLmNvbmNhdCh0aGluZywgXCIgXCIpLmNvbmNhdChleHBlY3RlZC5zbGljZSgwLCBsZW4gLSAxKS5qb2luKCcsICcpLCBcIiwgb3IgXCIpICsgZXhwZWN0ZWRbbGVuIC0gMV07XG4gICAgfSBlbHNlIGlmIChsZW4gPT09IDIpIHtcbiAgICAgIHJldHVybiBcIm9uZSBvZiBcIi5jb25jYXQodGhpbmcsIFwiIFwiKS5jb25jYXQoZXhwZWN0ZWRbMF0sIFwiIG9yIFwiKS5jb25jYXQoZXhwZWN0ZWRbMV0pO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gXCJvZiBcIi5jb25jYXQodGhpbmcsIFwiIFwiKS5jb25jYXQoZXhwZWN0ZWRbMF0pO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gXCJvZiBcIi5jb25jYXQodGhpbmcsIFwiIFwiKS5jb25jYXQoU3RyaW5nKGV4cGVjdGVkKSk7XG4gIH1cbn1cblxuLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvU3RyaW5nL3N0YXJ0c1dpdGhcbmZ1bmN0aW9uIHN0YXJ0c1dpdGgoc3RyLCBzZWFyY2gsIHBvcykge1xuICByZXR1cm4gc3RyLnN1YnN0cighcG9zIHx8IHBvcyA8IDAgPyAwIDogK3Bvcywgc2VhcmNoLmxlbmd0aCkgPT09IHNlYXJjaDtcbn1cblxuLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvU3RyaW5nL2VuZHNXaXRoXG5mdW5jdGlvbiBlbmRzV2l0aChzdHIsIHNlYXJjaCwgdGhpc19sZW4pIHtcbiAgaWYgKHRoaXNfbGVuID09PSB1bmRlZmluZWQgfHwgdGhpc19sZW4gPiBzdHIubGVuZ3RoKSB7XG4gICAgdGhpc19sZW4gPSBzdHIubGVuZ3RoO1xuICB9XG4gIHJldHVybiBzdHIuc3Vic3RyaW5nKHRoaXNfbGVuIC0gc2VhcmNoLmxlbmd0aCwgdGhpc19sZW4pID09PSBzZWFyY2g7XG59XG5cbi8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL1N0cmluZy9pbmNsdWRlc1xuZnVuY3Rpb24gaW5jbHVkZXMoc3RyLCBzZWFyY2gsIHN0YXJ0KSB7XG4gIGlmICh0eXBlb2Ygc3RhcnQgIT09ICdudW1iZXInKSB7XG4gICAgc3RhcnQgPSAwO1xuICB9XG4gIGlmIChzdGFydCArIHNlYXJjaC5sZW5ndGggPiBzdHIubGVuZ3RoKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBzdHIuaW5kZXhPZihzZWFyY2gsIHN0YXJ0KSAhPT0gLTE7XG4gIH1cbn1cbmNyZWF0ZUVycm9yVHlwZSgnRVJSX0FNQklHVU9VU19BUkdVTUVOVCcsICdUaGUgXCIlc1wiIGFyZ3VtZW50IGlzIGFtYmlndW91cy4gJXMnLCBUeXBlRXJyb3IpO1xuY3JlYXRlRXJyb3JUeXBlKCdFUlJfSU5WQUxJRF9BUkdfVFlQRScsIGZ1bmN0aW9uIChuYW1lLCBleHBlY3RlZCwgYWN0dWFsKSB7XG4gIGlmIChhc3NlcnQgPT09IHVuZGVmaW5lZCkgYXNzZXJ0ID0gcmVxdWlyZSgnLi4vYXNzZXJ0Jyk7XG4gIGFzc2VydCh0eXBlb2YgbmFtZSA9PT0gJ3N0cmluZycsIFwiJ25hbWUnIG11c3QgYmUgYSBzdHJpbmdcIik7XG5cbiAgLy8gZGV0ZXJtaW5lcjogJ211c3QgYmUnIG9yICdtdXN0IG5vdCBiZSdcbiAgdmFyIGRldGVybWluZXI7XG4gIGlmICh0eXBlb2YgZXhwZWN0ZWQgPT09ICdzdHJpbmcnICYmIHN0YXJ0c1dpdGgoZXhwZWN0ZWQsICdub3QgJykpIHtcbiAgICBkZXRlcm1pbmVyID0gJ211c3Qgbm90IGJlJztcbiAgICBleHBlY3RlZCA9IGV4cGVjdGVkLnJlcGxhY2UoL15ub3QgLywgJycpO1xuICB9IGVsc2Uge1xuICAgIGRldGVybWluZXIgPSAnbXVzdCBiZSc7XG4gIH1cbiAgdmFyIG1zZztcbiAgaWYgKGVuZHNXaXRoKG5hbWUsICcgYXJndW1lbnQnKSkge1xuICAgIC8vIEZvciBjYXNlcyBsaWtlICdmaXJzdCBhcmd1bWVudCdcbiAgICBtc2cgPSBcIlRoZSBcIi5jb25jYXQobmFtZSwgXCIgXCIpLmNvbmNhdChkZXRlcm1pbmVyLCBcIiBcIikuY29uY2F0KG9uZU9mKGV4cGVjdGVkLCAndHlwZScpKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgdHlwZSA9IGluY2x1ZGVzKG5hbWUsICcuJykgPyAncHJvcGVydHknIDogJ2FyZ3VtZW50JztcbiAgICBtc2cgPSBcIlRoZSBcXFwiXCIuY29uY2F0KG5hbWUsIFwiXFxcIiBcIikuY29uY2F0KHR5cGUsIFwiIFwiKS5jb25jYXQoZGV0ZXJtaW5lciwgXCIgXCIpLmNvbmNhdChvbmVPZihleHBlY3RlZCwgJ3R5cGUnKSk7XG4gIH1cblxuICAvLyBUT0RPKEJyaWRnZUFSKTogSW1wcm92ZSB0aGUgb3V0cHV0IGJ5IHNob3dpbmcgYG51bGxgIGFuZCBzaW1pbGFyLlxuICBtc2cgKz0gXCIuIFJlY2VpdmVkIHR5cGUgXCIuY29uY2F0KF90eXBlb2YoYWN0dWFsKSk7XG4gIHJldHVybiBtc2c7XG59LCBUeXBlRXJyb3IpO1xuY3JlYXRlRXJyb3JUeXBlKCdFUlJfSU5WQUxJRF9BUkdfVkFMVUUnLCBmdW5jdGlvbiAobmFtZSwgdmFsdWUpIHtcbiAgdmFyIHJlYXNvbiA9IGFyZ3VtZW50cy5sZW5ndGggPiAyICYmIGFyZ3VtZW50c1syXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzJdIDogJ2lzIGludmFsaWQnO1xuICBpZiAodXRpbCA9PT0gdW5kZWZpbmVkKSB1dGlsID0gcmVxdWlyZSgndXRpbC8nKTtcbiAgdmFyIGluc3BlY3RlZCA9IHV0aWwuaW5zcGVjdCh2YWx1ZSk7XG4gIGlmIChpbnNwZWN0ZWQubGVuZ3RoID4gMTI4KSB7XG4gICAgaW5zcGVjdGVkID0gXCJcIi5jb25jYXQoaW5zcGVjdGVkLnNsaWNlKDAsIDEyOCksIFwiLi4uXCIpO1xuICB9XG4gIHJldHVybiBcIlRoZSBhcmd1bWVudCAnXCIuY29uY2F0KG5hbWUsIFwiJyBcIikuY29uY2F0KHJlYXNvbiwgXCIuIFJlY2VpdmVkIFwiKS5jb25jYXQoaW5zcGVjdGVkKTtcbn0sIFR5cGVFcnJvciwgUmFuZ2VFcnJvcik7XG5jcmVhdGVFcnJvclR5cGUoJ0VSUl9JTlZBTElEX1JFVFVSTl9WQUxVRScsIGZ1bmN0aW9uIChpbnB1dCwgbmFtZSwgdmFsdWUpIHtcbiAgdmFyIHR5cGU7XG4gIGlmICh2YWx1ZSAmJiB2YWx1ZS5jb25zdHJ1Y3RvciAmJiB2YWx1ZS5jb25zdHJ1Y3Rvci5uYW1lKSB7XG4gICAgdHlwZSA9IFwiaW5zdGFuY2Ugb2YgXCIuY29uY2F0KHZhbHVlLmNvbnN0cnVjdG9yLm5hbWUpO1xuICB9IGVsc2Uge1xuICAgIHR5cGUgPSBcInR5cGUgXCIuY29uY2F0KF90eXBlb2YodmFsdWUpKTtcbiAgfVxuICByZXR1cm4gXCJFeHBlY3RlZCBcIi5jb25jYXQoaW5wdXQsIFwiIHRvIGJlIHJldHVybmVkIGZyb20gdGhlIFxcXCJcIikuY29uY2F0KG5hbWUsIFwiXFxcIlwiKSArIFwiIGZ1bmN0aW9uIGJ1dCBnb3QgXCIuY29uY2F0KHR5cGUsIFwiLlwiKTtcbn0sIFR5cGVFcnJvcik7XG5jcmVhdGVFcnJvclR5cGUoJ0VSUl9NSVNTSU5HX0FSR1MnLCBmdW5jdGlvbiAoKSB7XG4gIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgIGFyZ3NbX2tleV0gPSBhcmd1bWVudHNbX2tleV07XG4gIH1cbiAgaWYgKGFzc2VydCA9PT0gdW5kZWZpbmVkKSBhc3NlcnQgPSByZXF1aXJlKCcuLi9hc3NlcnQnKTtcbiAgYXNzZXJ0KGFyZ3MubGVuZ3RoID4gMCwgJ0F0IGxlYXN0IG9uZSBhcmcgbmVlZHMgdG8gYmUgc3BlY2lmaWVkJyk7XG4gIHZhciBtc2cgPSAnVGhlICc7XG4gIHZhciBsZW4gPSBhcmdzLmxlbmd0aDtcbiAgYXJncyA9IGFyZ3MubWFwKGZ1bmN0aW9uIChhKSB7XG4gICAgcmV0dXJuIFwiXFxcIlwiLmNvbmNhdChhLCBcIlxcXCJcIik7XG4gIH0pO1xuICBzd2l0Y2ggKGxlbikge1xuICAgIGNhc2UgMTpcbiAgICAgIG1zZyArPSBcIlwiLmNvbmNhdChhcmdzWzBdLCBcIiBhcmd1bWVudFwiKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgMjpcbiAgICAgIG1zZyArPSBcIlwiLmNvbmNhdChhcmdzWzBdLCBcIiBhbmQgXCIpLmNvbmNhdChhcmdzWzFdLCBcIiBhcmd1bWVudHNcIik7XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgbXNnICs9IGFyZ3Muc2xpY2UoMCwgbGVuIC0gMSkuam9pbignLCAnKTtcbiAgICAgIG1zZyArPSBcIiwgYW5kIFwiLmNvbmNhdChhcmdzW2xlbiAtIDFdLCBcIiBhcmd1bWVudHNcIik7XG4gICAgICBicmVhaztcbiAgfVxuICByZXR1cm4gXCJcIi5jb25jYXQobXNnLCBcIiBtdXN0IGJlIHNwZWNpZmllZFwiKTtcbn0sIFR5cGVFcnJvcik7XG5tb2R1bGUuZXhwb3J0cy5jb2RlcyA9IGNvZGVzOyIsIi8vIEN1cnJlbnRseSBpbiBzeW5jIHdpdGggTm9kZS5qcyBsaWIvaW50ZXJuYWwvdXRpbC9jb21wYXJpc29ucy5qc1xuLy8gaHR0cHM6Ly9naXRodWIuY29tL25vZGVqcy9ub2RlL2NvbW1pdC8xMTJjYzdjMjc1NTEyNTRhYTJiMTcwOThmYjc3NDg2N2YwNWVkMGQ5XG5cbid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gX3NsaWNlZFRvQXJyYXkoYXJyLCBpKSB7IHJldHVybiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB8fCBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB8fCBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkoYXJyLCBpKSB8fCBfbm9uSXRlcmFibGVSZXN0KCk7IH1cbmZ1bmN0aW9uIF9ub25JdGVyYWJsZVJlc3QoKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlLlxcbkluIG9yZGVyIHRvIGJlIGl0ZXJhYmxlLCBub24tYXJyYXkgb2JqZWN0cyBtdXN0IGhhdmUgYSBbU3ltYm9sLml0ZXJhdG9yXSgpIG1ldGhvZC5cIik7IH1cbmZ1bmN0aW9uIF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShvLCBtaW5MZW4pIHsgaWYgKCFvKSByZXR1cm47IGlmICh0eXBlb2YgbyA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IHZhciBuID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pLnNsaWNlKDgsIC0xKTsgaWYgKG4gPT09IFwiT2JqZWN0XCIgJiYgby5jb25zdHJ1Y3RvcikgbiA9IG8uY29uc3RydWN0b3IubmFtZTsgaWYgKG4gPT09IFwiTWFwXCIgfHwgbiA9PT0gXCJTZXRcIikgcmV0dXJuIEFycmF5LmZyb20obyk7IGlmIChuID09PSBcIkFyZ3VtZW50c1wiIHx8IC9eKD86VWl8SSludCg/Ojh8MTZ8MzIpKD86Q2xhbXBlZCk/QXJyYXkkLy50ZXN0KG4pKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgfVxuZnVuY3Rpb24gX2FycmF5TGlrZVRvQXJyYXkoYXJyLCBsZW4pIHsgaWYgKGxlbiA9PSBudWxsIHx8IGxlbiA+IGFyci5sZW5ndGgpIGxlbiA9IGFyci5sZW5ndGg7IGZvciAodmFyIGkgPSAwLCBhcnIyID0gbmV3IEFycmF5KGxlbik7IGkgPCBsZW47IGkrKykgYXJyMltpXSA9IGFycltpXTsgcmV0dXJuIGFycjI7IH1cbmZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXlMaW1pdChyLCBsKSB7IHZhciB0ID0gbnVsbCA9PSByID8gbnVsbCA6IFwidW5kZWZpbmVkXCIgIT0gdHlwZW9mIFN5bWJvbCAmJiByW1N5bWJvbC5pdGVyYXRvcl0gfHwgcltcIkBAaXRlcmF0b3JcIl07IGlmIChudWxsICE9IHQpIHsgdmFyIGUsIG4sIGksIHUsIGEgPSBbXSwgZiA9ICEwLCBvID0gITE7IHRyeSB7IGlmIChpID0gKHQgPSB0LmNhbGwocikpLm5leHQsIDAgPT09IGwpIHsgaWYgKE9iamVjdCh0KSAhPT0gdCkgcmV0dXJuOyBmID0gITE7IH0gZWxzZSBmb3IgKDsgIShmID0gKGUgPSBpLmNhbGwodCkpLmRvbmUpICYmIChhLnB1c2goZS52YWx1ZSksIGEubGVuZ3RoICE9PSBsKTsgZiA9ICEwKTsgfSBjYXRjaCAocikgeyBvID0gITAsIG4gPSByOyB9IGZpbmFsbHkgeyB0cnkgeyBpZiAoIWYgJiYgbnVsbCAhPSB0LnJldHVybiAmJiAodSA9IHQucmV0dXJuKCksIE9iamVjdCh1KSAhPT0gdSkpIHJldHVybjsgfSBmaW5hbGx5IHsgaWYgKG8pIHRocm93IG47IH0gfSByZXR1cm4gYTsgfSB9XG5mdW5jdGlvbiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB7IGlmIChBcnJheS5pc0FycmF5KGFycikpIHJldHVybiBhcnI7IH1cbmZ1bmN0aW9uIF90eXBlb2YobykgeyBcIkBiYWJlbC9oZWxwZXJzIC0gdHlwZW9mXCI7IHJldHVybiBfdHlwZW9mID0gXCJmdW5jdGlvblwiID09IHR5cGVvZiBTeW1ib2wgJiYgXCJzeW1ib2xcIiA9PSB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID8gZnVuY3Rpb24gKG8pIHsgcmV0dXJuIHR5cGVvZiBvOyB9IDogZnVuY3Rpb24gKG8pIHsgcmV0dXJuIG8gJiYgXCJmdW5jdGlvblwiID09IHR5cGVvZiBTeW1ib2wgJiYgby5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG8gIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG87IH0sIF90eXBlb2Yobyk7IH1cbnZhciByZWdleEZsYWdzU3VwcG9ydGVkID0gL2EvZy5mbGFncyAhPT0gdW5kZWZpbmVkO1xudmFyIGFycmF5RnJvbVNldCA9IGZ1bmN0aW9uIGFycmF5RnJvbVNldChzZXQpIHtcbiAgdmFyIGFycmF5ID0gW107XG4gIHNldC5mb3JFYWNoKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgIHJldHVybiBhcnJheS5wdXNoKHZhbHVlKTtcbiAgfSk7XG4gIHJldHVybiBhcnJheTtcbn07XG52YXIgYXJyYXlGcm9tTWFwID0gZnVuY3Rpb24gYXJyYXlGcm9tTWFwKG1hcCkge1xuICB2YXIgYXJyYXkgPSBbXTtcbiAgbWFwLmZvckVhY2goZnVuY3Rpb24gKHZhbHVlLCBrZXkpIHtcbiAgICByZXR1cm4gYXJyYXkucHVzaChba2V5LCB2YWx1ZV0pO1xuICB9KTtcbiAgcmV0dXJuIGFycmF5O1xufTtcbnZhciBvYmplY3RJcyA9IE9iamVjdC5pcyA/IE9iamVjdC5pcyA6IHJlcXVpcmUoJ29iamVjdC1pcycpO1xudmFyIG9iamVjdEdldE93blByb3BlcnR5U3ltYm9scyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPyBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzIDogZnVuY3Rpb24gKCkge1xuICByZXR1cm4gW107XG59O1xudmFyIG51bWJlcklzTmFOID0gTnVtYmVyLmlzTmFOID8gTnVtYmVyLmlzTmFOIDogcmVxdWlyZSgnaXMtbmFuJyk7XG5mdW5jdGlvbiB1bmN1cnJ5VGhpcyhmKSB7XG4gIHJldHVybiBmLmNhbGwuYmluZChmKTtcbn1cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IHVuY3VycnlUaGlzKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkpO1xudmFyIHByb3BlcnR5SXNFbnVtZXJhYmxlID0gdW5jdXJyeVRoaXMoT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZSk7XG52YXIgb2JqZWN0VG9TdHJpbmcgPSB1bmN1cnJ5VGhpcyhPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nKTtcbnZhciBfcmVxdWlyZSR0eXBlcyA9IHJlcXVpcmUoJ3V0aWwvJykudHlwZXMsXG4gIGlzQW55QXJyYXlCdWZmZXIgPSBfcmVxdWlyZSR0eXBlcy5pc0FueUFycmF5QnVmZmVyLFxuICBpc0FycmF5QnVmZmVyVmlldyA9IF9yZXF1aXJlJHR5cGVzLmlzQXJyYXlCdWZmZXJWaWV3LFxuICBpc0RhdGUgPSBfcmVxdWlyZSR0eXBlcy5pc0RhdGUsXG4gIGlzTWFwID0gX3JlcXVpcmUkdHlwZXMuaXNNYXAsXG4gIGlzUmVnRXhwID0gX3JlcXVpcmUkdHlwZXMuaXNSZWdFeHAsXG4gIGlzU2V0ID0gX3JlcXVpcmUkdHlwZXMuaXNTZXQsXG4gIGlzTmF0aXZlRXJyb3IgPSBfcmVxdWlyZSR0eXBlcy5pc05hdGl2ZUVycm9yLFxuICBpc0JveGVkUHJpbWl0aXZlID0gX3JlcXVpcmUkdHlwZXMuaXNCb3hlZFByaW1pdGl2ZSxcbiAgaXNOdW1iZXJPYmplY3QgPSBfcmVxdWlyZSR0eXBlcy5pc051bWJlck9iamVjdCxcbiAgaXNTdHJpbmdPYmplY3QgPSBfcmVxdWlyZSR0eXBlcy5pc1N0cmluZ09iamVjdCxcbiAgaXNCb29sZWFuT2JqZWN0ID0gX3JlcXVpcmUkdHlwZXMuaXNCb29sZWFuT2JqZWN0LFxuICBpc0JpZ0ludE9iamVjdCA9IF9yZXF1aXJlJHR5cGVzLmlzQmlnSW50T2JqZWN0LFxuICBpc1N5bWJvbE9iamVjdCA9IF9yZXF1aXJlJHR5cGVzLmlzU3ltYm9sT2JqZWN0LFxuICBpc0Zsb2F0MzJBcnJheSA9IF9yZXF1aXJlJHR5cGVzLmlzRmxvYXQzMkFycmF5LFxuICBpc0Zsb2F0NjRBcnJheSA9IF9yZXF1aXJlJHR5cGVzLmlzRmxvYXQ2NEFycmF5O1xuZnVuY3Rpb24gaXNOb25JbmRleChrZXkpIHtcbiAgaWYgKGtleS5sZW5ndGggPT09IDAgfHwga2V5Lmxlbmd0aCA+IDEwKSByZXR1cm4gdHJ1ZTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXkubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgY29kZSA9IGtleS5jaGFyQ29kZUF0KGkpO1xuICAgIGlmIChjb2RlIDwgNDggfHwgY29kZSA+IDU3KSByZXR1cm4gdHJ1ZTtcbiAgfVxuICAvLyBUaGUgbWF4aW11bSBzaXplIGZvciBhbiBhcnJheSBpcyAyICoqIDMyIC0xLlxuICByZXR1cm4ga2V5Lmxlbmd0aCA9PT0gMTAgJiYga2V5ID49IE1hdGgucG93KDIsIDMyKTtcbn1cbmZ1bmN0aW9uIGdldE93bk5vbkluZGV4UHJvcGVydGllcyh2YWx1ZSkge1xuICByZXR1cm4gT2JqZWN0LmtleXModmFsdWUpLmZpbHRlcihpc05vbkluZGV4KS5jb25jYXQob2JqZWN0R2V0T3duUHJvcGVydHlTeW1ib2xzKHZhbHVlKS5maWx0ZXIoT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5iaW5kKHZhbHVlKSkpO1xufVxuXG4vLyBUYWtlbiBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9mZXJvc3MvYnVmZmVyL2Jsb2IvNjgwZTllNWU0ODhmMjJhYWMyNzU5OWE1N2RjODQ0YTYzMTU5MjhkZC9pbmRleC5qc1xuLy8gb3JpZ2luYWwgbm90aWNlOlxuLyohXG4gKiBUaGUgYnVmZmVyIG1vZHVsZSBmcm9tIG5vZGUuanMsIGZvciB0aGUgYnJvd3Nlci5cbiAqXG4gKiBAYXV0aG9yICAgRmVyb3NzIEFib3VraGFkaWplaCA8ZmVyb3NzQGZlcm9zcy5vcmc+IDxodHRwOi8vZmVyb3NzLm9yZz5cbiAqIEBsaWNlbnNlICBNSVRcbiAqL1xuZnVuY3Rpb24gY29tcGFyZShhLCBiKSB7XG4gIGlmIChhID09PSBiKSB7XG4gICAgcmV0dXJuIDA7XG4gIH1cbiAgdmFyIHggPSBhLmxlbmd0aDtcbiAgdmFyIHkgPSBiLmxlbmd0aDtcbiAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IE1hdGgubWluKHgsIHkpOyBpIDwgbGVuOyArK2kpIHtcbiAgICBpZiAoYVtpXSAhPT0gYltpXSkge1xuICAgICAgeCA9IGFbaV07XG4gICAgICB5ID0gYltpXTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICBpZiAoeCA8IHkpIHtcbiAgICByZXR1cm4gLTE7XG4gIH1cbiAgaWYgKHkgPCB4KSB7XG4gICAgcmV0dXJuIDE7XG4gIH1cbiAgcmV0dXJuIDA7XG59XG52YXIgT05MWV9FTlVNRVJBQkxFID0gdW5kZWZpbmVkO1xudmFyIGtTdHJpY3QgPSB0cnVlO1xudmFyIGtMb29zZSA9IGZhbHNlO1xudmFyIGtOb0l0ZXJhdG9yID0gMDtcbnZhciBrSXNBcnJheSA9IDE7XG52YXIga0lzU2V0ID0gMjtcbnZhciBrSXNNYXAgPSAzO1xuXG4vLyBDaGVjayBpZiB0aGV5IGhhdmUgdGhlIHNhbWUgc291cmNlIGFuZCBmbGFnc1xuZnVuY3Rpb24gYXJlU2ltaWxhclJlZ0V4cHMoYSwgYikge1xuICByZXR1cm4gcmVnZXhGbGFnc1N1cHBvcnRlZCA/IGEuc291cmNlID09PSBiLnNvdXJjZSAmJiBhLmZsYWdzID09PSBiLmZsYWdzIDogUmVnRXhwLnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGEpID09PSBSZWdFeHAucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoYik7XG59XG5mdW5jdGlvbiBhcmVTaW1pbGFyRmxvYXRBcnJheXMoYSwgYikge1xuICBpZiAoYS5ieXRlTGVuZ3RoICE9PSBiLmJ5dGVMZW5ndGgpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgZm9yICh2YXIgb2Zmc2V0ID0gMDsgb2Zmc2V0IDwgYS5ieXRlTGVuZ3RoOyBvZmZzZXQrKykge1xuICAgIGlmIChhW29mZnNldF0gIT09IGJbb2Zmc2V0XSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cbmZ1bmN0aW9uIGFyZVNpbWlsYXJUeXBlZEFycmF5cyhhLCBiKSB7XG4gIGlmIChhLmJ5dGVMZW5ndGggIT09IGIuYnl0ZUxlbmd0aCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4gY29tcGFyZShuZXcgVWludDhBcnJheShhLmJ1ZmZlciwgYS5ieXRlT2Zmc2V0LCBhLmJ5dGVMZW5ndGgpLCBuZXcgVWludDhBcnJheShiLmJ1ZmZlciwgYi5ieXRlT2Zmc2V0LCBiLmJ5dGVMZW5ndGgpKSA9PT0gMDtcbn1cbmZ1bmN0aW9uIGFyZUVxdWFsQXJyYXlCdWZmZXJzKGJ1ZjEsIGJ1ZjIpIHtcbiAgcmV0dXJuIGJ1ZjEuYnl0ZUxlbmd0aCA9PT0gYnVmMi5ieXRlTGVuZ3RoICYmIGNvbXBhcmUobmV3IFVpbnQ4QXJyYXkoYnVmMSksIG5ldyBVaW50OEFycmF5KGJ1ZjIpKSA9PT0gMDtcbn1cbmZ1bmN0aW9uIGlzRXF1YWxCb3hlZFByaW1pdGl2ZSh2YWwxLCB2YWwyKSB7XG4gIGlmIChpc051bWJlck9iamVjdCh2YWwxKSkge1xuICAgIHJldHVybiBpc051bWJlck9iamVjdCh2YWwyKSAmJiBvYmplY3RJcyhOdW1iZXIucHJvdG90eXBlLnZhbHVlT2YuY2FsbCh2YWwxKSwgTnVtYmVyLnByb3RvdHlwZS52YWx1ZU9mLmNhbGwodmFsMikpO1xuICB9XG4gIGlmIChpc1N0cmluZ09iamVjdCh2YWwxKSkge1xuICAgIHJldHVybiBpc1N0cmluZ09iamVjdCh2YWwyKSAmJiBTdHJpbmcucHJvdG90eXBlLnZhbHVlT2YuY2FsbCh2YWwxKSA9PT0gU3RyaW5nLnByb3RvdHlwZS52YWx1ZU9mLmNhbGwodmFsMik7XG4gIH1cbiAgaWYgKGlzQm9vbGVhbk9iamVjdCh2YWwxKSkge1xuICAgIHJldHVybiBpc0Jvb2xlYW5PYmplY3QodmFsMikgJiYgQm9vbGVhbi5wcm90b3R5cGUudmFsdWVPZi5jYWxsKHZhbDEpID09PSBCb29sZWFuLnByb3RvdHlwZS52YWx1ZU9mLmNhbGwodmFsMik7XG4gIH1cbiAgaWYgKGlzQmlnSW50T2JqZWN0KHZhbDEpKSB7XG4gICAgcmV0dXJuIGlzQmlnSW50T2JqZWN0KHZhbDIpICYmIEJpZ0ludC5wcm90b3R5cGUudmFsdWVPZi5jYWxsKHZhbDEpID09PSBCaWdJbnQucHJvdG90eXBlLnZhbHVlT2YuY2FsbCh2YWwyKTtcbiAgfVxuICByZXR1cm4gaXNTeW1ib2xPYmplY3QodmFsMikgJiYgU3ltYm9sLnByb3RvdHlwZS52YWx1ZU9mLmNhbGwodmFsMSkgPT09IFN5bWJvbC5wcm90b3R5cGUudmFsdWVPZi5jYWxsKHZhbDIpO1xufVxuXG4vLyBOb3RlczogVHlwZSB0YWdzIGFyZSBoaXN0b3JpY2FsIFtbQ2xhc3NdXSBwcm9wZXJ0aWVzIHRoYXQgY2FuIGJlIHNldCBieVxuLy8gRnVuY3Rpb25UZW1wbGF0ZTo6U2V0Q2xhc3NOYW1lKCkgaW4gQysrIG9yIFN5bWJvbC50b1N0cmluZ1RhZyBpbiBKU1xuLy8gYW5kIHJldHJpZXZlZCB1c2luZyBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqKSBpbiBKU1xuLy8gU2VlIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmdcbi8vIGZvciBhIGxpc3Qgb2YgdGFncyBwcmUtZGVmaW5lZCBpbiB0aGUgc3BlYy5cbi8vIFRoZXJlIGFyZSBzb21lIHVuc3BlY2lmaWVkIHRhZ3MgaW4gdGhlIHdpbGQgdG9vIChlLmcuIHR5cGVkIGFycmF5IHRhZ3MpLlxuLy8gU2luY2UgdGFncyBjYW4gYmUgYWx0ZXJlZCwgdGhleSBvbmx5IHNlcnZlIGZhc3QgZmFpbHVyZXNcbi8vXG4vLyBUeXBlZCBhcnJheXMgYW5kIGJ1ZmZlcnMgYXJlIGNoZWNrZWQgYnkgY29tcGFyaW5nIHRoZSBjb250ZW50IGluIHRoZWlyXG4vLyB1bmRlcmx5aW5nIEFycmF5QnVmZmVyLiBUaGlzIG9wdGltaXphdGlvbiByZXF1aXJlcyB0aGF0IGl0J3Ncbi8vIHJlYXNvbmFibGUgdG8gaW50ZXJwcmV0IHRoZWlyIHVuZGVybHlpbmcgbWVtb3J5IGluIHRoZSBzYW1lIHdheSxcbi8vIHdoaWNoIGlzIGNoZWNrZWQgYnkgY29tcGFyaW5nIHRoZWlyIHR5cGUgdGFncy5cbi8vIChlLmcuIGEgVWludDhBcnJheSBhbmQgYSBVaW50MTZBcnJheSB3aXRoIHRoZSBzYW1lIG1lbW9yeSBjb250ZW50XG4vLyBjb3VsZCBzdGlsbCBiZSBkaWZmZXJlbnQgYmVjYXVzZSB0aGV5IHdpbGwgYmUgaW50ZXJwcmV0ZWQgZGlmZmVyZW50bHkpLlxuLy9cbi8vIEZvciBzdHJpY3QgY29tcGFyaXNvbiwgb2JqZWN0cyBzaG91bGQgaGF2ZVxuLy8gYSkgVGhlIHNhbWUgYnVpbHQtaW4gdHlwZSB0YWdzXG4vLyBiKSBUaGUgc2FtZSBwcm90b3R5cGVzLlxuXG5mdW5jdGlvbiBpbm5lckRlZXBFcXVhbCh2YWwxLCB2YWwyLCBzdHJpY3QsIG1lbW9zKSB7XG4gIC8vIEFsbCBpZGVudGljYWwgdmFsdWVzIGFyZSBlcXVpdmFsZW50LCBhcyBkZXRlcm1pbmVkIGJ5ID09PS5cbiAgaWYgKHZhbDEgPT09IHZhbDIpIHtcbiAgICBpZiAodmFsMSAhPT0gMCkgcmV0dXJuIHRydWU7XG4gICAgcmV0dXJuIHN0cmljdCA/IG9iamVjdElzKHZhbDEsIHZhbDIpIDogdHJ1ZTtcbiAgfVxuXG4gIC8vIENoZWNrIG1vcmUgY2xvc2VseSBpZiB2YWwxIGFuZCB2YWwyIGFyZSBlcXVhbC5cbiAgaWYgKHN0cmljdCkge1xuICAgIGlmIChfdHlwZW9mKHZhbDEpICE9PSAnb2JqZWN0Jykge1xuICAgICAgcmV0dXJuIHR5cGVvZiB2YWwxID09PSAnbnVtYmVyJyAmJiBudW1iZXJJc05hTih2YWwxKSAmJiBudW1iZXJJc05hTih2YWwyKTtcbiAgICB9XG4gICAgaWYgKF90eXBlb2YodmFsMikgIT09ICdvYmplY3QnIHx8IHZhbDEgPT09IG51bGwgfHwgdmFsMiA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoT2JqZWN0LmdldFByb3RvdHlwZU9mKHZhbDEpICE9PSBPYmplY3QuZ2V0UHJvdG90eXBlT2YodmFsMikpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgaWYgKHZhbDEgPT09IG51bGwgfHwgX3R5cGVvZih2YWwxKSAhPT0gJ29iamVjdCcpIHtcbiAgICAgIGlmICh2YWwyID09PSBudWxsIHx8IF90eXBlb2YodmFsMikgIT09ICdvYmplY3QnKSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcWVxZXFcbiAgICAgICAgcmV0dXJuIHZhbDEgPT0gdmFsMjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKHZhbDIgPT09IG51bGwgfHwgX3R5cGVvZih2YWwyKSAhPT0gJ29iamVjdCcpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbiAgdmFyIHZhbDFUYWcgPSBvYmplY3RUb1N0cmluZyh2YWwxKTtcbiAgdmFyIHZhbDJUYWcgPSBvYmplY3RUb1N0cmluZyh2YWwyKTtcbiAgaWYgKHZhbDFUYWcgIT09IHZhbDJUYWcpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgaWYgKEFycmF5LmlzQXJyYXkodmFsMSkpIHtcbiAgICAvLyBDaGVjayBmb3Igc3BhcnNlIGFycmF5cyBhbmQgZ2VuZXJhbCBmYXN0IHBhdGhcbiAgICBpZiAodmFsMS5sZW5ndGggIT09IHZhbDIubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHZhciBrZXlzMSA9IGdldE93bk5vbkluZGV4UHJvcGVydGllcyh2YWwxLCBPTkxZX0VOVU1FUkFCTEUpO1xuICAgIHZhciBrZXlzMiA9IGdldE93bk5vbkluZGV4UHJvcGVydGllcyh2YWwyLCBPTkxZX0VOVU1FUkFCTEUpO1xuICAgIGlmIChrZXlzMS5sZW5ndGggIT09IGtleXMyLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4ga2V5Q2hlY2sodmFsMSwgdmFsMiwgc3RyaWN0LCBtZW1vcywga0lzQXJyYXksIGtleXMxKTtcbiAgfVxuICAvLyBbYnJvd3NlcmlmeV0gVGhpcyB0cmlnZ2VycyBvbiBjZXJ0YWluIHR5cGVzIGluIElFIChNYXAvU2V0KSBzbyB3ZSBkb24ndFxuICAvLyB3YW4ndCB0byBlYXJseSByZXR1cm4gb3V0IG9mIHRoZSByZXN0IG9mIHRoZSBjaGVja3MuIEhvd2V2ZXIgd2UgY2FuIGNoZWNrXG4gIC8vIGlmIHRoZSBzZWNvbmQgdmFsdWUgaXMgb25lIG9mIHRoZXNlIHZhbHVlcyBhbmQgdGhlIGZpcnN0IGlzbid0LlxuICBpZiAodmFsMVRhZyA9PT0gJ1tvYmplY3QgT2JqZWN0XScpIHtcbiAgICAvLyByZXR1cm4ga2V5Q2hlY2sodmFsMSwgdmFsMiwgc3RyaWN0LCBtZW1vcywga05vSXRlcmF0b3IpO1xuICAgIGlmICghaXNNYXAodmFsMSkgJiYgaXNNYXAodmFsMikgfHwgIWlzU2V0KHZhbDEpICYmIGlzU2V0KHZhbDIpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG4gIGlmIChpc0RhdGUodmFsMSkpIHtcbiAgICBpZiAoIWlzRGF0ZSh2YWwyKSB8fCBEYXRlLnByb3RvdHlwZS5nZXRUaW1lLmNhbGwodmFsMSkgIT09IERhdGUucHJvdG90eXBlLmdldFRpbWUuY2FsbCh2YWwyKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfSBlbHNlIGlmIChpc1JlZ0V4cCh2YWwxKSkge1xuICAgIGlmICghaXNSZWdFeHAodmFsMikgfHwgIWFyZVNpbWlsYXJSZWdFeHBzKHZhbDEsIHZhbDIpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9IGVsc2UgaWYgKGlzTmF0aXZlRXJyb3IodmFsMSkgfHwgdmFsMSBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgLy8gRG8gbm90IGNvbXBhcmUgdGhlIHN0YWNrIGFzIGl0IG1pZ2h0IGRpZmZlciBldmVuIHRob3VnaCB0aGUgZXJyb3IgaXRzZWxmXG4gICAgLy8gaXMgb3RoZXJ3aXNlIGlkZW50aWNhbC5cbiAgICBpZiAodmFsMS5tZXNzYWdlICE9PSB2YWwyLm1lc3NhZ2UgfHwgdmFsMS5uYW1lICE9PSB2YWwyLm5hbWUpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoaXNBcnJheUJ1ZmZlclZpZXcodmFsMSkpIHtcbiAgICBpZiAoIXN0cmljdCAmJiAoaXNGbG9hdDMyQXJyYXkodmFsMSkgfHwgaXNGbG9hdDY0QXJyYXkodmFsMSkpKSB7XG4gICAgICBpZiAoIWFyZVNpbWlsYXJGbG9hdEFycmF5cyh2YWwxLCB2YWwyKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICghYXJlU2ltaWxhclR5cGVkQXJyYXlzKHZhbDEsIHZhbDIpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIC8vIEJ1ZmZlci5jb21wYXJlIHJldHVybnMgdHJ1ZSwgc28gdmFsMS5sZW5ndGggPT09IHZhbDIubGVuZ3RoLiBJZiB0aGV5IGJvdGhcbiAgICAvLyBvbmx5IGNvbnRhaW4gbnVtZXJpYyBrZXlzLCB3ZSBkb24ndCBuZWVkIHRvIGV4YW0gZnVydGhlciB0aGFuIGNoZWNraW5nXG4gICAgLy8gdGhlIHN5bWJvbHMuXG4gICAgdmFyIF9rZXlzID0gZ2V0T3duTm9uSW5kZXhQcm9wZXJ0aWVzKHZhbDEsIE9OTFlfRU5VTUVSQUJMRSk7XG4gICAgdmFyIF9rZXlzMiA9IGdldE93bk5vbkluZGV4UHJvcGVydGllcyh2YWwyLCBPTkxZX0VOVU1FUkFCTEUpO1xuICAgIGlmIChfa2V5cy5sZW5ndGggIT09IF9rZXlzMi5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIGtleUNoZWNrKHZhbDEsIHZhbDIsIHN0cmljdCwgbWVtb3MsIGtOb0l0ZXJhdG9yLCBfa2V5cyk7XG4gIH0gZWxzZSBpZiAoaXNTZXQodmFsMSkpIHtcbiAgICBpZiAoIWlzU2V0KHZhbDIpIHx8IHZhbDEuc2l6ZSAhPT0gdmFsMi5zaXplKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiBrZXlDaGVjayh2YWwxLCB2YWwyLCBzdHJpY3QsIG1lbW9zLCBrSXNTZXQpO1xuICB9IGVsc2UgaWYgKGlzTWFwKHZhbDEpKSB7XG4gICAgaWYgKCFpc01hcCh2YWwyKSB8fCB2YWwxLnNpemUgIT09IHZhbDIuc2l6ZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4ga2V5Q2hlY2sodmFsMSwgdmFsMiwgc3RyaWN0LCBtZW1vcywga0lzTWFwKTtcbiAgfSBlbHNlIGlmIChpc0FueUFycmF5QnVmZmVyKHZhbDEpKSB7XG4gICAgaWYgKCFhcmVFcXVhbEFycmF5QnVmZmVycyh2YWwxLCB2YWwyKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfSBlbHNlIGlmIChpc0JveGVkUHJpbWl0aXZlKHZhbDEpICYmICFpc0VxdWFsQm94ZWRQcmltaXRpdmUodmFsMSwgdmFsMikpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIGtleUNoZWNrKHZhbDEsIHZhbDIsIHN0cmljdCwgbWVtb3MsIGtOb0l0ZXJhdG9yKTtcbn1cbmZ1bmN0aW9uIGdldEVudW1lcmFibGVzKHZhbCwga2V5cykge1xuICByZXR1cm4ga2V5cy5maWx0ZXIoZnVuY3Rpb24gKGspIHtcbiAgICByZXR1cm4gcHJvcGVydHlJc0VudW1lcmFibGUodmFsLCBrKTtcbiAgfSk7XG59XG5mdW5jdGlvbiBrZXlDaGVjayh2YWwxLCB2YWwyLCBzdHJpY3QsIG1lbW9zLCBpdGVyYXRpb25UeXBlLCBhS2V5cykge1xuICAvLyBGb3IgYWxsIHJlbWFpbmluZyBPYmplY3QgcGFpcnMsIGluY2x1ZGluZyBBcnJheSwgb2JqZWN0cyBhbmQgTWFwcyxcbiAgLy8gZXF1aXZhbGVuY2UgaXMgZGV0ZXJtaW5lZCBieSBoYXZpbmc6XG4gIC8vIGEpIFRoZSBzYW1lIG51bWJlciBvZiBvd25lZCBlbnVtZXJhYmxlIHByb3BlcnRpZXNcbiAgLy8gYikgVGhlIHNhbWUgc2V0IG9mIGtleXMvaW5kZXhlcyAoYWx0aG91Z2ggbm90IG5lY2Vzc2FyaWx5IHRoZSBzYW1lIG9yZGVyKVxuICAvLyBjKSBFcXVpdmFsZW50IHZhbHVlcyBmb3IgZXZlcnkgY29ycmVzcG9uZGluZyBrZXkvaW5kZXhcbiAgLy8gZCkgRm9yIFNldHMgYW5kIE1hcHMsIGVxdWFsIGNvbnRlbnRzXG4gIC8vIE5vdGU6IHRoaXMgYWNjb3VudHMgZm9yIGJvdGggbmFtZWQgYW5kIGluZGV4ZWQgcHJvcGVydGllcyBvbiBBcnJheXMuXG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSA1KSB7XG4gICAgYUtleXMgPSBPYmplY3Qua2V5cyh2YWwxKTtcbiAgICB2YXIgYktleXMgPSBPYmplY3Qua2V5cyh2YWwyKTtcblxuICAgIC8vIFRoZSBwYWlyIG11c3QgaGF2ZSB0aGUgc2FtZSBudW1iZXIgb2Ygb3duZWQgcHJvcGVydGllcy5cbiAgICBpZiAoYUtleXMubGVuZ3RoICE9PSBiS2V5cy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICAvLyBDaGVhcCBrZXkgdGVzdFxuICB2YXIgaSA9IDA7XG4gIGZvciAoOyBpIDwgYUtleXMubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoIWhhc093blByb3BlcnR5KHZhbDIsIGFLZXlzW2ldKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuICBpZiAoc3RyaWN0ICYmIGFyZ3VtZW50cy5sZW5ndGggPT09IDUpIHtcbiAgICB2YXIgc3ltYm9sS2V5c0EgPSBvYmplY3RHZXRPd25Qcm9wZXJ0eVN5bWJvbHModmFsMSk7XG4gICAgaWYgKHN5bWJvbEtleXNBLmxlbmd0aCAhPT0gMCkge1xuICAgICAgdmFyIGNvdW50ID0gMDtcbiAgICAgIGZvciAoaSA9IDA7IGkgPCBzeW1ib2xLZXlzQS5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIga2V5ID0gc3ltYm9sS2V5c0FbaV07XG4gICAgICAgIGlmIChwcm9wZXJ0eUlzRW51bWVyYWJsZSh2YWwxLCBrZXkpKSB7XG4gICAgICAgICAgaWYgKCFwcm9wZXJ0eUlzRW51bWVyYWJsZSh2YWwyLCBrZXkpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICAgIGFLZXlzLnB1c2goa2V5KTtcbiAgICAgICAgICBjb3VudCsrO1xuICAgICAgICB9IGVsc2UgaWYgKHByb3BlcnR5SXNFbnVtZXJhYmxlKHZhbDIsIGtleSkpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHZhciBzeW1ib2xLZXlzQiA9IG9iamVjdEdldE93blByb3BlcnR5U3ltYm9scyh2YWwyKTtcbiAgICAgIGlmIChzeW1ib2xLZXlzQS5sZW5ndGggIT09IHN5bWJvbEtleXNCLmxlbmd0aCAmJiBnZXRFbnVtZXJhYmxlcyh2YWwyLCBzeW1ib2xLZXlzQikubGVuZ3RoICE9PSBjb3VudCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBfc3ltYm9sS2V5c0IgPSBvYmplY3RHZXRPd25Qcm9wZXJ0eVN5bWJvbHModmFsMik7XG4gICAgICBpZiAoX3N5bWJvbEtleXNCLmxlbmd0aCAhPT0gMCAmJiBnZXRFbnVtZXJhYmxlcyh2YWwyLCBfc3ltYm9sS2V5c0IpLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGlmIChhS2V5cy5sZW5ndGggPT09IDAgJiYgKGl0ZXJhdGlvblR5cGUgPT09IGtOb0l0ZXJhdG9yIHx8IGl0ZXJhdGlvblR5cGUgPT09IGtJc0FycmF5ICYmIHZhbDEubGVuZ3RoID09PSAwIHx8IHZhbDEuc2l6ZSA9PT0gMCkpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIC8vIFVzZSBtZW1vcyB0byBoYW5kbGUgY3ljbGVzLlxuICBpZiAobWVtb3MgPT09IHVuZGVmaW5lZCkge1xuICAgIG1lbW9zID0ge1xuICAgICAgdmFsMTogbmV3IE1hcCgpLFxuICAgICAgdmFsMjogbmV3IE1hcCgpLFxuICAgICAgcG9zaXRpb246IDBcbiAgICB9O1xuICB9IGVsc2Uge1xuICAgIC8vIFdlIHByZXZlbnQgdXAgdG8gdHdvIG1hcC5oYXMoeCkgY2FsbHMgYnkgZGlyZWN0bHkgcmV0cmlldmluZyB0aGUgdmFsdWVcbiAgICAvLyBhbmQgY2hlY2tpbmcgZm9yIHVuZGVmaW5lZC4gVGhlIG1hcCBjYW4gb25seSBjb250YWluIG51bWJlcnMsIHNvIGl0IGlzXG4gICAgLy8gc2FmZSB0byBjaGVjayBmb3IgdW5kZWZpbmVkIG9ubHkuXG4gICAgdmFyIHZhbDJNZW1vQSA9IG1lbW9zLnZhbDEuZ2V0KHZhbDEpO1xuICAgIGlmICh2YWwyTWVtb0EgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdmFyIHZhbDJNZW1vQiA9IG1lbW9zLnZhbDIuZ2V0KHZhbDIpO1xuICAgICAgaWYgKHZhbDJNZW1vQiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiB2YWwyTWVtb0EgPT09IHZhbDJNZW1vQjtcbiAgICAgIH1cbiAgICB9XG4gICAgbWVtb3MucG9zaXRpb24rKztcbiAgfVxuICBtZW1vcy52YWwxLnNldCh2YWwxLCBtZW1vcy5wb3NpdGlvbik7XG4gIG1lbW9zLnZhbDIuc2V0KHZhbDIsIG1lbW9zLnBvc2l0aW9uKTtcbiAgdmFyIGFyZUVxID0gb2JqRXF1aXYodmFsMSwgdmFsMiwgc3RyaWN0LCBhS2V5cywgbWVtb3MsIGl0ZXJhdGlvblR5cGUpO1xuICBtZW1vcy52YWwxLmRlbGV0ZSh2YWwxKTtcbiAgbWVtb3MudmFsMi5kZWxldGUodmFsMik7XG4gIHJldHVybiBhcmVFcTtcbn1cbmZ1bmN0aW9uIHNldEhhc0VxdWFsRWxlbWVudChzZXQsIHZhbDEsIHN0cmljdCwgbWVtbykge1xuICAvLyBHbyBsb29raW5nLlxuICB2YXIgc2V0VmFsdWVzID0gYXJyYXlGcm9tU2V0KHNldCk7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc2V0VmFsdWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHZhbDIgPSBzZXRWYWx1ZXNbaV07XG4gICAgaWYgKGlubmVyRGVlcEVxdWFsKHZhbDEsIHZhbDIsIHN0cmljdCwgbWVtbykpIHtcbiAgICAgIC8vIFJlbW92ZSB0aGUgbWF0Y2hpbmcgZWxlbWVudCB0byBtYWtlIHN1cmUgd2UgZG8gbm90IGNoZWNrIHRoYXQgYWdhaW4uXG4gICAgICBzZXQuZGVsZXRlKHZhbDIpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuLy8gU2VlIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvRXF1YWxpdHlfY29tcGFyaXNvbnNfYW5kX3NhbWVuZXNzI0xvb3NlX2VxdWFsaXR5X3VzaW5nXG4vLyBTYWRseSBpdCBpcyBub3QgcG9zc2libGUgdG8gZGV0ZWN0IGNvcnJlc3BvbmRpbmcgdmFsdWVzIHByb3Blcmx5IGluIGNhc2UgdGhlXG4vLyB0eXBlIGlzIGEgc3RyaW5nLCBudW1iZXIsIGJpZ2ludCBvciBib29sZWFuLiBUaGUgcmVhc29uIGlzIHRoYXQgdGhvc2UgdmFsdWVzXG4vLyBjYW4gbWF0Y2ggbG90cyBvZiBkaWZmZXJlbnQgc3RyaW5nIHZhbHVlcyAoZS5nLiwgMW4gPT0gJyswMDAwMScpLlxuZnVuY3Rpb24gZmluZExvb3NlTWF0Y2hpbmdQcmltaXRpdmVzKHByaW0pIHtcbiAgc3dpdGNoIChfdHlwZW9mKHByaW0pKSB7XG4gICAgY2FzZSAndW5kZWZpbmVkJzpcbiAgICAgIHJldHVybiBudWxsO1xuICAgIGNhc2UgJ29iamVjdCc6XG4gICAgICAvLyBPbmx5IHBhc3MgaW4gbnVsbCBhcyBvYmplY3QhXG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIGNhc2UgJ3N5bWJvbCc6XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgIHByaW0gPSArcHJpbTtcbiAgICAvLyBMb29zZSBlcXVhbCBlbnRyaWVzIGV4aXN0IG9ubHkgaWYgdGhlIHN0cmluZyBpcyBwb3NzaWJsZSB0byBjb252ZXJ0IHRvXG4gICAgLy8gYSByZWd1bGFyIG51bWJlciBhbmQgbm90IE5hTi5cbiAgICAvLyBGYWxsIHRocm91Z2hcbiAgICBjYXNlICdudW1iZXInOlxuICAgICAgaWYgKG51bWJlcklzTmFOKHByaW0pKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cbmZ1bmN0aW9uIHNldE1pZ2h0SGF2ZUxvb3NlUHJpbShhLCBiLCBwcmltKSB7XG4gIHZhciBhbHRWYWx1ZSA9IGZpbmRMb29zZU1hdGNoaW5nUHJpbWl0aXZlcyhwcmltKTtcbiAgaWYgKGFsdFZhbHVlICE9IG51bGwpIHJldHVybiBhbHRWYWx1ZTtcbiAgcmV0dXJuIGIuaGFzKGFsdFZhbHVlKSAmJiAhYS5oYXMoYWx0VmFsdWUpO1xufVxuZnVuY3Rpb24gbWFwTWlnaHRIYXZlTG9vc2VQcmltKGEsIGIsIHByaW0sIGl0ZW0sIG1lbW8pIHtcbiAgdmFyIGFsdFZhbHVlID0gZmluZExvb3NlTWF0Y2hpbmdQcmltaXRpdmVzKHByaW0pO1xuICBpZiAoYWx0VmFsdWUgIT0gbnVsbCkge1xuICAgIHJldHVybiBhbHRWYWx1ZTtcbiAgfVxuICB2YXIgY3VyQiA9IGIuZ2V0KGFsdFZhbHVlKTtcbiAgaWYgKGN1ckIgPT09IHVuZGVmaW5lZCAmJiAhYi5oYXMoYWx0VmFsdWUpIHx8ICFpbm5lckRlZXBFcXVhbChpdGVtLCBjdXJCLCBmYWxzZSwgbWVtbykpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuICFhLmhhcyhhbHRWYWx1ZSkgJiYgaW5uZXJEZWVwRXF1YWwoaXRlbSwgY3VyQiwgZmFsc2UsIG1lbW8pO1xufVxuZnVuY3Rpb24gc2V0RXF1aXYoYSwgYiwgc3RyaWN0LCBtZW1vKSB7XG4gIC8vIFRoaXMgaXMgYSBsYXppbHkgaW5pdGlhdGVkIFNldCBvZiBlbnRyaWVzIHdoaWNoIGhhdmUgdG8gYmUgY29tcGFyZWRcbiAgLy8gcGFpcndpc2UuXG4gIHZhciBzZXQgPSBudWxsO1xuICB2YXIgYVZhbHVlcyA9IGFycmF5RnJvbVNldChhKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBhVmFsdWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHZhbCA9IGFWYWx1ZXNbaV07XG4gICAgLy8gTm90ZTogQ2hlY2tpbmcgZm9yIHRoZSBvYmplY3RzIGZpcnN0IGltcHJvdmVzIHRoZSBwZXJmb3JtYW5jZSBmb3Igb2JqZWN0XG4gICAgLy8gaGVhdnkgc2V0cyBidXQgaXQgaXMgYSBtaW5vciBzbG93IGRvd24gZm9yIHByaW1pdGl2ZXMuIEFzIHRoZXkgYXJlIGZhc3RcbiAgICAvLyB0byBjaGVjayB0aGlzIGltcHJvdmVzIHRoZSB3b3JzdCBjYXNlIHNjZW5hcmlvIGluc3RlYWQuXG4gICAgaWYgKF90eXBlb2YodmFsKSA9PT0gJ29iamVjdCcgJiYgdmFsICE9PSBudWxsKSB7XG4gICAgICBpZiAoc2V0ID09PSBudWxsKSB7XG4gICAgICAgIHNldCA9IG5ldyBTZXQoKTtcbiAgICAgIH1cbiAgICAgIC8vIElmIHRoZSBzcGVjaWZpZWQgdmFsdWUgZG9lc24ndCBleGlzdCBpbiB0aGUgc2Vjb25kIHNldCBpdHMgYW4gbm90IG51bGxcbiAgICAgIC8vIG9iamVjdCAob3Igbm9uIHN0cmljdCBvbmx5OiBhIG5vdCBtYXRjaGluZyBwcmltaXRpdmUpIHdlJ2xsIG5lZWQgdG8gZ29cbiAgICAgIC8vIGh1bnRpbmcgZm9yIHNvbWV0aGluZyB0aGF0cyBkZWVwLShzdHJpY3QtKWVxdWFsIHRvIGl0LiBUbyBtYWtlIHRoaXNcbiAgICAgIC8vIE8obiBsb2cgbikgY29tcGxleGl0eSB3ZSBoYXZlIHRvIGNvcHkgdGhlc2UgdmFsdWVzIGluIGEgbmV3IHNldCBmaXJzdC5cbiAgICAgIHNldC5hZGQodmFsKTtcbiAgICB9IGVsc2UgaWYgKCFiLmhhcyh2YWwpKSB7XG4gICAgICBpZiAoc3RyaWN0KSByZXR1cm4gZmFsc2U7XG5cbiAgICAgIC8vIEZhc3QgcGF0aCB0byBkZXRlY3QgbWlzc2luZyBzdHJpbmcsIHN5bWJvbCwgdW5kZWZpbmVkIGFuZCBudWxsIHZhbHVlcy5cbiAgICAgIGlmICghc2V0TWlnaHRIYXZlTG9vc2VQcmltKGEsIGIsIHZhbCkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKHNldCA9PT0gbnVsbCkge1xuICAgICAgICBzZXQgPSBuZXcgU2V0KCk7XG4gICAgICB9XG4gICAgICBzZXQuYWRkKHZhbCk7XG4gICAgfVxuICB9XG4gIGlmIChzZXQgIT09IG51bGwpIHtcbiAgICB2YXIgYlZhbHVlcyA9IGFycmF5RnJvbVNldChiKTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYlZhbHVlcy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfdmFsID0gYlZhbHVlc1tfaV07XG4gICAgICAvLyBXZSBoYXZlIHRvIGNoZWNrIGlmIGEgcHJpbWl0aXZlIHZhbHVlIGlzIGFscmVhZHlcbiAgICAgIC8vIG1hdGNoaW5nIGFuZCBvbmx5IGlmIGl0J3Mgbm90LCBnbyBodW50aW5nIGZvciBpdC5cbiAgICAgIGlmIChfdHlwZW9mKF92YWwpID09PSAnb2JqZWN0JyAmJiBfdmFsICE9PSBudWxsKSB7XG4gICAgICAgIGlmICghc2V0SGFzRXF1YWxFbGVtZW50KHNldCwgX3ZhbCwgc3RyaWN0LCBtZW1vKSkgcmV0dXJuIGZhbHNlO1xuICAgICAgfSBlbHNlIGlmICghc3RyaWN0ICYmICFhLmhhcyhfdmFsKSAmJiAhc2V0SGFzRXF1YWxFbGVtZW50KHNldCwgX3ZhbCwgc3RyaWN0LCBtZW1vKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBzZXQuc2l6ZSA9PT0gMDtcbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cbmZ1bmN0aW9uIG1hcEhhc0VxdWFsRW50cnkoc2V0LCBtYXAsIGtleTEsIGl0ZW0xLCBzdHJpY3QsIG1lbW8pIHtcbiAgLy8gVG8gYmUgYWJsZSB0byBoYW5kbGUgY2FzZXMgbGlrZTpcbiAgLy8gICBNYXAoW1t7fSwgJ2EnXSwgW3t9LCAnYiddXSkgdnMgTWFwKFtbe30sICdiJ10sIFt7fSwgJ2EnXV0pXG4gIC8vIC4uLiB3ZSBuZWVkIHRvIGNvbnNpZGVyICphbGwqIG1hdGNoaW5nIGtleXMsIG5vdCBqdXN0IHRoZSBmaXJzdCB3ZSBmaW5kLlxuICB2YXIgc2V0VmFsdWVzID0gYXJyYXlGcm9tU2V0KHNldCk7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc2V0VmFsdWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGtleTIgPSBzZXRWYWx1ZXNbaV07XG4gICAgaWYgKGlubmVyRGVlcEVxdWFsKGtleTEsIGtleTIsIHN0cmljdCwgbWVtbykgJiYgaW5uZXJEZWVwRXF1YWwoaXRlbTEsIG1hcC5nZXQoa2V5MiksIHN0cmljdCwgbWVtbykpIHtcbiAgICAgIHNldC5kZWxldGUoa2V5Mik7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuZnVuY3Rpb24gbWFwRXF1aXYoYSwgYiwgc3RyaWN0LCBtZW1vKSB7XG4gIHZhciBzZXQgPSBudWxsO1xuICB2YXIgYUVudHJpZXMgPSBhcnJheUZyb21NYXAoYSk7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYUVudHJpZXMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgX2FFbnRyaWVzJGkgPSBfc2xpY2VkVG9BcnJheShhRW50cmllc1tpXSwgMiksXG4gICAgICBrZXkgPSBfYUVudHJpZXMkaVswXSxcbiAgICAgIGl0ZW0xID0gX2FFbnRyaWVzJGlbMV07XG4gICAgaWYgKF90eXBlb2Yoa2V5KSA9PT0gJ29iamVjdCcgJiYga2V5ICE9PSBudWxsKSB7XG4gICAgICBpZiAoc2V0ID09PSBudWxsKSB7XG4gICAgICAgIHNldCA9IG5ldyBTZXQoKTtcbiAgICAgIH1cbiAgICAgIHNldC5hZGQoa2V5KTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gQnkgZGlyZWN0bHkgcmV0cmlldmluZyB0aGUgdmFsdWUgd2UgcHJldmVudCBhbm90aGVyIGIuaGFzKGtleSkgY2hlY2sgaW5cbiAgICAgIC8vIGFsbW9zdCBhbGwgcG9zc2libGUgY2FzZXMuXG4gICAgICB2YXIgaXRlbTIgPSBiLmdldChrZXkpO1xuICAgICAgaWYgKGl0ZW0yID09PSB1bmRlZmluZWQgJiYgIWIuaGFzKGtleSkgfHwgIWlubmVyRGVlcEVxdWFsKGl0ZW0xLCBpdGVtMiwgc3RyaWN0LCBtZW1vKSkge1xuICAgICAgICBpZiAoc3RyaWN0KSByZXR1cm4gZmFsc2U7XG4gICAgICAgIC8vIEZhc3QgcGF0aCB0byBkZXRlY3QgbWlzc2luZyBzdHJpbmcsIHN5bWJvbCwgdW5kZWZpbmVkIGFuZCBudWxsXG4gICAgICAgIC8vIGtleXMuXG4gICAgICAgIGlmICghbWFwTWlnaHRIYXZlTG9vc2VQcmltKGEsIGIsIGtleSwgaXRlbTEsIG1lbW8pKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIGlmIChzZXQgPT09IG51bGwpIHtcbiAgICAgICAgICBzZXQgPSBuZXcgU2V0KCk7XG4gICAgICAgIH1cbiAgICAgICAgc2V0LmFkZChrZXkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBpZiAoc2V0ICE9PSBudWxsKSB7XG4gICAgdmFyIGJFbnRyaWVzID0gYXJyYXlGcm9tTWFwKGIpO1xuICAgIGZvciAodmFyIF9pMiA9IDA7IF9pMiA8IGJFbnRyaWVzLmxlbmd0aDsgX2kyKyspIHtcbiAgICAgIHZhciBfYkVudHJpZXMkX2kgPSBfc2xpY2VkVG9BcnJheShiRW50cmllc1tfaTJdLCAyKSxcbiAgICAgICAgX2tleSA9IF9iRW50cmllcyRfaVswXSxcbiAgICAgICAgaXRlbSA9IF9iRW50cmllcyRfaVsxXTtcbiAgICAgIGlmIChfdHlwZW9mKF9rZXkpID09PSAnb2JqZWN0JyAmJiBfa2V5ICE9PSBudWxsKSB7XG4gICAgICAgIGlmICghbWFwSGFzRXF1YWxFbnRyeShzZXQsIGEsIF9rZXksIGl0ZW0sIHN0cmljdCwgbWVtbykpIHJldHVybiBmYWxzZTtcbiAgICAgIH0gZWxzZSBpZiAoIXN0cmljdCAmJiAoIWEuaGFzKF9rZXkpIHx8ICFpbm5lckRlZXBFcXVhbChhLmdldChfa2V5KSwgaXRlbSwgZmFsc2UsIG1lbW8pKSAmJiAhbWFwSGFzRXF1YWxFbnRyeShzZXQsIGEsIF9rZXksIGl0ZW0sIGZhbHNlLCBtZW1vKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBzZXQuc2l6ZSA9PT0gMDtcbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cbmZ1bmN0aW9uIG9iakVxdWl2KGEsIGIsIHN0cmljdCwga2V5cywgbWVtb3MsIGl0ZXJhdGlvblR5cGUpIHtcbiAgLy8gU2V0cyBhbmQgbWFwcyBkb24ndCBoYXZlIHRoZWlyIGVudHJpZXMgYWNjZXNzaWJsZSB2aWEgbm9ybWFsIG9iamVjdFxuICAvLyBwcm9wZXJ0aWVzLlxuICB2YXIgaSA9IDA7XG4gIGlmIChpdGVyYXRpb25UeXBlID09PSBrSXNTZXQpIHtcbiAgICBpZiAoIXNldEVxdWl2KGEsIGIsIHN0cmljdCwgbWVtb3MpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9IGVsc2UgaWYgKGl0ZXJhdGlvblR5cGUgPT09IGtJc01hcCkge1xuICAgIGlmICghbWFwRXF1aXYoYSwgYiwgc3RyaWN0LCBtZW1vcykpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoaXRlcmF0aW9uVHlwZSA9PT0ga0lzQXJyYXkpIHtcbiAgICBmb3IgKDsgaSA8IGEubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChoYXNPd25Qcm9wZXJ0eShhLCBpKSkge1xuICAgICAgICBpZiAoIWhhc093blByb3BlcnR5KGIsIGkpIHx8ICFpbm5lckRlZXBFcXVhbChhW2ldLCBiW2ldLCBzdHJpY3QsIG1lbW9zKSkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChoYXNPd25Qcm9wZXJ0eShiLCBpKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBBcnJheSBpcyBzcGFyc2UuXG4gICAgICAgIHZhciBrZXlzQSA9IE9iamVjdC5rZXlzKGEpO1xuICAgICAgICBmb3IgKDsgaSA8IGtleXNBLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgdmFyIGtleSA9IGtleXNBW2ldO1xuICAgICAgICAgIGlmICghaGFzT3duUHJvcGVydHkoYiwga2V5KSB8fCAhaW5uZXJEZWVwRXF1YWwoYVtrZXldLCBiW2tleV0sIHN0cmljdCwgbWVtb3MpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChrZXlzQS5sZW5ndGggIT09IE9iamVjdC5rZXlzKGIpLmxlbmd0aCkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBUaGUgcGFpciBtdXN0IGhhdmUgZXF1aXZhbGVudCB2YWx1ZXMgZm9yIGV2ZXJ5IGNvcnJlc3BvbmRpbmcga2V5LlxuICAvLyBQb3NzaWJseSBleHBlbnNpdmUgZGVlcCB0ZXN0OlxuICBmb3IgKGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBfa2V5MiA9IGtleXNbaV07XG4gICAgaWYgKCFpbm5lckRlZXBFcXVhbChhW19rZXkyXSwgYltfa2V5Ml0sIHN0cmljdCwgbWVtb3MpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG4gIHJldHVybiB0cnVlO1xufVxuZnVuY3Rpb24gaXNEZWVwRXF1YWwodmFsMSwgdmFsMikge1xuICByZXR1cm4gaW5uZXJEZWVwRXF1YWwodmFsMSwgdmFsMiwga0xvb3NlKTtcbn1cbmZ1bmN0aW9uIGlzRGVlcFN0cmljdEVxdWFsKHZhbDEsIHZhbDIpIHtcbiAgcmV0dXJuIGlubmVyRGVlcEVxdWFsKHZhbDEsIHZhbDIsIGtTdHJpY3QpO1xufVxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGlzRGVlcEVxdWFsOiBpc0RlZXBFcXVhbCxcbiAgaXNEZWVwU3RyaWN0RXF1YWw6IGlzRGVlcFN0cmljdEVxdWFsXG59OyIsIid1c2Ugc3RyaWN0JztcblxudmFyIEdldEludHJpbnNpYyA9IHJlcXVpcmUoJ2dldC1pbnRyaW5zaWMnKTtcblxudmFyIGNhbGxCaW5kID0gcmVxdWlyZSgnLi8nKTtcblxudmFyICRpbmRleE9mID0gY2FsbEJpbmQoR2V0SW50cmluc2ljKCdTdHJpbmcucHJvdG90eXBlLmluZGV4T2YnKSk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY2FsbEJvdW5kSW50cmluc2ljKG5hbWUsIGFsbG93TWlzc2luZykge1xuXHR2YXIgaW50cmluc2ljID0gR2V0SW50cmluc2ljKG5hbWUsICEhYWxsb3dNaXNzaW5nKTtcblx0aWYgKHR5cGVvZiBpbnRyaW5zaWMgPT09ICdmdW5jdGlvbicgJiYgJGluZGV4T2YobmFtZSwgJy5wcm90b3R5cGUuJykgPiAtMSkge1xuXHRcdHJldHVybiBjYWxsQmluZChpbnRyaW5zaWMpO1xuXHR9XG5cdHJldHVybiBpbnRyaW5zaWM7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgYmluZCA9IHJlcXVpcmUoJ2Z1bmN0aW9uLWJpbmQnKTtcbnZhciBHZXRJbnRyaW5zaWMgPSByZXF1aXJlKCdnZXQtaW50cmluc2ljJyk7XG52YXIgc2V0RnVuY3Rpb25MZW5ndGggPSByZXF1aXJlKCdzZXQtZnVuY3Rpb24tbGVuZ3RoJyk7XG5cbnZhciAkVHlwZUVycm9yID0gR2V0SW50cmluc2ljKCclVHlwZUVycm9yJScpO1xudmFyICRhcHBseSA9IEdldEludHJpbnNpYygnJUZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseSUnKTtcbnZhciAkY2FsbCA9IEdldEludHJpbnNpYygnJUZ1bmN0aW9uLnByb3RvdHlwZS5jYWxsJScpO1xudmFyICRyZWZsZWN0QXBwbHkgPSBHZXRJbnRyaW5zaWMoJyVSZWZsZWN0LmFwcGx5JScsIHRydWUpIHx8IGJpbmQuY2FsbCgkY2FsbCwgJGFwcGx5KTtcblxudmFyICRkZWZpbmVQcm9wZXJ0eSA9IEdldEludHJpbnNpYygnJU9iamVjdC5kZWZpbmVQcm9wZXJ0eSUnLCB0cnVlKTtcbnZhciAkbWF4ID0gR2V0SW50cmluc2ljKCclTWF0aC5tYXglJyk7XG5cbmlmICgkZGVmaW5lUHJvcGVydHkpIHtcblx0dHJ5IHtcblx0XHQkZGVmaW5lUHJvcGVydHkoe30sICdhJywgeyB2YWx1ZTogMSB9KTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdC8vIElFIDggaGFzIGEgYnJva2VuIGRlZmluZVByb3BlcnR5XG5cdFx0JGRlZmluZVByb3BlcnR5ID0gbnVsbDtcblx0fVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNhbGxCaW5kKG9yaWdpbmFsRnVuY3Rpb24pIHtcblx0aWYgKHR5cGVvZiBvcmlnaW5hbEZ1bmN0aW9uICE9PSAnZnVuY3Rpb24nKSB7XG5cdFx0dGhyb3cgbmV3ICRUeXBlRXJyb3IoJ2EgZnVuY3Rpb24gaXMgcmVxdWlyZWQnKTtcblx0fVxuXHR2YXIgZnVuYyA9ICRyZWZsZWN0QXBwbHkoYmluZCwgJGNhbGwsIGFyZ3VtZW50cyk7XG5cdHJldHVybiBzZXRGdW5jdGlvbkxlbmd0aChcblx0XHRmdW5jLFxuXHRcdDEgKyAkbWF4KDAsIG9yaWdpbmFsRnVuY3Rpb24ubGVuZ3RoIC0gKGFyZ3VtZW50cy5sZW5ndGggLSAxKSksXG5cdFx0dHJ1ZVxuXHQpO1xufTtcblxudmFyIGFwcGx5QmluZCA9IGZ1bmN0aW9uIGFwcGx5QmluZCgpIHtcblx0cmV0dXJuICRyZWZsZWN0QXBwbHkoYmluZCwgJGFwcGx5LCBhcmd1bWVudHMpO1xufTtcblxuaWYgKCRkZWZpbmVQcm9wZXJ0eSkge1xuXHQkZGVmaW5lUHJvcGVydHkobW9kdWxlLmV4cG9ydHMsICdhcHBseScsIHsgdmFsdWU6IGFwcGx5QmluZCB9KTtcbn0gZWxzZSB7XG5cdG1vZHVsZS5leHBvcnRzLmFwcGx5ID0gYXBwbHlCaW5kO1xufVxuIiwiLypnbG9iYWwgd2luZG93LCBnbG9iYWwqL1xudmFyIHV0aWwgPSByZXF1aXJlKFwidXRpbFwiKVxudmFyIGFzc2VydCA9IHJlcXVpcmUoXCJhc3NlcnRcIilcbmZ1bmN0aW9uIG5vdygpIHsgcmV0dXJuIG5ldyBEYXRlKCkuZ2V0VGltZSgpIH1cblxudmFyIHNsaWNlID0gQXJyYXkucHJvdG90eXBlLnNsaWNlXG52YXIgY29uc29sZVxudmFyIHRpbWVzID0ge31cblxuaWYgKHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgJiYgZ2xvYmFsLmNvbnNvbGUpIHtcbiAgICBjb25zb2xlID0gZ2xvYmFsLmNvbnNvbGVcbn0gZWxzZSBpZiAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiAmJiB3aW5kb3cuY29uc29sZSkge1xuICAgIGNvbnNvbGUgPSB3aW5kb3cuY29uc29sZVxufSBlbHNlIHtcbiAgICBjb25zb2xlID0ge31cbn1cblxudmFyIGZ1bmN0aW9ucyA9IFtcbiAgICBbbG9nLCBcImxvZ1wiXSxcbiAgICBbaW5mbywgXCJpbmZvXCJdLFxuICAgIFt3YXJuLCBcIndhcm5cIl0sXG4gICAgW2Vycm9yLCBcImVycm9yXCJdLFxuICAgIFt0aW1lLCBcInRpbWVcIl0sXG4gICAgW3RpbWVFbmQsIFwidGltZUVuZFwiXSxcbiAgICBbdHJhY2UsIFwidHJhY2VcIl0sXG4gICAgW2RpciwgXCJkaXJcIl0sXG4gICAgW2NvbnNvbGVBc3NlcnQsIFwiYXNzZXJ0XCJdXG5dXG5cbmZvciAodmFyIGkgPSAwOyBpIDwgZnVuY3Rpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHR1cGxlID0gZnVuY3Rpb25zW2ldXG4gICAgdmFyIGYgPSB0dXBsZVswXVxuICAgIHZhciBuYW1lID0gdHVwbGVbMV1cblxuICAgIGlmICghY29uc29sZVtuYW1lXSkge1xuICAgICAgICBjb25zb2xlW25hbWVdID0gZlxuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjb25zb2xlXG5cbmZ1bmN0aW9uIGxvZygpIHt9XG5cbmZ1bmN0aW9uIGluZm8oKSB7XG4gICAgY29uc29sZS5sb2cuYXBwbHkoY29uc29sZSwgYXJndW1lbnRzKVxufVxuXG5mdW5jdGlvbiB3YXJuKCkge1xuICAgIGNvbnNvbGUubG9nLmFwcGx5KGNvbnNvbGUsIGFyZ3VtZW50cylcbn1cblxuZnVuY3Rpb24gZXJyb3IoKSB7XG4gICAgY29uc29sZS53YXJuLmFwcGx5KGNvbnNvbGUsIGFyZ3VtZW50cylcbn1cblxuZnVuY3Rpb24gdGltZShsYWJlbCkge1xuICAgIHRpbWVzW2xhYmVsXSA9IG5vdygpXG59XG5cbmZ1bmN0aW9uIHRpbWVFbmQobGFiZWwpIHtcbiAgICB2YXIgdGltZSA9IHRpbWVzW2xhYmVsXVxuICAgIGlmICghdGltZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJObyBzdWNoIGxhYmVsOiBcIiArIGxhYmVsKVxuICAgIH1cblxuICAgIGRlbGV0ZSB0aW1lc1tsYWJlbF1cbiAgICB2YXIgZHVyYXRpb24gPSBub3coKSAtIHRpbWVcbiAgICBjb25zb2xlLmxvZyhsYWJlbCArIFwiOiBcIiArIGR1cmF0aW9uICsgXCJtc1wiKVxufVxuXG5mdW5jdGlvbiB0cmFjZSgpIHtcbiAgICB2YXIgZXJyID0gbmV3IEVycm9yKClcbiAgICBlcnIubmFtZSA9IFwiVHJhY2VcIlxuICAgIGVyci5tZXNzYWdlID0gdXRpbC5mb3JtYXQuYXBwbHkobnVsbCwgYXJndW1lbnRzKVxuICAgIGNvbnNvbGUuZXJyb3IoZXJyLnN0YWNrKVxufVxuXG5mdW5jdGlvbiBkaXIob2JqZWN0KSB7XG4gICAgY29uc29sZS5sb2codXRpbC5pbnNwZWN0KG9iamVjdCkgKyBcIlxcblwiKVxufVxuXG5mdW5jdGlvbiBjb25zb2xlQXNzZXJ0KGV4cHJlc3Npb24pIHtcbiAgICBpZiAoIWV4cHJlc3Npb24pIHtcbiAgICAgICAgdmFyIGFyciA9IHNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKVxuICAgICAgICBhc3NlcnQub2soZmFsc2UsIHV0aWwuZm9ybWF0LmFwcGx5KG51bGwsIGFycikpXG4gICAgfVxufVxuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2dldFVybC5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8wX19fID0gbmV3IFVSTChcIi4vYXNzZXRzL21pbmVjcmFmdC1sb2dvLnR0ZlwiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8xX19fID0gbmV3IFVSTChcIi4vYXNzZXRzL21pbmVjcmFmdC5vdGZcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMl9fXyA9IG5ldyBVUkwoXCIuL2Fzc2V0cy9taW5lY3JhZnQtaXRhbGljLm90ZlwiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8zX19fID0gbmV3IFVSTChcIi4vYXNzZXRzL21pbmVjcmFmdC1ib2xkLm90ZlwiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF80X19fID0gbmV3IFVSTChcIi4vYXNzZXRzL21pbmVjcmFmdC1ib2xkLWl0YWxpYy5vdGZcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfNV9fXyA9IG5ldyBVUkwoXCIuL2Fzc2V0cy9oZXJvLWJnLmpwZ1wiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF82X19fID0gbmV3IFVSTChcIi4vYXNzZXRzL2hlYWQtZm9vdC1iZy5qcGdcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8wX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMF9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMV9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzFfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzJfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8yX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8zX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfM19fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfNF9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzRfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzVfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF81X19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF82X19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfNl9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgYEBmb250LWZhY2Uge1xuICBmb250LWZhbWlseTogJ0xvZ29Gb250JztcbiAgc3JjOiB1cmwoJHtfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8wX19ffSk7XG59XG5cbkBmb250LWZhY2Uge1xuICBmb250LWZhbWlseTogJ0ludGVyZmFjZUZvbnQnO1xuICBzcmM6IHVybCgke19fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzFfX199KSwgdXJsKCR7X19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMl9fX30pLCB1cmwoJHtfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8zX19ffSksIHVybCgke19fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzRfX199KTtcbn1cblxuKiB7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG59XG5cbjo6LXdlYmtpdC1zY3JvbGxiYXIge1xuICBkaXNwbGF5OiBub25lO1xufVxuXG5oMSwgaDIsIGgzLCBoNCwgaDUsIGg2IHtcbiAgbWFyZ2luOiAwO1xuICBwYWRkaW5nOiAwO1xufVxuXG5ib2R5IHtcbiAgbWFyZ2luOiAwO1xuICBwYWRkaW5nOiAwO1xuXG4gIG1pbi1oZWlnaHQ6IDEwMHZoO1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuXG4gIGZvbnQtZmFtaWx5OiBWZXJkYW5hLCBHZW5ldmEsIFRhaG9tYSwgc2Fucy1zZXJpZjtcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKCR7X19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfNV9fX30pO1xuICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xuICBiYWNrZHJvcC1maWx0ZXI6IGJsdXIoOHB4KTtcbn1cblxuYSB7XG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgY29sb3I6IGluaGVyaXQ7XG59XG5cbmJ1dHRvbjpob3ZlciwgYTpob3ZlciB7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cblxuXG5cbiNjb250ZW50IHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgZmxleDogMTtcbn1cblxuXG5cbi5oZWFkZXIsIC5mb290ZXIge1xuICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJHtfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF82X19ffSk7XG59XG5cbi5oZWFkZXIge1xuICBwYWRkaW5nLWJsb2NrOiAyNHB4O1xuICBwYWRkaW5nLWlubGluZTogNDhweDtcblxuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGJveC1zaGFkb3c6IDAgLTZweCAxMHB4IDVweCByZ2JhKDAsMCwwLDAuNSk7XG4gIGJvcmRlci1ib3R0b206IDJweCBzb2xpZCAjODdjNWZlO1xufVxuXG4uaGVhZGVyID4gaDEge1xuICBmb250LXNpemU6IDIuNXJlbTtcbiAgbGV0dGVyLXNwYWNpbmc6IDJweDtcbn1cblxuLmhlYWRlciA+IGgxLCAubmF2ID4gYnV0dG9uIHtcbiAgZm9udC1mYW1pbHk6ICdMb2dvRm9udCc7XG59XG5cbi5uYXYge1xuICBkaXNwbGF5OiBmbGV4O1xuICBnYXA6IDQ4cHg7XG59XG5cbi5uYXYgPiBidXR0b24ge1xuICBwYWRkaW5nOiA4cHggMTZweDtcblxuICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBmb250LXNpemU6IDEuMjVyZW07XG4gIGxldHRlci1zcGFjaW5nOiAxcHg7XG59XG5cbm5hdiA+IC5hY3RpdmUge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjOWRjZGZiNTA7XG4gIGJhY2tkcm9wLWZpbHRlcjogYmx1cig0cHgpO1xuICBib3gtc2hhZG93OiAwIDAgMzZweCAjZmZmZmZmO1xuICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcbiAgY29sb3I6IGJsYWNrO1xufVxuXG5cblxuLnBhZ2UtY29udGVudCB7XG4gIGZsZXg6IDE7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuXG4gIGZvbnQtZmFtaWx5OiAnSW50ZXJmYWNlRm9udCc7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cblxuLmhlcm8ge1xuICBtYXJnaW46IDI0cHggMDtcbiAgcGFkZGluZzogMTZweDtcblxuICBtaW4td2lkdGg6IDc1JTtcblxuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWV2ZW5seTtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzAwMDAwMDI1O1xuICBib3JkZXI6IDFweCBzb2xpZCAjZWZlZmVmO1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGNvbG9yOiAjZWZlZmVmO1xufVxuXG4uZGl2aWRlciB7XG4gIHdpZHRoOiA1MDBweDtcbn1cblxuLmhlcm8taGVhZCB7XG4gIG1hcmdpbjogMDtcbiAgcGFkZGluZzogMDtcbn1cblxuLmhlcm8tcGFyYS10aXRsZSB7XG4gIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lO1xufVxuXG4uaGVyby1zbGlkZS10ZXh0IHtcbiAgbWFyZ2luOiAwO1xuICBwYWRkaW5nOiAwO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIHRvcDogMzJweDtcbiAgZm9udC1zaXplOiAxLjI1cmVtO1xufVxuXG4uaGVyby1zbGlkZSB7XG4gIG1hcmdpbjogMDtcbiAgcGFkZGluZzogMDtcbiAgZGlzcGxheTogbm9uZTtcbn1cblxuLmhlcm8tc2xpZGUtYWN0aXZlIHtcbiAgZGlzcGxheTogYmxvY2s7XG59XG5cbi5oZXJvLXNsaWRlLWFjdGl2ZSBpbWcge1xuICBib3JkZXI6IDFweCBzb2xpZCB3aGl0ZTtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB6LWluZGV4OiAtMTtcbn1cblxuLmhlcm8tc2xpZGUtaW1hZ2Uge1xuICBtYXJnaW46IDA7XG4gIHBhZGRpbmc6IDA7XG59XG5cbi5oZXJvLXNsaWRlLW5leHQsIC5oZXJvLXNsaWRlLXByZXZpb3VzIHtcbiAgdG9wOiA4cHg7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgcGFkZGluZzogMnB4IDZweCA2cHggNnB4O1xuICBib3JkZXI6IDFweCBzb2xpZCB3aGl0ZTtcbiAgYm9yZGVyLXJhZGl1czogOHB4O1xuICBmb250LXNpemU6IDJyZW07XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xufVxuXG4uaGVyby1zbGlkZS1uZXh0IHtcbiAgbGVmdDogMjRweDtcbn1cblxuLmhlcm8tc2xpZGUtcHJldmlvdXMge1xuICByaWdodDogMjRweDtcbn1cblxuLmhlcm8tbWVudSB7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDIsIDFmcik7XG4gIGNvbHVtbi1nYXA6IDE2cHg7XG4gIHJvdy1nYXA6IDhweDtcbiAganVzdGlmeS1jb250ZW50OiBzdGFydDtcbn1cblxuLm1lbnUtbm90aWNlIHtcbiAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7XG59XG5cbi5tZW51LXdhcm5pbmcge1xuICBmb250LXdlaWdodDogYm9sZDtcbn1cblxuLm1lbnUtY2FyZCB7XG4gIHBhZGRpbmc6IDE2cHg7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiAyNHB4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjk1NzkxO1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNlZmVmZWY7XG59XG5cbi5tZW51LWNhcmQ6bnRoLW9mLXR5cGUoMSksIC5tZW51LWNhcmQ6bnRoLW9mLXR5cGUoNCksIC5tZW51LWNhcmQ6bnRoLW9mLXR5cGUoNSksIC5tZW51LWNhcmQ6bnRoLW9mLXR5cGUoOCksIC5tZW51LWNhcmQ6bnRoLW9mLXR5cGUoOSksIC5tZW51LWNhcmQ6bnRoLW9mLXR5cGUoMTIpIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2M3NWEzNTtcbn1cblxuLmhlcm8gPiBpbWcge1xuICBib3JkZXI6IDFweCBzb2xpZCAjZWZlZmVmO1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG59XG5cbi5jYXJkLWxlZnQsIC5jYXJkLXJpZ2h0IHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgZ2FwOiA0cHg7XG59XG5cbi5jYXJkLWxlZnQge1xuICBhbGlnbi1pdGVtczogc3RhcnQ7XG4gIHRleHQtYWxpZ246IHN0YXJ0O1xufVxuXG4uY2FyZC1sZWZ0ID4gaDQsIC5jYXJkLXJpZ2h0ID4gaDQsIC5jYXJkLXJpZ2h0ID4gcCB7XG4gIG1hcmdpbjogMDtcbn1cblxuLmNhcmQtcmlnaHQge1xuICBhbGlnbi1pdGVtczogZW5kO1xuICB0ZXh0LWFsaWduOiBlbmQ7XG59XG5cbi5jb250YWN0LWZvcm0ge1xuICBkaXNwbGF5OiBncmlkO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMiwgMWZyKTtcbiAgcm93LWdhcDogOHB4O1xufVxuXG4uY29udGFjdC1mb3JtID4gbGFiZWwsIC5jb250YWN0LWZvcm0gPiBpbnB1dCB7XG4gIHRleHQtYWxpZ246IHN0YXJ0O1xuICBmb250LXNpemU6IDEuMjVyZW07XG59XG5cbi5mb3JtLWJ1dHRvbiB7XG4gIG1hcmdpbi10b3A6IDI0cHg7XG4gIHBhZGRpbmc6IDhweCAyNHB4O1xuICBmb250LWZhbWlseTogJ0ludGVyZmFjZUZvbnQnO1xuICBmb250LXNpemU6IDEuMTI1cmVtO1xuICBib3JkZXI6IDFweCBzb2xpZCB3aGl0ZTtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xufVxuXG5cblxuLmZvb3RlciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBcbiAgZm9udC1mYW1pbHk6ICdJbnRlcmZhY2VGb250JztcbiAgZm9udC1zaXplOiAxLjI1cmVtO1xuICBib3JkZXItdG9wOiAycHggc29saWQgIzVhOTMzMjtcbiAgYmFja2dyb3VuZC1wb3NpdGlvbjogYm90dG9tO1xufVxuXG4uZm9vdGVyLXNvdXJjZSB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogOHB4O1xufVxuXG4uZm9vdGVyLWxvZ28ge1xuICBoZWlnaHQ6IDI1cHg7XG59XG5cbi5mb290LXRleHQge1xuICBtYXJnaW46IDZweCAwO1xuICBmb250LXdlaWdodDogYm9sZDtcbn1gLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZS5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7RUFDRSx1QkFBdUI7RUFDdkIsNENBQXVDO0FBQ3pDOztBQUVBO0VBQ0UsNEJBQTRC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QUNkOztBQUVBO0VBQ0UsaUJBQWlCO0VBQ2pCLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLGdCQUFnQjtFQUNoQixpQkFBaUI7RUFDakIsNEJBQTRCO0VBQzVCLG1CQUFtQjtFQUNuQix1QkFBdUI7RUFDdkIsa0JBQWtCO0FBQ3BCOzs7O0FBSUE7RUFDRSxhQUFhO0VBQ2IsdUJBQXVCO0VBQ3ZCLG1CQUFtQjs7RUFFbkIsNEJBQTRCO0VBQzVCLGtCQUFrQjtFQUNsQiw2QkFBNkI7RUFDN0IsMkJBQTJCO0FBQzdCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLG1CQUFtQjtFQUNuQixRQUFRO0FBQ1Y7O0FBRUE7RUFDRSxZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsaUJBQWlCO0FBQ25CXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIkBmb250LWZhY2Uge1xcbiAgZm9udC1mYW1pbHk6ICdMb2dvRm9udCc7XFxuICBzcmM6IHVybCgnLi9hc3NldHMvbWluZWNyYWZ0LWxvZ28udHRmJyk7XFxufVxcblxcbkBmb250LWZhY2Uge1xcbiAgZm9udC1mYW1pbHk6ICdJbnRlcmZhY2VGb250JztcXG4gIHNyYzogdXJsKCcuL2Fzc2V0cy9taW5lY3JhZnQub3RmJyksIHVybCgnLi9hc3NldHMvbWluZWNyYWZ0LWl0YWxpYy5vdGYnKSwgdXJsKCcuL2Fzc2V0cy9taW5lY3JhZnQtYm9sZC5vdGYnKSwgdXJsKCcuL2Fzc2V0cy9taW5lY3JhZnQtYm9sZC1pdGFsaWMub3RmJyk7XFxufVxcblxcbioge1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG59XFxuXFxuOjotd2Via2l0LXNjcm9sbGJhciB7XFxuICBkaXNwbGF5OiBub25lO1xcbn1cXG5cXG5oMSwgaDIsIGgzLCBoNCwgaDUsIGg2IHtcXG4gIG1hcmdpbjogMDtcXG4gIHBhZGRpbmc6IDA7XFxufVxcblxcbmJvZHkge1xcbiAgbWFyZ2luOiAwO1xcbiAgcGFkZGluZzogMDtcXG5cXG4gIG1pbi1oZWlnaHQ6IDEwMHZoO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuXFxuICBmb250LWZhbWlseTogVmVyZGFuYSwgR2VuZXZhLCBUYWhvbWEsIHNhbnMtc2VyaWY7XFxuICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoLi9hc3NldHMvaGVyby1iZy5qcGcpO1xcbiAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcXG4gIGJhY2tkcm9wLWZpbHRlcjogYmx1cig4cHgpO1xcbn1cXG5cXG5hIHtcXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG4gIGNvbG9yOiBpbmhlcml0O1xcbn1cXG5cXG5idXR0b246aG92ZXIsIGE6aG92ZXIge1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG5cXG5cXG5cXG4jY29udGVudCB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGZsZXg6IDE7XFxufVxcblxcblxcblxcbi5oZWFkZXIsIC5mb290ZXIge1xcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKC4vYXNzZXRzL2hlYWQtZm9vdC1iZy5qcGcpO1xcbn1cXG5cXG4uaGVhZGVyIHtcXG4gIHBhZGRpbmctYmxvY2s6IDI0cHg7XFxuICBwYWRkaW5nLWlubGluZTogNDhweDtcXG5cXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgYm94LXNoYWRvdzogMCAtNnB4IDEwcHggNXB4IHJnYmEoMCwwLDAsMC41KTtcXG4gIGJvcmRlci1ib3R0b206IDJweCBzb2xpZCAjODdjNWZlO1xcbn1cXG5cXG4uaGVhZGVyID4gaDEge1xcbiAgZm9udC1zaXplOiAyLjVyZW07XFxuICBsZXR0ZXItc3BhY2luZzogMnB4O1xcbn1cXG5cXG4uaGVhZGVyID4gaDEsIC5uYXYgPiBidXR0b24ge1xcbiAgZm9udC1mYW1pbHk6ICdMb2dvRm9udCc7XFxufVxcblxcbi5uYXYge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGdhcDogNDhweDtcXG59XFxuXFxuLm5hdiA+IGJ1dHRvbiB7XFxuICBwYWRkaW5nOiA4cHggMTZweDtcXG5cXG4gIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1xcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xcbiAgZm9udC1zaXplOiAxLjI1cmVtO1xcbiAgbGV0dGVyLXNwYWNpbmc6IDFweDtcXG59XFxuXFxubmF2ID4gLmFjdGl2ZSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjOWRjZGZiNTA7XFxuICBiYWNrZHJvcC1maWx0ZXI6IGJsdXIoNHB4KTtcXG4gIGJveC1zaGFkb3c6IDAgMCAzNnB4ICNmZmZmZmY7XFxuICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcXG4gIGNvbG9yOiBibGFjaztcXG59XFxuXFxuXFxuXFxuLnBhZ2UtY29udGVudCB7XFxuICBmbGV4OiAxO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcblxcbiAgZm9udC1mYW1pbHk6ICdJbnRlcmZhY2VGb250JztcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG59XFxuXFxuLmhlcm8ge1xcbiAgbWFyZ2luOiAyNHB4IDA7XFxuICBwYWRkaW5nOiAxNnB4O1xcblxcbiAgbWluLXdpZHRoOiA3NSU7XFxuXFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtZXZlbmx5O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMwMDAwMDAyNTtcXG4gIGJvcmRlcjogMXB4IHNvbGlkICNlZmVmZWY7XFxuICBib3JkZXItcmFkaXVzOiA0cHg7XFxuICBjb2xvcjogI2VmZWZlZjtcXG59XFxuXFxuLmRpdmlkZXIge1xcbiAgd2lkdGg6IDUwMHB4O1xcbn1cXG5cXG4uaGVyby1oZWFkIHtcXG4gIG1hcmdpbjogMDtcXG4gIHBhZGRpbmc6IDA7XFxufVxcblxcbi5oZXJvLXBhcmEtdGl0bGUge1xcbiAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7XFxufVxcblxcbi5oZXJvLXNsaWRlLXRleHQge1xcbiAgbWFyZ2luOiAwO1xcbiAgcGFkZGluZzogMDtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIHRvcDogMzJweDtcXG4gIGZvbnQtc2l6ZTogMS4yNXJlbTtcXG59XFxuXFxuLmhlcm8tc2xpZGUge1xcbiAgbWFyZ2luOiAwO1xcbiAgcGFkZGluZzogMDtcXG4gIGRpc3BsYXk6IG5vbmU7XFxufVxcblxcbi5oZXJvLXNsaWRlLWFjdGl2ZSB7XFxuICBkaXNwbGF5OiBibG9jaztcXG59XFxuXFxuLmhlcm8tc2xpZGUtYWN0aXZlIGltZyB7XFxuICBib3JkZXI6IDFweCBzb2xpZCB3aGl0ZTtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIHotaW5kZXg6IC0xO1xcbn1cXG5cXG4uaGVyby1zbGlkZS1pbWFnZSB7XFxuICBtYXJnaW46IDA7XFxuICBwYWRkaW5nOiAwO1xcbn1cXG5cXG4uaGVyby1zbGlkZS1uZXh0LCAuaGVyby1zbGlkZS1wcmV2aW91cyB7XFxuICB0b3A6IDhweDtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIHBhZGRpbmc6IDJweCA2cHggNnB4IDZweDtcXG4gIGJvcmRlcjogMXB4IHNvbGlkIHdoaXRlO1xcbiAgYm9yZGVyLXJhZGl1czogOHB4O1xcbiAgZm9udC1zaXplOiAycmVtO1xcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxufVxcblxcbi5oZXJvLXNsaWRlLW5leHQge1xcbiAgbGVmdDogMjRweDtcXG59XFxuXFxuLmhlcm8tc2xpZGUtcHJldmlvdXMge1xcbiAgcmlnaHQ6IDI0cHg7XFxufVxcblxcbi5oZXJvLW1lbnUge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDIsIDFmcik7XFxuICBjb2x1bW4tZ2FwOiAxNnB4O1xcbiAgcm93LWdhcDogOHB4O1xcbiAganVzdGlmeS1jb250ZW50OiBzdGFydDtcXG59XFxuXFxuLm1lbnUtbm90aWNlIHtcXG4gIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lO1xcbn1cXG5cXG4ubWVudS13YXJuaW5nIHtcXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xcbn1cXG5cXG4ubWVudS1jYXJkIHtcXG4gIHBhZGRpbmc6IDE2cHg7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGdhcDogMjRweDtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMyOTU3OTE7XFxuICBib3JkZXItcmFkaXVzOiA0cHg7XFxuICBib3JkZXI6IDFweCBzb2xpZCAjZWZlZmVmO1xcbn1cXG5cXG4ubWVudS1jYXJkOm50aC1vZi10eXBlKDEpLCAubWVudS1jYXJkOm50aC1vZi10eXBlKDQpLCAubWVudS1jYXJkOm50aC1vZi10eXBlKDUpLCAubWVudS1jYXJkOm50aC1vZi10eXBlKDgpLCAubWVudS1jYXJkOm50aC1vZi10eXBlKDkpLCAubWVudS1jYXJkOm50aC1vZi10eXBlKDEyKSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjYzc1YTM1O1xcbn1cXG5cXG4uaGVybyA+IGltZyB7XFxuICBib3JkZXI6IDFweCBzb2xpZCAjZWZlZmVmO1xcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xcbn1cXG5cXG4uY2FyZC1sZWZ0LCAuY2FyZC1yaWdodCB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGdhcDogNHB4O1xcbn1cXG5cXG4uY2FyZC1sZWZ0IHtcXG4gIGFsaWduLWl0ZW1zOiBzdGFydDtcXG4gIHRleHQtYWxpZ246IHN0YXJ0O1xcbn1cXG5cXG4uY2FyZC1sZWZ0ID4gaDQsIC5jYXJkLXJpZ2h0ID4gaDQsIC5jYXJkLXJpZ2h0ID4gcCB7XFxuICBtYXJnaW46IDA7XFxufVxcblxcbi5jYXJkLXJpZ2h0IHtcXG4gIGFsaWduLWl0ZW1zOiBlbmQ7XFxuICB0ZXh0LWFsaWduOiBlbmQ7XFxufVxcblxcbi5jb250YWN0LWZvcm0ge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMiwgMWZyKTtcXG4gIHJvdy1nYXA6IDhweDtcXG59XFxuXFxuLmNvbnRhY3QtZm9ybSA+IGxhYmVsLCAuY29udGFjdC1mb3JtID4gaW5wdXQge1xcbiAgdGV4dC1hbGlnbjogc3RhcnQ7XFxuICBmb250LXNpemU6IDEuMjVyZW07XFxufVxcblxcbi5mb3JtLWJ1dHRvbiB7XFxuICBtYXJnaW4tdG9wOiAyNHB4O1xcbiAgcGFkZGluZzogOHB4IDI0cHg7XFxuICBmb250LWZhbWlseTogJ0ludGVyZmFjZUZvbnQnO1xcbiAgZm9udC1zaXplOiAxLjEyNXJlbTtcXG4gIGJvcmRlcjogMXB4IHNvbGlkIHdoaXRlO1xcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xcbn1cXG5cXG5cXG5cXG4uZm9vdGVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBcXG4gIGZvbnQtZmFtaWx5OiAnSW50ZXJmYWNlRm9udCc7XFxuICBmb250LXNpemU6IDEuMjVyZW07XFxuICBib3JkZXItdG9wOiAycHggc29saWQgIzVhOTMzMjtcXG4gIGJhY2tncm91bmQtcG9zaXRpb246IGJvdHRvbTtcXG59XFxuXFxuLmZvb3Rlci1zb3VyY2Uge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBnYXA6IDhweDtcXG59XFxuXFxuLmZvb3Rlci1sb2dvIHtcXG4gIGhlaWdodDogMjVweDtcXG59XFxuXFxuLmZvb3QtdGV4dCB7XFxuICBtYXJnaW46IDZweCAwO1xcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxufVwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTtcblxuICAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTtcblxuICAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh1cmwsIG9wdGlvbnMpIHtcbiAgaWYgKCFvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IHt9O1xuICB9XG4gIGlmICghdXJsKSB7XG4gICAgcmV0dXJuIHVybDtcbiAgfVxuICB1cmwgPSBTdHJpbmcodXJsLl9fZXNNb2R1bGUgPyB1cmwuZGVmYXVsdCA6IHVybCk7XG5cbiAgLy8gSWYgdXJsIGlzIGFscmVhZHkgd3JhcHBlZCBpbiBxdW90ZXMsIHJlbW92ZSB0aGVtXG4gIGlmICgvXlsnXCJdLipbJ1wiXSQvLnRlc3QodXJsKSkge1xuICAgIHVybCA9IHVybC5zbGljZSgxLCAtMSk7XG4gIH1cbiAgaWYgKG9wdGlvbnMuaGFzaCkge1xuICAgIHVybCArPSBvcHRpb25zLmhhc2g7XG4gIH1cblxuICAvLyBTaG91bGQgdXJsIGJlIHdyYXBwZWQ/XG4gIC8vIFNlZSBodHRwczovL2RyYWZ0cy5jc3N3Zy5vcmcvY3NzLXZhbHVlcy0zLyN1cmxzXG4gIGlmICgvW1wiJygpIFxcdFxcbl18KCUyMCkvLnRlc3QodXJsKSB8fCBvcHRpb25zLm5lZWRRdW90ZXMpIHtcbiAgICByZXR1cm4gXCJcXFwiXCIuY29uY2F0KHVybC5yZXBsYWNlKC9cIi9nLCAnXFxcXFwiJykucmVwbGFjZSgvXFxuL2csIFwiXFxcXG5cIiksIFwiXFxcIlwiKTtcbiAgfVxuICByZXR1cm4gdXJsO1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIid1c2Ugc3RyaWN0JztcblxudmFyIGhhc1Byb3BlcnR5RGVzY3JpcHRvcnMgPSByZXF1aXJlKCdoYXMtcHJvcGVydHktZGVzY3JpcHRvcnMnKSgpO1xuXG52YXIgR2V0SW50cmluc2ljID0gcmVxdWlyZSgnZ2V0LWludHJpbnNpYycpO1xuXG52YXIgJGRlZmluZVByb3BlcnR5ID0gaGFzUHJvcGVydHlEZXNjcmlwdG9ycyAmJiBHZXRJbnRyaW5zaWMoJyVPYmplY3QuZGVmaW5lUHJvcGVydHklJywgdHJ1ZSk7XG5pZiAoJGRlZmluZVByb3BlcnR5KSB7XG5cdHRyeSB7XG5cdFx0JGRlZmluZVByb3BlcnR5KHt9LCAnYScsIHsgdmFsdWU6IDEgfSk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHQvLyBJRSA4IGhhcyBhIGJyb2tlbiBkZWZpbmVQcm9wZXJ0eVxuXHRcdCRkZWZpbmVQcm9wZXJ0eSA9IGZhbHNlO1xuXHR9XG59XG5cbnZhciAkU3ludGF4RXJyb3IgPSBHZXRJbnRyaW5zaWMoJyVTeW50YXhFcnJvciUnKTtcbnZhciAkVHlwZUVycm9yID0gR2V0SW50cmluc2ljKCclVHlwZUVycm9yJScpO1xuXG52YXIgZ29wZCA9IHJlcXVpcmUoJ2dvcGQnKTtcblxuLyoqIEB0eXBlIHsob2JqOiBSZWNvcmQ8UHJvcGVydHlLZXksIHVua25vd24+LCBwcm9wZXJ0eTogUHJvcGVydHlLZXksIHZhbHVlOiB1bmtub3duLCBub25FbnVtZXJhYmxlPzogYm9vbGVhbiB8IG51bGwsIG5vbldyaXRhYmxlPzogYm9vbGVhbiB8IG51bGwsIG5vbkNvbmZpZ3VyYWJsZT86IGJvb2xlYW4gfCBudWxsLCBsb29zZT86IGJvb2xlYW4pID0+IHZvaWR9ICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGRlZmluZURhdGFQcm9wZXJ0eShcblx0b2JqLFxuXHRwcm9wZXJ0eSxcblx0dmFsdWVcbikge1xuXHRpZiAoIW9iaiB8fCAodHlwZW9mIG9iaiAhPT0gJ29iamVjdCcgJiYgdHlwZW9mIG9iaiAhPT0gJ2Z1bmN0aW9uJykpIHtcblx0XHR0aHJvdyBuZXcgJFR5cGVFcnJvcignYG9iamAgbXVzdCBiZSBhbiBvYmplY3Qgb3IgYSBmdW5jdGlvbmAnKTtcblx0fVxuXHRpZiAodHlwZW9mIHByb3BlcnR5ICE9PSAnc3RyaW5nJyAmJiB0eXBlb2YgcHJvcGVydHkgIT09ICdzeW1ib2wnKSB7XG5cdFx0dGhyb3cgbmV3ICRUeXBlRXJyb3IoJ2Bwcm9wZXJ0eWAgbXVzdCBiZSBhIHN0cmluZyBvciBhIHN5bWJvbGAnKTtcblx0fVxuXHRpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDMgJiYgdHlwZW9mIGFyZ3VtZW50c1szXSAhPT0gJ2Jvb2xlYW4nICYmIGFyZ3VtZW50c1szXSAhPT0gbnVsbCkge1xuXHRcdHRocm93IG5ldyAkVHlwZUVycm9yKCdgbm9uRW51bWVyYWJsZWAsIGlmIHByb3ZpZGVkLCBtdXN0IGJlIGEgYm9vbGVhbiBvciBudWxsJyk7XG5cdH1cblx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPiA0ICYmIHR5cGVvZiBhcmd1bWVudHNbNF0gIT09ICdib29sZWFuJyAmJiBhcmd1bWVudHNbNF0gIT09IG51bGwpIHtcblx0XHR0aHJvdyBuZXcgJFR5cGVFcnJvcignYG5vbldyaXRhYmxlYCwgaWYgcHJvdmlkZWQsIG11c3QgYmUgYSBib29sZWFuIG9yIG51bGwnKTtcblx0fVxuXHRpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDUgJiYgdHlwZW9mIGFyZ3VtZW50c1s1XSAhPT0gJ2Jvb2xlYW4nICYmIGFyZ3VtZW50c1s1XSAhPT0gbnVsbCkge1xuXHRcdHRocm93IG5ldyAkVHlwZUVycm9yKCdgbm9uQ29uZmlndXJhYmxlYCwgaWYgcHJvdmlkZWQsIG11c3QgYmUgYSBib29sZWFuIG9yIG51bGwnKTtcblx0fVxuXHRpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDYgJiYgdHlwZW9mIGFyZ3VtZW50c1s2XSAhPT0gJ2Jvb2xlYW4nKSB7XG5cdFx0dGhyb3cgbmV3ICRUeXBlRXJyb3IoJ2Bsb29zZWAsIGlmIHByb3ZpZGVkLCBtdXN0IGJlIGEgYm9vbGVhbicpO1xuXHR9XG5cblx0dmFyIG5vbkVudW1lcmFibGUgPSBhcmd1bWVudHMubGVuZ3RoID4gMyA/IGFyZ3VtZW50c1szXSA6IG51bGw7XG5cdHZhciBub25Xcml0YWJsZSA9IGFyZ3VtZW50cy5sZW5ndGggPiA0ID8gYXJndW1lbnRzWzRdIDogbnVsbDtcblx0dmFyIG5vbkNvbmZpZ3VyYWJsZSA9IGFyZ3VtZW50cy5sZW5ndGggPiA1ID8gYXJndW1lbnRzWzVdIDogbnVsbDtcblx0dmFyIGxvb3NlID0gYXJndW1lbnRzLmxlbmd0aCA+IDYgPyBhcmd1bWVudHNbNl0gOiBmYWxzZTtcblxuXHQvKiBAdHlwZSB7ZmFsc2UgfCBUeXBlZFByb3BlcnR5RGVzY3JpcHRvcjx1bmtub3duPn0gKi9cblx0dmFyIGRlc2MgPSAhIWdvcGQgJiYgZ29wZChvYmosIHByb3BlcnR5KTtcblxuXHRpZiAoJGRlZmluZVByb3BlcnR5KSB7XG5cdFx0JGRlZmluZVByb3BlcnR5KG9iaiwgcHJvcGVydHksIHtcblx0XHRcdGNvbmZpZ3VyYWJsZTogbm9uQ29uZmlndXJhYmxlID09PSBudWxsICYmIGRlc2MgPyBkZXNjLmNvbmZpZ3VyYWJsZSA6ICFub25Db25maWd1cmFibGUsXG5cdFx0XHRlbnVtZXJhYmxlOiBub25FbnVtZXJhYmxlID09PSBudWxsICYmIGRlc2MgPyBkZXNjLmVudW1lcmFibGUgOiAhbm9uRW51bWVyYWJsZSxcblx0XHRcdHZhbHVlOiB2YWx1ZSxcblx0XHRcdHdyaXRhYmxlOiBub25Xcml0YWJsZSA9PT0gbnVsbCAmJiBkZXNjID8gZGVzYy53cml0YWJsZSA6ICFub25Xcml0YWJsZVxuXHRcdH0pO1xuXHR9IGVsc2UgaWYgKGxvb3NlIHx8ICghbm9uRW51bWVyYWJsZSAmJiAhbm9uV3JpdGFibGUgJiYgIW5vbkNvbmZpZ3VyYWJsZSkpIHtcblx0XHQvLyBtdXN0IGZhbGwgYmFjayB0byBbW1NldF1dLCBhbmQgd2FzIG5vdCBleHBsaWNpdGx5IGFza2VkIHRvIG1ha2Ugbm9uLWVudW1lcmFibGUsIG5vbi13cml0YWJsZSwgb3Igbm9uLWNvbmZpZ3VyYWJsZVxuXHRcdG9ialtwcm9wZXJ0eV0gPSB2YWx1ZTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuXHR9IGVsc2Uge1xuXHRcdHRocm93IG5ldyAkU3ludGF4RXJyb3IoJ1RoaXMgZW52aXJvbm1lbnQgZG9lcyBub3Qgc3VwcG9ydCBkZWZpbmluZyBhIHByb3BlcnR5IGFzIG5vbi1jb25maWd1cmFibGUsIG5vbi13cml0YWJsZSwgb3Igbm9uLWVudW1lcmFibGUuJyk7XG5cdH1cbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBrZXlzID0gcmVxdWlyZSgnb2JqZWN0LWtleXMnKTtcbnZhciBoYXNTeW1ib2xzID0gdHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgU3ltYm9sKCdmb28nKSA9PT0gJ3N5bWJvbCc7XG5cbnZhciB0b1N0ciA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG52YXIgY29uY2F0ID0gQXJyYXkucHJvdG90eXBlLmNvbmNhdDtcbnZhciBkZWZpbmVEYXRhUHJvcGVydHkgPSByZXF1aXJlKCdkZWZpbmUtZGF0YS1wcm9wZXJ0eScpO1xuXG52YXIgaXNGdW5jdGlvbiA9IGZ1bmN0aW9uIChmbikge1xuXHRyZXR1cm4gdHlwZW9mIGZuID09PSAnZnVuY3Rpb24nICYmIHRvU3RyLmNhbGwoZm4pID09PSAnW29iamVjdCBGdW5jdGlvbl0nO1xufTtcblxudmFyIHN1cHBvcnRzRGVzY3JpcHRvcnMgPSByZXF1aXJlKCdoYXMtcHJvcGVydHktZGVzY3JpcHRvcnMnKSgpO1xuXG52YXIgZGVmaW5lUHJvcGVydHkgPSBmdW5jdGlvbiAob2JqZWN0LCBuYW1lLCB2YWx1ZSwgcHJlZGljYXRlKSB7XG5cdGlmIChuYW1lIGluIG9iamVjdCkge1xuXHRcdGlmIChwcmVkaWNhdGUgPT09IHRydWUpIHtcblx0XHRcdGlmIChvYmplY3RbbmFtZV0gPT09IHZhbHVlKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHR9IGVsc2UgaWYgKCFpc0Z1bmN0aW9uKHByZWRpY2F0ZSkgfHwgIXByZWRpY2F0ZSgpKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHR9XG5cblx0aWYgKHN1cHBvcnRzRGVzY3JpcHRvcnMpIHtcblx0XHRkZWZpbmVEYXRhUHJvcGVydHkob2JqZWN0LCBuYW1lLCB2YWx1ZSwgdHJ1ZSk7XG5cdH0gZWxzZSB7XG5cdFx0ZGVmaW5lRGF0YVByb3BlcnR5KG9iamVjdCwgbmFtZSwgdmFsdWUpO1xuXHR9XG59O1xuXG52YXIgZGVmaW5lUHJvcGVydGllcyA9IGZ1bmN0aW9uIChvYmplY3QsIG1hcCkge1xuXHR2YXIgcHJlZGljYXRlcyA9IGFyZ3VtZW50cy5sZW5ndGggPiAyID8gYXJndW1lbnRzWzJdIDoge307XG5cdHZhciBwcm9wcyA9IGtleXMobWFwKTtcblx0aWYgKGhhc1N5bWJvbHMpIHtcblx0XHRwcm9wcyA9IGNvbmNhdC5jYWxsKHByb3BzLCBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKG1hcCkpO1xuXHR9XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpICs9IDEpIHtcblx0XHRkZWZpbmVQcm9wZXJ0eShvYmplY3QsIHByb3BzW2ldLCBtYXBbcHJvcHNbaV1dLCBwcmVkaWNhdGVzW3Byb3BzW2ldXSk7XG5cdH1cbn07XG5cbmRlZmluZVByb3BlcnRpZXMuc3VwcG9ydHNEZXNjcmlwdG9ycyA9ICEhc3VwcG9ydHNEZXNjcmlwdG9ycztcblxubW9kdWxlLmV4cG9ydHMgPSBkZWZpbmVQcm9wZXJ0aWVzO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgaXNDYWxsYWJsZSA9IHJlcXVpcmUoJ2lzLWNhbGxhYmxlJyk7XG5cbnZhciB0b1N0ciA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG52YXIgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuXG52YXIgZm9yRWFjaEFycmF5ID0gZnVuY3Rpb24gZm9yRWFjaEFycmF5KGFycmF5LCBpdGVyYXRvciwgcmVjZWl2ZXIpIHtcbiAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gYXJyYXkubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgaWYgKGhhc093blByb3BlcnR5LmNhbGwoYXJyYXksIGkpKSB7XG4gICAgICAgICAgICBpZiAocmVjZWl2ZXIgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGl0ZXJhdG9yKGFycmF5W2ldLCBpLCBhcnJheSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGl0ZXJhdG9yLmNhbGwocmVjZWl2ZXIsIGFycmF5W2ldLCBpLCBhcnJheSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG52YXIgZm9yRWFjaFN0cmluZyA9IGZ1bmN0aW9uIGZvckVhY2hTdHJpbmcoc3RyaW5nLCBpdGVyYXRvciwgcmVjZWl2ZXIpIHtcbiAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gc3RyaW5nLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIC8vIG5vIHN1Y2ggdGhpbmcgYXMgYSBzcGFyc2Ugc3RyaW5nLlxuICAgICAgICBpZiAocmVjZWl2ZXIgPT0gbnVsbCkge1xuICAgICAgICAgICAgaXRlcmF0b3Ioc3RyaW5nLmNoYXJBdChpKSwgaSwgc3RyaW5nKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGl0ZXJhdG9yLmNhbGwocmVjZWl2ZXIsIHN0cmluZy5jaGFyQXQoaSksIGksIHN0cmluZyk7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG52YXIgZm9yRWFjaE9iamVjdCA9IGZ1bmN0aW9uIGZvckVhY2hPYmplY3Qob2JqZWN0LCBpdGVyYXRvciwgcmVjZWl2ZXIpIHtcbiAgICBmb3IgKHZhciBrIGluIG9iamVjdCkge1xuICAgICAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIGspKSB7XG4gICAgICAgICAgICBpZiAocmVjZWl2ZXIgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGl0ZXJhdG9yKG9iamVjdFtrXSwgaywgb2JqZWN0KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaXRlcmF0b3IuY2FsbChyZWNlaXZlciwgb2JqZWN0W2tdLCBrLCBvYmplY3QpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufTtcblxudmFyIGZvckVhY2ggPSBmdW5jdGlvbiBmb3JFYWNoKGxpc3QsIGl0ZXJhdG9yLCB0aGlzQXJnKSB7XG4gICAgaWYgKCFpc0NhbGxhYmxlKGl0ZXJhdG9yKSkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdpdGVyYXRvciBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcbiAgICB9XG5cbiAgICB2YXIgcmVjZWl2ZXI7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPj0gMykge1xuICAgICAgICByZWNlaXZlciA9IHRoaXNBcmc7XG4gICAgfVxuXG4gICAgaWYgKHRvU3RyLmNhbGwobGlzdCkgPT09ICdbb2JqZWN0IEFycmF5XScpIHtcbiAgICAgICAgZm9yRWFjaEFycmF5KGxpc3QsIGl0ZXJhdG9yLCByZWNlaXZlcik7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgbGlzdCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgZm9yRWFjaFN0cmluZyhsaXN0LCBpdGVyYXRvciwgcmVjZWl2ZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGZvckVhY2hPYmplY3QobGlzdCwgaXRlcmF0b3IsIHJlY2VpdmVyKTtcbiAgICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZvckVhY2g7XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qIGVzbGludCBuby1pbnZhbGlkLXRoaXM6IDEgKi9cblxudmFyIEVSUk9SX01FU1NBR0UgPSAnRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQgY2FsbGVkIG9uIGluY29tcGF0aWJsZSAnO1xudmFyIHRvU3RyID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcbnZhciBtYXggPSBNYXRoLm1heDtcbnZhciBmdW5jVHlwZSA9ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XG5cbnZhciBjb25jYXR0eSA9IGZ1bmN0aW9uIGNvbmNhdHR5KGEsIGIpIHtcbiAgICB2YXIgYXJyID0gW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGEubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgYXJyW2ldID0gYVtpXTtcbiAgICB9XG4gICAgZm9yICh2YXIgaiA9IDA7IGogPCBiLmxlbmd0aDsgaiArPSAxKSB7XG4gICAgICAgIGFycltqICsgYS5sZW5ndGhdID0gYltqXTtcbiAgICB9XG5cbiAgICByZXR1cm4gYXJyO1xufTtcblxudmFyIHNsaWN5ID0gZnVuY3Rpb24gc2xpY3koYXJyTGlrZSwgb2Zmc2V0KSB7XG4gICAgdmFyIGFyciA9IFtdO1xuICAgIGZvciAodmFyIGkgPSBvZmZzZXQgfHwgMCwgaiA9IDA7IGkgPCBhcnJMaWtlLmxlbmd0aDsgaSArPSAxLCBqICs9IDEpIHtcbiAgICAgICAgYXJyW2pdID0gYXJyTGlrZVtpXTtcbiAgICB9XG4gICAgcmV0dXJuIGFycjtcbn07XG5cbnZhciBqb2lueSA9IGZ1bmN0aW9uIChhcnIsIGpvaW5lcikge1xuICAgIHZhciBzdHIgPSAnJztcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBzdHIgKz0gYXJyW2ldO1xuICAgICAgICBpZiAoaSArIDEgPCBhcnIubGVuZ3RoKSB7XG4gICAgICAgICAgICBzdHIgKz0gam9pbmVyO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBzdHI7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGJpbmQodGhhdCkge1xuICAgIHZhciB0YXJnZXQgPSB0aGlzO1xuICAgIGlmICh0eXBlb2YgdGFyZ2V0ICE9PSAnZnVuY3Rpb24nIHx8IHRvU3RyLmFwcGx5KHRhcmdldCkgIT09IGZ1bmNUeXBlKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoRVJST1JfTUVTU0FHRSArIHRhcmdldCk7XG4gICAgfVxuICAgIHZhciBhcmdzID0gc2xpY3koYXJndW1lbnRzLCAxKTtcblxuICAgIHZhciBib3VuZDtcbiAgICB2YXIgYmluZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcyBpbnN0YW5jZW9mIGJvdW5kKSB7XG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gdGFyZ2V0LmFwcGx5KFxuICAgICAgICAgICAgICAgIHRoaXMsXG4gICAgICAgICAgICAgICAgY29uY2F0dHkoYXJncywgYXJndW1lbnRzKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGlmIChPYmplY3QocmVzdWx0KSA9PT0gcmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0YXJnZXQuYXBwbHkoXG4gICAgICAgICAgICB0aGF0LFxuICAgICAgICAgICAgY29uY2F0dHkoYXJncywgYXJndW1lbnRzKVxuICAgICAgICApO1xuXG4gICAgfTtcblxuICAgIHZhciBib3VuZExlbmd0aCA9IG1heCgwLCB0YXJnZXQubGVuZ3RoIC0gYXJncy5sZW5ndGgpO1xuICAgIHZhciBib3VuZEFyZ3MgPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGJvdW5kTGVuZ3RoOyBpKyspIHtcbiAgICAgICAgYm91bmRBcmdzW2ldID0gJyQnICsgaTtcbiAgICB9XG5cbiAgICBib3VuZCA9IEZ1bmN0aW9uKCdiaW5kZXInLCAncmV0dXJuIGZ1bmN0aW9uICgnICsgam9pbnkoYm91bmRBcmdzLCAnLCcpICsgJyl7IHJldHVybiBiaW5kZXIuYXBwbHkodGhpcyxhcmd1bWVudHMpOyB9JykoYmluZGVyKTtcblxuICAgIGlmICh0YXJnZXQucHJvdG90eXBlKSB7XG4gICAgICAgIHZhciBFbXB0eSA9IGZ1bmN0aW9uIEVtcHR5KCkge307XG4gICAgICAgIEVtcHR5LnByb3RvdHlwZSA9IHRhcmdldC5wcm90b3R5cGU7XG4gICAgICAgIGJvdW5kLnByb3RvdHlwZSA9IG5ldyBFbXB0eSgpO1xuICAgICAgICBFbXB0eS5wcm90b3R5cGUgPSBudWxsO1xuICAgIH1cblxuICAgIHJldHVybiBib3VuZDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBpbXBsZW1lbnRhdGlvbiA9IHJlcXVpcmUoJy4vaW1wbGVtZW50YXRpb24nKTtcblxubW9kdWxlLmV4cG9ydHMgPSBGdW5jdGlvbi5wcm90b3R5cGUuYmluZCB8fCBpbXBsZW1lbnRhdGlvbjtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHVuZGVmaW5lZDtcblxudmFyICRTeW50YXhFcnJvciA9IFN5bnRheEVycm9yO1xudmFyICRGdW5jdGlvbiA9IEZ1bmN0aW9uO1xudmFyICRUeXBlRXJyb3IgPSBUeXBlRXJyb3I7XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjb25zaXN0ZW50LXJldHVyblxudmFyIGdldEV2YWxsZWRDb25zdHJ1Y3RvciA9IGZ1bmN0aW9uIChleHByZXNzaW9uU3ludGF4KSB7XG5cdHRyeSB7XG5cdFx0cmV0dXJuICRGdW5jdGlvbignXCJ1c2Ugc3RyaWN0XCI7IHJldHVybiAoJyArIGV4cHJlc3Npb25TeW50YXggKyAnKS5jb25zdHJ1Y3RvcjsnKSgpO1xuXHR9IGNhdGNoIChlKSB7fVxufTtcblxudmFyICRnT1BEID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcbmlmICgkZ09QRCkge1xuXHR0cnkge1xuXHRcdCRnT1BEKHt9LCAnJyk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHQkZ09QRCA9IG51bGw7IC8vIHRoaXMgaXMgSUUgOCwgd2hpY2ggaGFzIGEgYnJva2VuIGdPUERcblx0fVxufVxuXG52YXIgdGhyb3dUeXBlRXJyb3IgPSBmdW5jdGlvbiAoKSB7XG5cdHRocm93IG5ldyAkVHlwZUVycm9yKCk7XG59O1xudmFyIFRocm93VHlwZUVycm9yID0gJGdPUERcblx0PyAoZnVuY3Rpb24gKCkge1xuXHRcdHRyeSB7XG5cdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLWV4cHJlc3Npb25zLCBuby1jYWxsZXIsIG5vLXJlc3RyaWN0ZWQtcHJvcGVydGllc1xuXHRcdFx0YXJndW1lbnRzLmNhbGxlZTsgLy8gSUUgOCBkb2VzIG5vdCB0aHJvdyBoZXJlXG5cdFx0XHRyZXR1cm4gdGhyb3dUeXBlRXJyb3I7XG5cdFx0fSBjYXRjaCAoY2FsbGVlVGhyb3dzKSB7XG5cdFx0XHR0cnkge1xuXHRcdFx0XHQvLyBJRSA4IHRocm93cyBvbiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGFyZ3VtZW50cywgJycpXG5cdFx0XHRcdHJldHVybiAkZ09QRChhcmd1bWVudHMsICdjYWxsZWUnKS5nZXQ7XG5cdFx0XHR9IGNhdGNoIChnT1BEdGhyb3dzKSB7XG5cdFx0XHRcdHJldHVybiB0aHJvd1R5cGVFcnJvcjtcblx0XHRcdH1cblx0XHR9XG5cdH0oKSlcblx0OiB0aHJvd1R5cGVFcnJvcjtcblxudmFyIGhhc1N5bWJvbHMgPSByZXF1aXJlKCdoYXMtc3ltYm9scycpKCk7XG52YXIgaGFzUHJvdG8gPSByZXF1aXJlKCdoYXMtcHJvdG8nKSgpO1xuXG52YXIgZ2V0UHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YgfHwgKFxuXHRoYXNQcm90b1xuXHRcdD8gZnVuY3Rpb24gKHgpIHsgcmV0dXJuIHguX19wcm90b19fOyB9IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tcHJvdG9cblx0XHQ6IG51bGxcbik7XG5cbnZhciBuZWVkc0V2YWwgPSB7fTtcblxudmFyIFR5cGVkQXJyYXkgPSB0eXBlb2YgVWludDhBcnJheSA9PT0gJ3VuZGVmaW5lZCcgfHwgIWdldFByb3RvID8gdW5kZWZpbmVkIDogZ2V0UHJvdG8oVWludDhBcnJheSk7XG5cbnZhciBJTlRSSU5TSUNTID0ge1xuXHQnJUFnZ3JlZ2F0ZUVycm9yJSc6IHR5cGVvZiBBZ2dyZWdhdGVFcnJvciA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBBZ2dyZWdhdGVFcnJvcixcblx0JyVBcnJheSUnOiBBcnJheSxcblx0JyVBcnJheUJ1ZmZlciUnOiB0eXBlb2YgQXJyYXlCdWZmZXIgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogQXJyYXlCdWZmZXIsXG5cdCclQXJyYXlJdGVyYXRvclByb3RvdHlwZSUnOiBoYXNTeW1ib2xzICYmIGdldFByb3RvID8gZ2V0UHJvdG8oW11bU3ltYm9sLml0ZXJhdG9yXSgpKSA6IHVuZGVmaW5lZCxcblx0JyVBc3luY0Zyb21TeW5jSXRlcmF0b3JQcm90b3R5cGUlJzogdW5kZWZpbmVkLFxuXHQnJUFzeW5jRnVuY3Rpb24lJzogbmVlZHNFdmFsLFxuXHQnJUFzeW5jR2VuZXJhdG9yJSc6IG5lZWRzRXZhbCxcblx0JyVBc3luY0dlbmVyYXRvckZ1bmN0aW9uJSc6IG5lZWRzRXZhbCxcblx0JyVBc3luY0l0ZXJhdG9yUHJvdG90eXBlJSc6IG5lZWRzRXZhbCxcblx0JyVBdG9taWNzJSc6IHR5cGVvZiBBdG9taWNzID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IEF0b21pY3MsXG5cdCclQmlnSW50JSc6IHR5cGVvZiBCaWdJbnQgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogQmlnSW50LFxuXHQnJUJpZ0ludDY0QXJyYXklJzogdHlwZW9mIEJpZ0ludDY0QXJyYXkgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogQmlnSW50NjRBcnJheSxcblx0JyVCaWdVaW50NjRBcnJheSUnOiB0eXBlb2YgQmlnVWludDY0QXJyYXkgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogQmlnVWludDY0QXJyYXksXG5cdCclQm9vbGVhbiUnOiBCb29sZWFuLFxuXHQnJURhdGFWaWV3JSc6IHR5cGVvZiBEYXRhVmlldyA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBEYXRhVmlldyxcblx0JyVEYXRlJSc6IERhdGUsXG5cdCclZGVjb2RlVVJJJSc6IGRlY29kZVVSSSxcblx0JyVkZWNvZGVVUklDb21wb25lbnQlJzogZGVjb2RlVVJJQ29tcG9uZW50LFxuXHQnJWVuY29kZVVSSSUnOiBlbmNvZGVVUkksXG5cdCclZW5jb2RlVVJJQ29tcG9uZW50JSc6IGVuY29kZVVSSUNvbXBvbmVudCxcblx0JyVFcnJvciUnOiBFcnJvcixcblx0JyVldmFsJSc6IGV2YWwsIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tZXZhbFxuXHQnJUV2YWxFcnJvciUnOiBFdmFsRXJyb3IsXG5cdCclRmxvYXQzMkFycmF5JSc6IHR5cGVvZiBGbG9hdDMyQXJyYXkgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogRmxvYXQzMkFycmF5LFxuXHQnJUZsb2F0NjRBcnJheSUnOiB0eXBlb2YgRmxvYXQ2NEFycmF5ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IEZsb2F0NjRBcnJheSxcblx0JyVGaW5hbGl6YXRpb25SZWdpc3RyeSUnOiB0eXBlb2YgRmluYWxpemF0aW9uUmVnaXN0cnkgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogRmluYWxpemF0aW9uUmVnaXN0cnksXG5cdCclRnVuY3Rpb24lJzogJEZ1bmN0aW9uLFxuXHQnJUdlbmVyYXRvckZ1bmN0aW9uJSc6IG5lZWRzRXZhbCxcblx0JyVJbnQ4QXJyYXklJzogdHlwZW9mIEludDhBcnJheSA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBJbnQ4QXJyYXksXG5cdCclSW50MTZBcnJheSUnOiB0eXBlb2YgSW50MTZBcnJheSA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBJbnQxNkFycmF5LFxuXHQnJUludDMyQXJyYXklJzogdHlwZW9mIEludDMyQXJyYXkgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogSW50MzJBcnJheSxcblx0JyVpc0Zpbml0ZSUnOiBpc0Zpbml0ZSxcblx0JyVpc05hTiUnOiBpc05hTixcblx0JyVJdGVyYXRvclByb3RvdHlwZSUnOiBoYXNTeW1ib2xzICYmIGdldFByb3RvID8gZ2V0UHJvdG8oZ2V0UHJvdG8oW11bU3ltYm9sLml0ZXJhdG9yXSgpKSkgOiB1bmRlZmluZWQsXG5cdCclSlNPTiUnOiB0eXBlb2YgSlNPTiA9PT0gJ29iamVjdCcgPyBKU09OIDogdW5kZWZpbmVkLFxuXHQnJU1hcCUnOiB0eXBlb2YgTWFwID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IE1hcCxcblx0JyVNYXBJdGVyYXRvclByb3RvdHlwZSUnOiB0eXBlb2YgTWFwID09PSAndW5kZWZpbmVkJyB8fCAhaGFzU3ltYm9scyB8fCAhZ2V0UHJvdG8gPyB1bmRlZmluZWQgOiBnZXRQcm90byhuZXcgTWFwKClbU3ltYm9sLml0ZXJhdG9yXSgpKSxcblx0JyVNYXRoJSc6IE1hdGgsXG5cdCclTnVtYmVyJSc6IE51bWJlcixcblx0JyVPYmplY3QlJzogT2JqZWN0LFxuXHQnJXBhcnNlRmxvYXQlJzogcGFyc2VGbG9hdCxcblx0JyVwYXJzZUludCUnOiBwYXJzZUludCxcblx0JyVQcm9taXNlJSc6IHR5cGVvZiBQcm9taXNlID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IFByb21pc2UsXG5cdCclUHJveHklJzogdHlwZW9mIFByb3h5ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IFByb3h5LFxuXHQnJVJhbmdlRXJyb3IlJzogUmFuZ2VFcnJvcixcblx0JyVSZWZlcmVuY2VFcnJvciUnOiBSZWZlcmVuY2VFcnJvcixcblx0JyVSZWZsZWN0JSc6IHR5cGVvZiBSZWZsZWN0ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IFJlZmxlY3QsXG5cdCclUmVnRXhwJSc6IFJlZ0V4cCxcblx0JyVTZXQlJzogdHlwZW9mIFNldCA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBTZXQsXG5cdCclU2V0SXRlcmF0b3JQcm90b3R5cGUlJzogdHlwZW9mIFNldCA9PT0gJ3VuZGVmaW5lZCcgfHwgIWhhc1N5bWJvbHMgfHwgIWdldFByb3RvID8gdW5kZWZpbmVkIDogZ2V0UHJvdG8obmV3IFNldCgpW1N5bWJvbC5pdGVyYXRvcl0oKSksXG5cdCclU2hhcmVkQXJyYXlCdWZmZXIlJzogdHlwZW9mIFNoYXJlZEFycmF5QnVmZmVyID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IFNoYXJlZEFycmF5QnVmZmVyLFxuXHQnJVN0cmluZyUnOiBTdHJpbmcsXG5cdCclU3RyaW5nSXRlcmF0b3JQcm90b3R5cGUlJzogaGFzU3ltYm9scyAmJiBnZXRQcm90byA/IGdldFByb3RvKCcnW1N5bWJvbC5pdGVyYXRvcl0oKSkgOiB1bmRlZmluZWQsXG5cdCclU3ltYm9sJSc6IGhhc1N5bWJvbHMgPyBTeW1ib2wgOiB1bmRlZmluZWQsXG5cdCclU3ludGF4RXJyb3IlJzogJFN5bnRheEVycm9yLFxuXHQnJVRocm93VHlwZUVycm9yJSc6IFRocm93VHlwZUVycm9yLFxuXHQnJVR5cGVkQXJyYXklJzogVHlwZWRBcnJheSxcblx0JyVUeXBlRXJyb3IlJzogJFR5cGVFcnJvcixcblx0JyVVaW50OEFycmF5JSc6IHR5cGVvZiBVaW50OEFycmF5ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IFVpbnQ4QXJyYXksXG5cdCclVWludDhDbGFtcGVkQXJyYXklJzogdHlwZW9mIFVpbnQ4Q2xhbXBlZEFycmF5ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IFVpbnQ4Q2xhbXBlZEFycmF5LFxuXHQnJVVpbnQxNkFycmF5JSc6IHR5cGVvZiBVaW50MTZBcnJheSA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBVaW50MTZBcnJheSxcblx0JyVVaW50MzJBcnJheSUnOiB0eXBlb2YgVWludDMyQXJyYXkgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogVWludDMyQXJyYXksXG5cdCclVVJJRXJyb3IlJzogVVJJRXJyb3IsXG5cdCclV2Vha01hcCUnOiB0eXBlb2YgV2Vha01hcCA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBXZWFrTWFwLFxuXHQnJVdlYWtSZWYlJzogdHlwZW9mIFdlYWtSZWYgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogV2Vha1JlZixcblx0JyVXZWFrU2V0JSc6IHR5cGVvZiBXZWFrU2V0ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IFdlYWtTZXRcbn07XG5cbmlmIChnZXRQcm90bykge1xuXHR0cnkge1xuXHRcdG51bGwuZXJyb3I7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLWV4cHJlc3Npb25zXG5cdH0gY2F0Y2ggKGUpIHtcblx0XHQvLyBodHRwczovL2dpdGh1Yi5jb20vdGMzOS9wcm9wb3NhbC1zaGFkb3dyZWFsbS9wdWxsLzM4NCNpc3N1ZWNvbW1lbnQtMTM2NDI2NDIyOVxuXHRcdHZhciBlcnJvclByb3RvID0gZ2V0UHJvdG8oZ2V0UHJvdG8oZSkpO1xuXHRcdElOVFJJTlNJQ1NbJyVFcnJvci5wcm90b3R5cGUlJ10gPSBlcnJvclByb3RvO1xuXHR9XG59XG5cbnZhciBkb0V2YWwgPSBmdW5jdGlvbiBkb0V2YWwobmFtZSkge1xuXHR2YXIgdmFsdWU7XG5cdGlmIChuYW1lID09PSAnJUFzeW5jRnVuY3Rpb24lJykge1xuXHRcdHZhbHVlID0gZ2V0RXZhbGxlZENvbnN0cnVjdG9yKCdhc3luYyBmdW5jdGlvbiAoKSB7fScpO1xuXHR9IGVsc2UgaWYgKG5hbWUgPT09ICclR2VuZXJhdG9yRnVuY3Rpb24lJykge1xuXHRcdHZhbHVlID0gZ2V0RXZhbGxlZENvbnN0cnVjdG9yKCdmdW5jdGlvbiogKCkge30nKTtcblx0fSBlbHNlIGlmIChuYW1lID09PSAnJUFzeW5jR2VuZXJhdG9yRnVuY3Rpb24lJykge1xuXHRcdHZhbHVlID0gZ2V0RXZhbGxlZENvbnN0cnVjdG9yKCdhc3luYyBmdW5jdGlvbiogKCkge30nKTtcblx0fSBlbHNlIGlmIChuYW1lID09PSAnJUFzeW5jR2VuZXJhdG9yJScpIHtcblx0XHR2YXIgZm4gPSBkb0V2YWwoJyVBc3luY0dlbmVyYXRvckZ1bmN0aW9uJScpO1xuXHRcdGlmIChmbikge1xuXHRcdFx0dmFsdWUgPSBmbi5wcm90b3R5cGU7XG5cdFx0fVxuXHR9IGVsc2UgaWYgKG5hbWUgPT09ICclQXN5bmNJdGVyYXRvclByb3RvdHlwZSUnKSB7XG5cdFx0dmFyIGdlbiA9IGRvRXZhbCgnJUFzeW5jR2VuZXJhdG9yJScpO1xuXHRcdGlmIChnZW4gJiYgZ2V0UHJvdG8pIHtcblx0XHRcdHZhbHVlID0gZ2V0UHJvdG8oZ2VuLnByb3RvdHlwZSk7XG5cdFx0fVxuXHR9XG5cblx0SU5UUklOU0lDU1tuYW1lXSA9IHZhbHVlO1xuXG5cdHJldHVybiB2YWx1ZTtcbn07XG5cbnZhciBMRUdBQ1lfQUxJQVNFUyA9IHtcblx0JyVBcnJheUJ1ZmZlclByb3RvdHlwZSUnOiBbJ0FycmF5QnVmZmVyJywgJ3Byb3RvdHlwZSddLFxuXHQnJUFycmF5UHJvdG90eXBlJSc6IFsnQXJyYXknLCAncHJvdG90eXBlJ10sXG5cdCclQXJyYXlQcm90b19lbnRyaWVzJSc6IFsnQXJyYXknLCAncHJvdG90eXBlJywgJ2VudHJpZXMnXSxcblx0JyVBcnJheVByb3RvX2ZvckVhY2glJzogWydBcnJheScsICdwcm90b3R5cGUnLCAnZm9yRWFjaCddLFxuXHQnJUFycmF5UHJvdG9fa2V5cyUnOiBbJ0FycmF5JywgJ3Byb3RvdHlwZScsICdrZXlzJ10sXG5cdCclQXJyYXlQcm90b192YWx1ZXMlJzogWydBcnJheScsICdwcm90b3R5cGUnLCAndmFsdWVzJ10sXG5cdCclQXN5bmNGdW5jdGlvblByb3RvdHlwZSUnOiBbJ0FzeW5jRnVuY3Rpb24nLCAncHJvdG90eXBlJ10sXG5cdCclQXN5bmNHZW5lcmF0b3IlJzogWydBc3luY0dlbmVyYXRvckZ1bmN0aW9uJywgJ3Byb3RvdHlwZSddLFxuXHQnJUFzeW5jR2VuZXJhdG9yUHJvdG90eXBlJSc6IFsnQXN5bmNHZW5lcmF0b3JGdW5jdGlvbicsICdwcm90b3R5cGUnLCAncHJvdG90eXBlJ10sXG5cdCclQm9vbGVhblByb3RvdHlwZSUnOiBbJ0Jvb2xlYW4nLCAncHJvdG90eXBlJ10sXG5cdCclRGF0YVZpZXdQcm90b3R5cGUlJzogWydEYXRhVmlldycsICdwcm90b3R5cGUnXSxcblx0JyVEYXRlUHJvdG90eXBlJSc6IFsnRGF0ZScsICdwcm90b3R5cGUnXSxcblx0JyVFcnJvclByb3RvdHlwZSUnOiBbJ0Vycm9yJywgJ3Byb3RvdHlwZSddLFxuXHQnJUV2YWxFcnJvclByb3RvdHlwZSUnOiBbJ0V2YWxFcnJvcicsICdwcm90b3R5cGUnXSxcblx0JyVGbG9hdDMyQXJyYXlQcm90b3R5cGUlJzogWydGbG9hdDMyQXJyYXknLCAncHJvdG90eXBlJ10sXG5cdCclRmxvYXQ2NEFycmF5UHJvdG90eXBlJSc6IFsnRmxvYXQ2NEFycmF5JywgJ3Byb3RvdHlwZSddLFxuXHQnJUZ1bmN0aW9uUHJvdG90eXBlJSc6IFsnRnVuY3Rpb24nLCAncHJvdG90eXBlJ10sXG5cdCclR2VuZXJhdG9yJSc6IFsnR2VuZXJhdG9yRnVuY3Rpb24nLCAncHJvdG90eXBlJ10sXG5cdCclR2VuZXJhdG9yUHJvdG90eXBlJSc6IFsnR2VuZXJhdG9yRnVuY3Rpb24nLCAncHJvdG90eXBlJywgJ3Byb3RvdHlwZSddLFxuXHQnJUludDhBcnJheVByb3RvdHlwZSUnOiBbJ0ludDhBcnJheScsICdwcm90b3R5cGUnXSxcblx0JyVJbnQxNkFycmF5UHJvdG90eXBlJSc6IFsnSW50MTZBcnJheScsICdwcm90b3R5cGUnXSxcblx0JyVJbnQzMkFycmF5UHJvdG90eXBlJSc6IFsnSW50MzJBcnJheScsICdwcm90b3R5cGUnXSxcblx0JyVKU09OUGFyc2UlJzogWydKU09OJywgJ3BhcnNlJ10sXG5cdCclSlNPTlN0cmluZ2lmeSUnOiBbJ0pTT04nLCAnc3RyaW5naWZ5J10sXG5cdCclTWFwUHJvdG90eXBlJSc6IFsnTWFwJywgJ3Byb3RvdHlwZSddLFxuXHQnJU51bWJlclByb3RvdHlwZSUnOiBbJ051bWJlcicsICdwcm90b3R5cGUnXSxcblx0JyVPYmplY3RQcm90b3R5cGUlJzogWydPYmplY3QnLCAncHJvdG90eXBlJ10sXG5cdCclT2JqUHJvdG9fdG9TdHJpbmclJzogWydPYmplY3QnLCAncHJvdG90eXBlJywgJ3RvU3RyaW5nJ10sXG5cdCclT2JqUHJvdG9fdmFsdWVPZiUnOiBbJ09iamVjdCcsICdwcm90b3R5cGUnLCAndmFsdWVPZiddLFxuXHQnJVByb21pc2VQcm90b3R5cGUlJzogWydQcm9taXNlJywgJ3Byb3RvdHlwZSddLFxuXHQnJVByb21pc2VQcm90b190aGVuJSc6IFsnUHJvbWlzZScsICdwcm90b3R5cGUnLCAndGhlbiddLFxuXHQnJVByb21pc2VfYWxsJSc6IFsnUHJvbWlzZScsICdhbGwnXSxcblx0JyVQcm9taXNlX3JlamVjdCUnOiBbJ1Byb21pc2UnLCAncmVqZWN0J10sXG5cdCclUHJvbWlzZV9yZXNvbHZlJSc6IFsnUHJvbWlzZScsICdyZXNvbHZlJ10sXG5cdCclUmFuZ2VFcnJvclByb3RvdHlwZSUnOiBbJ1JhbmdlRXJyb3InLCAncHJvdG90eXBlJ10sXG5cdCclUmVmZXJlbmNlRXJyb3JQcm90b3R5cGUlJzogWydSZWZlcmVuY2VFcnJvcicsICdwcm90b3R5cGUnXSxcblx0JyVSZWdFeHBQcm90b3R5cGUlJzogWydSZWdFeHAnLCAncHJvdG90eXBlJ10sXG5cdCclU2V0UHJvdG90eXBlJSc6IFsnU2V0JywgJ3Byb3RvdHlwZSddLFxuXHQnJVNoYXJlZEFycmF5QnVmZmVyUHJvdG90eXBlJSc6IFsnU2hhcmVkQXJyYXlCdWZmZXInLCAncHJvdG90eXBlJ10sXG5cdCclU3RyaW5nUHJvdG90eXBlJSc6IFsnU3RyaW5nJywgJ3Byb3RvdHlwZSddLFxuXHQnJVN5bWJvbFByb3RvdHlwZSUnOiBbJ1N5bWJvbCcsICdwcm90b3R5cGUnXSxcblx0JyVTeW50YXhFcnJvclByb3RvdHlwZSUnOiBbJ1N5bnRheEVycm9yJywgJ3Byb3RvdHlwZSddLFxuXHQnJVR5cGVkQXJyYXlQcm90b3R5cGUlJzogWydUeXBlZEFycmF5JywgJ3Byb3RvdHlwZSddLFxuXHQnJVR5cGVFcnJvclByb3RvdHlwZSUnOiBbJ1R5cGVFcnJvcicsICdwcm90b3R5cGUnXSxcblx0JyVVaW50OEFycmF5UHJvdG90eXBlJSc6IFsnVWludDhBcnJheScsICdwcm90b3R5cGUnXSxcblx0JyVVaW50OENsYW1wZWRBcnJheVByb3RvdHlwZSUnOiBbJ1VpbnQ4Q2xhbXBlZEFycmF5JywgJ3Byb3RvdHlwZSddLFxuXHQnJVVpbnQxNkFycmF5UHJvdG90eXBlJSc6IFsnVWludDE2QXJyYXknLCAncHJvdG90eXBlJ10sXG5cdCclVWludDMyQXJyYXlQcm90b3R5cGUlJzogWydVaW50MzJBcnJheScsICdwcm90b3R5cGUnXSxcblx0JyVVUklFcnJvclByb3RvdHlwZSUnOiBbJ1VSSUVycm9yJywgJ3Byb3RvdHlwZSddLFxuXHQnJVdlYWtNYXBQcm90b3R5cGUlJzogWydXZWFrTWFwJywgJ3Byb3RvdHlwZSddLFxuXHQnJVdlYWtTZXRQcm90b3R5cGUlJzogWydXZWFrU2V0JywgJ3Byb3RvdHlwZSddXG59O1xuXG52YXIgYmluZCA9IHJlcXVpcmUoJ2Z1bmN0aW9uLWJpbmQnKTtcbnZhciBoYXNPd24gPSByZXF1aXJlKCdoYXNvd24nKTtcbnZhciAkY29uY2F0ID0gYmluZC5jYWxsKEZ1bmN0aW9uLmNhbGwsIEFycmF5LnByb3RvdHlwZS5jb25jYXQpO1xudmFyICRzcGxpY2VBcHBseSA9IGJpbmQuY2FsbChGdW5jdGlvbi5hcHBseSwgQXJyYXkucHJvdG90eXBlLnNwbGljZSk7XG52YXIgJHJlcGxhY2UgPSBiaW5kLmNhbGwoRnVuY3Rpb24uY2FsbCwgU3RyaW5nLnByb3RvdHlwZS5yZXBsYWNlKTtcbnZhciAkc3RyU2xpY2UgPSBiaW5kLmNhbGwoRnVuY3Rpb24uY2FsbCwgU3RyaW5nLnByb3RvdHlwZS5zbGljZSk7XG52YXIgJGV4ZWMgPSBiaW5kLmNhbGwoRnVuY3Rpb24uY2FsbCwgUmVnRXhwLnByb3RvdHlwZS5leGVjKTtcblxuLyogYWRhcHRlZCBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9sb2Rhc2gvbG9kYXNoL2Jsb2IvNC4xNy4xNS9kaXN0L2xvZGFzaC5qcyNMNjczNS1MNjc0NCAqL1xudmFyIHJlUHJvcE5hbWUgPSAvW14lLltcXF1dK3xcXFsoPzooLT9cXGQrKD86XFwuXFxkKyk/KXwoW1wiJ10pKCg/Oig/IVxcMilbXlxcXFxdfFxcXFwuKSo/KVxcMilcXF18KD89KD86XFwufFxcW1xcXSkoPzpcXC58XFxbXFxdfCUkKSkvZztcbnZhciByZUVzY2FwZUNoYXIgPSAvXFxcXChcXFxcKT8vZzsgLyoqIFVzZWQgdG8gbWF0Y2ggYmFja3NsYXNoZXMgaW4gcHJvcGVydHkgcGF0aHMuICovXG52YXIgc3RyaW5nVG9QYXRoID0gZnVuY3Rpb24gc3RyaW5nVG9QYXRoKHN0cmluZykge1xuXHR2YXIgZmlyc3QgPSAkc3RyU2xpY2Uoc3RyaW5nLCAwLCAxKTtcblx0dmFyIGxhc3QgPSAkc3RyU2xpY2Uoc3RyaW5nLCAtMSk7XG5cdGlmIChmaXJzdCA9PT0gJyUnICYmIGxhc3QgIT09ICclJykge1xuXHRcdHRocm93IG5ldyAkU3ludGF4RXJyb3IoJ2ludmFsaWQgaW50cmluc2ljIHN5bnRheCwgZXhwZWN0ZWQgY2xvc2luZyBgJWAnKTtcblx0fSBlbHNlIGlmIChsYXN0ID09PSAnJScgJiYgZmlyc3QgIT09ICclJykge1xuXHRcdHRocm93IG5ldyAkU3ludGF4RXJyb3IoJ2ludmFsaWQgaW50cmluc2ljIHN5bnRheCwgZXhwZWN0ZWQgb3BlbmluZyBgJWAnKTtcblx0fVxuXHR2YXIgcmVzdWx0ID0gW107XG5cdCRyZXBsYWNlKHN0cmluZywgcmVQcm9wTmFtZSwgZnVuY3Rpb24gKG1hdGNoLCBudW1iZXIsIHF1b3RlLCBzdWJTdHJpbmcpIHtcblx0XHRyZXN1bHRbcmVzdWx0Lmxlbmd0aF0gPSBxdW90ZSA/ICRyZXBsYWNlKHN1YlN0cmluZywgcmVFc2NhcGVDaGFyLCAnJDEnKSA6IG51bWJlciB8fCBtYXRjaDtcblx0fSk7XG5cdHJldHVybiByZXN1bHQ7XG59O1xuLyogZW5kIGFkYXB0YXRpb24gKi9cblxudmFyIGdldEJhc2VJbnRyaW5zaWMgPSBmdW5jdGlvbiBnZXRCYXNlSW50cmluc2ljKG5hbWUsIGFsbG93TWlzc2luZykge1xuXHR2YXIgaW50cmluc2ljTmFtZSA9IG5hbWU7XG5cdHZhciBhbGlhcztcblx0aWYgKGhhc093bihMRUdBQ1lfQUxJQVNFUywgaW50cmluc2ljTmFtZSkpIHtcblx0XHRhbGlhcyA9IExFR0FDWV9BTElBU0VTW2ludHJpbnNpY05hbWVdO1xuXHRcdGludHJpbnNpY05hbWUgPSAnJScgKyBhbGlhc1swXSArICclJztcblx0fVxuXG5cdGlmIChoYXNPd24oSU5UUklOU0lDUywgaW50cmluc2ljTmFtZSkpIHtcblx0XHR2YXIgdmFsdWUgPSBJTlRSSU5TSUNTW2ludHJpbnNpY05hbWVdO1xuXHRcdGlmICh2YWx1ZSA9PT0gbmVlZHNFdmFsKSB7XG5cdFx0XHR2YWx1ZSA9IGRvRXZhbChpbnRyaW5zaWNOYW1lKTtcblx0XHR9XG5cdFx0aWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCcgJiYgIWFsbG93TWlzc2luZykge1xuXHRcdFx0dGhyb3cgbmV3ICRUeXBlRXJyb3IoJ2ludHJpbnNpYyAnICsgbmFtZSArICcgZXhpc3RzLCBidXQgaXMgbm90IGF2YWlsYWJsZS4gUGxlYXNlIGZpbGUgYW4gaXNzdWUhJyk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHtcblx0XHRcdGFsaWFzOiBhbGlhcyxcblx0XHRcdG5hbWU6IGludHJpbnNpY05hbWUsXG5cdFx0XHR2YWx1ZTogdmFsdWVcblx0XHR9O1xuXHR9XG5cblx0dGhyb3cgbmV3ICRTeW50YXhFcnJvcignaW50cmluc2ljICcgKyBuYW1lICsgJyBkb2VzIG5vdCBleGlzdCEnKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gR2V0SW50cmluc2ljKG5hbWUsIGFsbG93TWlzc2luZykge1xuXHRpZiAodHlwZW9mIG5hbWUgIT09ICdzdHJpbmcnIHx8IG5hbWUubGVuZ3RoID09PSAwKSB7XG5cdFx0dGhyb3cgbmV3ICRUeXBlRXJyb3IoJ2ludHJpbnNpYyBuYW1lIG11c3QgYmUgYSBub24tZW1wdHkgc3RyaW5nJyk7XG5cdH1cblx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIHR5cGVvZiBhbGxvd01pc3NpbmcgIT09ICdib29sZWFuJykge1xuXHRcdHRocm93IG5ldyAkVHlwZUVycm9yKCdcImFsbG93TWlzc2luZ1wiIGFyZ3VtZW50IG11c3QgYmUgYSBib29sZWFuJyk7XG5cdH1cblxuXHRpZiAoJGV4ZWMoL14lP1teJV0qJT8kLywgbmFtZSkgPT09IG51bGwpIHtcblx0XHR0aHJvdyBuZXcgJFN5bnRheEVycm9yKCdgJWAgbWF5IG5vdCBiZSBwcmVzZW50IGFueXdoZXJlIGJ1dCBhdCB0aGUgYmVnaW5uaW5nIGFuZCBlbmQgb2YgdGhlIGludHJpbnNpYyBuYW1lJyk7XG5cdH1cblx0dmFyIHBhcnRzID0gc3RyaW5nVG9QYXRoKG5hbWUpO1xuXHR2YXIgaW50cmluc2ljQmFzZU5hbWUgPSBwYXJ0cy5sZW5ndGggPiAwID8gcGFydHNbMF0gOiAnJztcblxuXHR2YXIgaW50cmluc2ljID0gZ2V0QmFzZUludHJpbnNpYygnJScgKyBpbnRyaW5zaWNCYXNlTmFtZSArICclJywgYWxsb3dNaXNzaW5nKTtcblx0dmFyIGludHJpbnNpY1JlYWxOYW1lID0gaW50cmluc2ljLm5hbWU7XG5cdHZhciB2YWx1ZSA9IGludHJpbnNpYy52YWx1ZTtcblx0dmFyIHNraXBGdXJ0aGVyQ2FjaGluZyA9IGZhbHNlO1xuXG5cdHZhciBhbGlhcyA9IGludHJpbnNpYy5hbGlhcztcblx0aWYgKGFsaWFzKSB7XG5cdFx0aW50cmluc2ljQmFzZU5hbWUgPSBhbGlhc1swXTtcblx0XHQkc3BsaWNlQXBwbHkocGFydHMsICRjb25jYXQoWzAsIDFdLCBhbGlhcykpO1xuXHR9XG5cblx0Zm9yICh2YXIgaSA9IDEsIGlzT3duID0gdHJ1ZTsgaSA8IHBhcnRzLmxlbmd0aDsgaSArPSAxKSB7XG5cdFx0dmFyIHBhcnQgPSBwYXJ0c1tpXTtcblx0XHR2YXIgZmlyc3QgPSAkc3RyU2xpY2UocGFydCwgMCwgMSk7XG5cdFx0dmFyIGxhc3QgPSAkc3RyU2xpY2UocGFydCwgLTEpO1xuXHRcdGlmIChcblx0XHRcdChcblx0XHRcdFx0KGZpcnN0ID09PSAnXCInIHx8IGZpcnN0ID09PSBcIidcIiB8fCBmaXJzdCA9PT0gJ2AnKVxuXHRcdFx0XHR8fCAobGFzdCA9PT0gJ1wiJyB8fCBsYXN0ID09PSBcIidcIiB8fCBsYXN0ID09PSAnYCcpXG5cdFx0XHQpXG5cdFx0XHQmJiBmaXJzdCAhPT0gbGFzdFxuXHRcdCkge1xuXHRcdFx0dGhyb3cgbmV3ICRTeW50YXhFcnJvcigncHJvcGVydHkgbmFtZXMgd2l0aCBxdW90ZXMgbXVzdCBoYXZlIG1hdGNoaW5nIHF1b3RlcycpO1xuXHRcdH1cblx0XHRpZiAocGFydCA9PT0gJ2NvbnN0cnVjdG9yJyB8fCAhaXNPd24pIHtcblx0XHRcdHNraXBGdXJ0aGVyQ2FjaGluZyA9IHRydWU7XG5cdFx0fVxuXG5cdFx0aW50cmluc2ljQmFzZU5hbWUgKz0gJy4nICsgcGFydDtcblx0XHRpbnRyaW5zaWNSZWFsTmFtZSA9ICclJyArIGludHJpbnNpY0Jhc2VOYW1lICsgJyUnO1xuXG5cdFx0aWYgKGhhc093bihJTlRSSU5TSUNTLCBpbnRyaW5zaWNSZWFsTmFtZSkpIHtcblx0XHRcdHZhbHVlID0gSU5UUklOU0lDU1tpbnRyaW5zaWNSZWFsTmFtZV07XG5cdFx0fSBlbHNlIGlmICh2YWx1ZSAhPSBudWxsKSB7XG5cdFx0XHRpZiAoIShwYXJ0IGluIHZhbHVlKSkge1xuXHRcdFx0XHRpZiAoIWFsbG93TWlzc2luZykge1xuXHRcdFx0XHRcdHRocm93IG5ldyAkVHlwZUVycm9yKCdiYXNlIGludHJpbnNpYyBmb3IgJyArIG5hbWUgKyAnIGV4aXN0cywgYnV0IHRoZSBwcm9wZXJ0eSBpcyBub3QgYXZhaWxhYmxlLicpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiB2b2lkIHVuZGVmaW5lZDtcblx0XHRcdH1cblx0XHRcdGlmICgkZ09QRCAmJiAoaSArIDEpID49IHBhcnRzLmxlbmd0aCkge1xuXHRcdFx0XHR2YXIgZGVzYyA9ICRnT1BEKHZhbHVlLCBwYXJ0KTtcblx0XHRcdFx0aXNPd24gPSAhIWRlc2M7XG5cblx0XHRcdFx0Ly8gQnkgY29udmVudGlvbiwgd2hlbiBhIGRhdGEgcHJvcGVydHkgaXMgY29udmVydGVkIHRvIGFuIGFjY2Vzc29yXG5cdFx0XHRcdC8vIHByb3BlcnR5IHRvIGVtdWxhdGUgYSBkYXRhIHByb3BlcnR5IHRoYXQgZG9lcyBub3Qgc3VmZmVyIGZyb21cblx0XHRcdFx0Ly8gdGhlIG92ZXJyaWRlIG1pc3Rha2UsIHRoYXQgYWNjZXNzb3IncyBnZXR0ZXIgaXMgbWFya2VkIHdpdGhcblx0XHRcdFx0Ly8gYW4gYG9yaWdpbmFsVmFsdWVgIHByb3BlcnR5LiBIZXJlLCB3aGVuIHdlIGRldGVjdCB0aGlzLCB3ZVxuXHRcdFx0XHQvLyB1cGhvbGQgdGhlIGlsbHVzaW9uIGJ5IHByZXRlbmRpbmcgdG8gc2VlIHRoYXQgb3JpZ2luYWwgZGF0YVxuXHRcdFx0XHQvLyBwcm9wZXJ0eSwgaS5lLiwgcmV0dXJuaW5nIHRoZSB2YWx1ZSByYXRoZXIgdGhhbiB0aGUgZ2V0dGVyXG5cdFx0XHRcdC8vIGl0c2VsZi5cblx0XHRcdFx0aWYgKGlzT3duICYmICdnZXQnIGluIGRlc2MgJiYgISgnb3JpZ2luYWxWYWx1ZScgaW4gZGVzYy5nZXQpKSB7XG5cdFx0XHRcdFx0dmFsdWUgPSBkZXNjLmdldDtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR2YWx1ZSA9IHZhbHVlW3BhcnRdO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpc093biA9IGhhc093bih2YWx1ZSwgcGFydCk7XG5cdFx0XHRcdHZhbHVlID0gdmFsdWVbcGFydF07XG5cdFx0XHR9XG5cblx0XHRcdGlmIChpc093biAmJiAhc2tpcEZ1cnRoZXJDYWNoaW5nKSB7XG5cdFx0XHRcdElOVFJJTlNJQ1NbaW50cmluc2ljUmVhbE5hbWVdID0gdmFsdWU7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdHJldHVybiB2YWx1ZTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBHZXRJbnRyaW5zaWMgPSByZXF1aXJlKCdnZXQtaW50cmluc2ljJyk7XG5cbnZhciAkZ09QRCA9IEdldEludHJpbnNpYygnJU9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IlJywgdHJ1ZSk7XG5cbmlmICgkZ09QRCkge1xuXHR0cnkge1xuXHRcdCRnT1BEKFtdLCAnbGVuZ3RoJyk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHQvLyBJRSA4IGhhcyBhIGJyb2tlbiBnT1BEXG5cdFx0JGdPUEQgPSBudWxsO1xuXHR9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gJGdPUEQ7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBHZXRJbnRyaW5zaWMgPSByZXF1aXJlKCdnZXQtaW50cmluc2ljJyk7XG5cbnZhciAkZGVmaW5lUHJvcGVydHkgPSBHZXRJbnRyaW5zaWMoJyVPYmplY3QuZGVmaW5lUHJvcGVydHklJywgdHJ1ZSk7XG5cbnZhciBoYXNQcm9wZXJ0eURlc2NyaXB0b3JzID0gZnVuY3Rpb24gaGFzUHJvcGVydHlEZXNjcmlwdG9ycygpIHtcblx0aWYgKCRkZWZpbmVQcm9wZXJ0eSkge1xuXHRcdHRyeSB7XG5cdFx0XHQkZGVmaW5lUHJvcGVydHkoe30sICdhJywgeyB2YWx1ZTogMSB9KTtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdC8vIElFIDggaGFzIGEgYnJva2VuIGRlZmluZVByb3BlcnR5XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXHR9XG5cdHJldHVybiBmYWxzZTtcbn07XG5cbmhhc1Byb3BlcnR5RGVzY3JpcHRvcnMuaGFzQXJyYXlMZW5ndGhEZWZpbmVCdWcgPSBmdW5jdGlvbiBoYXNBcnJheUxlbmd0aERlZmluZUJ1ZygpIHtcblx0Ly8gbm9kZSB2MC42IGhhcyBhIGJ1ZyB3aGVyZSBhcnJheSBsZW5ndGhzIGNhbiBiZSBTZXQgYnV0IG5vdCBEZWZpbmVkXG5cdGlmICghaGFzUHJvcGVydHlEZXNjcmlwdG9ycygpKSB7XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblx0dHJ5IHtcblx0XHRyZXR1cm4gJGRlZmluZVByb3BlcnR5KFtdLCAnbGVuZ3RoJywgeyB2YWx1ZTogMSB9KS5sZW5ndGggIT09IDE7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHQvLyBJbiBGaXJlZm94IDQtMjIsIGRlZmluaW5nIGxlbmd0aCBvbiBhbiBhcnJheSB0aHJvd3MgYW4gZXhjZXB0aW9uLlxuXHRcdHJldHVybiB0cnVlO1xuXHR9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGhhc1Byb3BlcnR5RGVzY3JpcHRvcnM7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB0ZXN0ID0ge1xuXHRmb286IHt9XG59O1xuXG52YXIgJE9iamVjdCA9IE9iamVjdDtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBoYXNQcm90bygpIHtcblx0cmV0dXJuIHsgX19wcm90b19fOiB0ZXN0IH0uZm9vID09PSB0ZXN0LmZvbyAmJiAhKHsgX19wcm90b19fOiBudWxsIH0gaW5zdGFuY2VvZiAkT2JqZWN0KTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBvcmlnU3ltYm9sID0gdHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sO1xudmFyIGhhc1N5bWJvbFNoYW0gPSByZXF1aXJlKCcuL3NoYW1zJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaGFzTmF0aXZlU3ltYm9scygpIHtcblx0aWYgKHR5cGVvZiBvcmlnU3ltYm9sICE9PSAnZnVuY3Rpb24nKSB7IHJldHVybiBmYWxzZTsgfVxuXHRpZiAodHlwZW9mIFN5bWJvbCAhPT0gJ2Z1bmN0aW9uJykgeyByZXR1cm4gZmFsc2U7IH1cblx0aWYgKHR5cGVvZiBvcmlnU3ltYm9sKCdmb28nKSAhPT0gJ3N5bWJvbCcpIHsgcmV0dXJuIGZhbHNlOyB9XG5cdGlmICh0eXBlb2YgU3ltYm9sKCdiYXInKSAhPT0gJ3N5bWJvbCcpIHsgcmV0dXJuIGZhbHNlOyB9XG5cblx0cmV0dXJuIGhhc1N5bWJvbFNoYW0oKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qIGVzbGludCBjb21wbGV4aXR5OiBbMiwgMThdLCBtYXgtc3RhdGVtZW50czogWzIsIDMzXSAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBoYXNTeW1ib2xzKCkge1xuXHRpZiAodHlwZW9mIFN5bWJvbCAhPT0gJ2Z1bmN0aW9uJyB8fCB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyAhPT0gJ2Z1bmN0aW9uJykgeyByZXR1cm4gZmFsc2U7IH1cblx0aWYgKHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09ICdzeW1ib2wnKSB7IHJldHVybiB0cnVlOyB9XG5cblx0dmFyIG9iaiA9IHt9O1xuXHR2YXIgc3ltID0gU3ltYm9sKCd0ZXN0Jyk7XG5cdHZhciBzeW1PYmogPSBPYmplY3Qoc3ltKTtcblx0aWYgKHR5cGVvZiBzeW0gPT09ICdzdHJpbmcnKSB7IHJldHVybiBmYWxzZTsgfVxuXG5cdGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoc3ltKSAhPT0gJ1tvYmplY3QgU3ltYm9sXScpIHsgcmV0dXJuIGZhbHNlOyB9XG5cdGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoc3ltT2JqKSAhPT0gJ1tvYmplY3QgU3ltYm9sXScpIHsgcmV0dXJuIGZhbHNlOyB9XG5cblx0Ly8gdGVtcCBkaXNhYmxlZCBwZXIgaHR0cHM6Ly9naXRodWIuY29tL2xqaGFyYi9vYmplY3QuYXNzaWduL2lzc3Vlcy8xN1xuXHQvLyBpZiAoc3ltIGluc3RhbmNlb2YgU3ltYm9sKSB7IHJldHVybiBmYWxzZTsgfVxuXHQvLyB0ZW1wIGRpc2FibGVkIHBlciBodHRwczovL2dpdGh1Yi5jb20vV2ViUmVmbGVjdGlvbi9nZXQtb3duLXByb3BlcnR5LXN5bWJvbHMvaXNzdWVzLzRcblx0Ly8gaWYgKCEoc3ltT2JqIGluc3RhbmNlb2YgU3ltYm9sKSkgeyByZXR1cm4gZmFsc2U7IH1cblxuXHQvLyBpZiAodHlwZW9mIFN5bWJvbC5wcm90b3R5cGUudG9TdHJpbmcgIT09ICdmdW5jdGlvbicpIHsgcmV0dXJuIGZhbHNlOyB9XG5cdC8vIGlmIChTdHJpbmcoc3ltKSAhPT0gU3ltYm9sLnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHN5bSkpIHsgcmV0dXJuIGZhbHNlOyB9XG5cblx0dmFyIHN5bVZhbCA9IDQyO1xuXHRvYmpbc3ltXSA9IHN5bVZhbDtcblx0Zm9yIChzeW0gaW4gb2JqKSB7IHJldHVybiBmYWxzZTsgfSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4LCBuby11bnJlYWNoYWJsZS1sb29wXG5cdGlmICh0eXBlb2YgT2JqZWN0LmtleXMgPT09ICdmdW5jdGlvbicgJiYgT2JqZWN0LmtleXMob2JqKS5sZW5ndGggIT09IDApIHsgcmV0dXJuIGZhbHNlOyB9XG5cblx0aWYgKHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyA9PT0gJ2Z1bmN0aW9uJyAmJiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhvYmopLmxlbmd0aCAhPT0gMCkgeyByZXR1cm4gZmFsc2U7IH1cblxuXHR2YXIgc3ltcyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMob2JqKTtcblx0aWYgKHN5bXMubGVuZ3RoICE9PSAxIHx8IHN5bXNbMF0gIT09IHN5bSkgeyByZXR1cm4gZmFsc2U7IH1cblxuXHRpZiAoIU9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChvYmosIHN5bSkpIHsgcmV0dXJuIGZhbHNlOyB9XG5cblx0aWYgKHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0dmFyIGRlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iaiwgc3ltKTtcblx0XHRpZiAoZGVzY3JpcHRvci52YWx1ZSAhPT0gc3ltVmFsIHx8IGRlc2NyaXB0b3IuZW51bWVyYWJsZSAhPT0gdHJ1ZSkgeyByZXR1cm4gZmFsc2U7IH1cblx0fVxuXG5cdHJldHVybiB0cnVlO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGhhc1N5bWJvbHMgPSByZXF1aXJlKCdoYXMtc3ltYm9scy9zaGFtcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGhhc1RvU3RyaW5nVGFnU2hhbXMoKSB7XG5cdHJldHVybiBoYXNTeW1ib2xzKCkgJiYgISFTeW1ib2wudG9TdHJpbmdUYWc7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgY2FsbCA9IEZ1bmN0aW9uLnByb3RvdHlwZS5jYWxsO1xudmFyICRoYXNPd24gPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xudmFyIGJpbmQgPSByZXF1aXJlKCdmdW5jdGlvbi1iaW5kJyk7XG5cbi8qKiBAdHlwZSB7KG86IHt9LCBwOiBQcm9wZXJ0eUtleSkgPT4gcCBpcyBrZXlvZiBvfSAqL1xubW9kdWxlLmV4cG9ydHMgPSBiaW5kLmNhbGwoY2FsbCwgJGhhc093bik7XG4iLCJpZiAodHlwZW9mIE9iamVjdC5jcmVhdGUgPT09ICdmdW5jdGlvbicpIHtcbiAgLy8gaW1wbGVtZW50YXRpb24gZnJvbSBzdGFuZGFyZCBub2RlLmpzICd1dGlsJyBtb2R1bGVcbiAgbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpbmhlcml0cyhjdG9yLCBzdXBlckN0b3IpIHtcbiAgICBpZiAoc3VwZXJDdG9yKSB7XG4gICAgICBjdG9yLnN1cGVyXyA9IHN1cGVyQ3RvclxuICAgICAgY3Rvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ3Rvci5wcm90b3R5cGUsIHtcbiAgICAgICAgY29uc3RydWN0b3I6IHtcbiAgICAgICAgICB2YWx1ZTogY3RvcixcbiAgICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gIH07XG59IGVsc2Uge1xuICAvLyBvbGQgc2Nob29sIHNoaW0gZm9yIG9sZCBicm93c2Vyc1xuICBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGluaGVyaXRzKGN0b3IsIHN1cGVyQ3Rvcikge1xuICAgIGlmIChzdXBlckN0b3IpIHtcbiAgICAgIGN0b3Iuc3VwZXJfID0gc3VwZXJDdG9yXG4gICAgICB2YXIgVGVtcEN0b3IgPSBmdW5jdGlvbiAoKSB7fVxuICAgICAgVGVtcEN0b3IucHJvdG90eXBlID0gc3VwZXJDdG9yLnByb3RvdHlwZVxuICAgICAgY3Rvci5wcm90b3R5cGUgPSBuZXcgVGVtcEN0b3IoKVxuICAgICAgY3Rvci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBjdG9yXG4gICAgfVxuICB9XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBoYXNUb1N0cmluZ1RhZyA9IHJlcXVpcmUoJ2hhcy10b3N0cmluZ3RhZy9zaGFtcycpKCk7XG52YXIgY2FsbEJvdW5kID0gcmVxdWlyZSgnY2FsbC1iaW5kL2NhbGxCb3VuZCcpO1xuXG52YXIgJHRvU3RyaW5nID0gY2FsbEJvdW5kKCdPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nJyk7XG5cbnZhciBpc1N0YW5kYXJkQXJndW1lbnRzID0gZnVuY3Rpb24gaXNBcmd1bWVudHModmFsdWUpIHtcblx0aWYgKGhhc1RvU3RyaW5nVGFnICYmIHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnIGluIHZhbHVlKSB7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cdHJldHVybiAkdG9TdHJpbmcodmFsdWUpID09PSAnW29iamVjdCBBcmd1bWVudHNdJztcbn07XG5cbnZhciBpc0xlZ2FjeUFyZ3VtZW50cyA9IGZ1bmN0aW9uIGlzQXJndW1lbnRzKHZhbHVlKSB7XG5cdGlmIChpc1N0YW5kYXJkQXJndW1lbnRzKHZhbHVlKSkge1xuXHRcdHJldHVybiB0cnVlO1xuXHR9XG5cdHJldHVybiB2YWx1ZSAhPT0gbnVsbCAmJlxuXHRcdHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiZcblx0XHR0eXBlb2YgdmFsdWUubGVuZ3RoID09PSAnbnVtYmVyJyAmJlxuXHRcdHZhbHVlLmxlbmd0aCA+PSAwICYmXG5cdFx0JHRvU3RyaW5nKHZhbHVlKSAhPT0gJ1tvYmplY3QgQXJyYXldJyAmJlxuXHRcdCR0b1N0cmluZyh2YWx1ZS5jYWxsZWUpID09PSAnW29iamVjdCBGdW5jdGlvbl0nO1xufTtcblxudmFyIHN1cHBvcnRzU3RhbmRhcmRBcmd1bWVudHMgPSAoZnVuY3Rpb24gKCkge1xuXHRyZXR1cm4gaXNTdGFuZGFyZEFyZ3VtZW50cyhhcmd1bWVudHMpO1xufSgpKTtcblxuaXNTdGFuZGFyZEFyZ3VtZW50cy5pc0xlZ2FjeUFyZ3VtZW50cyA9IGlzTGVnYWN5QXJndW1lbnRzOyAvLyBmb3IgdGVzdHNcblxubW9kdWxlLmV4cG9ydHMgPSBzdXBwb3J0c1N0YW5kYXJkQXJndW1lbnRzID8gaXNTdGFuZGFyZEFyZ3VtZW50cyA6IGlzTGVnYWN5QXJndW1lbnRzO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZm5Ub1N0ciA9IEZ1bmN0aW9uLnByb3RvdHlwZS50b1N0cmluZztcbnZhciByZWZsZWN0QXBwbHkgPSB0eXBlb2YgUmVmbGVjdCA9PT0gJ29iamVjdCcgJiYgUmVmbGVjdCAhPT0gbnVsbCAmJiBSZWZsZWN0LmFwcGx5O1xudmFyIGJhZEFycmF5TGlrZTtcbnZhciBpc0NhbGxhYmxlTWFya2VyO1xuaWYgKHR5cGVvZiByZWZsZWN0QXBwbHkgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSA9PT0gJ2Z1bmN0aW9uJykge1xuXHR0cnkge1xuXHRcdGJhZEFycmF5TGlrZSA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh7fSwgJ2xlbmd0aCcsIHtcblx0XHRcdGdldDogZnVuY3Rpb24gKCkge1xuXHRcdFx0XHR0aHJvdyBpc0NhbGxhYmxlTWFya2VyO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdGlzQ2FsbGFibGVNYXJrZXIgPSB7fTtcblx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdGhyb3ctbGl0ZXJhbFxuXHRcdHJlZmxlY3RBcHBseShmdW5jdGlvbiAoKSB7IHRocm93IDQyOyB9LCBudWxsLCBiYWRBcnJheUxpa2UpO1xuXHR9IGNhdGNoIChfKSB7XG5cdFx0aWYgKF8gIT09IGlzQ2FsbGFibGVNYXJrZXIpIHtcblx0XHRcdHJlZmxlY3RBcHBseSA9IG51bGw7XG5cdFx0fVxuXHR9XG59IGVsc2Uge1xuXHRyZWZsZWN0QXBwbHkgPSBudWxsO1xufVxuXG52YXIgY29uc3RydWN0b3JSZWdleCA9IC9eXFxzKmNsYXNzXFxiLztcbnZhciBpc0VTNkNsYXNzRm4gPSBmdW5jdGlvbiBpc0VTNkNsYXNzRnVuY3Rpb24odmFsdWUpIHtcblx0dHJ5IHtcblx0XHR2YXIgZm5TdHIgPSBmblRvU3RyLmNhbGwodmFsdWUpO1xuXHRcdHJldHVybiBjb25zdHJ1Y3RvclJlZ2V4LnRlc3QoZm5TdHIpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0cmV0dXJuIGZhbHNlOyAvLyBub3QgYSBmdW5jdGlvblxuXHR9XG59O1xuXG52YXIgdHJ5RnVuY3Rpb25PYmplY3QgPSBmdW5jdGlvbiB0cnlGdW5jdGlvblRvU3RyKHZhbHVlKSB7XG5cdHRyeSB7XG5cdFx0aWYgKGlzRVM2Q2xhc3NGbih2YWx1ZSkpIHsgcmV0dXJuIGZhbHNlOyB9XG5cdFx0Zm5Ub1N0ci5jYWxsKHZhbHVlKTtcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxufTtcbnZhciB0b1N0ciA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG52YXIgb2JqZWN0Q2xhc3MgPSAnW29iamVjdCBPYmplY3RdJztcbnZhciBmbkNsYXNzID0gJ1tvYmplY3QgRnVuY3Rpb25dJztcbnZhciBnZW5DbGFzcyA9ICdbb2JqZWN0IEdlbmVyYXRvckZ1bmN0aW9uXSc7XG52YXIgZGRhQ2xhc3MgPSAnW29iamVjdCBIVE1MQWxsQ29sbGVjdGlvbl0nOyAvLyBJRSAxMVxudmFyIGRkYUNsYXNzMiA9ICdbb2JqZWN0IEhUTUwgZG9jdW1lbnQuYWxsIGNsYXNzXSc7XG52YXIgZGRhQ2xhc3MzID0gJ1tvYmplY3QgSFRNTENvbGxlY3Rpb25dJzsgLy8gSUUgOS0xMFxudmFyIGhhc1RvU3RyaW5nVGFnID0gdHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyAmJiAhIVN5bWJvbC50b1N0cmluZ1RhZzsgLy8gYmV0dGVyOiB1c2UgYGhhcy10b3N0cmluZ3RhZ2BcblxudmFyIGlzSUU2OCA9ICEoMCBpbiBbLF0pOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXNwYXJzZS1hcnJheXMsIGNvbW1hLXNwYWNpbmdcblxudmFyIGlzRERBID0gZnVuY3Rpb24gaXNEb2N1bWVudERvdEFsbCgpIHsgcmV0dXJuIGZhbHNlOyB9O1xuaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gJ29iamVjdCcpIHtcblx0Ly8gRmlyZWZveCAzIGNhbm9uaWNhbGl6ZXMgRERBIHRvIHVuZGVmaW5lZCB3aGVuIGl0J3Mgbm90IGFjY2Vzc2VkIGRpcmVjdGx5XG5cdHZhciBhbGwgPSBkb2N1bWVudC5hbGw7XG5cdGlmICh0b1N0ci5jYWxsKGFsbCkgPT09IHRvU3RyLmNhbGwoZG9jdW1lbnQuYWxsKSkge1xuXHRcdGlzRERBID0gZnVuY3Rpb24gaXNEb2N1bWVudERvdEFsbCh2YWx1ZSkge1xuXHRcdFx0LyogZ2xvYmFscyBkb2N1bWVudDogZmFsc2UgKi9cblx0XHRcdC8vIGluIElFIDYtOCwgdHlwZW9mIGRvY3VtZW50LmFsbCBpcyBcIm9iamVjdFwiIGFuZCBpdCdzIHRydXRoeVxuXHRcdFx0aWYgKChpc0lFNjggfHwgIXZhbHVlKSAmJiAodHlwZW9mIHZhbHVlID09PSAndW5kZWZpbmVkJyB8fCB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSkge1xuXHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdHZhciBzdHIgPSB0b1N0ci5jYWxsKHZhbHVlKTtcblx0XHRcdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHRcdFx0c3RyID09PSBkZGFDbGFzc1xuXHRcdFx0XHRcdFx0fHwgc3RyID09PSBkZGFDbGFzczJcblx0XHRcdFx0XHRcdHx8IHN0ciA9PT0gZGRhQ2xhc3MzIC8vIG9wZXJhIDEyLjE2XG5cdFx0XHRcdFx0XHR8fCBzdHIgPT09IG9iamVjdENsYXNzIC8vIElFIDYtOFxuXHRcdFx0XHRcdCkgJiYgdmFsdWUoJycpID09IG51bGw7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgZXFlcWVxXG5cdFx0XHRcdH0gY2F0Y2ggKGUpIHsgLyoqLyB9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fTtcblx0fVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHJlZmxlY3RBcHBseVxuXHQ/IGZ1bmN0aW9uIGlzQ2FsbGFibGUodmFsdWUpIHtcblx0XHRpZiAoaXNEREEodmFsdWUpKSB7IHJldHVybiB0cnVlOyB9XG5cdFx0aWYgKCF2YWx1ZSkgeyByZXR1cm4gZmFsc2U7IH1cblx0XHRpZiAodHlwZW9mIHZhbHVlICE9PSAnZnVuY3Rpb24nICYmIHR5cGVvZiB2YWx1ZSAhPT0gJ29iamVjdCcpIHsgcmV0dXJuIGZhbHNlOyB9XG5cdFx0dHJ5IHtcblx0XHRcdHJlZmxlY3RBcHBseSh2YWx1ZSwgbnVsbCwgYmFkQXJyYXlMaWtlKTtcblx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRpZiAoZSAhPT0gaXNDYWxsYWJsZU1hcmtlcikgeyByZXR1cm4gZmFsc2U7IH1cblx0XHR9XG5cdFx0cmV0dXJuICFpc0VTNkNsYXNzRm4odmFsdWUpICYmIHRyeUZ1bmN0aW9uT2JqZWN0KHZhbHVlKTtcblx0fVxuXHQ6IGZ1bmN0aW9uIGlzQ2FsbGFibGUodmFsdWUpIHtcblx0XHRpZiAoaXNEREEodmFsdWUpKSB7IHJldHVybiB0cnVlOyB9XG5cdFx0aWYgKCF2YWx1ZSkgeyByZXR1cm4gZmFsc2U7IH1cblx0XHRpZiAodHlwZW9mIHZhbHVlICE9PSAnZnVuY3Rpb24nICYmIHR5cGVvZiB2YWx1ZSAhPT0gJ29iamVjdCcpIHsgcmV0dXJuIGZhbHNlOyB9XG5cdFx0aWYgKGhhc1RvU3RyaW5nVGFnKSB7IHJldHVybiB0cnlGdW5jdGlvbk9iamVjdCh2YWx1ZSk7IH1cblx0XHRpZiAoaXNFUzZDbGFzc0ZuKHZhbHVlKSkgeyByZXR1cm4gZmFsc2U7IH1cblx0XHR2YXIgc3RyQ2xhc3MgPSB0b1N0ci5jYWxsKHZhbHVlKTtcblx0XHRpZiAoc3RyQ2xhc3MgIT09IGZuQ2xhc3MgJiYgc3RyQ2xhc3MgIT09IGdlbkNsYXNzICYmICEoL15cXFtvYmplY3QgSFRNTC8pLnRlc3Qoc3RyQ2xhc3MpKSB7IHJldHVybiBmYWxzZTsgfVxuXHRcdHJldHVybiB0cnlGdW5jdGlvbk9iamVjdCh2YWx1ZSk7XG5cdH07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB0b1N0ciA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG52YXIgZm5Ub1N0ciA9IEZ1bmN0aW9uLnByb3RvdHlwZS50b1N0cmluZztcbnZhciBpc0ZuUmVnZXggPSAvXlxccyooPzpmdW5jdGlvbik/XFwqLztcbnZhciBoYXNUb1N0cmluZ1RhZyA9IHJlcXVpcmUoJ2hhcy10b3N0cmluZ3RhZy9zaGFtcycpKCk7XG52YXIgZ2V0UHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Y7XG52YXIgZ2V0R2VuZXJhdG9yRnVuYyA9IGZ1bmN0aW9uICgpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBjb25zaXN0ZW50LXJldHVyblxuXHRpZiAoIWhhc1RvU3RyaW5nVGFnKSB7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cdHRyeSB7XG5cdFx0cmV0dXJuIEZ1bmN0aW9uKCdyZXR1cm4gZnVuY3Rpb24qKCkge30nKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdH1cbn07XG52YXIgR2VuZXJhdG9yRnVuY3Rpb247XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNHZW5lcmF0b3JGdW5jdGlvbihmbikge1xuXHRpZiAodHlwZW9mIGZuICE9PSAnZnVuY3Rpb24nKSB7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cdGlmIChpc0ZuUmVnZXgudGVzdChmblRvU3RyLmNhbGwoZm4pKSkge1xuXHRcdHJldHVybiB0cnVlO1xuXHR9XG5cdGlmICghaGFzVG9TdHJpbmdUYWcpIHtcblx0XHR2YXIgc3RyID0gdG9TdHIuY2FsbChmbik7XG5cdFx0cmV0dXJuIHN0ciA9PT0gJ1tvYmplY3QgR2VuZXJhdG9yRnVuY3Rpb25dJztcblx0fVxuXHRpZiAoIWdldFByb3RvKSB7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cdGlmICh0eXBlb2YgR2VuZXJhdG9yRnVuY3Rpb24gPT09ICd1bmRlZmluZWQnKSB7XG5cdFx0dmFyIGdlbmVyYXRvckZ1bmMgPSBnZXRHZW5lcmF0b3JGdW5jKCk7XG5cdFx0R2VuZXJhdG9yRnVuY3Rpb24gPSBnZW5lcmF0b3JGdW5jID8gZ2V0UHJvdG8oZ2VuZXJhdG9yRnVuYykgOiBmYWxzZTtcblx0fVxuXHRyZXR1cm4gZ2V0UHJvdG8oZm4pID09PSBHZW5lcmF0b3JGdW5jdGlvbjtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qIGh0dHA6Ly93d3cuZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi82LjAvI3NlYy1udW1iZXIuaXNuYW4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc05hTih2YWx1ZSkge1xuXHRyZXR1cm4gdmFsdWUgIT09IHZhbHVlO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGNhbGxCaW5kID0gcmVxdWlyZSgnY2FsbC1iaW5kJyk7XG52YXIgZGVmaW5lID0gcmVxdWlyZSgnZGVmaW5lLXByb3BlcnRpZXMnKTtcblxudmFyIGltcGxlbWVudGF0aW9uID0gcmVxdWlyZSgnLi9pbXBsZW1lbnRhdGlvbicpO1xudmFyIGdldFBvbHlmaWxsID0gcmVxdWlyZSgnLi9wb2x5ZmlsbCcpO1xudmFyIHNoaW0gPSByZXF1aXJlKCcuL3NoaW0nKTtcblxudmFyIHBvbHlmaWxsID0gY2FsbEJpbmQoZ2V0UG9seWZpbGwoKSwgTnVtYmVyKTtcblxuLyogaHR0cDovL3d3dy5lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzYuMC8jc2VjLW51bWJlci5pc25hbiAqL1xuXG5kZWZpbmUocG9seWZpbGwsIHtcblx0Z2V0UG9seWZpbGw6IGdldFBvbHlmaWxsLFxuXHRpbXBsZW1lbnRhdGlvbjogaW1wbGVtZW50YXRpb24sXG5cdHNoaW06IHNoaW1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHBvbHlmaWxsO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgaW1wbGVtZW50YXRpb24gPSByZXF1aXJlKCcuL2ltcGxlbWVudGF0aW9uJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZ2V0UG9seWZpbGwoKSB7XG5cdGlmIChOdW1iZXIuaXNOYU4gJiYgTnVtYmVyLmlzTmFOKE5hTikgJiYgIU51bWJlci5pc05hTignYScpKSB7XG5cdFx0cmV0dXJuIE51bWJlci5pc05hTjtcblx0fVxuXHRyZXR1cm4gaW1wbGVtZW50YXRpb247XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZGVmaW5lID0gcmVxdWlyZSgnZGVmaW5lLXByb3BlcnRpZXMnKTtcbnZhciBnZXRQb2x5ZmlsbCA9IHJlcXVpcmUoJy4vcG9seWZpbGwnKTtcblxuLyogaHR0cDovL3d3dy5lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzYuMC8jc2VjLW51bWJlci5pc25hbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHNoaW1OdW1iZXJJc05hTigpIHtcblx0dmFyIHBvbHlmaWxsID0gZ2V0UG9seWZpbGwoKTtcblx0ZGVmaW5lKE51bWJlciwgeyBpc05hTjogcG9seWZpbGwgfSwge1xuXHRcdGlzTmFOOiBmdW5jdGlvbiB0ZXN0SXNOYU4oKSB7XG5cdFx0XHRyZXR1cm4gTnVtYmVyLmlzTmFOICE9PSBwb2x5ZmlsbDtcblx0XHR9XG5cdH0pO1xuXHRyZXR1cm4gcG9seWZpbGw7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgd2hpY2hUeXBlZEFycmF5ID0gcmVxdWlyZSgnd2hpY2gtdHlwZWQtYXJyYXknKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc1R5cGVkQXJyYXkodmFsdWUpIHtcblx0cmV0dXJuICEhd2hpY2hUeXBlZEFycmF5KHZhbHVlKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBudW1iZXJJc05hTiA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuXHRyZXR1cm4gdmFsdWUgIT09IHZhbHVlO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpcyhhLCBiKSB7XG5cdGlmIChhID09PSAwICYmIGIgPT09IDApIHtcblx0XHRyZXR1cm4gMSAvIGEgPT09IDEgLyBiO1xuXHR9XG5cdGlmIChhID09PSBiKSB7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cblx0aWYgKG51bWJlcklzTmFOKGEpICYmIG51bWJlcklzTmFOKGIpKSB7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cblx0cmV0dXJuIGZhbHNlO1xufTtcblxuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZGVmaW5lID0gcmVxdWlyZSgnZGVmaW5lLXByb3BlcnRpZXMnKTtcbnZhciBjYWxsQmluZCA9IHJlcXVpcmUoJ2NhbGwtYmluZCcpO1xuXG52YXIgaW1wbGVtZW50YXRpb24gPSByZXF1aXJlKCcuL2ltcGxlbWVudGF0aW9uJyk7XG52YXIgZ2V0UG9seWZpbGwgPSByZXF1aXJlKCcuL3BvbHlmaWxsJyk7XG52YXIgc2hpbSA9IHJlcXVpcmUoJy4vc2hpbScpO1xuXG52YXIgcG9seWZpbGwgPSBjYWxsQmluZChnZXRQb2x5ZmlsbCgpLCBPYmplY3QpO1xuXG5kZWZpbmUocG9seWZpbGwsIHtcblx0Z2V0UG9seWZpbGw6IGdldFBvbHlmaWxsLFxuXHRpbXBsZW1lbnRhdGlvbjogaW1wbGVtZW50YXRpb24sXG5cdHNoaW06IHNoaW1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHBvbHlmaWxsO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgaW1wbGVtZW50YXRpb24gPSByZXF1aXJlKCcuL2ltcGxlbWVudGF0aW9uJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZ2V0UG9seWZpbGwoKSB7XG5cdHJldHVybiB0eXBlb2YgT2JqZWN0LmlzID09PSAnZnVuY3Rpb24nID8gT2JqZWN0LmlzIDogaW1wbGVtZW50YXRpb247XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZ2V0UG9seWZpbGwgPSByZXF1aXJlKCcuL3BvbHlmaWxsJyk7XG52YXIgZGVmaW5lID0gcmVxdWlyZSgnZGVmaW5lLXByb3BlcnRpZXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzaGltT2JqZWN0SXMoKSB7XG5cdHZhciBwb2x5ZmlsbCA9IGdldFBvbHlmaWxsKCk7XG5cdGRlZmluZShPYmplY3QsIHsgaXM6IHBvbHlmaWxsIH0sIHtcblx0XHRpczogZnVuY3Rpb24gdGVzdE9iamVjdElzKCkge1xuXHRcdFx0cmV0dXJuIE9iamVjdC5pcyAhPT0gcG9seWZpbGw7XG5cdFx0fVxuXHR9KTtcblx0cmV0dXJuIHBvbHlmaWxsO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGtleXNTaGltO1xuaWYgKCFPYmplY3Qua2V5cykge1xuXHQvLyBtb2RpZmllZCBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9lcy1zaGltcy9lczUtc2hpbVxuXHR2YXIgaGFzID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcblx0dmFyIHRvU3RyID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcblx0dmFyIGlzQXJncyA9IHJlcXVpcmUoJy4vaXNBcmd1bWVudHMnKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBnbG9iYWwtcmVxdWlyZVxuXHR2YXIgaXNFbnVtZXJhYmxlID0gT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcblx0dmFyIGhhc0RvbnRFbnVtQnVnID0gIWlzRW51bWVyYWJsZS5jYWxsKHsgdG9TdHJpbmc6IG51bGwgfSwgJ3RvU3RyaW5nJyk7XG5cdHZhciBoYXNQcm90b0VudW1CdWcgPSBpc0VudW1lcmFibGUuY2FsbChmdW5jdGlvbiAoKSB7fSwgJ3Byb3RvdHlwZScpO1xuXHR2YXIgZG9udEVudW1zID0gW1xuXHRcdCd0b1N0cmluZycsXG5cdFx0J3RvTG9jYWxlU3RyaW5nJyxcblx0XHQndmFsdWVPZicsXG5cdFx0J2hhc093blByb3BlcnR5Jyxcblx0XHQnaXNQcm90b3R5cGVPZicsXG5cdFx0J3Byb3BlcnR5SXNFbnVtZXJhYmxlJyxcblx0XHQnY29uc3RydWN0b3InXG5cdF07XG5cdHZhciBlcXVhbHNDb25zdHJ1Y3RvclByb3RvdHlwZSA9IGZ1bmN0aW9uIChvKSB7XG5cdFx0dmFyIGN0b3IgPSBvLmNvbnN0cnVjdG9yO1xuXHRcdHJldHVybiBjdG9yICYmIGN0b3IucHJvdG90eXBlID09PSBvO1xuXHR9O1xuXHR2YXIgZXhjbHVkZWRLZXlzID0ge1xuXHRcdCRhcHBsaWNhdGlvbkNhY2hlOiB0cnVlLFxuXHRcdCRjb25zb2xlOiB0cnVlLFxuXHRcdCRleHRlcm5hbDogdHJ1ZSxcblx0XHQkZnJhbWU6IHRydWUsXG5cdFx0JGZyYW1lRWxlbWVudDogdHJ1ZSxcblx0XHQkZnJhbWVzOiB0cnVlLFxuXHRcdCRpbm5lckhlaWdodDogdHJ1ZSxcblx0XHQkaW5uZXJXaWR0aDogdHJ1ZSxcblx0XHQkb25tb3pmdWxsc2NyZWVuY2hhbmdlOiB0cnVlLFxuXHRcdCRvbm1vemZ1bGxzY3JlZW5lcnJvcjogdHJ1ZSxcblx0XHQkb3V0ZXJIZWlnaHQ6IHRydWUsXG5cdFx0JG91dGVyV2lkdGg6IHRydWUsXG5cdFx0JHBhZ2VYT2Zmc2V0OiB0cnVlLFxuXHRcdCRwYWdlWU9mZnNldDogdHJ1ZSxcblx0XHQkcGFyZW50OiB0cnVlLFxuXHRcdCRzY3JvbGxMZWZ0OiB0cnVlLFxuXHRcdCRzY3JvbGxUb3A6IHRydWUsXG5cdFx0JHNjcm9sbFg6IHRydWUsXG5cdFx0JHNjcm9sbFk6IHRydWUsXG5cdFx0JHNlbGY6IHRydWUsXG5cdFx0JHdlYmtpdEluZGV4ZWREQjogdHJ1ZSxcblx0XHQkd2Via2l0U3RvcmFnZUluZm86IHRydWUsXG5cdFx0JHdpbmRvdzogdHJ1ZVxuXHR9O1xuXHR2YXIgaGFzQXV0b21hdGlvbkVxdWFsaXR5QnVnID0gKGZ1bmN0aW9uICgpIHtcblx0XHQvKiBnbG9iYWwgd2luZG93ICovXG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnKSB7IHJldHVybiBmYWxzZTsgfVxuXHRcdGZvciAodmFyIGsgaW4gd2luZG93KSB7XG5cdFx0XHR0cnkge1xuXHRcdFx0XHRpZiAoIWV4Y2x1ZGVkS2V5c1snJCcgKyBrXSAmJiBoYXMuY2FsbCh3aW5kb3csIGspICYmIHdpbmRvd1trXSAhPT0gbnVsbCAmJiB0eXBlb2Ygd2luZG93W2tdID09PSAnb2JqZWN0Jykge1xuXHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0XHRlcXVhbHNDb25zdHJ1Y3RvclByb3RvdHlwZSh3aW5kb3dba10pO1xuXHRcdFx0XHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9KCkpO1xuXHR2YXIgZXF1YWxzQ29uc3RydWN0b3JQcm90b3R5cGVJZk5vdEJ1Z2d5ID0gZnVuY3Rpb24gKG8pIHtcblx0XHQvKiBnbG9iYWwgd2luZG93ICovXG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnIHx8ICFoYXNBdXRvbWF0aW9uRXF1YWxpdHlCdWcpIHtcblx0XHRcdHJldHVybiBlcXVhbHNDb25zdHJ1Y3RvclByb3RvdHlwZShvKTtcblx0XHR9XG5cdFx0dHJ5IHtcblx0XHRcdHJldHVybiBlcXVhbHNDb25zdHJ1Y3RvclByb3RvdHlwZShvKTtcblx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXHR9O1xuXG5cdGtleXNTaGltID0gZnVuY3Rpb24ga2V5cyhvYmplY3QpIHtcblx0XHR2YXIgaXNPYmplY3QgPSBvYmplY3QgIT09IG51bGwgJiYgdHlwZW9mIG9iamVjdCA9PT0gJ29iamVjdCc7XG5cdFx0dmFyIGlzRnVuY3Rpb24gPSB0b1N0ci5jYWxsKG9iamVjdCkgPT09ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XG5cdFx0dmFyIGlzQXJndW1lbnRzID0gaXNBcmdzKG9iamVjdCk7XG5cdFx0dmFyIGlzU3RyaW5nID0gaXNPYmplY3QgJiYgdG9TdHIuY2FsbChvYmplY3QpID09PSAnW29iamVjdCBTdHJpbmddJztcblx0XHR2YXIgdGhlS2V5cyA9IFtdO1xuXG5cdFx0aWYgKCFpc09iamVjdCAmJiAhaXNGdW5jdGlvbiAmJiAhaXNBcmd1bWVudHMpIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ09iamVjdC5rZXlzIGNhbGxlZCBvbiBhIG5vbi1vYmplY3QnKTtcblx0XHR9XG5cblx0XHR2YXIgc2tpcFByb3RvID0gaGFzUHJvdG9FbnVtQnVnICYmIGlzRnVuY3Rpb247XG5cdFx0aWYgKGlzU3RyaW5nICYmIG9iamVjdC5sZW5ndGggPiAwICYmICFoYXMuY2FsbChvYmplY3QsIDApKSB7XG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG9iamVjdC5sZW5ndGg7ICsraSkge1xuXHRcdFx0XHR0aGVLZXlzLnB1c2goU3RyaW5nKGkpKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoaXNBcmd1bWVudHMgJiYgb2JqZWN0Lmxlbmd0aCA+IDApIHtcblx0XHRcdGZvciAodmFyIGogPSAwOyBqIDwgb2JqZWN0Lmxlbmd0aDsgKytqKSB7XG5cdFx0XHRcdHRoZUtleXMucHVzaChTdHJpbmcoaikpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRmb3IgKHZhciBuYW1lIGluIG9iamVjdCkge1xuXHRcdFx0XHRpZiAoIShza2lwUHJvdG8gJiYgbmFtZSA9PT0gJ3Byb3RvdHlwZScpICYmIGhhcy5jYWxsKG9iamVjdCwgbmFtZSkpIHtcblx0XHRcdFx0XHR0aGVLZXlzLnB1c2goU3RyaW5nKG5hbWUpKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmIChoYXNEb250RW51bUJ1Zykge1xuXHRcdFx0dmFyIHNraXBDb25zdHJ1Y3RvciA9IGVxdWFsc0NvbnN0cnVjdG9yUHJvdG90eXBlSWZOb3RCdWdneShvYmplY3QpO1xuXG5cdFx0XHRmb3IgKHZhciBrID0gMDsgayA8IGRvbnRFbnVtcy5sZW5ndGg7ICsraykge1xuXHRcdFx0XHRpZiAoIShza2lwQ29uc3RydWN0b3IgJiYgZG9udEVudW1zW2tdID09PSAnY29uc3RydWN0b3InKSAmJiBoYXMuY2FsbChvYmplY3QsIGRvbnRFbnVtc1trXSkpIHtcblx0XHRcdFx0XHR0aGVLZXlzLnB1c2goZG9udEVudW1zW2tdKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gdGhlS2V5cztcblx0fTtcbn1cbm1vZHVsZS5leHBvcnRzID0ga2V5c1NoaW07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBzbGljZSA9IEFycmF5LnByb3RvdHlwZS5zbGljZTtcbnZhciBpc0FyZ3MgPSByZXF1aXJlKCcuL2lzQXJndW1lbnRzJyk7XG5cbnZhciBvcmlnS2V5cyA9IE9iamVjdC5rZXlzO1xudmFyIGtleXNTaGltID0gb3JpZ0tleXMgPyBmdW5jdGlvbiBrZXlzKG8pIHsgcmV0dXJuIG9yaWdLZXlzKG8pOyB9IDogcmVxdWlyZSgnLi9pbXBsZW1lbnRhdGlvbicpO1xuXG52YXIgb3JpZ2luYWxLZXlzID0gT2JqZWN0LmtleXM7XG5cbmtleXNTaGltLnNoaW0gPSBmdW5jdGlvbiBzaGltT2JqZWN0S2V5cygpIHtcblx0aWYgKE9iamVjdC5rZXlzKSB7XG5cdFx0dmFyIGtleXNXb3Jrc1dpdGhBcmd1bWVudHMgPSAoZnVuY3Rpb24gKCkge1xuXHRcdFx0Ly8gU2FmYXJpIDUuMCBidWdcblx0XHRcdHZhciBhcmdzID0gT2JqZWN0LmtleXMoYXJndW1lbnRzKTtcblx0XHRcdHJldHVybiBhcmdzICYmIGFyZ3MubGVuZ3RoID09PSBhcmd1bWVudHMubGVuZ3RoO1xuXHRcdH0oMSwgMikpO1xuXHRcdGlmICgha2V5c1dvcmtzV2l0aEFyZ3VtZW50cykge1xuXHRcdFx0T2JqZWN0LmtleXMgPSBmdW5jdGlvbiBrZXlzKG9iamVjdCkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGZ1bmMtbmFtZS1tYXRjaGluZ1xuXHRcdFx0XHRpZiAoaXNBcmdzKG9iamVjdCkpIHtcblx0XHRcdFx0XHRyZXR1cm4gb3JpZ2luYWxLZXlzKHNsaWNlLmNhbGwob2JqZWN0KSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIG9yaWdpbmFsS2V5cyhvYmplY3QpO1xuXHRcdFx0fTtcblx0XHR9XG5cdH0gZWxzZSB7XG5cdFx0T2JqZWN0LmtleXMgPSBrZXlzU2hpbTtcblx0fVxuXHRyZXR1cm4gT2JqZWN0LmtleXMgfHwga2V5c1NoaW07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGtleXNTaGltO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdG9TdHIgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzQXJndW1lbnRzKHZhbHVlKSB7XG5cdHZhciBzdHIgPSB0b1N0ci5jYWxsKHZhbHVlKTtcblx0dmFyIGlzQXJncyA9IHN0ciA9PT0gJ1tvYmplY3QgQXJndW1lbnRzXSc7XG5cdGlmICghaXNBcmdzKSB7XG5cdFx0aXNBcmdzID0gc3RyICE9PSAnW29iamVjdCBBcnJheV0nICYmXG5cdFx0XHR2YWx1ZSAhPT0gbnVsbCAmJlxuXHRcdFx0dHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJlxuXHRcdFx0dHlwZW9mIHZhbHVlLmxlbmd0aCA9PT0gJ251bWJlcicgJiZcblx0XHRcdHZhbHVlLmxlbmd0aCA+PSAwICYmXG5cdFx0XHR0b1N0ci5jYWxsKHZhbHVlLmNhbGxlZSkgPT09ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XG5cdH1cblx0cmV0dXJuIGlzQXJncztcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8vIG1vZGlmaWVkIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL2VzLXNoaW1zL2VzNi1zaGltXG52YXIgb2JqZWN0S2V5cyA9IHJlcXVpcmUoJ29iamVjdC1rZXlzJyk7XG52YXIgaGFzU3ltYm9scyA9IHJlcXVpcmUoJ2hhcy1zeW1ib2xzL3NoYW1zJykoKTtcbnZhciBjYWxsQm91bmQgPSByZXF1aXJlKCdjYWxsLWJpbmQvY2FsbEJvdW5kJyk7XG52YXIgdG9PYmplY3QgPSBPYmplY3Q7XG52YXIgJHB1c2ggPSBjYWxsQm91bmQoJ0FycmF5LnByb3RvdHlwZS5wdXNoJyk7XG52YXIgJHByb3BJc0VudW1lcmFibGUgPSBjYWxsQm91bmQoJ09iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUnKTtcbnZhciBvcmlnaW5hbEdldFN5bWJvbHMgPSBoYXNTeW1ib2xzID8gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA6IG51bGw7XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBhc3NpZ24odGFyZ2V0LCBzb3VyY2UxKSB7XG5cdGlmICh0YXJnZXQgPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKCd0YXJnZXQgbXVzdCBiZSBhbiBvYmplY3QnKTsgfVxuXHR2YXIgdG8gPSB0b09iamVjdCh0YXJnZXQpOyAvLyBzdGVwIDFcblx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcblx0XHRyZXR1cm4gdG87IC8vIHN0ZXAgMlxuXHR9XG5cdGZvciAodmFyIHMgPSAxOyBzIDwgYXJndW1lbnRzLmxlbmd0aDsgKytzKSB7XG5cdFx0dmFyIGZyb20gPSB0b09iamVjdChhcmd1bWVudHNbc10pOyAvLyBzdGVwIDMuYS5pXG5cblx0XHQvLyBzdGVwIDMuYS5paTpcblx0XHR2YXIga2V5cyA9IG9iamVjdEtleXMoZnJvbSk7XG5cdFx0dmFyIGdldFN5bWJvbHMgPSBoYXNTeW1ib2xzICYmIChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzIHx8IG9yaWdpbmFsR2V0U3ltYm9scyk7XG5cdFx0aWYgKGdldFN5bWJvbHMpIHtcblx0XHRcdHZhciBzeW1zID0gZ2V0U3ltYm9scyhmcm9tKTtcblx0XHRcdGZvciAodmFyIGogPSAwOyBqIDwgc3ltcy5sZW5ndGg7ICsraikge1xuXHRcdFx0XHR2YXIga2V5ID0gc3ltc1tqXTtcblx0XHRcdFx0aWYgKCRwcm9wSXNFbnVtZXJhYmxlKGZyb20sIGtleSkpIHtcblx0XHRcdFx0XHQkcHVzaChrZXlzLCBrZXkpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gc3RlcCAzLmEuaWlpOlxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7ICsraSkge1xuXHRcdFx0dmFyIG5leHRLZXkgPSBrZXlzW2ldO1xuXHRcdFx0aWYgKCRwcm9wSXNFbnVtZXJhYmxlKGZyb20sIG5leHRLZXkpKSB7IC8vIHN0ZXAgMy5hLmlpaS4yXG5cdFx0XHRcdHZhciBwcm9wVmFsdWUgPSBmcm9tW25leHRLZXldOyAvLyBzdGVwIDMuYS5paWkuMi5hXG5cdFx0XHRcdHRvW25leHRLZXldID0gcHJvcFZhbHVlOyAvLyBzdGVwIDMuYS5paWkuMi5iXG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHRvOyAvLyBzdGVwIDRcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBpbXBsZW1lbnRhdGlvbiA9IHJlcXVpcmUoJy4vaW1wbGVtZW50YXRpb24nKTtcblxudmFyIGxhY2tzUHJvcGVyRW51bWVyYXRpb25PcmRlciA9IGZ1bmN0aW9uICgpIHtcblx0aWYgKCFPYmplY3QuYXNzaWduKSB7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cdC8qXG5cdCAqIHY4LCBzcGVjaWZpY2FsbHkgaW4gbm9kZSA0LngsIGhhcyBhIGJ1ZyB3aXRoIGluY29ycmVjdCBwcm9wZXJ0eSBlbnVtZXJhdGlvbiBvcmRlclxuXHQgKiBub3RlOiB0aGlzIGRvZXMgbm90IGRldGVjdCB0aGUgYnVnIHVubGVzcyB0aGVyZSdzIDIwIGNoYXJhY3RlcnNcblx0ICovXG5cdHZhciBzdHIgPSAnYWJjZGVmZ2hpamtsbW5vcHFyc3QnO1xuXHR2YXIgbGV0dGVycyA9IHN0ci5zcGxpdCgnJyk7XG5cdHZhciBtYXAgPSB7fTtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBsZXR0ZXJzLmxlbmd0aDsgKytpKSB7XG5cdFx0bWFwW2xldHRlcnNbaV1dID0gbGV0dGVyc1tpXTtcblx0fVxuXHR2YXIgb2JqID0gT2JqZWN0LmFzc2lnbih7fSwgbWFwKTtcblx0dmFyIGFjdHVhbCA9ICcnO1xuXHRmb3IgKHZhciBrIGluIG9iaikge1xuXHRcdGFjdHVhbCArPSBrO1xuXHR9XG5cdHJldHVybiBzdHIgIT09IGFjdHVhbDtcbn07XG5cbnZhciBhc3NpZ25IYXNQZW5kaW5nRXhjZXB0aW9ucyA9IGZ1bmN0aW9uICgpIHtcblx0aWYgKCFPYmplY3QuYXNzaWduIHx8ICFPYmplY3QucHJldmVudEV4dGVuc2lvbnMpIHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblx0Lypcblx0ICogRmlyZWZveCAzNyBzdGlsbCBoYXMgXCJwZW5kaW5nIGV4Y2VwdGlvblwiIGxvZ2ljIGluIGl0cyBPYmplY3QuYXNzaWduIGltcGxlbWVudGF0aW9uLFxuXHQgKiB3aGljaCBpcyA3MiUgc2xvd2VyIHRoYW4gb3VyIHNoaW0sIGFuZCBGaXJlZm94IDQwJ3MgbmF0aXZlIGltcGxlbWVudGF0aW9uLlxuXHQgKi9cblx0dmFyIHRocm93ZXIgPSBPYmplY3QucHJldmVudEV4dGVuc2lvbnMoeyAxOiAyIH0pO1xuXHR0cnkge1xuXHRcdE9iamVjdC5hc3NpZ24odGhyb3dlciwgJ3h5Jyk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRyZXR1cm4gdGhyb3dlclsxXSA9PT0gJ3knO1xuXHR9XG5cdHJldHVybiBmYWxzZTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZ2V0UG9seWZpbGwoKSB7XG5cdGlmICghT2JqZWN0LmFzc2lnbikge1xuXHRcdHJldHVybiBpbXBsZW1lbnRhdGlvbjtcblx0fVxuXHRpZiAobGFja3NQcm9wZXJFbnVtZXJhdGlvbk9yZGVyKCkpIHtcblx0XHRyZXR1cm4gaW1wbGVtZW50YXRpb247XG5cdH1cblx0aWYgKGFzc2lnbkhhc1BlbmRpbmdFeGNlcHRpb25zKCkpIHtcblx0XHRyZXR1cm4gaW1wbGVtZW50YXRpb247XG5cdH1cblx0cmV0dXJuIE9iamVjdC5hc3NpZ247XG59O1xuIiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG5cbi8vIGNhY2hlZCBmcm9tIHdoYXRldmVyIGdsb2JhbCBpcyBwcmVzZW50IHNvIHRoYXQgdGVzdCBydW5uZXJzIHRoYXQgc3R1YiBpdFxuLy8gZG9uJ3QgYnJlYWsgdGhpbmdzLiAgQnV0IHdlIG5lZWQgdG8gd3JhcCBpdCBpbiBhIHRyeSBjYXRjaCBpbiBjYXNlIGl0IGlzXG4vLyB3cmFwcGVkIGluIHN0cmljdCBtb2RlIGNvZGUgd2hpY2ggZG9lc24ndCBkZWZpbmUgYW55IGdsb2JhbHMuICBJdCdzIGluc2lkZSBhXG4vLyBmdW5jdGlvbiBiZWNhdXNlIHRyeS9jYXRjaGVzIGRlb3B0aW1pemUgaW4gY2VydGFpbiBlbmdpbmVzLlxuXG52YXIgY2FjaGVkU2V0VGltZW91dDtcbnZhciBjYWNoZWRDbGVhclRpbWVvdXQ7XG5cbmZ1bmN0aW9uIGRlZmF1bHRTZXRUaW1vdXQoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdzZXRUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG5mdW5jdGlvbiBkZWZhdWx0Q2xlYXJUaW1lb3V0ICgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2NsZWFyVGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuKGZ1bmN0aW9uICgpIHtcbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIHNldFRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIGNsZWFyVGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICB9XG59ICgpKVxuZnVuY3Rpb24gcnVuVGltZW91dChmdW4pIHtcbiAgICBpZiAoY2FjaGVkU2V0VGltZW91dCA9PT0gc2V0VGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgLy8gaWYgc2V0VGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZFNldFRpbWVvdXQgPT09IGRlZmF1bHRTZXRUaW1vdXQgfHwgIWNhY2hlZFNldFRpbWVvdXQpICYmIHNldFRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9IGNhdGNoKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0IHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKG51bGwsIGZ1biwgMCk7XG4gICAgICAgIH0gY2F0Y2goZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvclxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbCh0aGlzLCBmdW4sIDApO1xuICAgICAgICB9XG4gICAgfVxuXG5cbn1cbmZ1bmN0aW9uIHJ1bkNsZWFyVGltZW91dChtYXJrZXIpIHtcbiAgICBpZiAoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgLy8gaWYgY2xlYXJUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBkZWZhdWx0Q2xlYXJUaW1lb3V0IHx8ICFjYWNoZWRDbGVhclRpbWVvdXQpICYmIGNsZWFyVGltZW91dCkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfSBjYXRjaCAoZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgIHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwobnVsbCwgbWFya2VyKTtcbiAgICAgICAgfSBjYXRjaCAoZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvci5cbiAgICAgICAgICAgIC8vIFNvbWUgdmVyc2lvbnMgb2YgSS5FLiBoYXZlIGRpZmZlcmVudCBydWxlcyBmb3IgY2xlYXJUaW1lb3V0IHZzIHNldFRpbWVvdXRcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbCh0aGlzLCBtYXJrZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG5cblxufVxudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcbnZhciBjdXJyZW50UXVldWU7XG52YXIgcXVldWVJbmRleCA9IC0xO1xuXG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XG4gICAgaWYgKCFkcmFpbmluZyB8fCAhY3VycmVudFF1ZXVlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBxdWV1ZSA9IGN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICB9XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBkcmFpblF1ZXVlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICAgIGlmIChkcmFpbmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB0aW1lb3V0ID0gcnVuVGltZW91dChjbGVhblVwTmV4dFRpY2spO1xuICAgIGRyYWluaW5nID0gdHJ1ZTtcblxuICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgd2hpbGUobGVuKSB7XG4gICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgICAgICBxdWV1ZSA9IFtdO1xuICAgICAgICB3aGlsZSAoKytxdWV1ZUluZGV4IDwgbGVuKSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudFF1ZXVlKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFF1ZXVlW3F1ZXVlSW5kZXhdLnJ1bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICAgICAgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIH1cbiAgICBjdXJyZW50UXVldWUgPSBudWxsO1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgcnVuQ2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xufVxuXG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHF1ZXVlLnB1c2gobmV3IEl0ZW0oZnVuLCBhcmdzKSk7XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMSAmJiAhZHJhaW5pbmcpIHtcbiAgICAgICAgcnVuVGltZW91dChkcmFpblF1ZXVlKTtcbiAgICB9XG59O1xuXG4vLyB2OCBsaWtlcyBwcmVkaWN0aWJsZSBvYmplY3RzXG5mdW5jdGlvbiBJdGVtKGZ1biwgYXJyYXkpIHtcbiAgICB0aGlzLmZ1biA9IGZ1bjtcbiAgICB0aGlzLmFycmF5ID0gYXJyYXk7XG59XG5JdGVtLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5mdW4uYXBwbHkobnVsbCwgdGhpcy5hcnJheSk7XG59O1xucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5wcm9jZXNzLnZlcnNpb24gPSAnJzsgLy8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHJlZ2V4cCBpc3N1ZXNcbnByb2Nlc3MudmVyc2lvbnMgPSB7fTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kT25jZUxpc3RlbmVyID0gbm9vcDtcblxucHJvY2Vzcy5saXN0ZW5lcnMgPSBmdW5jdGlvbiAobmFtZSkgeyByZXR1cm4gW10gfVxuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xucHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIEdldEludHJpbnNpYyA9IHJlcXVpcmUoJ2dldC1pbnRyaW5zaWMnKTtcbnZhciBkZWZpbmUgPSByZXF1aXJlKCdkZWZpbmUtZGF0YS1wcm9wZXJ0eScpO1xudmFyIGhhc0Rlc2NyaXB0b3JzID0gcmVxdWlyZSgnaGFzLXByb3BlcnR5LWRlc2NyaXB0b3JzJykoKTtcbnZhciBnT1BEID0gcmVxdWlyZSgnZ29wZCcpO1xuXG52YXIgJFR5cGVFcnJvciA9IEdldEludHJpbnNpYygnJVR5cGVFcnJvciUnKTtcbnZhciAkZmxvb3IgPSBHZXRJbnRyaW5zaWMoJyVNYXRoLmZsb29yJScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHNldEZ1bmN0aW9uTGVuZ3RoKGZuLCBsZW5ndGgpIHtcblx0aWYgKHR5cGVvZiBmbiAhPT0gJ2Z1bmN0aW9uJykge1xuXHRcdHRocm93IG5ldyAkVHlwZUVycm9yKCdgZm5gIGlzIG5vdCBhIGZ1bmN0aW9uJyk7XG5cdH1cblx0aWYgKHR5cGVvZiBsZW5ndGggIT09ICdudW1iZXInIHx8IGxlbmd0aCA8IDAgfHwgbGVuZ3RoID4gMHhGRkZGRkZGRiB8fCAkZmxvb3IobGVuZ3RoKSAhPT0gbGVuZ3RoKSB7XG5cdFx0dGhyb3cgbmV3ICRUeXBlRXJyb3IoJ2BsZW5ndGhgIG11c3QgYmUgYSBwb3NpdGl2ZSAzMi1iaXQgaW50ZWdlcicpO1xuXHR9XG5cblx0dmFyIGxvb3NlID0gYXJndW1lbnRzLmxlbmd0aCA+IDIgJiYgISFhcmd1bWVudHNbMl07XG5cblx0dmFyIGZ1bmN0aW9uTGVuZ3RoSXNDb25maWd1cmFibGUgPSB0cnVlO1xuXHR2YXIgZnVuY3Rpb25MZW5ndGhJc1dyaXRhYmxlID0gdHJ1ZTtcblx0aWYgKCdsZW5ndGgnIGluIGZuICYmIGdPUEQpIHtcblx0XHR2YXIgZGVzYyA9IGdPUEQoZm4sICdsZW5ndGgnKTtcblx0XHRpZiAoZGVzYyAmJiAhZGVzYy5jb25maWd1cmFibGUpIHtcblx0XHRcdGZ1bmN0aW9uTGVuZ3RoSXNDb25maWd1cmFibGUgPSBmYWxzZTtcblx0XHR9XG5cdFx0aWYgKGRlc2MgJiYgIWRlc2Mud3JpdGFibGUpIHtcblx0XHRcdGZ1bmN0aW9uTGVuZ3RoSXNXcml0YWJsZSA9IGZhbHNlO1xuXHRcdH1cblx0fVxuXG5cdGlmIChmdW5jdGlvbkxlbmd0aElzQ29uZmlndXJhYmxlIHx8IGZ1bmN0aW9uTGVuZ3RoSXNXcml0YWJsZSB8fCAhbG9vc2UpIHtcblx0XHRpZiAoaGFzRGVzY3JpcHRvcnMpIHtcblx0XHRcdGRlZmluZShmbiwgJ2xlbmd0aCcsIGxlbmd0aCwgdHJ1ZSwgdHJ1ZSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGRlZmluZShmbiwgJ2xlbmd0aCcsIGxlbmd0aCk7XG5cdFx0fVxuXHR9XG5cdHJldHVybiBmbjtcbn07XG4iLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gdXBkYXRlcjtcbn1cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTtcblxuICAgIC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuICBjc3MgKz0gb2JqLmNzcztcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfVxuXG4gIC8vIEZvciBvbGQgSUVcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHJldHVybiB7XG4gICAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZSgpIHt9LFxuICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7fVxuICAgIH07XG4gIH1cbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNCdWZmZXIoYXJnKSB7XG4gIHJldHVybiBhcmcgJiYgdHlwZW9mIGFyZyA9PT0gJ29iamVjdCdcbiAgICAmJiB0eXBlb2YgYXJnLmNvcHkgPT09ICdmdW5jdGlvbidcbiAgICAmJiB0eXBlb2YgYXJnLmZpbGwgPT09ICdmdW5jdGlvbidcbiAgICAmJiB0eXBlb2YgYXJnLnJlYWRVSW50OCA9PT0gJ2Z1bmN0aW9uJztcbn0iLCIvLyBDdXJyZW50bHkgaW4gc3luYyB3aXRoIE5vZGUuanMgbGliL2ludGVybmFsL3V0aWwvdHlwZXMuanNcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9ub2RlanMvbm9kZS9jb21taXQvMTEyY2M3YzI3NTUxMjU0YWEyYjE3MDk4ZmI3NzQ4NjdmMDVlZDBkOVxuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBpc0FyZ3VtZW50c09iamVjdCA9IHJlcXVpcmUoJ2lzLWFyZ3VtZW50cycpO1xudmFyIGlzR2VuZXJhdG9yRnVuY3Rpb24gPSByZXF1aXJlKCdpcy1nZW5lcmF0b3ItZnVuY3Rpb24nKTtcbnZhciB3aGljaFR5cGVkQXJyYXkgPSByZXF1aXJlKCd3aGljaC10eXBlZC1hcnJheScpO1xudmFyIGlzVHlwZWRBcnJheSA9IHJlcXVpcmUoJ2lzLXR5cGVkLWFycmF5Jyk7XG5cbmZ1bmN0aW9uIHVuY3VycnlUaGlzKGYpIHtcbiAgcmV0dXJuIGYuY2FsbC5iaW5kKGYpO1xufVxuXG52YXIgQmlnSW50U3VwcG9ydGVkID0gdHlwZW9mIEJpZ0ludCAhPT0gJ3VuZGVmaW5lZCc7XG52YXIgU3ltYm9sU3VwcG9ydGVkID0gdHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCc7XG5cbnZhciBPYmplY3RUb1N0cmluZyA9IHVuY3VycnlUaGlzKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcpO1xuXG52YXIgbnVtYmVyVmFsdWUgPSB1bmN1cnJ5VGhpcyhOdW1iZXIucHJvdG90eXBlLnZhbHVlT2YpO1xudmFyIHN0cmluZ1ZhbHVlID0gdW5jdXJyeVRoaXMoU3RyaW5nLnByb3RvdHlwZS52YWx1ZU9mKTtcbnZhciBib29sZWFuVmFsdWUgPSB1bmN1cnJ5VGhpcyhCb29sZWFuLnByb3RvdHlwZS52YWx1ZU9mKTtcblxuaWYgKEJpZ0ludFN1cHBvcnRlZCkge1xuICB2YXIgYmlnSW50VmFsdWUgPSB1bmN1cnJ5VGhpcyhCaWdJbnQucHJvdG90eXBlLnZhbHVlT2YpO1xufVxuXG5pZiAoU3ltYm9sU3VwcG9ydGVkKSB7XG4gIHZhciBzeW1ib2xWYWx1ZSA9IHVuY3VycnlUaGlzKFN5bWJvbC5wcm90b3R5cGUudmFsdWVPZik7XG59XG5cbmZ1bmN0aW9uIGNoZWNrQm94ZWRQcmltaXRpdmUodmFsdWUsIHByb3RvdHlwZVZhbHVlT2YpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdHJ5IHtcbiAgICBwcm90b3R5cGVWYWx1ZU9mKHZhbHVlKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBjYXRjaChlKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbmV4cG9ydHMuaXNBcmd1bWVudHNPYmplY3QgPSBpc0FyZ3VtZW50c09iamVjdDtcbmV4cG9ydHMuaXNHZW5lcmF0b3JGdW5jdGlvbiA9IGlzR2VuZXJhdG9yRnVuY3Rpb247XG5leHBvcnRzLmlzVHlwZWRBcnJheSA9IGlzVHlwZWRBcnJheTtcblxuLy8gVGFrZW4gZnJvbSBoZXJlIGFuZCBtb2RpZmllZCBmb3IgYmV0dGVyIGJyb3dzZXIgc3VwcG9ydFxuLy8gaHR0cHM6Ly9naXRodWIuY29tL3NpbmRyZXNvcmh1cy9wLWlzLXByb21pc2UvYmxvYi9jZGEzNWE1MTNiZGEwM2Y5NzdhZDVjZGUzYTA3OWQyMzdlODJkN2VmL2luZGV4LmpzXG5mdW5jdGlvbiBpc1Byb21pc2UoaW5wdXQpIHtcblx0cmV0dXJuIChcblx0XHQoXG5cdFx0XHR0eXBlb2YgUHJvbWlzZSAhPT0gJ3VuZGVmaW5lZCcgJiZcblx0XHRcdGlucHV0IGluc3RhbmNlb2YgUHJvbWlzZVxuXHRcdCkgfHxcblx0XHQoXG5cdFx0XHRpbnB1dCAhPT0gbnVsbCAmJlxuXHRcdFx0dHlwZW9mIGlucHV0ID09PSAnb2JqZWN0JyAmJlxuXHRcdFx0dHlwZW9mIGlucHV0LnRoZW4gPT09ICdmdW5jdGlvbicgJiZcblx0XHRcdHR5cGVvZiBpbnB1dC5jYXRjaCA9PT0gJ2Z1bmN0aW9uJ1xuXHRcdClcblx0KTtcbn1cbmV4cG9ydHMuaXNQcm9taXNlID0gaXNQcm9taXNlO1xuXG5mdW5jdGlvbiBpc0FycmF5QnVmZmVyVmlldyh2YWx1ZSkge1xuICBpZiAodHlwZW9mIEFycmF5QnVmZmVyICE9PSAndW5kZWZpbmVkJyAmJiBBcnJheUJ1ZmZlci5pc1ZpZXcpIHtcbiAgICByZXR1cm4gQXJyYXlCdWZmZXIuaXNWaWV3KHZhbHVlKTtcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgaXNUeXBlZEFycmF5KHZhbHVlKSB8fFxuICAgIGlzRGF0YVZpZXcodmFsdWUpXG4gICk7XG59XG5leHBvcnRzLmlzQXJyYXlCdWZmZXJWaWV3ID0gaXNBcnJheUJ1ZmZlclZpZXc7XG5cblxuZnVuY3Rpb24gaXNVaW50OEFycmF5KHZhbHVlKSB7XG4gIHJldHVybiB3aGljaFR5cGVkQXJyYXkodmFsdWUpID09PSAnVWludDhBcnJheSc7XG59XG5leHBvcnRzLmlzVWludDhBcnJheSA9IGlzVWludDhBcnJheTtcblxuZnVuY3Rpb24gaXNVaW50OENsYW1wZWRBcnJheSh2YWx1ZSkge1xuICByZXR1cm4gd2hpY2hUeXBlZEFycmF5KHZhbHVlKSA9PT0gJ1VpbnQ4Q2xhbXBlZEFycmF5Jztcbn1cbmV4cG9ydHMuaXNVaW50OENsYW1wZWRBcnJheSA9IGlzVWludDhDbGFtcGVkQXJyYXk7XG5cbmZ1bmN0aW9uIGlzVWludDE2QXJyYXkodmFsdWUpIHtcbiAgcmV0dXJuIHdoaWNoVHlwZWRBcnJheSh2YWx1ZSkgPT09ICdVaW50MTZBcnJheSc7XG59XG5leHBvcnRzLmlzVWludDE2QXJyYXkgPSBpc1VpbnQxNkFycmF5O1xuXG5mdW5jdGlvbiBpc1VpbnQzMkFycmF5KHZhbHVlKSB7XG4gIHJldHVybiB3aGljaFR5cGVkQXJyYXkodmFsdWUpID09PSAnVWludDMyQXJyYXknO1xufVxuZXhwb3J0cy5pc1VpbnQzMkFycmF5ID0gaXNVaW50MzJBcnJheTtcblxuZnVuY3Rpb24gaXNJbnQ4QXJyYXkodmFsdWUpIHtcbiAgcmV0dXJuIHdoaWNoVHlwZWRBcnJheSh2YWx1ZSkgPT09ICdJbnQ4QXJyYXknO1xufVxuZXhwb3J0cy5pc0ludDhBcnJheSA9IGlzSW50OEFycmF5O1xuXG5mdW5jdGlvbiBpc0ludDE2QXJyYXkodmFsdWUpIHtcbiAgcmV0dXJuIHdoaWNoVHlwZWRBcnJheSh2YWx1ZSkgPT09ICdJbnQxNkFycmF5Jztcbn1cbmV4cG9ydHMuaXNJbnQxNkFycmF5ID0gaXNJbnQxNkFycmF5O1xuXG5mdW5jdGlvbiBpc0ludDMyQXJyYXkodmFsdWUpIHtcbiAgcmV0dXJuIHdoaWNoVHlwZWRBcnJheSh2YWx1ZSkgPT09ICdJbnQzMkFycmF5Jztcbn1cbmV4cG9ydHMuaXNJbnQzMkFycmF5ID0gaXNJbnQzMkFycmF5O1xuXG5mdW5jdGlvbiBpc0Zsb2F0MzJBcnJheSh2YWx1ZSkge1xuICByZXR1cm4gd2hpY2hUeXBlZEFycmF5KHZhbHVlKSA9PT0gJ0Zsb2F0MzJBcnJheSc7XG59XG5leHBvcnRzLmlzRmxvYXQzMkFycmF5ID0gaXNGbG9hdDMyQXJyYXk7XG5cbmZ1bmN0aW9uIGlzRmxvYXQ2NEFycmF5KHZhbHVlKSB7XG4gIHJldHVybiB3aGljaFR5cGVkQXJyYXkodmFsdWUpID09PSAnRmxvYXQ2NEFycmF5Jztcbn1cbmV4cG9ydHMuaXNGbG9hdDY0QXJyYXkgPSBpc0Zsb2F0NjRBcnJheTtcblxuZnVuY3Rpb24gaXNCaWdJbnQ2NEFycmF5KHZhbHVlKSB7XG4gIHJldHVybiB3aGljaFR5cGVkQXJyYXkodmFsdWUpID09PSAnQmlnSW50NjRBcnJheSc7XG59XG5leHBvcnRzLmlzQmlnSW50NjRBcnJheSA9IGlzQmlnSW50NjRBcnJheTtcblxuZnVuY3Rpb24gaXNCaWdVaW50NjRBcnJheSh2YWx1ZSkge1xuICByZXR1cm4gd2hpY2hUeXBlZEFycmF5KHZhbHVlKSA9PT0gJ0JpZ1VpbnQ2NEFycmF5Jztcbn1cbmV4cG9ydHMuaXNCaWdVaW50NjRBcnJheSA9IGlzQmlnVWludDY0QXJyYXk7XG5cbmZ1bmN0aW9uIGlzTWFwVG9TdHJpbmcodmFsdWUpIHtcbiAgcmV0dXJuIE9iamVjdFRvU3RyaW5nKHZhbHVlKSA9PT0gJ1tvYmplY3QgTWFwXSc7XG59XG5pc01hcFRvU3RyaW5nLndvcmtpbmcgPSAoXG4gIHR5cGVvZiBNYXAgIT09ICd1bmRlZmluZWQnICYmXG4gIGlzTWFwVG9TdHJpbmcobmV3IE1hcCgpKVxuKTtcblxuZnVuY3Rpb24gaXNNYXAodmFsdWUpIHtcbiAgaWYgKHR5cGVvZiBNYXAgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIGlzTWFwVG9TdHJpbmcud29ya2luZ1xuICAgID8gaXNNYXBUb1N0cmluZyh2YWx1ZSlcbiAgICA6IHZhbHVlIGluc3RhbmNlb2YgTWFwO1xufVxuZXhwb3J0cy5pc01hcCA9IGlzTWFwO1xuXG5mdW5jdGlvbiBpc1NldFRvU3RyaW5nKHZhbHVlKSB7XG4gIHJldHVybiBPYmplY3RUb1N0cmluZyh2YWx1ZSkgPT09ICdbb2JqZWN0IFNldF0nO1xufVxuaXNTZXRUb1N0cmluZy53b3JraW5nID0gKFxuICB0eXBlb2YgU2V0ICE9PSAndW5kZWZpbmVkJyAmJlxuICBpc1NldFRvU3RyaW5nKG5ldyBTZXQoKSlcbik7XG5mdW5jdGlvbiBpc1NldCh2YWx1ZSkge1xuICBpZiAodHlwZW9mIFNldCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gaXNTZXRUb1N0cmluZy53b3JraW5nXG4gICAgPyBpc1NldFRvU3RyaW5nKHZhbHVlKVxuICAgIDogdmFsdWUgaW5zdGFuY2VvZiBTZXQ7XG59XG5leHBvcnRzLmlzU2V0ID0gaXNTZXQ7XG5cbmZ1bmN0aW9uIGlzV2Vha01hcFRvU3RyaW5nKHZhbHVlKSB7XG4gIHJldHVybiBPYmplY3RUb1N0cmluZyh2YWx1ZSkgPT09ICdbb2JqZWN0IFdlYWtNYXBdJztcbn1cbmlzV2Vha01hcFRvU3RyaW5nLndvcmtpbmcgPSAoXG4gIHR5cGVvZiBXZWFrTWFwICE9PSAndW5kZWZpbmVkJyAmJlxuICBpc1dlYWtNYXBUb1N0cmluZyhuZXcgV2Vha01hcCgpKVxuKTtcbmZ1bmN0aW9uIGlzV2Vha01hcCh2YWx1ZSkge1xuICBpZiAodHlwZW9mIFdlYWtNYXAgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIGlzV2Vha01hcFRvU3RyaW5nLndvcmtpbmdcbiAgICA/IGlzV2Vha01hcFRvU3RyaW5nKHZhbHVlKVxuICAgIDogdmFsdWUgaW5zdGFuY2VvZiBXZWFrTWFwO1xufVxuZXhwb3J0cy5pc1dlYWtNYXAgPSBpc1dlYWtNYXA7XG5cbmZ1bmN0aW9uIGlzV2Vha1NldFRvU3RyaW5nKHZhbHVlKSB7XG4gIHJldHVybiBPYmplY3RUb1N0cmluZyh2YWx1ZSkgPT09ICdbb2JqZWN0IFdlYWtTZXRdJztcbn1cbmlzV2Vha1NldFRvU3RyaW5nLndvcmtpbmcgPSAoXG4gIHR5cGVvZiBXZWFrU2V0ICE9PSAndW5kZWZpbmVkJyAmJlxuICBpc1dlYWtTZXRUb1N0cmluZyhuZXcgV2Vha1NldCgpKVxuKTtcbmZ1bmN0aW9uIGlzV2Vha1NldCh2YWx1ZSkge1xuICByZXR1cm4gaXNXZWFrU2V0VG9TdHJpbmcodmFsdWUpO1xufVxuZXhwb3J0cy5pc1dlYWtTZXQgPSBpc1dlYWtTZXQ7XG5cbmZ1bmN0aW9uIGlzQXJyYXlCdWZmZXJUb1N0cmluZyh2YWx1ZSkge1xuICByZXR1cm4gT2JqZWN0VG9TdHJpbmcodmFsdWUpID09PSAnW29iamVjdCBBcnJheUJ1ZmZlcl0nO1xufVxuaXNBcnJheUJ1ZmZlclRvU3RyaW5nLndvcmtpbmcgPSAoXG4gIHR5cGVvZiBBcnJheUJ1ZmZlciAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgaXNBcnJheUJ1ZmZlclRvU3RyaW5nKG5ldyBBcnJheUJ1ZmZlcigpKVxuKTtcbmZ1bmN0aW9uIGlzQXJyYXlCdWZmZXIodmFsdWUpIHtcbiAgaWYgKHR5cGVvZiBBcnJheUJ1ZmZlciA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gaXNBcnJheUJ1ZmZlclRvU3RyaW5nLndvcmtpbmdcbiAgICA/IGlzQXJyYXlCdWZmZXJUb1N0cmluZyh2YWx1ZSlcbiAgICA6IHZhbHVlIGluc3RhbmNlb2YgQXJyYXlCdWZmZXI7XG59XG5leHBvcnRzLmlzQXJyYXlCdWZmZXIgPSBpc0FycmF5QnVmZmVyO1xuXG5mdW5jdGlvbiBpc0RhdGFWaWV3VG9TdHJpbmcodmFsdWUpIHtcbiAgcmV0dXJuIE9iamVjdFRvU3RyaW5nKHZhbHVlKSA9PT0gJ1tvYmplY3QgRGF0YVZpZXddJztcbn1cbmlzRGF0YVZpZXdUb1N0cmluZy53b3JraW5nID0gKFxuICB0eXBlb2YgQXJyYXlCdWZmZXIgIT09ICd1bmRlZmluZWQnICYmXG4gIHR5cGVvZiBEYXRhVmlldyAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgaXNEYXRhVmlld1RvU3RyaW5nKG5ldyBEYXRhVmlldyhuZXcgQXJyYXlCdWZmZXIoMSksIDAsIDEpKVxuKTtcbmZ1bmN0aW9uIGlzRGF0YVZpZXcodmFsdWUpIHtcbiAgaWYgKHR5cGVvZiBEYXRhVmlldyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gaXNEYXRhVmlld1RvU3RyaW5nLndvcmtpbmdcbiAgICA/IGlzRGF0YVZpZXdUb1N0cmluZyh2YWx1ZSlcbiAgICA6IHZhbHVlIGluc3RhbmNlb2YgRGF0YVZpZXc7XG59XG5leHBvcnRzLmlzRGF0YVZpZXcgPSBpc0RhdGFWaWV3O1xuXG4vLyBTdG9yZSBhIGNvcHkgb2YgU2hhcmVkQXJyYXlCdWZmZXIgaW4gY2FzZSBpdCdzIGRlbGV0ZWQgZWxzZXdoZXJlXG52YXIgU2hhcmVkQXJyYXlCdWZmZXJDb3B5ID0gdHlwZW9mIFNoYXJlZEFycmF5QnVmZmVyICE9PSAndW5kZWZpbmVkJyA/IFNoYXJlZEFycmF5QnVmZmVyIDogdW5kZWZpbmVkO1xuZnVuY3Rpb24gaXNTaGFyZWRBcnJheUJ1ZmZlclRvU3RyaW5nKHZhbHVlKSB7XG4gIHJldHVybiBPYmplY3RUb1N0cmluZyh2YWx1ZSkgPT09ICdbb2JqZWN0IFNoYXJlZEFycmF5QnVmZmVyXSc7XG59XG5mdW5jdGlvbiBpc1NoYXJlZEFycmF5QnVmZmVyKHZhbHVlKSB7XG4gIGlmICh0eXBlb2YgU2hhcmVkQXJyYXlCdWZmZXJDb3B5ID09PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlmICh0eXBlb2YgaXNTaGFyZWRBcnJheUJ1ZmZlclRvU3RyaW5nLndvcmtpbmcgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgaXNTaGFyZWRBcnJheUJ1ZmZlclRvU3RyaW5nLndvcmtpbmcgPSBpc1NoYXJlZEFycmF5QnVmZmVyVG9TdHJpbmcobmV3IFNoYXJlZEFycmF5QnVmZmVyQ29weSgpKTtcbiAgfVxuXG4gIHJldHVybiBpc1NoYXJlZEFycmF5QnVmZmVyVG9TdHJpbmcud29ya2luZ1xuICAgID8gaXNTaGFyZWRBcnJheUJ1ZmZlclRvU3RyaW5nKHZhbHVlKVxuICAgIDogdmFsdWUgaW5zdGFuY2VvZiBTaGFyZWRBcnJheUJ1ZmZlckNvcHk7XG59XG5leHBvcnRzLmlzU2hhcmVkQXJyYXlCdWZmZXIgPSBpc1NoYXJlZEFycmF5QnVmZmVyO1xuXG5mdW5jdGlvbiBpc0FzeW5jRnVuY3Rpb24odmFsdWUpIHtcbiAgcmV0dXJuIE9iamVjdFRvU3RyaW5nKHZhbHVlKSA9PT0gJ1tvYmplY3QgQXN5bmNGdW5jdGlvbl0nO1xufVxuZXhwb3J0cy5pc0FzeW5jRnVuY3Rpb24gPSBpc0FzeW5jRnVuY3Rpb247XG5cbmZ1bmN0aW9uIGlzTWFwSXRlcmF0b3IodmFsdWUpIHtcbiAgcmV0dXJuIE9iamVjdFRvU3RyaW5nKHZhbHVlKSA9PT0gJ1tvYmplY3QgTWFwIEl0ZXJhdG9yXSc7XG59XG5leHBvcnRzLmlzTWFwSXRlcmF0b3IgPSBpc01hcEl0ZXJhdG9yO1xuXG5mdW5jdGlvbiBpc1NldEl0ZXJhdG9yKHZhbHVlKSB7XG4gIHJldHVybiBPYmplY3RUb1N0cmluZyh2YWx1ZSkgPT09ICdbb2JqZWN0IFNldCBJdGVyYXRvcl0nO1xufVxuZXhwb3J0cy5pc1NldEl0ZXJhdG9yID0gaXNTZXRJdGVyYXRvcjtcblxuZnVuY3Rpb24gaXNHZW5lcmF0b3JPYmplY3QodmFsdWUpIHtcbiAgcmV0dXJuIE9iamVjdFRvU3RyaW5nKHZhbHVlKSA9PT0gJ1tvYmplY3QgR2VuZXJhdG9yXSc7XG59XG5leHBvcnRzLmlzR2VuZXJhdG9yT2JqZWN0ID0gaXNHZW5lcmF0b3JPYmplY3Q7XG5cbmZ1bmN0aW9uIGlzV2ViQXNzZW1ibHlDb21waWxlZE1vZHVsZSh2YWx1ZSkge1xuICByZXR1cm4gT2JqZWN0VG9TdHJpbmcodmFsdWUpID09PSAnW29iamVjdCBXZWJBc3NlbWJseS5Nb2R1bGVdJztcbn1cbmV4cG9ydHMuaXNXZWJBc3NlbWJseUNvbXBpbGVkTW9kdWxlID0gaXNXZWJBc3NlbWJseUNvbXBpbGVkTW9kdWxlO1xuXG5mdW5jdGlvbiBpc051bWJlck9iamVjdCh2YWx1ZSkge1xuICByZXR1cm4gY2hlY2tCb3hlZFByaW1pdGl2ZSh2YWx1ZSwgbnVtYmVyVmFsdWUpO1xufVxuZXhwb3J0cy5pc051bWJlck9iamVjdCA9IGlzTnVtYmVyT2JqZWN0O1xuXG5mdW5jdGlvbiBpc1N0cmluZ09iamVjdCh2YWx1ZSkge1xuICByZXR1cm4gY2hlY2tCb3hlZFByaW1pdGl2ZSh2YWx1ZSwgc3RyaW5nVmFsdWUpO1xufVxuZXhwb3J0cy5pc1N0cmluZ09iamVjdCA9IGlzU3RyaW5nT2JqZWN0O1xuXG5mdW5jdGlvbiBpc0Jvb2xlYW5PYmplY3QodmFsdWUpIHtcbiAgcmV0dXJuIGNoZWNrQm94ZWRQcmltaXRpdmUodmFsdWUsIGJvb2xlYW5WYWx1ZSk7XG59XG5leHBvcnRzLmlzQm9vbGVhbk9iamVjdCA9IGlzQm9vbGVhbk9iamVjdDtcblxuZnVuY3Rpb24gaXNCaWdJbnRPYmplY3QodmFsdWUpIHtcbiAgcmV0dXJuIEJpZ0ludFN1cHBvcnRlZCAmJiBjaGVja0JveGVkUHJpbWl0aXZlKHZhbHVlLCBiaWdJbnRWYWx1ZSk7XG59XG5leHBvcnRzLmlzQmlnSW50T2JqZWN0ID0gaXNCaWdJbnRPYmplY3Q7XG5cbmZ1bmN0aW9uIGlzU3ltYm9sT2JqZWN0KHZhbHVlKSB7XG4gIHJldHVybiBTeW1ib2xTdXBwb3J0ZWQgJiYgY2hlY2tCb3hlZFByaW1pdGl2ZSh2YWx1ZSwgc3ltYm9sVmFsdWUpO1xufVxuZXhwb3J0cy5pc1N5bWJvbE9iamVjdCA9IGlzU3ltYm9sT2JqZWN0O1xuXG5mdW5jdGlvbiBpc0JveGVkUHJpbWl0aXZlKHZhbHVlKSB7XG4gIHJldHVybiAoXG4gICAgaXNOdW1iZXJPYmplY3QodmFsdWUpIHx8XG4gICAgaXNTdHJpbmdPYmplY3QodmFsdWUpIHx8XG4gICAgaXNCb29sZWFuT2JqZWN0KHZhbHVlKSB8fFxuICAgIGlzQmlnSW50T2JqZWN0KHZhbHVlKSB8fFxuICAgIGlzU3ltYm9sT2JqZWN0KHZhbHVlKVxuICApO1xufVxuZXhwb3J0cy5pc0JveGVkUHJpbWl0aXZlID0gaXNCb3hlZFByaW1pdGl2ZTtcblxuZnVuY3Rpb24gaXNBbnlBcnJheUJ1ZmZlcih2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIFVpbnQ4QXJyYXkgIT09ICd1bmRlZmluZWQnICYmIChcbiAgICBpc0FycmF5QnVmZmVyKHZhbHVlKSB8fFxuICAgIGlzU2hhcmVkQXJyYXlCdWZmZXIodmFsdWUpXG4gICk7XG59XG5leHBvcnRzLmlzQW55QXJyYXlCdWZmZXIgPSBpc0FueUFycmF5QnVmZmVyO1xuXG5bJ2lzUHJveHknLCAnaXNFeHRlcm5hbCcsICdpc01vZHVsZU5hbWVzcGFjZU9iamVjdCddLmZvckVhY2goZnVuY3Rpb24obWV0aG9kKSB7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBtZXRob2QsIHtcbiAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICB2YWx1ZTogZnVuY3Rpb24oKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IobWV0aG9kICsgJyBpcyBub3Qgc3VwcG9ydGVkIGluIHVzZXJsYW5kJyk7XG4gICAgfVxuICB9KTtcbn0pO1xuIiwiLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbnZhciBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnMgfHxcbiAgZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyhvYmopIHtcbiAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKG9iaik7XG4gICAgdmFyIGRlc2NyaXB0b3JzID0ge307XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBkZXNjcmlwdG9yc1trZXlzW2ldXSA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqLCBrZXlzW2ldKTtcbiAgICB9XG4gICAgcmV0dXJuIGRlc2NyaXB0b3JzO1xuICB9O1xuXG52YXIgZm9ybWF0UmVnRXhwID0gLyVbc2RqJV0vZztcbmV4cG9ydHMuZm9ybWF0ID0gZnVuY3Rpb24oZikge1xuICBpZiAoIWlzU3RyaW5nKGYpKSB7XG4gICAgdmFyIG9iamVjdHMgPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgb2JqZWN0cy5wdXNoKGluc3BlY3QoYXJndW1lbnRzW2ldKSk7XG4gICAgfVxuICAgIHJldHVybiBvYmplY3RzLmpvaW4oJyAnKTtcbiAgfVxuXG4gIHZhciBpID0gMTtcbiAgdmFyIGFyZ3MgPSBhcmd1bWVudHM7XG4gIHZhciBsZW4gPSBhcmdzLmxlbmd0aDtcbiAgdmFyIHN0ciA9IFN0cmluZyhmKS5yZXBsYWNlKGZvcm1hdFJlZ0V4cCwgZnVuY3Rpb24oeCkge1xuICAgIGlmICh4ID09PSAnJSUnKSByZXR1cm4gJyUnO1xuICAgIGlmIChpID49IGxlbikgcmV0dXJuIHg7XG4gICAgc3dpdGNoICh4KSB7XG4gICAgICBjYXNlICclcyc6IHJldHVybiBTdHJpbmcoYXJnc1tpKytdKTtcbiAgICAgIGNhc2UgJyVkJzogcmV0dXJuIE51bWJlcihhcmdzW2krK10pO1xuICAgICAgY2FzZSAnJWonOlxuICAgICAgICB0cnkge1xuICAgICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShhcmdzW2krK10pO1xuICAgICAgICB9IGNhdGNoIChfKSB7XG4gICAgICAgICAgcmV0dXJuICdbQ2lyY3VsYXJdJztcbiAgICAgICAgfVxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIHg7XG4gICAgfVxuICB9KTtcbiAgZm9yICh2YXIgeCA9IGFyZ3NbaV07IGkgPCBsZW47IHggPSBhcmdzWysraV0pIHtcbiAgICBpZiAoaXNOdWxsKHgpIHx8ICFpc09iamVjdCh4KSkge1xuICAgICAgc3RyICs9ICcgJyArIHg7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0ciArPSAnICcgKyBpbnNwZWN0KHgpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gc3RyO1xufTtcblxuXG4vLyBNYXJrIHRoYXQgYSBtZXRob2Qgc2hvdWxkIG5vdCBiZSB1c2VkLlxuLy8gUmV0dXJucyBhIG1vZGlmaWVkIGZ1bmN0aW9uIHdoaWNoIHdhcm5zIG9uY2UgYnkgZGVmYXVsdC5cbi8vIElmIC0tbm8tZGVwcmVjYXRpb24gaXMgc2V0LCB0aGVuIGl0IGlzIGEgbm8tb3AuXG5leHBvcnRzLmRlcHJlY2F0ZSA9IGZ1bmN0aW9uKGZuLCBtc2cpIHtcbiAgaWYgKHR5cGVvZiBwcm9jZXNzICE9PSAndW5kZWZpbmVkJyAmJiBwcm9jZXNzLm5vRGVwcmVjYXRpb24gPT09IHRydWUpIHtcbiAgICByZXR1cm4gZm47XG4gIH1cblxuICAvLyBBbGxvdyBmb3IgZGVwcmVjYXRpbmcgdGhpbmdzIGluIHRoZSBwcm9jZXNzIG9mIHN0YXJ0aW5nIHVwLlxuICBpZiAodHlwZW9mIHByb2Nlc3MgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGV4cG9ydHMuZGVwcmVjYXRlKGZuLCBtc2cpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfTtcbiAgfVxuXG4gIHZhciB3YXJuZWQgPSBmYWxzZTtcbiAgZnVuY3Rpb24gZGVwcmVjYXRlZCgpIHtcbiAgICBpZiAoIXdhcm5lZCkge1xuICAgICAgaWYgKHByb2Nlc3MudGhyb3dEZXByZWNhdGlvbikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IobXNnKTtcbiAgICAgIH0gZWxzZSBpZiAocHJvY2Vzcy50cmFjZURlcHJlY2F0aW9uKSB7XG4gICAgICAgIGNvbnNvbGUudHJhY2UobXNnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IobXNnKTtcbiAgICAgIH1cbiAgICAgIHdhcm5lZCA9IHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9XG5cbiAgcmV0dXJuIGRlcHJlY2F0ZWQ7XG59O1xuXG5cbnZhciBkZWJ1Z3MgPSB7fTtcbnZhciBkZWJ1Z0VudlJlZ2V4ID0gL14kLztcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfREVCVUcpIHtcbiAgdmFyIGRlYnVnRW52ID0gcHJvY2Vzcy5lbnYuTk9ERV9ERUJVRztcbiAgZGVidWdFbnYgPSBkZWJ1Z0Vudi5yZXBsYWNlKC9bfFxcXFx7fSgpW1xcXV4kKz8uXS9nLCAnXFxcXCQmJylcbiAgICAucmVwbGFjZSgvXFwqL2csICcuKicpXG4gICAgLnJlcGxhY2UoLywvZywgJyR8XicpXG4gICAgLnRvVXBwZXJDYXNlKCk7XG4gIGRlYnVnRW52UmVnZXggPSBuZXcgUmVnRXhwKCdeJyArIGRlYnVnRW52ICsgJyQnLCAnaScpO1xufVxuZXhwb3J0cy5kZWJ1Z2xvZyA9IGZ1bmN0aW9uKHNldCkge1xuICBzZXQgPSBzZXQudG9VcHBlckNhc2UoKTtcbiAgaWYgKCFkZWJ1Z3Nbc2V0XSkge1xuICAgIGlmIChkZWJ1Z0VudlJlZ2V4LnRlc3Qoc2V0KSkge1xuICAgICAgdmFyIHBpZCA9IHByb2Nlc3MucGlkO1xuICAgICAgZGVidWdzW3NldF0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIG1zZyA9IGV4cG9ydHMuZm9ybWF0LmFwcGx5KGV4cG9ydHMsIGFyZ3VtZW50cyk7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJyVzICVkOiAlcycsIHNldCwgcGlkLCBtc2cpO1xuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGVidWdzW3NldF0gPSBmdW5jdGlvbigpIHt9O1xuICAgIH1cbiAgfVxuICByZXR1cm4gZGVidWdzW3NldF07XG59O1xuXG5cbi8qKlxuICogRWNob3MgdGhlIHZhbHVlIG9mIGEgdmFsdWUuIFRyeXMgdG8gcHJpbnQgdGhlIHZhbHVlIG91dFxuICogaW4gdGhlIGJlc3Qgd2F5IHBvc3NpYmxlIGdpdmVuIHRoZSBkaWZmZXJlbnQgdHlwZXMuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9iaiBUaGUgb2JqZWN0IHRvIHByaW50IG91dC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRzIE9wdGlvbmFsIG9wdGlvbnMgb2JqZWN0IHRoYXQgYWx0ZXJzIHRoZSBvdXRwdXQuXG4gKi9cbi8qIGxlZ2FjeTogb2JqLCBzaG93SGlkZGVuLCBkZXB0aCwgY29sb3JzKi9cbmZ1bmN0aW9uIGluc3BlY3Qob2JqLCBvcHRzKSB7XG4gIC8vIGRlZmF1bHQgb3B0aW9uc1xuICB2YXIgY3R4ID0ge1xuICAgIHNlZW46IFtdLFxuICAgIHN0eWxpemU6IHN0eWxpemVOb0NvbG9yXG4gIH07XG4gIC8vIGxlZ2FjeS4uLlxuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+PSAzKSBjdHguZGVwdGggPSBhcmd1bWVudHNbMl07XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID49IDQpIGN0eC5jb2xvcnMgPSBhcmd1bWVudHNbM107XG4gIGlmIChpc0Jvb2xlYW4ob3B0cykpIHtcbiAgICAvLyBsZWdhY3kuLi5cbiAgICBjdHguc2hvd0hpZGRlbiA9IG9wdHM7XG4gIH0gZWxzZSBpZiAob3B0cykge1xuICAgIC8vIGdvdCBhbiBcIm9wdGlvbnNcIiBvYmplY3RcbiAgICBleHBvcnRzLl9leHRlbmQoY3R4LCBvcHRzKTtcbiAgfVxuICAvLyBzZXQgZGVmYXVsdCBvcHRpb25zXG4gIGlmIChpc1VuZGVmaW5lZChjdHguc2hvd0hpZGRlbikpIGN0eC5zaG93SGlkZGVuID0gZmFsc2U7XG4gIGlmIChpc1VuZGVmaW5lZChjdHguZGVwdGgpKSBjdHguZGVwdGggPSAyO1xuICBpZiAoaXNVbmRlZmluZWQoY3R4LmNvbG9ycykpIGN0eC5jb2xvcnMgPSBmYWxzZTtcbiAgaWYgKGlzVW5kZWZpbmVkKGN0eC5jdXN0b21JbnNwZWN0KSkgY3R4LmN1c3RvbUluc3BlY3QgPSB0cnVlO1xuICBpZiAoY3R4LmNvbG9ycykgY3R4LnN0eWxpemUgPSBzdHlsaXplV2l0aENvbG9yO1xuICByZXR1cm4gZm9ybWF0VmFsdWUoY3R4LCBvYmosIGN0eC5kZXB0aCk7XG59XG5leHBvcnRzLmluc3BlY3QgPSBpbnNwZWN0O1xuXG5cbi8vIGh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvQU5TSV9lc2NhcGVfY29kZSNncmFwaGljc1xuaW5zcGVjdC5jb2xvcnMgPSB7XG4gICdib2xkJyA6IFsxLCAyMl0sXG4gICdpdGFsaWMnIDogWzMsIDIzXSxcbiAgJ3VuZGVybGluZScgOiBbNCwgMjRdLFxuICAnaW52ZXJzZScgOiBbNywgMjddLFxuICAnd2hpdGUnIDogWzM3LCAzOV0sXG4gICdncmV5JyA6IFs5MCwgMzldLFxuICAnYmxhY2snIDogWzMwLCAzOV0sXG4gICdibHVlJyA6IFszNCwgMzldLFxuICAnY3lhbicgOiBbMzYsIDM5XSxcbiAgJ2dyZWVuJyA6IFszMiwgMzldLFxuICAnbWFnZW50YScgOiBbMzUsIDM5XSxcbiAgJ3JlZCcgOiBbMzEsIDM5XSxcbiAgJ3llbGxvdycgOiBbMzMsIDM5XVxufTtcblxuLy8gRG9uJ3QgdXNlICdibHVlJyBub3QgdmlzaWJsZSBvbiBjbWQuZXhlXG5pbnNwZWN0LnN0eWxlcyA9IHtcbiAgJ3NwZWNpYWwnOiAnY3lhbicsXG4gICdudW1iZXInOiAneWVsbG93JyxcbiAgJ2Jvb2xlYW4nOiAneWVsbG93JyxcbiAgJ3VuZGVmaW5lZCc6ICdncmV5JyxcbiAgJ251bGwnOiAnYm9sZCcsXG4gICdzdHJpbmcnOiAnZ3JlZW4nLFxuICAnZGF0ZSc6ICdtYWdlbnRhJyxcbiAgLy8gXCJuYW1lXCI6IGludGVudGlvbmFsbHkgbm90IHN0eWxpbmdcbiAgJ3JlZ2V4cCc6ICdyZWQnXG59O1xuXG5cbmZ1bmN0aW9uIHN0eWxpemVXaXRoQ29sb3Ioc3RyLCBzdHlsZVR5cGUpIHtcbiAgdmFyIHN0eWxlID0gaW5zcGVjdC5zdHlsZXNbc3R5bGVUeXBlXTtcblxuICBpZiAoc3R5bGUpIHtcbiAgICByZXR1cm4gJ1xcdTAwMWJbJyArIGluc3BlY3QuY29sb3JzW3N0eWxlXVswXSArICdtJyArIHN0ciArXG4gICAgICAgICAgICdcXHUwMDFiWycgKyBpbnNwZWN0LmNvbG9yc1tzdHlsZV1bMV0gKyAnbSc7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHN0cjtcbiAgfVxufVxuXG5cbmZ1bmN0aW9uIHN0eWxpemVOb0NvbG9yKHN0ciwgc3R5bGVUeXBlKSB7XG4gIHJldHVybiBzdHI7XG59XG5cblxuZnVuY3Rpb24gYXJyYXlUb0hhc2goYXJyYXkpIHtcbiAgdmFyIGhhc2ggPSB7fTtcblxuICBhcnJheS5mb3JFYWNoKGZ1bmN0aW9uKHZhbCwgaWR4KSB7XG4gICAgaGFzaFt2YWxdID0gdHJ1ZTtcbiAgfSk7XG5cbiAgcmV0dXJuIGhhc2g7XG59XG5cblxuZnVuY3Rpb24gZm9ybWF0VmFsdWUoY3R4LCB2YWx1ZSwgcmVjdXJzZVRpbWVzKSB7XG4gIC8vIFByb3ZpZGUgYSBob29rIGZvciB1c2VyLXNwZWNpZmllZCBpbnNwZWN0IGZ1bmN0aW9ucy5cbiAgLy8gQ2hlY2sgdGhhdCB2YWx1ZSBpcyBhbiBvYmplY3Qgd2l0aCBhbiBpbnNwZWN0IGZ1bmN0aW9uIG9uIGl0XG4gIGlmIChjdHguY3VzdG9tSW5zcGVjdCAmJlxuICAgICAgdmFsdWUgJiZcbiAgICAgIGlzRnVuY3Rpb24odmFsdWUuaW5zcGVjdCkgJiZcbiAgICAgIC8vIEZpbHRlciBvdXQgdGhlIHV0aWwgbW9kdWxlLCBpdCdzIGluc3BlY3QgZnVuY3Rpb24gaXMgc3BlY2lhbFxuICAgICAgdmFsdWUuaW5zcGVjdCAhPT0gZXhwb3J0cy5pbnNwZWN0ICYmXG4gICAgICAvLyBBbHNvIGZpbHRlciBvdXQgYW55IHByb3RvdHlwZSBvYmplY3RzIHVzaW5nIHRoZSBjaXJjdWxhciBjaGVjay5cbiAgICAgICEodmFsdWUuY29uc3RydWN0b3IgJiYgdmFsdWUuY29uc3RydWN0b3IucHJvdG90eXBlID09PSB2YWx1ZSkpIHtcbiAgICB2YXIgcmV0ID0gdmFsdWUuaW5zcGVjdChyZWN1cnNlVGltZXMsIGN0eCk7XG4gICAgaWYgKCFpc1N0cmluZyhyZXQpKSB7XG4gICAgICByZXQgPSBmb3JtYXRWYWx1ZShjdHgsIHJldCwgcmVjdXJzZVRpbWVzKTtcbiAgICB9XG4gICAgcmV0dXJuIHJldDtcbiAgfVxuXG4gIC8vIFByaW1pdGl2ZSB0eXBlcyBjYW5ub3QgaGF2ZSBwcm9wZXJ0aWVzXG4gIHZhciBwcmltaXRpdmUgPSBmb3JtYXRQcmltaXRpdmUoY3R4LCB2YWx1ZSk7XG4gIGlmIChwcmltaXRpdmUpIHtcbiAgICByZXR1cm4gcHJpbWl0aXZlO1xuICB9XG5cbiAgLy8gTG9vayB1cCB0aGUga2V5cyBvZiB0aGUgb2JqZWN0LlxuICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKHZhbHVlKTtcbiAgdmFyIHZpc2libGVLZXlzID0gYXJyYXlUb0hhc2goa2V5cyk7XG5cbiAgaWYgKGN0eC5zaG93SGlkZGVuKSB7XG4gICAga2V5cyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHZhbHVlKTtcbiAgfVxuXG4gIC8vIElFIGRvZXNuJ3QgbWFrZSBlcnJvciBmaWVsZHMgbm9uLWVudW1lcmFibGVcbiAgLy8gaHR0cDovL21zZG4ubWljcm9zb2Z0LmNvbS9lbi11cy9saWJyYXJ5L2llL2R3dzUyc2J0KHY9dnMuOTQpLmFzcHhcbiAgaWYgKGlzRXJyb3IodmFsdWUpXG4gICAgICAmJiAoa2V5cy5pbmRleE9mKCdtZXNzYWdlJykgPj0gMCB8fCBrZXlzLmluZGV4T2YoJ2Rlc2NyaXB0aW9uJykgPj0gMCkpIHtcbiAgICByZXR1cm4gZm9ybWF0RXJyb3IodmFsdWUpO1xuICB9XG5cbiAgLy8gU29tZSB0eXBlIG9mIG9iamVjdCB3aXRob3V0IHByb3BlcnRpZXMgY2FuIGJlIHNob3J0Y3V0dGVkLlxuICBpZiAoa2V5cy5sZW5ndGggPT09IDApIHtcbiAgICBpZiAoaXNGdW5jdGlvbih2YWx1ZSkpIHtcbiAgICAgIHZhciBuYW1lID0gdmFsdWUubmFtZSA/ICc6ICcgKyB2YWx1ZS5uYW1lIDogJyc7XG4gICAgICByZXR1cm4gY3R4LnN0eWxpemUoJ1tGdW5jdGlvbicgKyBuYW1lICsgJ10nLCAnc3BlY2lhbCcpO1xuICAgIH1cbiAgICBpZiAoaXNSZWdFeHAodmFsdWUpKSB7XG4gICAgICByZXR1cm4gY3R4LnN0eWxpemUoUmVnRXhwLnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbHVlKSwgJ3JlZ2V4cCcpO1xuICAgIH1cbiAgICBpZiAoaXNEYXRlKHZhbHVlKSkge1xuICAgICAgcmV0dXJuIGN0eC5zdHlsaXplKERhdGUucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsdWUpLCAnZGF0ZScpO1xuICAgIH1cbiAgICBpZiAoaXNFcnJvcih2YWx1ZSkpIHtcbiAgICAgIHJldHVybiBmb3JtYXRFcnJvcih2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgdmFyIGJhc2UgPSAnJywgYXJyYXkgPSBmYWxzZSwgYnJhY2VzID0gWyd7JywgJ30nXTtcblxuICAvLyBNYWtlIEFycmF5IHNheSB0aGF0IHRoZXkgYXJlIEFycmF5XG4gIGlmIChpc0FycmF5KHZhbHVlKSkge1xuICAgIGFycmF5ID0gdHJ1ZTtcbiAgICBicmFjZXMgPSBbJ1snLCAnXSddO1xuICB9XG5cbiAgLy8gTWFrZSBmdW5jdGlvbnMgc2F5IHRoYXQgdGhleSBhcmUgZnVuY3Rpb25zXG4gIGlmIChpc0Z1bmN0aW9uKHZhbHVlKSkge1xuICAgIHZhciBuID0gdmFsdWUubmFtZSA/ICc6ICcgKyB2YWx1ZS5uYW1lIDogJyc7XG4gICAgYmFzZSA9ICcgW0Z1bmN0aW9uJyArIG4gKyAnXSc7XG4gIH1cblxuICAvLyBNYWtlIFJlZ0V4cHMgc2F5IHRoYXQgdGhleSBhcmUgUmVnRXhwc1xuICBpZiAoaXNSZWdFeHAodmFsdWUpKSB7XG4gICAgYmFzZSA9ICcgJyArIFJlZ0V4cC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWx1ZSk7XG4gIH1cblxuICAvLyBNYWtlIGRhdGVzIHdpdGggcHJvcGVydGllcyBmaXJzdCBzYXkgdGhlIGRhdGVcbiAgaWYgKGlzRGF0ZSh2YWx1ZSkpIHtcbiAgICBiYXNlID0gJyAnICsgRGF0ZS5wcm90b3R5cGUudG9VVENTdHJpbmcuY2FsbCh2YWx1ZSk7XG4gIH1cblxuICAvLyBNYWtlIGVycm9yIHdpdGggbWVzc2FnZSBmaXJzdCBzYXkgdGhlIGVycm9yXG4gIGlmIChpc0Vycm9yKHZhbHVlKSkge1xuICAgIGJhc2UgPSAnICcgKyBmb3JtYXRFcnJvcih2YWx1ZSk7XG4gIH1cblxuICBpZiAoa2V5cy5sZW5ndGggPT09IDAgJiYgKCFhcnJheSB8fCB2YWx1ZS5sZW5ndGggPT0gMCkpIHtcbiAgICByZXR1cm4gYnJhY2VzWzBdICsgYmFzZSArIGJyYWNlc1sxXTtcbiAgfVxuXG4gIGlmIChyZWN1cnNlVGltZXMgPCAwKSB7XG4gICAgaWYgKGlzUmVnRXhwKHZhbHVlKSkge1xuICAgICAgcmV0dXJuIGN0eC5zdHlsaXplKFJlZ0V4cC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWx1ZSksICdyZWdleHAnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGN0eC5zdHlsaXplKCdbT2JqZWN0XScsICdzcGVjaWFsJyk7XG4gICAgfVxuICB9XG5cbiAgY3R4LnNlZW4ucHVzaCh2YWx1ZSk7XG5cbiAgdmFyIG91dHB1dDtcbiAgaWYgKGFycmF5KSB7XG4gICAgb3V0cHV0ID0gZm9ybWF0QXJyYXkoY3R4LCB2YWx1ZSwgcmVjdXJzZVRpbWVzLCB2aXNpYmxlS2V5cywga2V5cyk7XG4gIH0gZWxzZSB7XG4gICAgb3V0cHV0ID0ga2V5cy5tYXAoZnVuY3Rpb24oa2V5KSB7XG4gICAgICByZXR1cm4gZm9ybWF0UHJvcGVydHkoY3R4LCB2YWx1ZSwgcmVjdXJzZVRpbWVzLCB2aXNpYmxlS2V5cywga2V5LCBhcnJheSk7XG4gICAgfSk7XG4gIH1cblxuICBjdHguc2Vlbi5wb3AoKTtcblxuICByZXR1cm4gcmVkdWNlVG9TaW5nbGVTdHJpbmcob3V0cHV0LCBiYXNlLCBicmFjZXMpO1xufVxuXG5cbmZ1bmN0aW9uIGZvcm1hdFByaW1pdGl2ZShjdHgsIHZhbHVlKSB7XG4gIGlmIChpc1VuZGVmaW5lZCh2YWx1ZSkpXG4gICAgcmV0dXJuIGN0eC5zdHlsaXplKCd1bmRlZmluZWQnLCAndW5kZWZpbmVkJyk7XG4gIGlmIChpc1N0cmluZyh2YWx1ZSkpIHtcbiAgICB2YXIgc2ltcGxlID0gJ1xcJycgKyBKU09OLnN0cmluZ2lmeSh2YWx1ZSkucmVwbGFjZSgvXlwifFwiJC9nLCAnJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC8nL2csIFwiXFxcXCdcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9cXFxcXCIvZywgJ1wiJykgKyAnXFwnJztcbiAgICByZXR1cm4gY3R4LnN0eWxpemUoc2ltcGxlLCAnc3RyaW5nJyk7XG4gIH1cbiAgaWYgKGlzTnVtYmVyKHZhbHVlKSlcbiAgICByZXR1cm4gY3R4LnN0eWxpemUoJycgKyB2YWx1ZSwgJ251bWJlcicpO1xuICBpZiAoaXNCb29sZWFuKHZhbHVlKSlcbiAgICByZXR1cm4gY3R4LnN0eWxpemUoJycgKyB2YWx1ZSwgJ2Jvb2xlYW4nKTtcbiAgLy8gRm9yIHNvbWUgcmVhc29uIHR5cGVvZiBudWxsIGlzIFwib2JqZWN0XCIsIHNvIHNwZWNpYWwgY2FzZSBoZXJlLlxuICBpZiAoaXNOdWxsKHZhbHVlKSlcbiAgICByZXR1cm4gY3R4LnN0eWxpemUoJ251bGwnLCAnbnVsbCcpO1xufVxuXG5cbmZ1bmN0aW9uIGZvcm1hdEVycm9yKHZhbHVlKSB7XG4gIHJldHVybiAnWycgKyBFcnJvci5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWx1ZSkgKyAnXSc7XG59XG5cblxuZnVuY3Rpb24gZm9ybWF0QXJyYXkoY3R4LCB2YWx1ZSwgcmVjdXJzZVRpbWVzLCB2aXNpYmxlS2V5cywga2V5cykge1xuICB2YXIgb3V0cHV0ID0gW107XG4gIGZvciAodmFyIGkgPSAwLCBsID0gdmFsdWUubGVuZ3RoOyBpIDwgbDsgKytpKSB7XG4gICAgaWYgKGhhc093blByb3BlcnR5KHZhbHVlLCBTdHJpbmcoaSkpKSB7XG4gICAgICBvdXRwdXQucHVzaChmb3JtYXRQcm9wZXJ0eShjdHgsIHZhbHVlLCByZWN1cnNlVGltZXMsIHZpc2libGVLZXlzLFxuICAgICAgICAgIFN0cmluZyhpKSwgdHJ1ZSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBvdXRwdXQucHVzaCgnJyk7XG4gICAgfVxuICB9XG4gIGtleXMuZm9yRWFjaChmdW5jdGlvbihrZXkpIHtcbiAgICBpZiAoIWtleS5tYXRjaCgvXlxcZCskLykpIHtcbiAgICAgIG91dHB1dC5wdXNoKGZvcm1hdFByb3BlcnR5KGN0eCwgdmFsdWUsIHJlY3Vyc2VUaW1lcywgdmlzaWJsZUtleXMsXG4gICAgICAgICAga2V5LCB0cnVlKSk7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIG91dHB1dDtcbn1cblxuXG5mdW5jdGlvbiBmb3JtYXRQcm9wZXJ0eShjdHgsIHZhbHVlLCByZWN1cnNlVGltZXMsIHZpc2libGVLZXlzLCBrZXksIGFycmF5KSB7XG4gIHZhciBuYW1lLCBzdHIsIGRlc2M7XG4gIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHZhbHVlLCBrZXkpIHx8IHsgdmFsdWU6IHZhbHVlW2tleV0gfTtcbiAgaWYgKGRlc2MuZ2V0KSB7XG4gICAgaWYgKGRlc2Muc2V0KSB7XG4gICAgICBzdHIgPSBjdHguc3R5bGl6ZSgnW0dldHRlci9TZXR0ZXJdJywgJ3NwZWNpYWwnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3RyID0gY3R4LnN0eWxpemUoJ1tHZXR0ZXJdJywgJ3NwZWNpYWwnKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgaWYgKGRlc2Muc2V0KSB7XG4gICAgICBzdHIgPSBjdHguc3R5bGl6ZSgnW1NldHRlcl0nLCAnc3BlY2lhbCcpO1xuICAgIH1cbiAgfVxuICBpZiAoIWhhc093blByb3BlcnR5KHZpc2libGVLZXlzLCBrZXkpKSB7XG4gICAgbmFtZSA9ICdbJyArIGtleSArICddJztcbiAgfVxuICBpZiAoIXN0cikge1xuICAgIGlmIChjdHguc2Vlbi5pbmRleE9mKGRlc2MudmFsdWUpIDwgMCkge1xuICAgICAgaWYgKGlzTnVsbChyZWN1cnNlVGltZXMpKSB7XG4gICAgICAgIHN0ciA9IGZvcm1hdFZhbHVlKGN0eCwgZGVzYy52YWx1ZSwgbnVsbCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzdHIgPSBmb3JtYXRWYWx1ZShjdHgsIGRlc2MudmFsdWUsIHJlY3Vyc2VUaW1lcyAtIDEpO1xuICAgICAgfVxuICAgICAgaWYgKHN0ci5pbmRleE9mKCdcXG4nKSA+IC0xKSB7XG4gICAgICAgIGlmIChhcnJheSkge1xuICAgICAgICAgIHN0ciA9IHN0ci5zcGxpdCgnXFxuJykubWFwKGZ1bmN0aW9uKGxpbmUpIHtcbiAgICAgICAgICAgIHJldHVybiAnICAnICsgbGluZTtcbiAgICAgICAgICB9KS5qb2luKCdcXG4nKS5zbGljZSgyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzdHIgPSAnXFxuJyArIHN0ci5zcGxpdCgnXFxuJykubWFwKGZ1bmN0aW9uKGxpbmUpIHtcbiAgICAgICAgICAgIHJldHVybiAnICAgJyArIGxpbmU7XG4gICAgICAgICAgfSkuam9pbignXFxuJyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgc3RyID0gY3R4LnN0eWxpemUoJ1tDaXJjdWxhcl0nLCAnc3BlY2lhbCcpO1xuICAgIH1cbiAgfVxuICBpZiAoaXNVbmRlZmluZWQobmFtZSkpIHtcbiAgICBpZiAoYXJyYXkgJiYga2V5Lm1hdGNoKC9eXFxkKyQvKSkge1xuICAgICAgcmV0dXJuIHN0cjtcbiAgICB9XG4gICAgbmFtZSA9IEpTT04uc3RyaW5naWZ5KCcnICsga2V5KTtcbiAgICBpZiAobmFtZS5tYXRjaCgvXlwiKFthLXpBLVpfXVthLXpBLVpfMC05XSopXCIkLykpIHtcbiAgICAgIG5hbWUgPSBuYW1lLnNsaWNlKDEsIC0xKTtcbiAgICAgIG5hbWUgPSBjdHguc3R5bGl6ZShuYW1lLCAnbmFtZScpO1xuICAgIH0gZWxzZSB7XG4gICAgICBuYW1lID0gbmFtZS5yZXBsYWNlKC8nL2csIFwiXFxcXCdcIilcbiAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL1xcXFxcIi9nLCAnXCInKVxuICAgICAgICAgICAgICAgICAucmVwbGFjZSgvKF5cInxcIiQpL2csIFwiJ1wiKTtcbiAgICAgIG5hbWUgPSBjdHguc3R5bGl6ZShuYW1lLCAnc3RyaW5nJyk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG5hbWUgKyAnOiAnICsgc3RyO1xufVxuXG5cbmZ1bmN0aW9uIHJlZHVjZVRvU2luZ2xlU3RyaW5nKG91dHB1dCwgYmFzZSwgYnJhY2VzKSB7XG4gIHZhciBudW1MaW5lc0VzdCA9IDA7XG4gIHZhciBsZW5ndGggPSBvdXRwdXQucmVkdWNlKGZ1bmN0aW9uKHByZXYsIGN1cikge1xuICAgIG51bUxpbmVzRXN0Kys7XG4gICAgaWYgKGN1ci5pbmRleE9mKCdcXG4nKSA+PSAwKSBudW1MaW5lc0VzdCsrO1xuICAgIHJldHVybiBwcmV2ICsgY3VyLnJlcGxhY2UoL1xcdTAwMWJcXFtcXGRcXGQ/bS9nLCAnJykubGVuZ3RoICsgMTtcbiAgfSwgMCk7XG5cbiAgaWYgKGxlbmd0aCA+IDYwKSB7XG4gICAgcmV0dXJuIGJyYWNlc1swXSArXG4gICAgICAgICAgIChiYXNlID09PSAnJyA/ICcnIDogYmFzZSArICdcXG4gJykgK1xuICAgICAgICAgICAnICcgK1xuICAgICAgICAgICBvdXRwdXQuam9pbignLFxcbiAgJykgK1xuICAgICAgICAgICAnICcgK1xuICAgICAgICAgICBicmFjZXNbMV07XG4gIH1cblxuICByZXR1cm4gYnJhY2VzWzBdICsgYmFzZSArICcgJyArIG91dHB1dC5qb2luKCcsICcpICsgJyAnICsgYnJhY2VzWzFdO1xufVxuXG5cbi8vIE5PVEU6IFRoZXNlIHR5cGUgY2hlY2tpbmcgZnVuY3Rpb25zIGludGVudGlvbmFsbHkgZG9uJ3QgdXNlIGBpbnN0YW5jZW9mYFxuLy8gYmVjYXVzZSBpdCBpcyBmcmFnaWxlIGFuZCBjYW4gYmUgZWFzaWx5IGZha2VkIHdpdGggYE9iamVjdC5jcmVhdGUoKWAuXG5leHBvcnRzLnR5cGVzID0gcmVxdWlyZSgnLi9zdXBwb3J0L3R5cGVzJyk7XG5cbmZ1bmN0aW9uIGlzQXJyYXkoYXIpIHtcbiAgcmV0dXJuIEFycmF5LmlzQXJyYXkoYXIpO1xufVxuZXhwb3J0cy5pc0FycmF5ID0gaXNBcnJheTtcblxuZnVuY3Rpb24gaXNCb29sZWFuKGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ2Jvb2xlYW4nO1xufVxuZXhwb3J0cy5pc0Jvb2xlYW4gPSBpc0Jvb2xlYW47XG5cbmZ1bmN0aW9uIGlzTnVsbChhcmcpIHtcbiAgcmV0dXJuIGFyZyA9PT0gbnVsbDtcbn1cbmV4cG9ydHMuaXNOdWxsID0gaXNOdWxsO1xuXG5mdW5jdGlvbiBpc051bGxPclVuZGVmaW5lZChhcmcpIHtcbiAgcmV0dXJuIGFyZyA9PSBudWxsO1xufVxuZXhwb3J0cy5pc051bGxPclVuZGVmaW5lZCA9IGlzTnVsbE9yVW5kZWZpbmVkO1xuXG5mdW5jdGlvbiBpc051bWJlcihhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdudW1iZXInO1xufVxuZXhwb3J0cy5pc051bWJlciA9IGlzTnVtYmVyO1xuXG5mdW5jdGlvbiBpc1N0cmluZyhhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdzdHJpbmcnO1xufVxuZXhwb3J0cy5pc1N0cmluZyA9IGlzU3RyaW5nO1xuXG5mdW5jdGlvbiBpc1N5bWJvbChhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdzeW1ib2wnO1xufVxuZXhwb3J0cy5pc1N5bWJvbCA9IGlzU3ltYm9sO1xuXG5mdW5jdGlvbiBpc1VuZGVmaW5lZChhcmcpIHtcbiAgcmV0dXJuIGFyZyA9PT0gdm9pZCAwO1xufVxuZXhwb3J0cy5pc1VuZGVmaW5lZCA9IGlzVW5kZWZpbmVkO1xuXG5mdW5jdGlvbiBpc1JlZ0V4cChyZSkge1xuICByZXR1cm4gaXNPYmplY3QocmUpICYmIG9iamVjdFRvU3RyaW5nKHJlKSA9PT0gJ1tvYmplY3QgUmVnRXhwXSc7XG59XG5leHBvcnRzLmlzUmVnRXhwID0gaXNSZWdFeHA7XG5leHBvcnRzLnR5cGVzLmlzUmVnRXhwID0gaXNSZWdFeHA7XG5cbmZ1bmN0aW9uIGlzT2JqZWN0KGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ29iamVjdCcgJiYgYXJnICE9PSBudWxsO1xufVxuZXhwb3J0cy5pc09iamVjdCA9IGlzT2JqZWN0O1xuXG5mdW5jdGlvbiBpc0RhdGUoZCkge1xuICByZXR1cm4gaXNPYmplY3QoZCkgJiYgb2JqZWN0VG9TdHJpbmcoZCkgPT09ICdbb2JqZWN0IERhdGVdJztcbn1cbmV4cG9ydHMuaXNEYXRlID0gaXNEYXRlO1xuZXhwb3J0cy50eXBlcy5pc0RhdGUgPSBpc0RhdGU7XG5cbmZ1bmN0aW9uIGlzRXJyb3IoZSkge1xuICByZXR1cm4gaXNPYmplY3QoZSkgJiZcbiAgICAgIChvYmplY3RUb1N0cmluZyhlKSA9PT0gJ1tvYmplY3QgRXJyb3JdJyB8fCBlIGluc3RhbmNlb2YgRXJyb3IpO1xufVxuZXhwb3J0cy5pc0Vycm9yID0gaXNFcnJvcjtcbmV4cG9ydHMudHlwZXMuaXNOYXRpdmVFcnJvciA9IGlzRXJyb3I7XG5cbmZ1bmN0aW9uIGlzRnVuY3Rpb24oYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnZnVuY3Rpb24nO1xufVxuZXhwb3J0cy5pc0Z1bmN0aW9uID0gaXNGdW5jdGlvbjtcblxuZnVuY3Rpb24gaXNQcmltaXRpdmUoYXJnKSB7XG4gIHJldHVybiBhcmcgPT09IG51bGwgfHxcbiAgICAgICAgIHR5cGVvZiBhcmcgPT09ICdib29sZWFuJyB8fFxuICAgICAgICAgdHlwZW9mIGFyZyA9PT0gJ251bWJlcicgfHxcbiAgICAgICAgIHR5cGVvZiBhcmcgPT09ICdzdHJpbmcnIHx8XG4gICAgICAgICB0eXBlb2YgYXJnID09PSAnc3ltYm9sJyB8fCAgLy8gRVM2IHN5bWJvbFxuICAgICAgICAgdHlwZW9mIGFyZyA9PT0gJ3VuZGVmaW5lZCc7XG59XG5leHBvcnRzLmlzUHJpbWl0aXZlID0gaXNQcmltaXRpdmU7XG5cbmV4cG9ydHMuaXNCdWZmZXIgPSByZXF1aXJlKCcuL3N1cHBvcnQvaXNCdWZmZXInKTtcblxuZnVuY3Rpb24gb2JqZWN0VG9TdHJpbmcobykge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pO1xufVxuXG5cbmZ1bmN0aW9uIHBhZChuKSB7XG4gIHJldHVybiBuIDwgMTAgPyAnMCcgKyBuLnRvU3RyaW5nKDEwKSA6IG4udG9TdHJpbmcoMTApO1xufVxuXG5cbnZhciBtb250aHMgPSBbJ0phbicsICdGZWInLCAnTWFyJywgJ0FwcicsICdNYXknLCAnSnVuJywgJ0p1bCcsICdBdWcnLCAnU2VwJyxcbiAgICAgICAgICAgICAgJ09jdCcsICdOb3YnLCAnRGVjJ107XG5cbi8vIDI2IEZlYiAxNjoxOTozNFxuZnVuY3Rpb24gdGltZXN0YW1wKCkge1xuICB2YXIgZCA9IG5ldyBEYXRlKCk7XG4gIHZhciB0aW1lID0gW3BhZChkLmdldEhvdXJzKCkpLFxuICAgICAgICAgICAgICBwYWQoZC5nZXRNaW51dGVzKCkpLFxuICAgICAgICAgICAgICBwYWQoZC5nZXRTZWNvbmRzKCkpXS5qb2luKCc6Jyk7XG4gIHJldHVybiBbZC5nZXREYXRlKCksIG1vbnRoc1tkLmdldE1vbnRoKCldLCB0aW1lXS5qb2luKCcgJyk7XG59XG5cblxuLy8gbG9nIGlzIGp1c3QgYSB0aGluIHdyYXBwZXIgdG8gY29uc29sZS5sb2cgdGhhdCBwcmVwZW5kcyBhIHRpbWVzdGFtcFxuZXhwb3J0cy5sb2cgPSBmdW5jdGlvbigpIHtcbiAgY29uc29sZS5sb2coJyVzIC0gJXMnLCB0aW1lc3RhbXAoKSwgZXhwb3J0cy5mb3JtYXQuYXBwbHkoZXhwb3J0cywgYXJndW1lbnRzKSk7XG59O1xuXG5cbi8qKlxuICogSW5oZXJpdCB0aGUgcHJvdG90eXBlIG1ldGhvZHMgZnJvbSBvbmUgY29uc3RydWN0b3IgaW50byBhbm90aGVyLlxuICpcbiAqIFRoZSBGdW5jdGlvbi5wcm90b3R5cGUuaW5oZXJpdHMgZnJvbSBsYW5nLmpzIHJld3JpdHRlbiBhcyBhIHN0YW5kYWxvbmVcbiAqIGZ1bmN0aW9uIChub3Qgb24gRnVuY3Rpb24ucHJvdG90eXBlKS4gTk9URTogSWYgdGhpcyBmaWxlIGlzIHRvIGJlIGxvYWRlZFxuICogZHVyaW5nIGJvb3RzdHJhcHBpbmcgdGhpcyBmdW5jdGlvbiBuZWVkcyB0byBiZSByZXdyaXR0ZW4gdXNpbmcgc29tZSBuYXRpdmVcbiAqIGZ1bmN0aW9ucyBhcyBwcm90b3R5cGUgc2V0dXAgdXNpbmcgbm9ybWFsIEphdmFTY3JpcHQgZG9lcyBub3Qgd29yayBhc1xuICogZXhwZWN0ZWQgZHVyaW5nIGJvb3RzdHJhcHBpbmcgKHNlZSBtaXJyb3IuanMgaW4gcjExNDkwMykuXG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbn0gY3RvciBDb25zdHJ1Y3RvciBmdW5jdGlvbiB3aGljaCBuZWVkcyB0byBpbmhlcml0IHRoZVxuICogICAgIHByb3RvdHlwZS5cbiAqIEBwYXJhbSB7ZnVuY3Rpb259IHN1cGVyQ3RvciBDb25zdHJ1Y3RvciBmdW5jdGlvbiB0byBpbmhlcml0IHByb3RvdHlwZSBmcm9tLlxuICovXG5leHBvcnRzLmluaGVyaXRzID0gcmVxdWlyZSgnaW5oZXJpdHMnKTtcblxuZXhwb3J0cy5fZXh0ZW5kID0gZnVuY3Rpb24ob3JpZ2luLCBhZGQpIHtcbiAgLy8gRG9uJ3QgZG8gYW55dGhpbmcgaWYgYWRkIGlzbid0IGFuIG9iamVjdFxuICBpZiAoIWFkZCB8fCAhaXNPYmplY3QoYWRkKSkgcmV0dXJuIG9yaWdpbjtcblxuICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKGFkZCk7XG4gIHZhciBpID0ga2V5cy5sZW5ndGg7XG4gIHdoaWxlIChpLS0pIHtcbiAgICBvcmlnaW5ba2V5c1tpXV0gPSBhZGRba2V5c1tpXV07XG4gIH1cbiAgcmV0dXJuIG9yaWdpbjtcbn07XG5cbmZ1bmN0aW9uIGhhc093blByb3BlcnR5KG9iaiwgcHJvcCkge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCk7XG59XG5cbnZhciBrQ3VzdG9tUHJvbWlzaWZpZWRTeW1ib2wgPSB0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyA/IFN5bWJvbCgndXRpbC5wcm9taXNpZnkuY3VzdG9tJykgOiB1bmRlZmluZWQ7XG5cbmV4cG9ydHMucHJvbWlzaWZ5ID0gZnVuY3Rpb24gcHJvbWlzaWZ5KG9yaWdpbmFsKSB7XG4gIGlmICh0eXBlb2Ygb3JpZ2luYWwgIT09ICdmdW5jdGlvbicpXG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIFwib3JpZ2luYWxcIiBhcmd1bWVudCBtdXN0IGJlIG9mIHR5cGUgRnVuY3Rpb24nKTtcblxuICBpZiAoa0N1c3RvbVByb21pc2lmaWVkU3ltYm9sICYmIG9yaWdpbmFsW2tDdXN0b21Qcm9taXNpZmllZFN5bWJvbF0pIHtcbiAgICB2YXIgZm4gPSBvcmlnaW5hbFtrQ3VzdG9tUHJvbWlzaWZpZWRTeW1ib2xdO1xuICAgIGlmICh0eXBlb2YgZm4gIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBcInV0aWwucHJvbWlzaWZ5LmN1c3RvbVwiIGFyZ3VtZW50IG11c3QgYmUgb2YgdHlwZSBGdW5jdGlvbicpO1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZm4sIGtDdXN0b21Qcm9taXNpZmllZFN5bWJvbCwge1xuICAgICAgdmFsdWU6IGZuLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IGZhbHNlLCBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICByZXR1cm4gZm47XG4gIH1cblxuICBmdW5jdGlvbiBmbigpIHtcbiAgICB2YXIgcHJvbWlzZVJlc29sdmUsIHByb21pc2VSZWplY3Q7XG4gICAgdmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICBwcm9taXNlUmVzb2x2ZSA9IHJlc29sdmU7XG4gICAgICBwcm9taXNlUmVqZWN0ID0gcmVqZWN0O1xuICAgIH0pO1xuXG4gICAgdmFyIGFyZ3MgPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgYXJncy5wdXNoKGFyZ3VtZW50c1tpXSk7XG4gICAgfVxuICAgIGFyZ3MucHVzaChmdW5jdGlvbiAoZXJyLCB2YWx1ZSkge1xuICAgICAgaWYgKGVycikge1xuICAgICAgICBwcm9taXNlUmVqZWN0KGVycik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwcm9taXNlUmVzb2x2ZSh2YWx1ZSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB0cnkge1xuICAgICAgb3JpZ2luYWwuYXBwbHkodGhpcywgYXJncyk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBwcm9taXNlUmVqZWN0KGVycik7XG4gICAgfVxuXG4gICAgcmV0dXJuIHByb21pc2U7XG4gIH1cblxuICBPYmplY3Quc2V0UHJvdG90eXBlT2YoZm4sIE9iamVjdC5nZXRQcm90b3R5cGVPZihvcmlnaW5hbCkpO1xuXG4gIGlmIChrQ3VzdG9tUHJvbWlzaWZpZWRTeW1ib2wpIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmbiwga0N1c3RvbVByb21pc2lmaWVkU3ltYm9sLCB7XG4gICAgdmFsdWU6IGZuLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IGZhbHNlLCBjb25maWd1cmFibGU6IHRydWVcbiAgfSk7XG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydGllcyhcbiAgICBmbixcbiAgICBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKG9yaWdpbmFsKVxuICApO1xufVxuXG5leHBvcnRzLnByb21pc2lmeS5jdXN0b20gPSBrQ3VzdG9tUHJvbWlzaWZpZWRTeW1ib2xcblxuZnVuY3Rpb24gY2FsbGJhY2tpZnlPblJlamVjdGVkKHJlYXNvbiwgY2IpIHtcbiAgLy8gYCFyZWFzb25gIGd1YXJkIGluc3BpcmVkIGJ5IGJsdWViaXJkIChSZWY6IGh0dHBzOi8vZ29vLmdsL3Q1SVM2TSkuXG4gIC8vIEJlY2F1c2UgYG51bGxgIGlzIGEgc3BlY2lhbCBlcnJvciB2YWx1ZSBpbiBjYWxsYmFja3Mgd2hpY2ggbWVhbnMgXCJubyBlcnJvclxuICAvLyBvY2N1cnJlZFwiLCB3ZSBlcnJvci13cmFwIHNvIHRoZSBjYWxsYmFjayBjb25zdW1lciBjYW4gZGlzdGluZ3Vpc2ggYmV0d2VlblxuICAvLyBcInRoZSBwcm9taXNlIHJlamVjdGVkIHdpdGggbnVsbFwiIG9yIFwidGhlIHByb21pc2UgZnVsZmlsbGVkIHdpdGggdW5kZWZpbmVkXCIuXG4gIGlmICghcmVhc29uKSB7XG4gICAgdmFyIG5ld1JlYXNvbiA9IG5ldyBFcnJvcignUHJvbWlzZSB3YXMgcmVqZWN0ZWQgd2l0aCBhIGZhbHN5IHZhbHVlJyk7XG4gICAgbmV3UmVhc29uLnJlYXNvbiA9IHJlYXNvbjtcbiAgICByZWFzb24gPSBuZXdSZWFzb247XG4gIH1cbiAgcmV0dXJuIGNiKHJlYXNvbik7XG59XG5cbmZ1bmN0aW9uIGNhbGxiYWNraWZ5KG9yaWdpbmFsKSB7XG4gIGlmICh0eXBlb2Ygb3JpZ2luYWwgIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgXCJvcmlnaW5hbFwiIGFyZ3VtZW50IG11c3QgYmUgb2YgdHlwZSBGdW5jdGlvbicpO1xuICB9XG5cbiAgLy8gV2UgRE8gTk9UIHJldHVybiB0aGUgcHJvbWlzZSBhcyBpdCBnaXZlcyB0aGUgdXNlciBhIGZhbHNlIHNlbnNlIHRoYXRcbiAgLy8gdGhlIHByb21pc2UgaXMgYWN0dWFsbHkgc29tZWhvdyByZWxhdGVkIHRvIHRoZSBjYWxsYmFjaydzIGV4ZWN1dGlvblxuICAvLyBhbmQgdGhhdCB0aGUgY2FsbGJhY2sgdGhyb3dpbmcgd2lsbCByZWplY3QgdGhlIHByb21pc2UuXG4gIGZ1bmN0aW9uIGNhbGxiYWNraWZpZWQoKSB7XG4gICAgdmFyIGFyZ3MgPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgYXJncy5wdXNoKGFyZ3VtZW50c1tpXSk7XG4gICAgfVxuXG4gICAgdmFyIG1heWJlQ2IgPSBhcmdzLnBvcCgpO1xuICAgIGlmICh0eXBlb2YgbWF5YmVDYiAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIGxhc3QgYXJndW1lbnQgbXVzdCBiZSBvZiB0eXBlIEZ1bmN0aW9uJyk7XG4gICAgfVxuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB2YXIgY2IgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBtYXliZUNiLmFwcGx5KHNlbGYsIGFyZ3VtZW50cyk7XG4gICAgfTtcbiAgICAvLyBJbiB0cnVlIG5vZGUgc3R5bGUgd2UgcHJvY2VzcyB0aGUgY2FsbGJhY2sgb24gYG5leHRUaWNrYCB3aXRoIGFsbCB0aGVcbiAgICAvLyBpbXBsaWNhdGlvbnMgKHN0YWNrLCBgdW5jYXVnaHRFeGNlcHRpb25gLCBgYXN5bmNfaG9va3NgKVxuICAgIG9yaWdpbmFsLmFwcGx5KHRoaXMsIGFyZ3MpXG4gICAgICAudGhlbihmdW5jdGlvbihyZXQpIHsgcHJvY2Vzcy5uZXh0VGljayhjYi5iaW5kKG51bGwsIG51bGwsIHJldCkpIH0sXG4gICAgICAgICAgICBmdW5jdGlvbihyZWopIHsgcHJvY2Vzcy5uZXh0VGljayhjYWxsYmFja2lmeU9uUmVqZWN0ZWQuYmluZChudWxsLCByZWosIGNiKSkgfSk7XG4gIH1cblxuICBPYmplY3Quc2V0UHJvdG90eXBlT2YoY2FsbGJhY2tpZmllZCwgT2JqZWN0LmdldFByb3RvdHlwZU9mKG9yaWdpbmFsKSk7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKGNhbGxiYWNraWZpZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGdldE93blByb3BlcnR5RGVzY3JpcHRvcnMob3JpZ2luYWwpKTtcbiAgcmV0dXJuIGNhbGxiYWNraWZpZWQ7XG59XG5leHBvcnRzLmNhbGxiYWNraWZ5ID0gY2FsbGJhY2tpZnk7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBmb3JFYWNoID0gcmVxdWlyZSgnZm9yLWVhY2gnKTtcbnZhciBhdmFpbGFibGVUeXBlZEFycmF5cyA9IHJlcXVpcmUoJ2F2YWlsYWJsZS10eXBlZC1hcnJheXMnKTtcbnZhciBjYWxsQmluZCA9IHJlcXVpcmUoJ2NhbGwtYmluZCcpO1xudmFyIGNhbGxCb3VuZCA9IHJlcXVpcmUoJ2NhbGwtYmluZC9jYWxsQm91bmQnKTtcbnZhciBnT1BEID0gcmVxdWlyZSgnZ29wZCcpO1xuXG52YXIgJHRvU3RyaW5nID0gY2FsbEJvdW5kKCdPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nJyk7XG52YXIgaGFzVG9TdHJpbmdUYWcgPSByZXF1aXJlKCdoYXMtdG9zdHJpbmd0YWcvc2hhbXMnKSgpO1xuXG52YXIgZyA9IHR5cGVvZiBnbG9iYWxUaGlzID09PSAndW5kZWZpbmVkJyA/IGdsb2JhbCA6IGdsb2JhbFRoaXM7XG52YXIgdHlwZWRBcnJheXMgPSBhdmFpbGFibGVUeXBlZEFycmF5cygpO1xuXG52YXIgJHNsaWNlID0gY2FsbEJvdW5kKCdTdHJpbmcucHJvdG90eXBlLnNsaWNlJyk7XG52YXIgZ2V0UHJvdG90eXBlT2YgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Y7IC8vIHJlcXVpcmUoJ2dldHByb3RvdHlwZW9mJyk7XG5cbnZhciAkaW5kZXhPZiA9IGNhbGxCb3VuZCgnQXJyYXkucHJvdG90eXBlLmluZGV4T2YnLCB0cnVlKSB8fCBmdW5jdGlvbiBpbmRleE9mKGFycmF5LCB2YWx1ZSkge1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGFycmF5Lmxlbmd0aDsgaSArPSAxKSB7XG5cdFx0aWYgKGFycmF5W2ldID09PSB2YWx1ZSkge1xuXHRcdFx0cmV0dXJuIGk7XG5cdFx0fVxuXHR9XG5cdHJldHVybiAtMTtcbn07XG52YXIgY2FjaGUgPSB7IF9fcHJvdG9fXzogbnVsbCB9O1xuaWYgKGhhc1RvU3RyaW5nVGFnICYmIGdPUEQgJiYgZ2V0UHJvdG90eXBlT2YpIHtcblx0Zm9yRWFjaCh0eXBlZEFycmF5cywgZnVuY3Rpb24gKHR5cGVkQXJyYXkpIHtcblx0XHR2YXIgYXJyID0gbmV3IGdbdHlwZWRBcnJheV0oKTtcblx0XHRpZiAoU3ltYm9sLnRvU3RyaW5nVGFnIGluIGFycikge1xuXHRcdFx0dmFyIHByb3RvID0gZ2V0UHJvdG90eXBlT2YoYXJyKTtcblx0XHRcdHZhciBkZXNjcmlwdG9yID0gZ09QRChwcm90bywgU3ltYm9sLnRvU3RyaW5nVGFnKTtcblx0XHRcdGlmICghZGVzY3JpcHRvcikge1xuXHRcdFx0XHR2YXIgc3VwZXJQcm90byA9IGdldFByb3RvdHlwZU9mKHByb3RvKTtcblx0XHRcdFx0ZGVzY3JpcHRvciA9IGdPUEQoc3VwZXJQcm90bywgU3ltYm9sLnRvU3RyaW5nVGFnKTtcblx0XHRcdH1cblx0XHRcdGNhY2hlWyckJyArIHR5cGVkQXJyYXldID0gY2FsbEJpbmQoZGVzY3JpcHRvci5nZXQpO1xuXHRcdH1cblx0fSk7XG59IGVsc2Uge1xuXHRmb3JFYWNoKHR5cGVkQXJyYXlzLCBmdW5jdGlvbiAodHlwZWRBcnJheSkge1xuXHRcdHZhciBhcnIgPSBuZXcgZ1t0eXBlZEFycmF5XSgpO1xuXHRcdHZhciBmbiA9IGFyci5zbGljZSB8fCBhcnIuc2V0O1xuXHRcdGlmIChmbikge1xuXHRcdFx0Y2FjaGVbJyQnICsgdHlwZWRBcnJheV0gPSBjYWxsQmluZChmbik7XG5cdFx0fVxuXHR9KTtcbn1cblxudmFyIHRyeVR5cGVkQXJyYXlzID0gZnVuY3Rpb24gdHJ5QWxsVHlwZWRBcnJheXModmFsdWUpIHtcblx0dmFyIGZvdW5kID0gZmFsc2U7XG5cdGZvckVhY2goY2FjaGUsIGZ1bmN0aW9uIChnZXR0ZXIsIHR5cGVkQXJyYXkpIHtcblx0XHRpZiAoIWZvdW5kKSB7XG5cdFx0XHR0cnkge1xuXHRcdFx0XHRpZiAoJyQnICsgZ2V0dGVyKHZhbHVlKSA9PT0gdHlwZWRBcnJheSkge1xuXHRcdFx0XHRcdGZvdW5kID0gJHNsaWNlKHR5cGVkQXJyYXksIDEpO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGNhdGNoIChlKSB7IC8qKi8gfVxuXHRcdH1cblx0fSk7XG5cdHJldHVybiBmb3VuZDtcbn07XG5cbnZhciB0cnlTbGljZXMgPSBmdW5jdGlvbiB0cnlBbGxTbGljZXModmFsdWUpIHtcblx0dmFyIGZvdW5kID0gZmFsc2U7XG5cdGZvckVhY2goY2FjaGUsIGZ1bmN0aW9uIChnZXR0ZXIsIG5hbWUpIHtcblx0XHRpZiAoIWZvdW5kKSB7XG5cdFx0XHR0cnkge1xuXHRcdFx0XHRnZXR0ZXIodmFsdWUpO1xuXHRcdFx0XHRmb3VuZCA9ICRzbGljZShuYW1lLCAxKTtcblx0XHRcdH0gY2F0Y2ggKGUpIHsgLyoqLyB9XG5cdFx0fVxuXHR9KTtcblx0cmV0dXJuIGZvdW5kO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB3aGljaFR5cGVkQXJyYXkodmFsdWUpIHtcblx0aWYgKCF2YWx1ZSB8fCB0eXBlb2YgdmFsdWUgIT09ICdvYmplY3QnKSB7IHJldHVybiBmYWxzZTsgfVxuXHRpZiAoIWhhc1RvU3RyaW5nVGFnKSB7XG5cdFx0dmFyIHRhZyA9ICRzbGljZSgkdG9TdHJpbmcodmFsdWUpLCA4LCAtMSk7XG5cdFx0aWYgKCRpbmRleE9mKHR5cGVkQXJyYXlzLCB0YWcpID4gLTEpIHtcblx0XHRcdHJldHVybiB0YWc7XG5cdFx0fVxuXHRcdGlmICh0YWcgIT09ICdPYmplY3QnKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXHRcdC8vIG5vZGUgPCAwLjYgaGl0cyBoZXJlIG9uIHJlYWwgVHlwZWQgQXJyYXlzXG5cdFx0cmV0dXJuIHRyeVNsaWNlcyh2YWx1ZSk7XG5cdH1cblx0aWYgKCFnT1BEKSB7IHJldHVybiBudWxsOyB9IC8vIHVua25vd24gZW5naW5lXG5cdHJldHVybiB0cnlUeXBlZEFycmF5cyh2YWx1ZSk7XG59O1xuIiwiaW1wb3J0ICcuL3N0eWxlLmNzcyc7XG5pbXBvcnQgbG9hZFBhZ2UgZnJvbSAnLi9wYWdlbG9hZCc7XG5pbXBvcnQgbG9hZEhvbWUgZnJvbSAnLi9tb2R1bGVzL2hvbWUnO1xuaW1wb3J0IGxvYWRNZW51IGZyb20gJy4vbW9kdWxlcy9tZW51JztcbmltcG9ydCBsb2FkQ29udGFjdCBmcm9tICcuL21vZHVsZXMvY29udGFjdCc7XG5cbi8vIEhhbmRsZSB0YWIgbGlzdGVuaW5nIGxvZ2ljXG4vLyBHZXQgZWxlbWVudCByZWZlcmVuY2VzXG4vLyBBZGQgZXZlbnQgbGlzdGVuZXJzIGZyb20gbW9kdWxlc1xuLy8gTW9kdWxlcyByZXBsYWNlIGxvZ0xpc3RlblxuZnVuY3Rpb24gYWRkRXZlbnRIYW5kbGVycygpIHtcbiAgY29uc3QgaG9tZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdob21lLWJ0bicpO1xuICBjb25zdCBuYXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWVudS1idG4nKTtcbiAgY29uc3QgY29udGFjdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250YWN0LWJ0bicpO1xuXG4gIGhvbWUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBsb2FkSG9tZSk7XG4gIG5hdi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGxvYWRNZW51KTtcbiAgY29udGFjdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGxvYWRDb250YWN0KTtcbn1cblxuZnVuY3Rpb24gaW5pdCgpIHtcbiAgLy8gTWFpbiBjb250ZW50IGdlbmVyYXRlZCBkeW5hbWljYWxseSBieSBKUyB0byBhcHBlbmQgZWxlbWVudHNcbiAgY29uc3QgY29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBjb250ZW50LmlkID0gJ2NvbnRlbnQnO1xuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNvbnRlbnQpO1xuXG4gIC8vIENhbGxzIHRvIGxvYWQgcGFnZSwgbG9hZCBob21lIGFuZCBoYW5kbGUgdGFiLXN3aXRjaGluZyBsb2dpY1xuICBsb2FkUGFnZSgpO1xuICBsb2FkSG9tZSgpO1xuICBhZGRFdmVudEhhbmRsZXJzKCk7XG59XG5cbmZ1bmN0aW9uIGxvZ0xpc3RlbihlKSB7XG4gIGNvbnNvbGUubG9nKGUpO1xufVxuXG5pbml0KCk7IC8vIEhhbmRsZSBpbml0aWFsIHBhZ2Vsb2FkIiwiZnVuY3Rpb24gY3JlYXRlTWVudVNlY3Rpb24oKSB7XG4gIGNvbnN0IGhlcm8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzZWN0aW9uJyk7XG4gIGhlcm8uY2xhc3NMaXN0LmFkZCgnaGVybycpO1xuXG4gIGNvbnN0IGhlcm9IZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgaGVyb0hlYWRlci5jbGFzc0xpc3QuYWRkKCdoZXJvLWhlYWQnKTtcblxuICBjb25zdCBoZXJvVGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMicpO1xuICBoZXJvVGl0bGUuY2xhc3NMaXN0LmFkZCgnc2VjdGlvbi10aXRsZScpO1xuICBoZXJvVGl0bGUudGV4dENvbnRlbnQgPSAnQ29udGFjdCc7XG4gIGhlcm9IZWFkZXIuYXBwZW5kQ2hpbGQoaGVyb1RpdGxlKTtcblxuICBjb25zdCBkaXZpZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaHInKTtcbiAgZGl2aWRlci5jbGFzc0xpc3QuYWRkKCdkaXZpZGVyJyk7XG4gIGhlcm9IZWFkZXIuYXBwZW5kQ2hpbGQoZGl2aWRlcik7XG5cbiAgY29uc3QgaGVyb0Zvcm1JbmZvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGhlcm9Gb3JtSW5mby5jbGFzc0xpc3QuYWRkKCdoZXJvLWZvcm0nKTtcblxuICBjb25zdCBwYXJhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICBwYXJhLmNsYXNzTGlzdC5hZGQoJ2hlcm8tcGFyYScpO1xuICBwYXJhLnRleHRDb250ZW50ID0gJ05lZWQgdG8gY29udGFjdCB1cz8gRmlsbCBvdXQgdGhpcyBmb3JtIGJlbG93OidcbiAgaGVyb0Zvcm1JbmZvLmFwcGVuZENoaWxkKHBhcmEpO1xuXG4gIGNvbnN0IGZvcm1GaWVsZHMgPSBbJ1VzZXJuYW1lJywgJ0ZpcnN0IE5hbWUnLCAnTGFzdCBOYW1lJywgJ0VtYWlsIEFkZHJlc3MnLCAnUGhvbmUgTnVtYmVyJywgJ01lc3NhZ2UnXTtcbiAgY29uc3QgZm9ybSA9IGNyZWF0ZUZvcm0oZm9ybUZpZWxkcyk7XG4gIGZvcm0uY2xhc3NMaXN0LmFkZCgnY29udGFjdC1mb3JtJyk7XG5cbiAgZnVuY3Rpb24gY3JlYXRlRm9ybShpbnB1dEFycmF5KSB7XG4gICAgY29uc3Qgb3V0cHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZm9ybScpO1xuICAgIGlucHV0QXJyYXkuZm9yRWFjaCgoZmllbGQpID0+IHtcbiAgICAgIGlmIChmaWVsZCA9PT0gJ01lc3NhZ2UnKSB7XG4gICAgICAgIGNvbnN0IG1lc3NhZ2VMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG4gICAgICAgIG1lc3NhZ2VMYWJlbC50ZXh0Q29udGVudCA9IGAke2ZpZWxkfTpgO1xuICAgICAgICBjb25zdCBtZXNzYWdlSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZXh0YXJlYScpO1xuICAgICAgICBtZXNzYWdlSW5wdXQucm93cyA9IDg7XG4gICAgICAgIG91dHB1dC5hcHBlbmRDaGlsZChtZXNzYWdlTGFiZWwpO1xuICAgICAgICBvdXRwdXQuYXBwZW5kQ2hpbGQobWVzc2FnZUlucHV0KTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBjb25zdCBmb3JtTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuICAgICAgICBmb3JtTGFiZWwudGV4dENvbnRlbnQgPSBgJHtmaWVsZH06YDtcbiAgICAgICAgY29uc3QgZm9ybUlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgICAgZm9ybUlucHV0LnR5cGUgPSAndGV4dCc7XG4gICAgICAgIGZvcm1JbnB1dC5zaXplID0gMzA7XG4gICAgICAgIG91dHB1dC5hcHBlbmRDaGlsZChmb3JtTGFiZWwpO1xuICAgICAgICBvdXRwdXQuYXBwZW5kQ2hpbGQoZm9ybUlucHV0KTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBvdXRwdXQ7XG4gIH1cblxuICBjb25zdCBzdWJtaXRCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICBzdWJtaXRCdG4udHlwZSA9ICdzdWJtaXQnO1xuICBzdWJtaXRCdG4uY2xhc3NMaXN0LmFkZCgnZm9ybS1idXR0b24nKTtcbiAgc3VibWl0QnRuLnRleHRDb250ZW50ID0gJ1N1Ym1pdCc7XG5cbiAgaGVyb0Zvcm1JbmZvLmFwcGVuZENoaWxkKGZvcm0pO1xuICBoZXJvRm9ybUluZm8uYXBwZW5kKHN1Ym1pdEJ0bik7XG5cbiAgaGVyb0hlYWRlci5hcHBlbmRDaGlsZChoZXJvRm9ybUluZm8pO1xuXG4gIGhlcm8uYXBwZW5kQ2hpbGQoaGVyb0hlYWRlcik7XG5cbiAgY29uc3QgZGlzY2xhaW1lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgZGlzY2xhaW1lci5jbGFzc0xpc3QuYWRkKCdmb3JtLWRpc2NsYWltZXInKTtcbiAgZGlzY2xhaW1lci50ZXh0Q29udGVudCA9ICcqUGxlYXNlIGFsbG93IGF0IGxlYXN0IDcgYnVzaW5lc3MgZGF5cyBmb3IgYSB0aW1lbHkgcmVzcG9uc2UqJztcblxuICBoZXJvLmFwcGVuZENoaWxkKGRpc2NsYWltZXIpO1xuXG4gIHJldHVybiBoZXJvO1xufVxuXG5mdW5jdGlvbiBsb2FkQ29udGFjdCgpIHtcbiAgY29uc3QgY29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wYWdlLWNvbnRlbnQnKTtcbiAgY29udGVudC50ZXh0Q29udGVudCA9ICcnO1xuXG4gIGNvbnN0IHRhYlN3aXRjaCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbi5hY3RpdmUnKTtcbiAgaWYgKHRhYlN3aXRjaCkgdGFiU3dpdGNoLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpO1xuXG4gIGNvbnN0IGFjdGl2ZVRhYiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250YWN0LWJ0bicpO1xuICBhY3RpdmVUYWIuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG5cbiAgY29uc3QgaGVybyA9IGNyZWF0ZU1lbnVTZWN0aW9uKCk7XG5cbiAgY29udGVudC5hcHBlbmRDaGlsZChoZXJvKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgbG9hZENvbnRhY3Q7IiwiaW1wb3J0IEdhbGxlcnlPbmUgZnJvbSAnLi4vYXNzZXRzL3Jlc3Qtb25lLnBuZyc7XG5pbXBvcnQgR2FsbGVyeVR3byBmcm9tICcuLi9hc3NldHMvcmVzdC10d28ucG5nJztcbmltcG9ydCBHYWxsZXJ5VGhyZWUgZnJvbSAnLi4vYXNzZXRzL3Jlc3QtdGhyZWUucG5nJztcbmltcG9ydCBHYWxsZXJ5Rm91ciBmcm9tICcuLi9hc3NldHMvcmVzdC1mb3VyLnBuZyc7XG5pbXBvcnQgR2FsbGVyeUZpdmUgZnJvbSAnLi4vYXNzZXRzL3Jlc3QtZml2ZS5wbmcnO1xuXG5mdW5jdGlvbiBjcmVhdGVIZXJvU2VjdGlvbigpIHtcbiAgY29uc3QgaGVybyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NlY3Rpb24nKTtcbiAgaGVyby5jbGFzc0xpc3QuYWRkKCdoZXJvJyk7XG5cbiAgY29uc3QgaGVyb0hlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBoZXJvSGVhZGVyLmNsYXNzTGlzdC5hZGQoJ2hlcm8taGVhZCcpO1xuXG4gIGNvbnN0IGhlcm9UaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gyJyk7XG4gIGhlcm9UaXRsZS5jbGFzc0xpc3QuYWRkKCdzZWN0aW9uLXRpdGxlJyk7XG4gIGhlcm9UaXRsZS50ZXh0Q29udGVudCA9ICdCZWRyb2NrICYgSmF2YSBNZW51cyBBdmFpbGFibGUhJztcbiAgaGVyb0hlYWRlci5hcHBlbmRDaGlsZChoZXJvVGl0bGUpO1xuXG4gIGNvbnN0IGRpdmlkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdocicpO1xuICBkaXZpZGVyLmNsYXNzTGlzdC5hZGQoJ2RpdmlkZXInKTtcbiAgaGVyb0hlYWRlci5hcHBlbmRDaGlsZChkaXZpZGVyKTtcblxuICBoZXJvLmFwcGVuZENoaWxkKGhlcm9IZWFkZXIpO1xuXG4gIGNvbnN0IGhlcm9JbmZvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGhlcm9JbmZvLmNsYXNzTGlzdC5hZGQoJ2hlcm8taW5mbycpO1xuXG4gIGNvbnN0IHBhcmFUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2g0Jyk7XG4gIHBhcmFUaXRsZS5jbGFzc0xpc3QuYWRkKCdoZXJvLXBhcmEtdGl0bGUnKTtcbiAgcGFyYVRpdGxlLnRleHRDb250ZW50ID0gJ0hvdXJzOic7XG5cbiAgY29uc3QgcGFyYU9uZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgcGFyYU9uZS5jbGFzc0xpc3QuYWRkKCdoZXJvLXBhcmEnKTtcbiAgcGFyYU9uZS50ZXh0Q29udGVudCA9ICcxMDowMGEgLSA5OjAwcCAvIE1vbiB0aHJ1IEZyaSc7XG5cbiAgY29uc3QgcGFyYVR3byA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgcGFyYVR3by5jbGFzc0xpc3QuYWRkKCdoZXJvLXBhcmEnKTtcbiAgcGFyYVR3by50ZXh0Q29udGVudCA9ICcxMDowMGEgLSAxMTowMHAgLyBTYXQgJiBTdW4nO1xuXG4gIGhlcm9JbmZvLmFwcGVuZENoaWxkKHBhcmFUaXRsZSk7XG4gIGhlcm9JbmZvLmFwcGVuZENoaWxkKHBhcmFPbmUpO1xuICBoZXJvSW5mby5hcHBlbmRDaGlsZChwYXJhVHdvKTtcbiAgaGVyby5hcHBlbmRDaGlsZChoZXJvSW5mbyk7XG5cbiAgZnVuY3Rpb24gY3JlYXRlSW1hZ2VTbGlkZShpbWFnZVNyYywgaW5kZXgpIHtcbiAgICBjb25zdCBJTUFHRV9DT1VOVCA9IDU7XG4gICAgY29uc3QgaW1hZ2VDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBpbWFnZUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdoZXJvLXNsaWRlJyk7XG5cbiAgICBjb25zdCB0ZXh0Q29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgIHRleHRDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnaGVyby1zbGlkZS10ZXh0Jyk7XG4gICAgdGV4dENvbnRhaW5lci50ZXh0Q29udGVudCA9IGAoJHtpbmRleH0gLyAke0lNQUdFX0NPVU5UfSlgO1xuXG4gICAgY29uc3QgaW1hZ2VPdmVybGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgaW1hZ2VPdmVybGF5LmNsYXNzTGlzdC5hZGQoJ2hlcm8tc2xpZGUtaW1hZ2UnKTtcblxuICAgIGNvbnN0IGltYWdlID0gbmV3IEltYWdlKCk7XG4gICAgaW1hZ2Uuc3JjID0gaW1hZ2VTcmM7XG4gICAgaW1hZ2UuaGVpZ2h0ID0gJzUwMCc7XG5cbiAgICBpbWFnZU92ZXJsYXkuYXBwZW5kQ2hpbGQoaW1hZ2UpO1xuXG4gICAgaW1hZ2VDb250YWluZXIuYXBwZW5kQ2hpbGQodGV4dENvbnRhaW5lcik7XG4gICAgaW1hZ2VDb250YWluZXIuYXBwZW5kQ2hpbGQoaW1hZ2VPdmVybGF5KTtcblxuICAgIHJldHVybiBpbWFnZUNvbnRhaW5lcjtcbiAgfVxuXG4gIGNvbnN0IGltYWdlR2FsbGVyeSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBpbWFnZUdhbGxlcnkuY2xhc3NMaXN0LmFkZCgnaGVyby1zbGlkZS1jb250YWluZXInKTtcblxuICBjb25zdCBpbWFnZU9uZSA9IGNyZWF0ZUltYWdlU2xpZGUoR2FsbGVyeU9uZSwgMSk7XG4gIGltYWdlT25lLmNsYXNzTGlzdC5hZGQoJ2hlcm8tc2xpZGUtYWN0aXZlJyk7XG5cbiAgY29uc3QgaW1hZ2VUd28gPSBjcmVhdGVJbWFnZVNsaWRlKEdhbGxlcnlUd28sIDIpO1xuICBjb25zdCBpbWFnZVRocmVlID0gY3JlYXRlSW1hZ2VTbGlkZShHYWxsZXJ5VGhyZWUsIDMpO1xuICBjb25zdCBpbWFnZUZvdXIgPSBjcmVhdGVJbWFnZVNsaWRlKEdhbGxlcnlGb3VyLCA0KTtcbiAgY29uc3QgaW1hZ2VGaXZlID0gY3JlYXRlSW1hZ2VTbGlkZShHYWxsZXJ5Rml2ZSwgNSk7XG5cbiAgaW1hZ2VHYWxsZXJ5LmFwcGVuZENoaWxkKGltYWdlT25lKTtcbiAgaW1hZ2VHYWxsZXJ5LmFwcGVuZENoaWxkKGltYWdlVHdvKTtcbiAgaW1hZ2VHYWxsZXJ5LmFwcGVuZENoaWxkKGltYWdlVGhyZWUpO1xuICBpbWFnZUdhbGxlcnkuYXBwZW5kQ2hpbGQoaW1hZ2VGb3VyKTtcbiAgaW1hZ2VHYWxsZXJ5LmFwcGVuZENoaWxkKGltYWdlRml2ZSk7XG4gIFxuICBmdW5jdGlvbiBtYW5hZ2VTbGlkZXMoZSkge1xuICAgIGNvbnN0IGFjdGl2ZUltYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZGl2Lmhlcm8tc2xpZGUtYWN0aXZlJyk7XG4gICAgbGV0IGluZGV4ID0gYWN0aXZlSW1hZ2UuZmlyc3RFbGVtZW50Q2hpbGQudGV4dENvbnRlbnRbMV07XG4gICAgY29uc3QgaW1hZ2VzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnaGVyby1zbGlkZScpO1xuXG4gICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnaGVyby1zbGlkZS1uZXh0JykpIHtcbiAgICAgIGZvciAobGV0IGkgPSBpbmRleC0xOyBpIDwgaW1hZ2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChpbWFnZXNbaV0gPT09IGFjdGl2ZUltYWdlKSB7XG4gICAgICAgICAgY29uc3QgbmV4dEltYWdlID0gKGltYWdlc1tpXS5uZXh0RWxlbWVudFNpYmxpbmcpO1xuICAgICAgICAgIGlmIChuZXh0SW1hZ2UudGFnTmFtZSA9PT0gJ0EnKSByZXR1cm47XG4gICAgICAgICAgaW1hZ2VzW2ldLm5leHRFbGVtZW50U2libGluZy5jbGFzc0xpc3QuYWRkKCdoZXJvLXNsaWRlLWFjdGl2ZScpO1xuICAgICAgICAgIGltYWdlc1tpXS5jbGFzc0xpc3QudG9nZ2xlKCdoZXJvLXNsaWRlLWFjdGl2ZScpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnaGVyby1zbGlkZS1wcmV2aW91cycpKSB7XG4gICAgICBmb3IgKGxldCBpID0gaW5kZXgtMTsgaSA8IGltYWdlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoaW1hZ2VzW2ldID09PSBhY3RpdmVJbWFnZSkge1xuICAgICAgICAgIGNvbnN0IHByZXZJbWFnZSA9IChpbWFnZXNbaV0ucHJldmlvdXNFbGVtZW50U2libGluZyk7XG4gICAgICAgICAgaWYgKCFwcmV2SW1hZ2UpIHJldHVybjtcbiAgICAgICAgICBpbWFnZXNbaV0ucHJldmlvdXNFbGVtZW50U2libGluZy5jbGFzc0xpc3QuYWRkKCdoZXJvLXNsaWRlLWFjdGl2ZScpO1xuICAgICAgICAgIGltYWdlc1tpXS5jbGFzc0xpc3QudG9nZ2xlKCdoZXJvLXNsaWRlLWFjdGl2ZScpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgY29uc3QgbmV4dEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgbmV4dEJ0bi5jbGFzc0xpc3QuYWRkKCdoZXJvLXNsaWRlLW5leHQnKTtcbiAgbmV4dEJ0bi5pbm5lckhUTUwgPSAnJiM4MjUwOyc7XG4gIG5leHRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBtYW5hZ2VTbGlkZXMpO1xuXG4gIGNvbnN0IHByZXZCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gIHByZXZCdG4uY2xhc3NMaXN0LmFkZCgnaGVyby1zbGlkZS1wcmV2aW91cycpO1xuICBwcmV2QnRuLmlubmVySFRNTCA9ICcmIzgyNDk7JztcbiAgcHJldkJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG1hbmFnZVNsaWRlcyk7XG5cbiAgaW1hZ2VHYWxsZXJ5LmFwcGVuZENoaWxkKHByZXZCdG4pO1xuICBpbWFnZUdhbGxlcnkuYXBwZW5kQ2hpbGQobmV4dEJ0bik7XG5cbiAgaGVyby5hcHBlbmRDaGlsZChpbWFnZUdhbGxlcnkpO1xuXG4gIHJldHVybiBoZXJvO1xufVxuXG5mdW5jdGlvbiBsb2FkSG9tZSgpIHtcbiAgY29uc3QgY29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wYWdlLWNvbnRlbnQnKTtcbiAgY29udGVudC50ZXh0Q29udGVudCA9ICcnO1xuXG4gIGNvbnN0IHRhYlN3aXRjaCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbi5hY3RpdmUnKTtcbiAgaWYgKHRhYlN3aXRjaCkgdGFiU3dpdGNoLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpO1xuXG4gIGNvbnN0IGFjdGl2ZVRhYiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdob21lLWJ0bicpO1xuICBhY3RpdmVUYWIuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG5cbiAgY29uc3QgaGVybyA9IGNyZWF0ZUhlcm9TZWN0aW9uKCk7XG5cbiAgY29udGVudC5hcHBlbmRDaGlsZChoZXJvKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgbG9hZEhvbWU7IiwiaW1wb3J0IEFwcGxlIGZyb20gJy4uL2Fzc2V0cy9hcHBsZS5wbmcnO1xuaW1wb3J0IEVuY2hhbnRlZEFwcGxlIGZyb20gJy4uL2Fzc2V0cy9lbmNoYW50ZWQtYXBwbGUucG5nJztcbmltcG9ydCBHb2xkZW5BcHBsZSBmcm9tICcuLi9hc3NldHMvZ29sZGVuLWFwcGxlLnBuZyc7XG5pbXBvcnQgQnJlYWQgZnJvbSAnLi4vYXNzZXRzL2JyZWFkLnBuZyc7XG5pbXBvcnQgQ29va2llIGZyb20gJy4uL2Fzc2V0cy9jb29raWUucG5nJztcbmltcG9ydCBTdGV3IGZyb20gJy4uL2Fzc2V0cy9zdGV3LnBuZyc7XG5pbXBvcnQgTXV0dG9uIGZyb20gJy4uL2Fzc2V0cy9tdXR0b24ucG5nJztcbmltcG9ydCBQb3JrY2hvcCBmcm9tICcuLi9hc3NldHMvcG9ya2Nob3AucG5nJztcbmltcG9ydCBSYWJiaXQgZnJvbSAnLi4vYXNzZXRzL3JhYmJpdC5wbmcnO1xuaW1wb3J0IFN0ZWFrIGZyb20gJy4uL2Fzc2V0cy9zdGVhay5wbmcnO1xuaW1wb3J0IENvZCBmcm9tICcuLi9hc3NldHMvY29kLnBuZyc7XG5pbXBvcnQgU2FsbW9uIGZyb20gJy4uL2Fzc2V0cy9zYWxtb24ucG5nJztcblxuZnVuY3Rpb24gY3JlYXRlTWVudVNlY3Rpb24oKSB7XG4gIGNvbnN0IGhlcm8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzZWN0aW9uJyk7XG4gIGhlcm8uY2xhc3NMaXN0LmFkZCgnaGVybycpO1xuXG4gIGNvbnN0IGhlcm9IZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgaGVyb0hlYWRlci5jbGFzc0xpc3QuYWRkKCdoZXJvLWhlYWQnKTtcblxuICBjb25zdCBoZXJvVGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMicpO1xuICBoZXJvVGl0bGUuY2xhc3NMaXN0LmFkZCgnc2VjdGlvbi10aXRsZScpO1xuICBoZXJvVGl0bGUudGV4dENvbnRlbnQgPSAnTWVudSc7XG4gIGhlcm9IZWFkZXIuYXBwZW5kQ2hpbGQoaGVyb1RpdGxlKTtcblxuICBjb25zdCBkaXZpZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaHInKTtcbiAgZGl2aWRlci5jbGFzc0xpc3QuYWRkKCdkaXZpZGVyJyk7XG4gIGhlcm9IZWFkZXIuYXBwZW5kQ2hpbGQoZGl2aWRlcik7XG5cbiAgaGVyby5hcHBlbmRDaGlsZChoZXJvSGVhZGVyKTtcblxuICBjb25zdCBtZW51Tm90aWNlQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIG1lbnVOb3RpY2VDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnbWVudS10ZXh0LWNvbnRhaW5lcicpO1xuXG4gIGNvbnN0IG1lbnVOb3RpY2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gIG1lbnVOb3RpY2UuY2xhc3NMaXN0LmFkZCgnbWVudS1ub3RpY2UnKTtcbiAgbWVudU5vdGljZS50ZXh0Q29udGVudCA9ICdQbGVhc2UgYmUgYWR2aXNlZCB0aGF0IGZvb2QgcHJlcGFyZWQgaGVyZSBtYXkgY29udGFpbiB0aGVzZSBpbmdyZWRpZW50czonXG5cbiAgY29uc3QgbWVudU5vdGljZUl0ZW1zID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICBtZW51Tm90aWNlSXRlbXMuY2xhc3NMaXN0LmFkZCgnbWVudS13YXJuaW5nJyk7XG4gIG1lbnVOb3RpY2VJdGVtcy50ZXh0Q29udGVudCA9ICdtaWxrLCBlZ2dzLCB3aGVhdCwgc295YmVhbiwgcGVhbnV0cywgdHJlZSBudXRzLCBmaXNoLCBhbmQgc2hlbGxmaXNoJztcblxuICBtZW51Tm90aWNlQ29udGFpbmVyLmFwcGVuZENoaWxkKG1lbnVOb3RpY2UpO1xuICBtZW51Tm90aWNlQ29udGFpbmVyLmFwcGVuZENoaWxkKG1lbnVOb3RpY2VJdGVtcyk7XG4gIGhlcm8uYXBwZW5kQ2hpbGQobWVudU5vdGljZUNvbnRhaW5lcik7XG5cbiAgY29uc3QgY2FyZENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBjYXJkQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2hlcm8tbWVudScpO1xuICBoZXJvLmFwcGVuZENoaWxkKGNhcmRDb250YWluZXIpO1xuXG4gIGZ1bmN0aW9uIG1ha2VOZXdDYXJkKHNvdXJjZSwgdGl0bGUsIHByaWNlLCBkZXNjcmlwdGlvbikge1xuICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdtZW51LWNhcmQnKTtcblxuICAgIGNvbnN0IGxlZnRDYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgbGVmdENhcmQuY2xhc3NMaXN0LmFkZCgnY2FyZC1sZWZ0Jyk7XG5cbiAgICBjb25zdCByaWdodENhcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICByaWdodENhcmQuY2xhc3NMaXN0LmFkZCgnY2FyZC1yaWdodCcpO1xuXG4gICAgY29uc3QgZm9vZFRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDQnKTtcbiAgICBmb29kVGl0bGUudGV4dENvbnRlbnQgPSB0aXRsZTtcbiAgICBsZWZ0Q2FyZC5hcHBlbmRDaGlsZChmb29kVGl0bGUpO1xuICAgIFxuICAgIGNvbnN0IHByaWNlVGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoNCcpO1xuICAgIHByaWNlVGl0bGUudGV4dENvbnRlbnQgPSBgUHJpY2U6ICR7cHJpY2V9YDtcbiAgICByaWdodENhcmQuYXBwZW5kQ2hpbGQocHJpY2VUaXRsZSlcblxuICAgIGNvbnN0IG5ld0ltYWdlID0gbmV3IEltYWdlKCk7XG4gICAgbmV3SW1hZ2Uuc3JjID0gc291cmNlO1xuICAgIG5ld0ltYWdlLmhlaWdodCA9IDM1O1xuICAgIGxlZnRDYXJkLmFwcGVuZENoaWxkKG5ld0ltYWdlKTtcblxuICAgIGNvbnN0IGZvb2REZXNjcmlwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICBmb29kRGVzY3JpcHRpb24uY2xhc3NMaXN0LmFkZCgnbWVudS1kZXNjcmlwdGlvbicpO1xuICAgIGZvb2REZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9IGRlc2NyaXB0aW9uO1xuICAgIHJpZ2h0Q2FyZC5hcHBlbmRDaGlsZChmb29kRGVzY3JpcHRpb24pO1xuXG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGxlZnRDYXJkKTtcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQocmlnaHRDYXJkKTtcblxuICAgIHJldHVybiBjb250YWluZXI7XG4gIH1cblxuICBjb25zdCBhcHBsZSA9IG1ha2VOZXdDYXJkKEFwcGxlLCBcIkFwcGxlXCIsIFwiJDAuNzVcIiwgXCJWYXJpZXRpZXMgYXZhaWxhYmxlOiBHYWxhLCBGdWppLCBHb2xkZW4gRGVsaWNpb3VzLCBIb25leWNyaXNwLCBHcmFubnkgU21pdGgsIEJyYWVidXJuICYgTWNJbnRvc2hcIik7XG4gIGNhcmRDb250YWluZXIuYXBwZW5kQ2hpbGQoYXBwbGUpO1xuXG4gIGNvbnN0IGdvbGRlbkFwcGxlID0gbWFrZU5ld0NhcmQoR29sZGVuQXBwbGUsIFwiR29sZGVuIEFwcGxlXCIsIFwiJDkuOTlcIiwgXCJUaGUgYmVzdCBpbmRpdmlkdWFsIGFwcGxlcyBvZiBvdXIgaGFydmVzdHMsIG1ldGljdWxvdXNseSBzaHJvdWRlZCBpbiAxNEsgZWRpYmxlIGdvbGRcIik7XG4gIGNhcmRDb250YWluZXIuYXBwZW5kQ2hpbGQoZ29sZGVuQXBwbGUpO1xuXG4gIGNvbnN0IGVuY2hhbnRlZEFwcGxlID0gbWFrZU5ld0NhcmQoRW5jaGFudGVkQXBwbGUsIFwiRW5jaGFudGVkIEFwcGxlXCIsIFwiJDE5Ljk5XCIsIFwiW05PVElDRTogV0FJVkVSIE1VU1QgQkUgU0lHTkVEIFBSSU9SIFRPIFBVUkNIQVNFL0NPTlNVTVBUSU9OXVwiKTtcbiAgY2FyZENvbnRhaW5lci5hcHBlbmRDaGlsZChlbmNoYW50ZWRBcHBsZSk7XG5cbiAgY29uc3QgYnJlYWQgPSBtYWtlTmV3Q2FyZChCcmVhZCwgXCJCcmVhZFwiLCBcIiQyLjk5XCIsIFwiQSBmaW5lbHkgYmFrZWQgKGRhcmUgSSBzYXkgb25lIG9mIHRoZSBmaW5lc3QgYmFrZWQpIGxvYXZlcyBvZiBicmVhZCBpbiBhbGwgb2YgdGhlIHdvcmxkXCIpO1xuICBjYXJkQ29udGFpbmVyLmFwcGVuZENoaWxkKGJyZWFkKTtcblxuICBjb25zdCBjb29raWUgPSBtYWtlTmV3Q2FyZChDb29raWUsIFwiQ29va2llXCIsIFwiJDAuOTlcIiwgXCJUaGUga2luZCB0aGF0IG1ha2VzIHlvdSB0aGluayBvZiB5b3VyIG1vbSdzIGJha2VkIGdvb2RzXCIpO1xuICBjYXJkQ29udGFpbmVyLmFwcGVuZENoaWxkKGNvb2tpZSk7XG5cbiAgY29uc3Qgc3RldyA9IG1ha2VOZXdDYXJkKFN0ZXcsIFwiTXVzaHJvb20gU3Rld1wiLCBcIiQ3Ljk5XCIsIFwiRGVsaWNpb3VzIGJsZW5kIG9mIG95c3RlciwgcG9ydGFiZWxsbywgc2hpaXRha2UsIGNyZW1pbmksIHBvcmNpbmkgJiBsaW9uJ3MgbWFuZSBpbiBhIGhlYXJ0eSBzdGV3XCIpO1xuICBjYXJkQ29udGFpbmVyLmFwcGVuZENoaWxkKHN0ZXcpO1xuXG4gIGNvbnN0IG11dHRvbiA9IG1ha2VOZXdDYXJkKE11dHRvbiwgXCJNdXR0b25cIiwgXCIkMTkuOTlcIiwgXCJDdXQgb2YgZnJlZS1yYW5nZSwgZ3Jhc3MgZmVkIGFkdWx0IGxhbWIsIGdyaWxsZWQgdG8geW91ciBwcmVmZXJyZWQgaW50ZXJuYWwgdGVtcGVyYXR1cmUgKERlZmF1bHQ6IE1lZGl1bSBSYXJlKVwiKTtcbiAgY2FyZENvbnRhaW5lci5hcHBlbmRDaGlsZChtdXR0b24pO1xuXG4gIGNvbnN0IHBvcmtjaG9wID0gbWFrZU5ld0NhcmQoUG9ya2Nob3AsIFwiUG9ya2Nob3BcIiwgXCIkMTguOTlcIiwgXCJDdXQgb2YgZnJlZS1yYW5nZSwgZ3Jhc3MgZmVkIHBvcmssIGdyaWxsZWQgdG8geW91ciBwcmVmZXJyZWQgaW50ZXJuYWwgdGVtcGVyYXR1cmUgKERlZmF1bHQ6IE1lZGl1bSBSYXJlKVwiKTtcbiAgY2FyZENvbnRhaW5lci5hcHBlbmRDaGlsZChwb3JrY2hvcCk7XG5cbiAgY29uc3QgcmFiYml0ID0gbWFrZU5ld0NhcmQoUmFiYml0LCBcIlJhYmJpdFwiLCBcIiQyMS45OVwiLCBcIkN1dCBvZiBmcmVlLXJhbmdlLCBncmFzcyBmZWQgcmFiYml0LCBncmlsbGVkIHRvIHlvdXIgcHJlZmVycmVkIGludGVybmFsIHRlbXBlcmF0dXJlIChEZWZhdWx0OiBNZWRpdW0gUmFyZSlcIik7XG4gIGNhcmRDb250YWluZXIuYXBwZW5kQ2hpbGQocmFiYml0KTtcblxuICBjb25zdCBzdGVhayA9IG1ha2VOZXdDYXJkKFN0ZWFrLCBcIlN0ZWFrXCIsIFwiJDI0Ljk5XCIsIFwiQ3V0IG9mIGZyZWUtcmFuZ2UsIGdyYXNzIGZlZCBiZWVmLCBncmlsbGVkIHRvIHlvdXIgcHJlZmVycmVkIGludGVybmFsIHRlbXBlcmF0dXJlIChEZWZhdWx0OiBNZWRpdW0gUmFyZSlcIik7XG4gIGNhcmRDb250YWluZXIuYXBwZW5kQ2hpbGQoc3RlYWspO1xuXG4gIGNvbnN0IGNvZCA9IG1ha2VOZXdDYXJkKENvZCwgXCJDb2RcIiwgXCIkMTYuOTlcIiwgXCJGcmVzaCBkYWlseSwgd2lsZCBjb2QgZmlsZXQgc2VydmVkIHdpdGggbGVtb24gYW5kIGJ1dHRlclwiKTtcbiAgY2FyZENvbnRhaW5lci5hcHBlbmRDaGlsZChjb2QpO1xuXG4gIGNvbnN0IHNhbG1vbiA9IG1ha2VOZXdDYXJkKFNhbG1vbiwgXCJTYWxtb25cIiwgXCIkMTkuOTlcIiwgXCJGcmVzaCBkYWlseSwgd2lsZCBzYWxtb24gZmlsZXQgc2VydmVkIHdpdGggbGVtb24gYW5kIGJ1dHRlclwiKTtcbiAgY2FyZENvbnRhaW5lci5hcHBlbmRDaGlsZChzYWxtb24pO1xuXG4gIHJldHVybiBoZXJvO1xufVxuXG5mdW5jdGlvbiBsb2FkTWVudSgpIHtcbiAgY29uc3QgY29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wYWdlLWNvbnRlbnQnKTtcbiAgY29udGVudC50ZXh0Q29udGVudCA9ICcnO1xuXG4gIGNvbnN0IHRhYlN3aXRjaCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbi5hY3RpdmUnKTtcbiAgaWYgKHRhYlN3aXRjaCkgdGFiU3dpdGNoLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpO1xuXG4gIGNvbnN0IGFjdGl2ZVRhYiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtZW51LWJ0bicpO1xuICBhY3RpdmVUYWIuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG5cbiAgY29uc3QgaGVybyA9IGNyZWF0ZU1lbnVTZWN0aW9uKCk7XG5cbiAgY29udGVudC5hcHBlbmRDaGlsZChoZXJvKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgbG9hZE1lbnU7IiwiaW1wb3J0IGZvb3RMb2dvIGZyb20gJy4vYXNzZXRzL2dpdGh1Yi1tYXJrLnBuZyc7XG5cbi8vIEhlbHBlciAtIGdlbmVyYXRlIGhlYWRlclxuZnVuY3Rpb24gY3JlYXRlSGVhZChoZWFkQ2xhc3MsIGxvZ29UZXh0KSB7XG4gIGNvbnN0IGhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2hlYWRlcicpO1xuICBoZWFkZXIuY2xhc3NMaXN0LmFkZChoZWFkQ2xhc3MpO1xuICBjb25zdCBsb2dvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDEnKTtcbiAgbG9nby50ZXh0Q29udGVudCA9IGxvZ29UZXh0O1xuICBoZWFkZXIuYXBwZW5kQ2hpbGQobG9nbyk7XG4gIFxuICBjb25zdCBuYXYgPSBjcmVhdGVOYXYoJ25hdicpO1xuICBoZWFkZXIuYXBwZW5kQ2hpbGQobmF2KTtcbiAgcmV0dXJuIGhlYWRlcjtcbn1cblxuLy8gSGVscGVyIC0gZ2VuZXJhdGUgYnV0dG9ucyAoZm9yIG5hdmJhcilcbmZ1bmN0aW9uIGNyZWF0ZUJ0bihpZCwgYnRuVGV4dCkge1xuICBjb25zdCBidG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgYnRuLmlkID0gaWQ7XG4gIGJ0bi50ZXh0Q29udGVudCA9IGJ0blRleHQ7XG4gIHJldHVybiBidG47XG59XG5cbi8vIEhlbHBlciAtIGdlbmVyYXRlIG5hdiBsaW5rcyAoZm9yIGhlYWRlcilcbmZ1bmN0aW9uIGNyZWF0ZU5hdihuYXZDbGFzcykge1xuICBjb25zdCBuYXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCduYXYnKTtcbiAgbmF2LmNsYXNzTGlzdC5hZGQobmF2Q2xhc3MpO1xuXG4gIGNvbnN0IGhvbWVCdG4gPSBjcmVhdGVCdG4oJ2hvbWUtYnRuJywgJ0hvbWUnKTtcbiAgY29uc3QgbWVudUJ0biA9IGNyZWF0ZUJ0bignbWVudS1idG4nLCAnTWVudScpO1xuICBjb25zdCBjb250YWN0QnRuID0gY3JlYXRlQnRuKCdjb250YWN0LWJ0bicsICdDb250YWN0Jyk7XG5cbiAgbmF2LmFwcGVuZENoaWxkKGhvbWVCdG4pO1xuICBuYXYuYXBwZW5kQ2hpbGQobWVudUJ0bik7XG4gIG5hdi5hcHBlbmRDaGlsZChjb250YWN0QnRuKTtcbiAgcmV0dXJuIG5hdjtcbn1cblxuLy8gSGVscGVyIC0gZ2VuZXJhdGUgbWFpbiBjb250ZW50XG5mdW5jdGlvbiBjcmVhdGVNYWluKG1haW5DbGFzcykge1xuICBjb25zdCBtYWluID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbWFpbicpO1xuICBtYWluLmNsYXNzTGlzdC5hZGQobWFpbkNsYXNzKTtcbiAgcmV0dXJuIG1haW47XG59XG5cbi8vIEhlbHBlciAtIGdlbmVyYXRlIGZvb3RlclxuZnVuY3Rpb24gY3JlYXRlRm9vdChmb290Q2xhc3MpIHtcbiAgY29uc3QgZm9vdGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZm9vdGVyJyk7XG4gIGZvb3Rlci5jbGFzc0xpc3QuYWRkKGZvb3RDbGFzcyk7XG5cbiAgY29uc3Qgc291cmNlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICBzb3VyY2UuY2xhc3NMaXN0LmFkZCgnZm9vdGVyLXNvdXJjZScpO1xuICBzb3VyY2UuaHJlZiA9ICdodHRwczovL2dpdGh1Yi5jb20vc29ycnJiJztcblxuICBjb25zdCBnaXRIdWJMaW5rID0gbmV3IEltYWdlKCk7XG4gIGdpdEh1Ykxpbmsuc3JjID0gZm9vdExvZ287XG4gIGdpdEh1YkxpbmsuY2xhc3NMaXN0LmFkZCgnZm9vdGVyLWxvZ28nKVxuICBzb3VyY2UuYXBwZW5kQ2hpbGQoZ2l0SHViTGluayk7XG5cbiAgY29uc3QgZm9vdGVyVGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgZm9vdGVyVGV4dC5jbGFzc0xpc3QuYWRkKCdmb290LXRleHQnKTtcbiAgZm9vdGVyVGV4dC50ZXh0Q29udGVudCA9ICdzb3JycmInO1xuICBzb3VyY2UuYXBwZW5kQ2hpbGQoZm9vdGVyVGV4dCk7XG5cbiAgZm9vdGVyLmFwcGVuZENoaWxkKHNvdXJjZSk7XG4gIHJldHVybiBmb290ZXI7XG59XG5cbi8vIE1vZHVsZSAtIGdlbmVyYXRlIHBhZ2UgY29udGVudCB1c2luZyBoZWxwZXJzXG5mdW5jdGlvbiBsb2FkUGFnZSgpIHtcbiAgY29uc3QgY29udGVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250ZW50Jyk7XG5cbiAgY29uc3QgaGVhZGVyID0gY3JlYXRlSGVhZCgnaGVhZGVyJywgJ1lvdXJzICYgTWluZTogQ3JhZnQgQ3Vpc2luZScpO1xuICBjb250ZW50LmFwcGVuZENoaWxkKGhlYWRlcik7XG5cbiAgY29uc3QgbWFpbiA9IGNyZWF0ZU1haW4oJ3BhZ2UtY29udGVudCcpO1xuICBjb250ZW50LmFwcGVuZENoaWxkKG1haW4pO1xuXG4gIGNvbnN0IGZvb3RlciA9IGNyZWF0ZUZvb3QoJ2Zvb3RlcicpO1xuICBjb250ZW50LmFwcGVuZENoaWxkKGZvb3Rlcik7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGxvYWRQYWdlOyIsIid1c2Ugc3RyaWN0JztcblxudmFyIHBvc3NpYmxlTmFtZXMgPSBbXG5cdCdCaWdJbnQ2NEFycmF5Jyxcblx0J0JpZ1VpbnQ2NEFycmF5Jyxcblx0J0Zsb2F0MzJBcnJheScsXG5cdCdGbG9hdDY0QXJyYXknLFxuXHQnSW50MTZBcnJheScsXG5cdCdJbnQzMkFycmF5Jyxcblx0J0ludDhBcnJheScsXG5cdCdVaW50MTZBcnJheScsXG5cdCdVaW50MzJBcnJheScsXG5cdCdVaW50OEFycmF5Jyxcblx0J1VpbnQ4Q2xhbXBlZEFycmF5J1xuXTtcblxudmFyIGcgPSB0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ3VuZGVmaW5lZCcgPyBnbG9iYWwgOiBnbG9iYWxUaGlzO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGF2YWlsYWJsZVR5cGVkQXJyYXlzKCkge1xuXHR2YXIgb3V0ID0gW107XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgcG9zc2libGVOYW1lcy5sZW5ndGg7IGkrKykge1xuXHRcdGlmICh0eXBlb2YgZ1twb3NzaWJsZU5hbWVzW2ldXSA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0b3V0W291dC5sZW5ndGhdID0gcG9zc2libGVOYW1lc1tpXTtcblx0XHR9XG5cdH1cblx0cmV0dXJuIG91dDtcbn07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=