/**
  * Convert to RMB metastring
  * @param digits When the number type is allowed, the number of digits after the decimal point is allowed. The default is 2 decimal places.
  */
// tslint:disable-next-line:no-any
export function yuan(value: any, digits: number = 2): string {
  if (typeof value === 'number') value = value.toFixed(digits);
  return `&yen ${value}`;
}
