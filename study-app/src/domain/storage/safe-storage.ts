export const STORAGE_FAILURE_EVENT = "rel301m:storage-failure";

const pendingWrites = new Map<string, string | null>();

function notifyStorageFailure() {
  window.dispatchEvent(new Event(STORAGE_FAILURE_EVENT));
}

export function safeStorageGet(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    notifyStorageFailure();
    return null;
  }
}

export function safeStorageSet(key: string, value: string): boolean {
  try {
    window.localStorage.setItem(key, value);
    pendingWrites.delete(key);
    return true;
  } catch {
    pendingWrites.set(key, value);
    notifyStorageFailure();
    return false;
  }
}

export function safeStorageRemove(key: string): boolean {
  try {
    window.localStorage.removeItem(key);
    pendingWrites.delete(key);
    return true;
  } catch {
    pendingWrites.set(key, null);
    notifyStorageFailure();
    return false;
  }
}

export function retryPendingStorageWrites(): boolean {
  try {
    for (const [key, value] of pendingWrites) {
      if (value === null) window.localStorage.removeItem(key);
      else window.localStorage.setItem(key, value);
    }
    pendingWrites.clear();
    return true;
  } catch {
    notifyStorageFailure();
    return false;
  }
}
