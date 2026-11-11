import { Deck, throwPile } from "./deck.js";
import { Player } from "./player.js";
import { Dealer } from "./dealer.js";
import { Validator } from "./validator.js";
import readline from "readline/promises";
import { stdin as input, stdout as output } from "process";

//PART 7
export class Game {
  constructor() {
    this.players = [];
    this.dealer = new Dealer();
  }

  async addPlayers(rl) {
    let numberOfPlayers = 0;

    while (numberOfPlayers < 2) {
      const answer = await rl.question("How many players? (Atleast 2): ");
      numberOfPlayers = parseInt(answer);

      if (isNaN(numberOfPlayers) || numberOfPlayers < 2) {
        console.log(
          "Invalid amount. Input has to be a number or atleast 2 players!",
        );
      }
    }

    for (let i = 1; i <= numberOfPlayers; i++) {
      const name = await rl.question(`Write the name of player${i}: `);

      const newPlayer = new Player(name || `Spelare ${i}`);
      this.players.push(newPlayer);
    }

    console.log("Starting game...");

    rl.close();
    return this.players;
  }

  async startGame() {
    console.log("♠️ ♥️ Welcome to the Pokergame! ♦️ ♣️\n");

    const rl = readline.createInterface({ input, output });

    try {
      await this.addPlayers(rl);

      console.log("The Dealer is shuffling the deck...");
      this.dealer.shuffleDeck();

      console.log("The Dealer is handing out 5 cards to each player...\n");
      for (let i = 0; i < 5; i++) {
        for (const player of this.players) {
          this.dealer.dealCardsToPlayer(player, 1);
        }
      }

      Validator.evaluateHands(this.players);
    } catch (error) {
      console.error("An error occured:", error);
    } finally {
      rl.close();
    }
  }

  runOldTests() {
    console.log("\n--- RUNNING OLD TESTS ---");

    const testPlayer1 = new Player("Slim");
    const testPlayer2 = new Player("Luke");
    const gameDeck = this.dealer.deck;

    // Deal 5 cards for each player - PART 5
    this.dealer.shuffleDeck();
    this.dealer.dealCardsToPlayer(testPlayer1, 5);
    this.dealer.dealCardsToPlayer(testPlayer2, 5);

    //PART 6
    console.log(Validator.evaluateHands([testPlayer1, testPlayer2]));

    //PART 1
    console.log("Gamedeck 52 cards:", gameDeck.getDeck());

    //PART 2 AND PART 5
    console.log("Player1 Hand:", testPlayer1.getHand());
    console.log("Player2 Hand:", testPlayer2.getHand());

    console.log("Gamedeck 42 cards:", gameDeck.getDeck());

    // PART 3
    testPlayer1.throwCards([0, 1]);
    testPlayer2.throwCards([0, 1]);

    console.log("Player1 hand after throw:", testPlayer1.getHand());
    console.log("Player2 hand after throw:", testPlayer2.getHand());

    for (let i = 0; i < 2; i++) {
      const drawnCard = gameDeck.dealCard();
      testPlayer1.receiveCard(drawnCard);
    }

    for (let i = 0; i < 2; i++) {
      const drawnCard = gameDeck.dealCard();
      testPlayer2.receiveCard(drawnCard);
    }

    console.log("Player1 hand after deal:", testPlayer1.getHand());
    console.log("Player2 hand after deal:", testPlayer2.getHand());

    console.log("Gamedeck 38 cards:", gameDeck.getDeck().length);

    console.log(
      "Sum of player hands:",
      testPlayer1.getHand().length + testPlayer2.getHand().length,
    );

    console.log("Throw pile:", throwPile);

    //PART 4
    testPlayer1.throwCards([0, 1, 2, 3, 4]);
    testPlayer2.throwCards([0, 1, 2, 3, 4]);

    console.log("Throw pile before put into deck:", throwPile);

    gameDeck.throwPileToDeck();

    console.log("Throw pile after put into deck:", throwPile);

    gameDeck.shuffleDeck();
    console.log("Shuffled Gamedeck:", gameDeck);

    console.log("--- OLD TESTS COMPLETED ---\n");
  }
}
