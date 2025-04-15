import { Person } from './Person';
import { LocalStorageManager } from './LocalStorageManager';

const STORAGE_KEY = 'fetchedPeople';

/**
 * FetchedPeopleStore is responsible for managing the in-memory and persistent state of the list of people fetched from the API
 * It provides utility methods to add, retrieve, and remove people. The state is synced with localStorage after any mutation.
 */
export class FetchedPeopleStore {
  /**
   * Internal in-memory cache of all fetched people.
   * Initially populated by loading from localStorage.
   */
  private static people: Person[] = FetchedPeopleStore.loadFromStorage();

  /**
   * Loads people data from localStorage. Returns an empty array if nothing is found.
   */
  private static loadFromStorage(): Person[] {
    return LocalStorageManager.load(STORAGE_KEY) || [];
  }

  /**
   * Saves the current in-memory state to localStorage.
   */
  private static saveToStorage() {
    LocalStorageManager.save(STORAGE_KEY, this.people);
  }

  /**
   * Returns a shallow copy of all stored people.
   */
  static getAll(): Person[] {
    return [...this.people];
  }

  /**
   * Returns a specific person by their unique ID.
   * @param id The ID of the person to retrieve.
   */
  static getPerson(id: string): Person | undefined {
    return this.people.find(p => p.id === id);
  }

  /**
   * Adds a new person to the in-memory list and persists the change to localStorage.
   * @param person The person to be added.
   */
  static addPerson(person: Person) {
    this.people.push(person);
    this.saveToStorage();
  }

  /**
   * Removes a person by their ID and updates localStorage.
   * @param id The ID of the person to remove.
   */
  static removePerson(id: string) {
    this.people = this.people.filter(p => p.id !== id);
    this.saveToStorage();
  }

  /**
   * Permanently deletes all people from memory and localStorage.
   * Use this method carefully as this action is irreversible.
   */
  static clearAll() {
    this.people = [];
    this.saveToStorage();
  }

}
