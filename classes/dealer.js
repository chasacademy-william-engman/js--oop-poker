import { Deck } from "./deck.js";

export class Dealer {
  constructor() {
    this.deck = new Deck();
  }

  shuffleDeck() {
    this.deck.shuffleDeck();
  }

  dealCardsToPlayer(player, numberOfCards) {
    for (let i = 0; i < numberOfCards; i++) {
      const card = this.deck.dealCard();
      if (card) {
        player.receiveCard(card);
      } else {
        console.log("Deck is empty");
        break;
      }
    }
  }
}
