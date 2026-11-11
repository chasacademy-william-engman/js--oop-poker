import { throwPile } from "./deck.js";

export class Player {
  constructor(name) {
    this.name = name;
    this.cardHand = [];
  }

  receiveCard(card) {
    this.cardHand.push(card);
  }

  throwCards(indexesToThrow) {
    for (const index of indexesToThrow) {
      if (index >= 0 && index < this.cardHand.length) {
        throwPile.push(this.cardHand[index]);
      }
    }

    this.cardHand = this.cardHand.filter((_, i) => !indexesToThrow.includes(i));
  }

  getHand() {
    return this.cardHand;
  }
}
