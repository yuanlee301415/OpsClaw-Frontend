import { clearDeviceAuthTokenFromStore, loadDeviceAuthTokenFromStore, storeDeviceAuthTokenInStore } from './shared/device-auth-store.js'
import { getSafeLocalStorage } from './local-storage.js'

const STORAGE_KEY = 'openclaw.device.auth.v1'

function readStore() {
  try {
    const raw = getSafeLocalStorage()?.getItem(STORAGE_KEY)
    if (!raw) {
      return null
    }
    const parsed = JSON.parse(raw)
    if (!parsed || parsed.version !== 1) {
      return null
    }
    if (!parsed.deviceId || typeof parsed.deviceId !== 'string') {
      return null
    }
    if (!parsed.tokens || typeof parsed.tokens !== 'object') {
      return null
    }
    return parsed
  } catch {
    return null
  }
}

function writeStore(store) {
  try {
    getSafeLocalStorage()?.setItem(STORAGE_KEY, JSON.stringify(store))
  } catch {
    // best-effort
  }
}

export function loadDeviceAuthToken(params) {
  return loadDeviceAuthTokenFromStore({
    adapter: { readStore, writeStore },
    deviceId: params.deviceId,
    role: params.role,
  })
}

export function storeDeviceAuthToken(params) {
  return storeDeviceAuthTokenInStore({
    adapter: { readStore, writeStore },
    deviceId: params.deviceId,
    role: params.role,
    token: params.token,
    scopes: params.scopes,
  })
}

export function clearDeviceAuthToken(params) {
  clearDeviceAuthTokenFromStore({
    adapter: { readStore, writeStore },
    deviceId: params.deviceId,
    role: params.role,
  })
}
