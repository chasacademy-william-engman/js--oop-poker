const suits = ["Hearts", "Diamonds", "Clubs", "Spades"];
const values = [
  { name: "Ace", value: 14 },
  { name: "2", value: 2 },
  { name: "3", value: 3 },
  { name: "4", value: 4 },
  { name: "5", value: 5 },
  { name: "6", value: 6 },
  { name: "7", value: 7 },
  { name: "8", value: 8 },
  { name: "9", value: 9 },
  { name: "10", value: 10 },
  { name: "Jack", value: 11 },
  { name: "Queen", value: 12 },
  { name: "King", value: 13 },
];
export const throwPile = [];

class Card {
  constructor(name, value, suit) {
    ((this.name = name), (this.value = value), (this.suit = suit));
  }
}

export class Deck {
  constructor() {
    this.cards = [];
    this.createDeck();
  }

  createDeck() {
    suits.forEach((suit) => {
      values.forEach((value) => {
        this.cards.push(new Card(value.name, value.value, suit));
      });
    });
    this.shuffleDeck();
  }

  shuffleDeck() {
    this.cards.sort(() => Math.random() - 0.5);
  }

  putCard(card) {
    this.cards.push(card);
  }

  throwPileToDeck() {
    while (throwPile.length > 0) {
      const card = throwPile.pop();
      this.putCard(card);
    }
  }

  dealCard() {
    return this.cards.pop();
  }

  getDeck() {
    return this.cards;
  }
}
