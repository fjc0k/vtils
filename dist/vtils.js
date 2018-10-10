/*!
 * vtils v0.2.2
 * (c) 2018-present Jay Fong <fjc0kb@gmail.com> (https://github.com/fjc0k)
 * Released under the MIT License.
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (factory((global.vtils = {})));
}(this, (function (exports) { 'use strict';

    function base64Decode(str) {
        return decodeURIComponent(atob(str)
            .split('')
            .map(function (c) { return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2); })
            .join(''));
    }

    function base64Encode(str) {
        return btoa(encodeURIComponent(str)
            .replace(/%([0-9A-F]{2})/g, function toSolidBytes(match, p1) {
            return String.fromCharCode("0x" + p1);
        }));
    }

    function repeat(str, n) {
        if (n === void 0) { n = 1; }
        var result = '';
        while (n-- > 0) {
            result += str;
        }
        return result;
    }

    function base64UrlDecode(str) {
        var remainder = str.length % 4;
        if (str !== '' && remainder > 0) {
            str += repeat('=', 4 - remainder);
        }
        return base64Decode(str.replace(/-/g, '+').replace(/_/g, '/'));
    }

    function base64UrlEncode(str) {
        return base64Encode(str)
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=+$/, '');
    }

    function bindEvent(target, types, listener, options) {
        var disposes = [];
        (Array.isArray(types) ? types : types.split(/\s+/)).forEach(function (eventType) {
            target.addEventListener(eventType, listener, options);
            disposes.push(function () { return target.removeEventListener(eventType, listener, options); });
        });
        return function () { return disposes.forEach(function (dispose) { return dispose(); }); };
    }

    function castArray(value) {
        return Array.isArray(value) ? value : [value];
    }

    function clamp(value, min, max) {
        return value <= min ? min
            : value >= max ? max
                : value;
    }

    var Disposer = (function () {
        function Disposer() {
            this.jar = Object.create(null);
        }
        Disposer.prototype.add = function (name, dispose) {
            dispose = Array.isArray(dispose) ? dispose : [dispose];
            this.jar[name] = (this.jar[name] || []).concat(dispose);
        };
        Disposer.prototype.dispose = function (name) {
            (this.jar[name] || []).forEach(function (dispose) { return dispose(); });
            delete this.jar[name];
        };
        Disposer.prototype.disposeAll = function () {
            for (var key in this.jar) {
                this.dispose(key);
            }
        };
        return Disposer;
    }());

    var inBrowser = typeof window === 'object'
        && typeof document === 'object'
        && document.nodeType === 9;

    function isFunction(value) {
        return typeof value === 'function';
    }

    function noop() { }

    function reduce(data, fn, accumulator) {
        if (Array.isArray(data)) {
            return data.reduce(fn, accumulator);
        }
        else {
            return Object.keys(data).reduce(function (localAccumulator, key) {
                return fn(localAccumulator, data[key], key);
            }, accumulator);
        }
    }

    exports.base64Decode = base64Decode;
    exports.base64Encode = base64Encode;
    exports.base64UrlDecode = base64UrlDecode;
    exports.base64UrlEncode = base64UrlEncode;
    exports.bindEvent = bindEvent;
    exports.castArray = castArray;
    exports.clamp = clamp;
    exports.Disposer = Disposer;
    exports.inBrowser = inBrowser;
    exports.isFunction = isFunction;
    exports.noop = noop;
    exports.reduce = reduce;
    exports.repeat = repeat;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
