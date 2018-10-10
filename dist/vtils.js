/*!
 * vtils v0.4.0
 * (c) 2018-present Jay Fong <fjc0kb@gmail.com> (https://github.com/fjc0k)
 * Released under the MIT License.
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (factory((global.vtils = {})));
}(this, (function (exports) { 'use strict';

    /**
     * 返回 base64 解码后的字符串。
     *
     * @param str 要解码的字符串
     * @returns 解码后的字符串
     * @see https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding#The_Unicode_Problem#Solution_1_%E2%80%93_escaping_the_string_before_encoding_it
     */
    function base64Decode(str) {
        return decodeURIComponent(atob(str)
            .split('')
            .map(function (c) { return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2); }) // tslint:disable-line
            .join(''));
    }

    /**
     * 返回 base64 编码后的字符串。
     *
     * @param str 要编码的字符串
     * @returns 编码后的字符串
     * @see https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding#The_Unicode_Problem#Solution_1_%E2%80%93_escaping_the_string_before_encoding_it
     */
    function base64Encode(str) {
        return btoa(encodeURIComponent(str)
            .replace(/%([0-9A-F]{2})/g, function toSolidBytes(match, p1) {
            return String.fromCharCode("0x" + p1);
        }));
    }

    /**
     * 重复 N 次给定字符串。
     *
     * @param str 要重复的字符串
     * @param [n=1] 重复的次数
     * @returns 结果字符串
     */
    function repeat(str, n) {
        if (n === void 0) { n = 1; }
        var result = '';
        while (n-- > 0) {
            result += str;
        }
        return result;
    }

    /**
     * 返回 base64url 解码后的字符串。
     *
     * @param str 要解码的字符串
     * @returns 解码后的字符串
     * @see http://www.ietf.org/rfc/rfc4648.txt
     */
    function base64UrlDecode(str) {
        var remainder = str.length % 4;
        if (str !== '' && remainder > 0) {
            str += repeat('=', 4 - remainder);
        }
        return base64Decode(str.replace(/-/g, '+').replace(/_/g, '/'));
    }

    /**
     * 返回 base64url 编码后的字符串。
     *
     * @param str 要编码的字符串
     * @returns 编码后的字符串
     * @see http://www.ietf.org/rfc/rfc4648.txt
     */
    function base64UrlEncode(str) {
        return base64Encode(str)
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=+$/, '');
    }

    /**
     * 将指定类型的事件绑定在指定的目标上并返回解绑函数。
     *
     * @param target 事件目标
     * @param types 事件类型
     * @param listener 事件监听器
     * @param [options] 事件选项
     */
    function bindEvent(target, types, listener, options) {
        var disposes = [];
        (Array.isArray(types) ? types : types.split(/\s+/)).forEach(function (eventType) {
            target.addEventListener(eventType, listener, options);
            disposes.push(function () { return target.removeEventListener(eventType, listener, options); });
        });
        return function () { return disposes.forEach(function (dispose) { return dispose(); }); };
    }

    /**
     * 如果 value 不是数组，那么强制转为数组。
     *
     * @param value 要处理的值
     * @returns 转换后的数组
     */
    function castArray(value) {
        return Array.isArray(value) ? value : [value];
    }

    /**
     * 返回限制在最小值和最大值之间的值。
     *
     * @param value 被限制的值
     * @param min 最小值
     * @param max 最大值
     * @returns 结果值
     */
    function clamp(value, min, max) {
        return value <= min ? min
            : value >= max ? max
                : value;
    }

    /**
     * 处置器。
     */
    var Disposer = /** @class */ (function () {
        function Disposer() {
            /**
             * 待处置项目存放容器。
             *
             * @private
             */
            this.jar = Object.create(null);
        }
        /**
         * 将待处置项目加入容器。
         *
         * @param name 待处置项目名称
         * @param dispose 处置行为
         */
        Disposer.prototype.add = function (name, dispose) {
            dispose = Array.isArray(dispose) ? dispose : [dispose];
            this.jar[name] = (this.jar[name] || []).concat(dispose);
        };
        /**
         * 处置项目。
         *
         * @param name 欲处置项目名称
         */
        Disposer.prototype.dispose = function (name) {
            (this.jar[name] || []).forEach(function (dispose) { return dispose(); });
            delete this.jar[name];
        };
        /**
         * 处置所有未处置项目。
         */
        Disposer.prototype.disposeAll = function () {
            for (var key in this.jar) {
                this.dispose(key);
            }
        };
        return Disposer;
    }());

    /**
     * 是否在浏览器环境中。
     */
    var inBrowser = typeof window === 'object'
        && typeof document === 'object'
        && document.nodeType === 9;

    /**
     * 检查 value 是否是一个函数。
     *
     * @param value 要检查的值
     * @returns 是（true）或者不是（false）一个函数
     */
    function isFunction(value) {
        return typeof value === 'function';
    }

    /**
     * 检查 value 是否是 null 或 undefined。
     *
     * @param value 要检查的值
     * @returns 是（true）或否（false）
     */
    function isNil(value) {
        return value == null;
    }

    /**
     * 无操作函数。
     */
    function noop() { } // tslint:disable-line

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
    exports.isNil = isNil;
    exports.noop = noop;
    exports.reduce = reduce;
    exports.repeat = repeat;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
