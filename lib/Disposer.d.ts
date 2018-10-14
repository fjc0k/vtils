export declare type DisposerItemName = string | number;
export declare type Dispose = () => void;
/**
 * 处置器。
 */
export default class Disposer {
    /**
     * 待处置项目存放容器。
     *
     * @private
     */
    private jar;
    /**
     * 将待处置项目加入容器。
     *
     * @param name 待处置项目名称
     * @param dispose 处置行为
     */
    add(name: DisposerItemName, dispose: Dispose | Dispose[]): void;
    /**
     * 处置项目。
     *
     * @param name 欲处置项目名称
     */
    dispose(name: DisposerItemName): void;
    /**
     * 处置所有未处置项目。
     */
    disposeAll(): void;
}
