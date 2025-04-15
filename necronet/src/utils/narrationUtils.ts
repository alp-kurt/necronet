import type { Person, PersonalityType } from '../core/Person';

const moods = ['happy', 'sad', 'tiring', 'monotone'];
const reactions = [
  'welcomes you',
  'was not ready for you',
  'loses their mind in confusion',
  'suppresses their emotions',
  'bursts out a laugh',
  'starts crying',
  'starts a live stream for their followers',
  'acts like they understood who you are',
];

/**
 * First part of the intro narration: describes the person's life so far.
 */
export function getIntroNarrationPart1(person: Person): string {
  const mood = moods[Math.floor(Math.random() * moods.length)];
  const randomYears = Math.floor(Math.random() * person.age) + 1;

  return `${person.fullName} is living a ${mood} life in ${person.location} for ${randomYears} years...`;
}

/**
 * Second part of the intro narration: describes their reaction to meeting the player.
 */
export function getIntroNarrationPart2(person: Person): string {
  const reaction = reactions[Math.floor(Math.random() * reactions.length)];
  const pronoun = person.gender.toLowerCase() === 'male' ? 'He' : 'She';

  return `When ${pronoun} sees you, ${pronoun.toLowerCase()} ${reaction}...`;
}

/**
 * Generates a personality-based narration setup based on the person's type.
 * This sets the tone for their joke, excuse, or fact.
 */
export function getTypeSetupNarration(person: Person): string {
  const lines: Record<PersonalityType, string[]> = {
    'Smart Asshole': [
      `With big hopes to convince you, ${person.fullName} puts their hands into their pockets and shares this fact with an extraordinary confidence...`,
      `With a stunning confidence for what they have in their mind, ${person.fullName} closes their eyes and says...`,
      `To prove you they are too smart to die, ${person.fullName} says these words while pointing their head...`,
    ],
    'Simple Soul': [
      `Because ${person.fullName} won't be able to use it again, they start using 100% of their brain to come up with the best excuse so far...`,
      `Believing that it can convince you, ${person.fullName} checks their memory to remember a nice excuse they saw on social media...`,
      `To give their most acceptable excuse a shot, ${person.fullName} suddenly clicks their fingers and says...`,
    ],
    'Shameless Humorist': [
      `To make you believe their life is already a big joke, ${person.fullName} smiles and then breaks the silence with these words...`,
      `Thinking that a good joke is the solution to any issue, ${person.fullName} stares at you with empty eyes and drops these lines...`,
      `While their eyes start glowing, ${person.fullName} intensifies and starts floating in the air right before communicating these words...`,
    ],
    'Normie': [
      `To impress you, ${person.fullName} tries to say something meaningful...`,
      `In order not to stay actless, ${person.fullName} attempts to describe what they saw on a reel yesterday...`,
      `To confuse you, ${person.fullName} clears their throat and makes a weird face before speaking...`,
    ],
  };

  const options = lines[person.type];
  return options[Math.floor(Math.random() * options.length)];
}
