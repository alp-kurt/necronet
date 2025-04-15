/**
 * Defines the personality types that can be assigned to a person.
 * These types are used to characterize users based on their personality traits
 * and influence how they are interpreted or interacted with in the game.
 * These types are references to Pokemon types like 'fire', 'water', 'normal'.
 *
 * - 'Smart Asshole': Throws a random fact to dodge death.
 * - 'Simple Soul': Drops a random meaningless excuse to convinvce death.
 * - 'Shameless Humorist': Comes up with random jokes to distract death.
 * - 'Normie': Average and neutral. Represents the baseline normal personality. Can do anything with less effect than other types.
 */
export type PersonalityType = 'Smart Asshole' | 'Simple Soul' | 'Shameless Humorist' | 'Normie';

/**
 * Represents a simplified model for people.
 */
export interface Person {
  id: string;
  fullName: string;
  avatarUrl: string;
  age: number;
  gender: string;
  location: string;
  type: PersonalityType;
}