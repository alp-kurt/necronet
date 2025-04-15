export type LastAction = 'killed' | 'released';

const STORAGE_KEY = 'lastAction';

export const LastActionStore = {
  set(action: LastAction) {
    localStorage.setItem(STORAGE_KEY, action);
  },

  get(): LastAction | null {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw === 'killed' || raw === 'released' ? raw : null;
  },

  clear() {
    localStorage.removeItem(STORAGE_KEY);
  }
};
