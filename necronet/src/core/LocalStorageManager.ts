export class LocalStorageManager {
    static save<T>(key: string, data: T): void {
      try {
        localStorage.setItem(key, JSON.stringify(data));
      } catch (err) {
        console.error(`[LocalStorageManager] Failed to save key "${key}"`, err);
      }
    }
  
    static load<T>(key: string): T | null {
      try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
      } catch (err) {
        console.error(`[LocalStorageManager] Failed to load key "${key}"`, err);
        return null;
      }
    }
  
    static remove(key: string): void {
      try {
        localStorage.removeItem(key);
      } catch (err) {
        console.error(`[LocalStorageManager] Failed to remove key "${key}"`, err);
      }
    }
  
    static clear(): void {
      try {
        localStorage.clear();
      } catch (err) {
        console.error('[LocalStorageManager] Failed to clear localStorage', err);
      }
    }
  }