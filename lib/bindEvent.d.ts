export declare type BindEventTypes = string | string[];
export declare type BindEventListener = EventListenerOrEventListenerObject;
export declare type BindEventOptions = boolean | AddEventListenerOptions;
export declare type UnbindEventListener = () => void;
/**
 * 将指定类型的事件绑定在指定的目标上并返回解绑函数。
 *
 * @param target 事件目标
 * @param types 事件类型
 * @param listener 事件监听器
 * @param [options] 事件选项
 */
export default function bindEvent(target: EventTarget, types: BindEventTypes, listener: EventListenerOrEventListenerObject, options?: BindEventOptions): UnbindEventListener;
