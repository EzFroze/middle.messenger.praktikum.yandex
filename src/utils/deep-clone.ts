export function deepClone(src: any): Record<string, any> {
  const target = Array.isArray(src) ? [] : {};
  // eslint-disable-next-line guard-for-in,no-restricted-syntax
  for (const prop in src) {
    const value = src[prop];
    if (value && typeof value === "object") {
      // @ts-ignore
      target[prop] = deepClone(value);
    } else {
      // @ts-ignore
      target[prop] = value;
    }
  }
  return target;
}
