/*!
 * vtils v0.0.1
 * (c) 2018-present Jay Fong <fjc0kb@gmail.com> (https://github.com/fjc0k)
 * Released under the MIT License.
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

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

exports.bindEvent = bindEvent;
exports.castArray = castArray;
exports.clamp = clamp;
exports.Disposer = Disposer;
exports.inBrowser = inBrowser;
exports.noop = noop;
exports.reduce = reduce;
