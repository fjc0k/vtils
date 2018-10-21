import { ForOwnCallback, ForOwnObj } from './forOwn';
export declare type MapValuesResult<T> = {
    [key in Extract<keyof T, string>]: any;
};
export default function mapValues<T extends ForOwnObj>(obj: T, callback: ForOwnCallback<T>): MapValuesResult<T>;
