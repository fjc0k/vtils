/**
 * 解析 CSS 值的数值和单位。
 *
 * @param value 要解析的值
 * @param [defaultUnit='px'] 默认单位
 * @returns 解析结果
 */
export default function parseCSSValue(value: string | number, defaultUnit?: string): {
    value: number;
    unit: string;
};
