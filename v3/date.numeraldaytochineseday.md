<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [date](./date.md) &gt; [numeralDayToChineseDay](./date.numeraldaytochineseday.md)

## numeralDayToChineseDay() function

数字星期转中文星期。`0` 和 `7` 都视为星期日。

<b>Signature:</b>

```typescript
export declare function numeralDayToChineseDay(day: NumeralDay): string;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  day | [NumeralDay](./date.numeralday.md) | 数字的星期几 |

<b>Returns:</b>

string

返回中文的星期几

## Example


```typescript
numeralDayToChineseDay(0) // => 日
numeralDayToChineseDay(1) // => 一
numeralDayToChineseDay(5) // => 五
numeralDayToChineseDay(7) // => 日

```
