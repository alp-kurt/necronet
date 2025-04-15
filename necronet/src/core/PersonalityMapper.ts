import type { PersonalityType } from './Person';

export class PersonalityMapper {
  /**
   * RANDOMLY determines a user's personality type by extracting the last digit of their phone number.
   *
   * @param phone The raw phone number string from the API.
   * @returns A mapped PersonalityType.
   */
  static determineTypeFromPhone(phone: string): PersonalityType {
    const digits = phone.replace(/\D/g, '');
    const lastDigit = parseInt(digits[digits.length - 1]);

    if ([0, 1, 2].includes(lastDigit)) return 'Smart Asshole';
    if ([3, 4, 5].includes(lastDigit)) return 'Simple Soul';
    if ([6, 7].includes(lastDigit)) return 'Shameless Humorist';
    return 'Normie';
  }
}