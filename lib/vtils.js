/*!
 * vtils v0.13.2
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
     * CSS 变换。
     *
     * @param el 要变换的元素
     * @param transformRule 变换规则
     * @param transitionRule 过渡规则
     */
    function cssTransform(el, transformRule, transitionRule) {
        el.style.webkitTransform = transformRule;
        el.style.transform = transformRule;
        el.style.webkitTransition = "-webkit-transform " + transitionRule;
        el.style.transition = "transform " + transitionRule;
    }
    /**
     * 停止 CSS 变换。
     *
     * @param el 要停止变换的元素
     */
    function stop(el) {
        el.style.webkitTransition = 'none';
        el.style.transition = 'none';
    }
    cssTransform.stop = stop;

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
            (this.jar[name] || /* istanbul ignore next */ []).forEach(function (dispose) { return dispose(); });
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
     * 遍历对象的可枚举属性。若回调函数返回 false，遍历会提前退出。
     *
     * @param obj 要遍历的对象
     * @param callback 回调函数
     */
    function forOwn(obj, callback) {
        for (var key in obj) {
            /* istanbul ignore else */
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                if (callback(obj[key], key, obj) === false) {
                    break;
                }
            }
        }
    }

    /**
     * 检测 value 值的类型。
     *
     * @export
     * @param value 要检测的值
     * @returns 检测值的类型
     */
    function getType(value) {
        return Object.prototype.toString.call(value).slice(8, -1);
    }

    /**
     * 检查 value 是否是一个函数。
     *
     * @param value 要检查的值
     * @returns 是（true）或者不是（false）一个函数
     */
    function isFunction(value) {
        return typeof value === 'function';
    }

    var isInBrowser;
    /**
     * 检查是否在浏览器环境中。
     *
     * @param [callback] 在浏览器环境中执行的回调
     * @returns 是（true）或否（false）
     */
    function inBrowser(callback) {
        if (isInBrowser === undefined) {
            isInBrowser = typeof window === 'object'
                && typeof document === 'object'
                && document.nodeType === 9;
        }
        if (isInBrowser && isFunction(callback)) {
            callback();
        }
        return isInBrowser;
    }

    /**
     * 检查 value 是否是一个数组。
     *
     * @param value 要检查的值
     * @returns 是（true）或否（false）
     */
    function isArray(value) {
        return Array.isArray(value);
    }

    /**
     * 检查 value 是否是一个布尔值。
     *
     * @param value 要检查的值
     * @returns 是（true）或否（false）
     */
    function isBoolean(value) {
        return typeof value === 'boolean';
    }

    /**
     * 检查 value 是否是一个日期。
     *
     * @param value 要检查的值
     * @returns 是（true）或否（false）
     */
    function isDate(value) {
        return getType(value) === 'Date';
    }

    /**
     * 检查给定的数组是否相等。
     *
     * @param arr1 数组1
     * @param arr2 数组2
     * @returns 是（true）或否（false）
     */
    function isEqualArray(arr1, arr2) {
        if (!Array.isArray(arr1) || !Array.isArray(arr2)) {
            return false;
        }
        if (arr1.length !== arr2.length) {
            return false;
        }
        for (var i = 0, len = arr1.length; i < len; i++) {
            if (arr1[i] !== arr2[i]) {
                return false;
            }
        }
        return true;
    }

    /**
     * 检查 value 是否是原始有限数值。
     *
     * @param value 要检查的值
     * @returns 是（true）或否（false）
     */
    function isFinite(value) {
        return Number.isFinite(value);
    }

    /**
     * 检查 value 是否是一个整数。
     *
     * @param value 要检查的值
     * @returns 是（true）或否（false）
     */
    function isInteger(value) {
        return Number.isInteger(value);
    }

    /**
     * 检查 value 是否是 NaN。
     *
     * @param value 要检查的值
     * @returns 是（true）或否（false）
     */
    function isNaN(value) {
        return value !== value;
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
     * 检查 value 是否等于 null。
     *
     * @param value 要检查的值
     * @returns 是（true）或否（false）
     */
    function isNull(value) {
        return value === null;
    }

    /**
     * 检查 value 是否是一个数值。
     *
     * @param value 要检查的值
     * @returns 是（true）或否（false）
     */
    function isNumber(value) {
        return typeof value === 'number';
    }

    /**
     * 检查 value 是否是一个对象。
     *
     * @param value 要检查的值
     * @returns 是（true）或否（false）
     */
    function isObject(value) {
        var type = typeof value;
        return value != null && (type === 'object' || type === 'function');
    }

    /**
     * 检查 value 是否是一个普通对象。
     *
     * @param value 要检查的值
     * @returns 是（true）或否（false）
     */
    function isPlainObject(value) {
        if (!value || typeof value !== 'object') {
            return false;
        }
        var proto = Object.getPrototypeOf(value);
        if (proto === null) {
            return true;
        }
        var Ctor = proto.constructor;
        return typeof Ctor === 'function' && Ctor instanceof Ctor;
    }

    /**
     * 检查 value 是否是一个正则表达式。
     *
     * @param value 要检查的值
     * @returns 是（true）或否（false）
     */
    function isRegExp(value) {
        return getType(value) === 'RegExp';
    }

    /**
     * 检查 value 是否是一个字符串。
     *
     * @param value 要检查的值
     * @returns 是（true）或否（false）
     */
    function isString(value) {
        return typeof value === 'string';
    }

    /**
     * 检查 value 是否等于 undefined。
     *
     * @param value 要检查的值
     * @returns 是（true）或否（false）
     */
    function isUndefined(value) {
        return value === void 0;
    }

    /**
     * 无操作函数。
     */
    function noop() { }

    /**
     * 解析 CSS 值的数值和单位。
     *
     * @param value 要解析的值
     * @param [defaultUnit='px'] 默认单位
     * @returns 解析结果
     */
    function parseCSSValue(value, defaultUnit) {
        if (defaultUnit === void 0) { defaultUnit = 'px'; }
        if (typeof value === 'number') {
            return {
                value: value,
                unit: defaultUnit
            };
        }
        var matches = value.trim().match(/^(-?[\d+.-]+)([a-z]+|%)$/i);
        return matches !== null
            ? {
                value: Number(matches[1]),
                unit: matches[2]
            }
            : {
                value: Number(value),
                unit: defaultUnit
            };
    }

    /**
     * 将一个数组或一个对象归纳为一个值。
     *
     * @param data 待归纳的数组或对象
     * @param fn 归纳函数
     * @param initialValue 归纳初始值
     * @returns 归纳最终值
     */
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

    var isSupportPassiveEventListener;
    /**
     * 检测是否支持 passive 模式的事件监听。
     *
     * @returns 是（true）或否（false）
     */
    function supportPassiveEventListener() {
        /* istanbul ignore else */
        if (isSupportPassiveEventListener === undefined) {
            isSupportPassiveEventListener = false;
            try {
                var options = Object.defineProperty({}, 'passive', {
                    get: function () {
                        /* istanbul ignore next */
                        isSupportPassiveEventListener = true;
                    }
                });
                window.addEventListener('test', null, options);
            }
            catch (err) { }
        }
        return isSupportPassiveEventListener;
    }

    exports.base64Decode = base64Decode;
    exports.base64Encode = base64Encode;
    exports.base64UrlDecode = base64UrlDecode;
    exports.base64UrlEncode = base64UrlEncode;
    exports.bindEvent = bindEvent;
    exports.castArray = castArray;
    exports.clamp = clamp;
    exports.cssTransform = cssTransform;
    exports.Disposer = Disposer;
    exports.forOwn = forOwn;
    exports.getType = getType;
    exports.inBrowser = inBrowser;
    exports.isArray = isArray;
    exports.isBoolean = isBoolean;
    exports.isDate = isDate;
    exports.isEqualArray = isEqualArray;
    exports.isFinite = isFinite;
    exports.isFunction = isFunction;
    exports.isInteger = isInteger;
    exports.isNaN = isNaN;
    exports.isNil = isNil;
    exports.isNull = isNull;
    exports.isNumber = isNumber;
    exports.isObject = isObject;
    exports.isPlainObject = isPlainObject;
    exports.isRegExp = isRegExp;
    exports.isString = isString;
    exports.isUndefined = isUndefined;
    exports.noop = noop;
    exports.parseCssValue = parseCSSValue;
    exports.reduce = reduce;
    exports.repeat = repeat;
    exports.supportPassiveEventListener = supportPassiveEventListener;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
