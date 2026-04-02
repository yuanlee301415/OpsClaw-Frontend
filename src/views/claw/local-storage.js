function isStorage(value) {
  return Boolean(value) && typeof value.getItem === 'function' && typeof value.setItem === 'function'
}

export function getSafeLocalStorage() {
  const descriptor = Object.getOwnPropertyDescriptor(globalThis, 'localStorage')

  /*  if (typeof process !== "undefined" && process.env?.VITEST) {
    return descriptor && !descriptor.get && isStorage(descriptor.value) ? descriptor.value : null;
  }*/

  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    try {
      return isStorage(window.localStorage) ? window.localStorage : null
    } catch {
      return null
    }
  }

  return descriptor && !descriptor.get && isStorage(descriptor.value) ? descriptor.value : null
}
