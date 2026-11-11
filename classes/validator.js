export class Validator {
  static evaluateHands(playersList) {
    console.log("\n=== ROUND SUMMARY ===");

    let winner = null;
    let highestScore = 0;

    playersList.forEach((player) => {
      const handScore = player
        .getHand()
        .reduce((sum, card) => sum + card.value, 0);

      if (handScore > highestScore) {
        highestScore = handScore;
        winner = player;
      }
    });

    if (winner) {
      console.log(
        `\n🏆 Winner is ${winner.name} with ${highestScore} points! 🏆\n`,
      );
      return winner;
    }
  }
}
