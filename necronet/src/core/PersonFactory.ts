import { Person, PersonalityType } from './Person';
import { PersonalityMapper } from './PersonalityMapper';

export class PersonFactory {
  /**
   * Converts a user object returned from the RandomUser API into a simplified Person object.
   * Assumes the structure of apiUser matches that returned by the randomuser.me API.
   * Generates an avatar using dicebear's hash generator with the random name received from randomuser.me
   *
   * @param apiUser A user object from the randomuser.me API.
   * @returns A normalized Person object for in-game use.
   */
  static fromAPI(apiUser: {
    login: { uuid: string };
    name: { first: string; last: string };
    dob: { age: number };
    gender: string;
    location: { city: string; country: string };
    phone: string;
  }): Person {
    const id = apiUser.login.uuid;
    const fullName = `${apiUser.name.first} ${apiUser.name.last}`;
    const avatarUrl = `https://api.dicebear.com/8.x/notionists/png?seed=${encodeURIComponent(fullName)}`;
    const age = apiUser.dob.age;
    const gender = apiUser.gender;
    const location = `${apiUser.location.city}, ${apiUser.location.country}`;
    const type = PersonalityMapper.determineTypeFromPhone(apiUser.phone);

    return {
      id,
      fullName,
      avatarUrl,
      age,
      gender,
      location,
      type,
    };
  }
}