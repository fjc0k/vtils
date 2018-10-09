export declare type DisposerItemName = string | number;
export declare type Dispose = () => void;
export default class Disposer {
    private jar;
    add(name: DisposerItemName, dispose: Dispose | Dispose[]): void;
    dispose(name: DisposerItemName): void;
    disposeAll(): void;
}
