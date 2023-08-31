export function toCamel(original: { [key: string]: any }) {
  let newObject: { [key: string]: any },
    originalKey: string,
    newKey: string,
    value: any;
  if (original instanceof Array) {
    return original.map(function (value) {
      if (typeof value === "object") {
        value = toCamel(value);
      }
      return value;
    });
  } else {
    newObject = {};
    for (originalKey in original) {
      if (original.hasOwnProperty(originalKey)) {
        newKey = (
          originalKey.charAt(0).toLowerCase() + originalKey.slice(1) ||
          originalKey
        ).toString();
        value = original[originalKey];
        if (
          value instanceof Array ||
          (value !== null && value.constructor === Object)
        ) {
          value = toCamel(value);
        }
        newObject[newKey] = value;
      }
    }
  }
  return newObject;
}
