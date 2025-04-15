import { Container, Graphics, Text, Sprite, Texture } from 'pixi.js';
import { FetchedPeopleStore } from '../core/FetchedPeopleStore';
import { SelectedPersonStore } from '../core/SelectedPersonStore';
import { PersonFactory } from '../core/PersonFactory';
import type { Person } from '../core/Person';
import { trackEvent } from '../firebase';

/**
 * PeopleList is a PixiJS display component responsible for displaying
 * a vertical list of `Person` cards. It automatically fetches and stores
 * people if none are found in localStorage.
 */
export class PeopleList extends Container {
  private selectedId: string | null = null;

  constructor() {
    super();
    this.init();
  }

  private async init() {
    let people = FetchedPeopleStore.getAll();

    if (people.length === 0) {
      await this.fetchAndStorePeople(3);
      people = FetchedPeopleStore.getAll();
    }

    const saved = SelectedPersonStore.get();
    if (saved) {
      this.selectedId = saved.id;
    } else if (people.length > 0) {
      this.selectedId = people[0].id;
      SelectedPersonStore.set(people[0]);
    }

    this.renderPeople(people);
  }

  private async fetchAndStorePeople(count: number) {
    try {
      const response = await fetch(`https://randomuser.me/api/?results=${count}`);
      const data = await response.json();
  
      data.results.forEach((user: any) => {
        const person: Person = PersonFactory.fromAPI(user);
        FetchedPeopleStore.addPerson(person);
        trackEvent('person_fetched'); 
      });
    } catch (err) {
      console.error('[PeopleList] Failed to fetch people:', err);
    }
  }
  

  private async renderPeople(people: Person[]) {
    const isMobile = window.innerWidth <= 600;
  
    const cardWidth = isMobile ? 340 : 840;
    const cardHeight = isMobile ? 140 : 120;
    const avatarSize = isMobile ? 96 : 96;
    const fontSize = isMobile ? 28 : 32;
    const smallFont = isMobile ? 24 : 28;
    const padding = isMobile ? 16 : 24;
  
    let yOffset = 0;
  
    for (const person of people) {
      const card = new Container();
      card.eventMode = 'static';
      card.cursor = 'pointer';
  
      // Background
      const background = new Graphics();
      background.beginFill(this.selectedId === person.id ? 0x3c4e78 : 0x2c2c2c);
      background.drawRoundedRect(0, 0, cardWidth, cardHeight, 12);
      background.endFill();
      card.addChild(background);
  
      // Hover effect
      card.on('pointerover', () => (background.tint = 0x555555));
      card.on('pointerout', () => (background.tint = 0xffffff));
      card.on('pointerdown', () => {
        this.selectedId = person.id;
        SelectedPersonStore.set(person);
        this.removeChildren();
        this.renderPeople(people);
      });
  
      // Avatar
      const avatarResponse = await fetch(person.avatarUrl);
      const avatarBlob = await avatarResponse.blob();
      const bitmap = await createImageBitmap(avatarBlob);
      const avatar = new Sprite(Texture.from(bitmap));
      avatar.width = avatarSize;
      avatar.height = avatarSize;
      avatar.x = padding;
      avatar.y = (cardHeight - avatarSize) / 2;
      card.addChild(avatar);
  
      // Name
      const nameText = new Text({
        text: `${person.fullName}, `,
        style: {
          fill: 0xffffff,
          fontSize,
          fontFamily: 'monospace',
          fontWeight: 'bold',
        },
      });
  
      // Personality Type
      const typeText = new Text({
        text: person.type,
        style: {
          fill: 0x00e6e6,
          fontSize,
          fontFamily: 'monospace',
          fontStyle: 'italic',
        },
      });
  
      // Meta Info
      const metaText = new Text({
        text: `${person.age}, ${person.gender}, ${person.location}`,
        style: {
          fill: 0xcccccc,
          fontSize: smallFont,
          fontFamily: 'monospace',
        },
      });
  
      // Position text
      nameText.x = avatar.x + avatar.width + padding;
      nameText.y = padding;
  
      typeText.x = nameText.x + nameText.width;
      typeText.y = nameText.y;
  
      metaText.x = nameText.x;
      metaText.y = nameText.y + fontSize + 6;
  
      card.addChild(nameText, typeText, metaText);
  
      card.y = yOffset;
      this.addChild(card);
      yOffset += cardHeight + 16;
    }
  }
  
  
}
