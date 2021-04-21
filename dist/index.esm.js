import React, { useState, useEffect } from 'react';
import JIMP from 'jimp';

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]);

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var Jimage = function Jimage(props) {
  var options = props;
  var src = options.src,
      alt = options.alt,
      width = options.width,
      height = options.height,
      style = options.style,
      className = options.className,
      loadBlur = options.loadBlur;

  var _useState = useState(src),
      _useState2 = _slicedToArray(_useState, 2),
      image = _useState2[0],
      setImage = _useState2[1];

  var _useState3 = useState(true),
      _useState4 = _slicedToArray(_useState3, 2),
      loading = _useState4[0],
      setLoading = _useState4[1];

  useEffect(function () {
    function imgEffect() {
      return _imgEffect.apply(this, arguments);
    }

    function _imgEffect() {
      _imgEffect = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var loadImage, option, IMG_PARAMS, GET_PARAMS, BOOL_PARAMS, PARAMS_ARR, FLOAT_PARAMS, mime;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return JIMP.read(src);

              case 2:
                loadImage = _context.sent;
                _context.t0 = regeneratorRuntime.keys(options);

              case 4:
                if ((_context.t1 = _context.t0()).done) {
                  _context.next = 12;
                  break;
                }

                option = _context.t1.value;

                if (!(typeof loadImage[option] !== 'function')) {
                  _context.next = 8;
                  break;
                }

                return _context.abrupt("continue", 4);

              case 8:
                IMG_PARAMS = options[option];

                if (typeof IMG_PARAMS === 'boolean') {
                  // Perform if boolean true
                  if (IMG_PARAMS === true) loadImage[option]();
                } else if (IMG_PARAMS.includes('true')) {
                  // Get parameters as boolean
                  GET_PARAMS = IMG_PARAMS.split(',');
                  BOOL_PARAMS = GET_PARAMS.map(function (bool) {
                    return bool.includes('true');
                  });
                  loadImage[option].apply(loadImage, _toConsumableArray(BOOL_PARAMS));
                } else if (option === 'color') {
                  // Color manipulation
                  loadImage.color(options[option]);
                } else {
                  // Take parameters and convert to int
                  PARAMS_ARR = IMG_PARAMS.split(',');
                  FLOAT_PARAMS = PARAMS_ARR.map(function (opt) {
                    return parseFloat(opt);
                  }); // Perform method

                  loadImage[option].apply(loadImage, _toConsumableArray(FLOAT_PARAMS));
                }

                _context.next = 4;
                break;

              case 12:
                _context.next = 14;
                return loadImage.getBase64Async(JIMP.MIME_JPEG);

              case 14:
                mime = _context.sent;
                setLoading(false);
                setImage(mime);

              case 17:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));
      return _imgEffect.apply(this, arguments);
    }

    imgEffect();
    return function () {
      return setLoading(true);
    };
  }, [src, options]);
  return /*#__PURE__*/React.createElement("img", {
    className: className && className,
    alt: alt && alt,
    src: image,
    width: width && width,
    height: height && height,
    style: loading && loadBlur ? {
      filter: 'blur(3px)'
    } : style
  });
};

export { Jimage };
