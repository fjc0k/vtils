declare type UnbindFn = () => void;
export default function bindEvent(target: EventTarget, types: string | string[], listener: EventListenerOrEventListenerObject, options?: AddEventListenerOptions): UnbindFn;
export {};
