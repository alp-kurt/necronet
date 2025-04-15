import { Person } from './Person';
import { LocalStorageManager } from './LocalStorageManager';

const STORAGE_KEY = 'selectedPerson';

/**
 * SelectedPersonStore manages the currently selected person,
 * handling both in-memory state and localStorage sync.
 */
export class SelectedPersonStore {
  /**
   * Internal in-memory reference to the selected person.
   */
  private static selected: Person | null = SelectedPersonStore.loadFromStorage();

  /**
   * Loads the selected person from localStorage.
   */
  private static loadFromStorage(): Person | null {
    return LocalStorageManager.load(STORAGE_KEY) || null;
  }

  /**
   * Saves the current selected person to localStorage.
   */
  private static saveToStorage() {
    if (this.selected) {
      LocalStorageManager.save(STORAGE_KEY, this.selected);
    } else {
      LocalStorageManager.remove(STORAGE_KEY);
    }
  }

  /**
   * Returns the current selected person.
   */
  static get(): Person | null {
    return this.selected;
  }

  /**
   * Updates the selected person and syncs with localStorage.
   * @param person The person to set as selected.
   */
  static set(person: Person) {
    this.selected = person;
    this.saveToStorage();
  }

  /**
   * Clears the selected person and removes from localStorage.
   */
  static clear() {
    this.selected = null;
    this.saveToStorage();
  }
}
