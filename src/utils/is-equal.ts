type Indexed = Record<string, unknown>;

export function isEqual(obj1: Indexed, obj2: Indexed) {
  function getType(obj: Indexed) {
    return Object.prototype.toString.call(obj)
      .slice(8, -1)
      .toLowerCase();
  }

  function areArraysEqual() {
    if (obj1.length !== obj2.length) return false;

    // @ts-ignore
    for (let i = 0; i < obj1.length; i += 1) {
      if (!isEqual(obj1[i] as Indexed, obj2[i] as Indexed)) return false;
    }

    return true;
  }

  function areObjectsEqual() {
    if (Object.keys(obj1).length !== Object.keys(obj2).length) return false;

    // eslint-disable-next-line no-restricted-syntax
    for (const key in obj1) {
      if (Object.prototype.hasOwnProperty.call(obj1, key)) {
        if (!isEqual(obj1[key] as Indexed, obj2[key] as Indexed)) return false;
      }
    }

    return true;
  }

  function areFunctionsEqual() {
    return obj1.toString() === obj2.toString();
  }

  function arePrimativesEqual() {
    return obj1 === obj2;
  }

  const type = getType(obj1);

  if (type !== getType(obj2)) return false;

  if (type === "array") return areArraysEqual();
  if (type === "object") return areObjectsEqual();
  if (type === "function") return areFunctionsEqual();
  return arePrimativesEqual();
}
