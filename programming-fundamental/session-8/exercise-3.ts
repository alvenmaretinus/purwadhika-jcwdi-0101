export {};

/**
  💥 Challenge: Deathmatch Shooting Game
  
  📋 Specifications
    You are to create a deathmatch shooting game between two players.

  Each player will have four attributes:
    name
    health
    power
    speed

  The gameplay is turn-based, and new players are generated every round.
  These new players inherit 10% ~ 150% of the previous round's stats.
  The game ends when one player is defeated.

  🧠 Behavior and Mechanics
  
  👤 Player Class
    Properties:
      name: string
      health: number (default: 100)
      power: number (default: 10)
      speed: number (default: 10)

    Methods:
      damage(power: number): Decreases the player's health by power.
      useItem(item: BoostItem):
        Applies a boost item:
        health +10 if the item is a HealthBoost
        power +10 if the item is a PowerBoost
      showStatus(): Logs player’s current status:
        → Example: "Player A (Health => 100, Power => 10, Speed => 15)"
      cloneWithRandomStatsMultiplier(): Returns a new player based on the current one, with health, power, and speed randomly scaled by 10% to 150%.

  🎮 ShootingGame Class
  Create a ShootingGame class with:
    Constructor:
      constructor(player1: Player, player2: Player)
    Methods:
      getRandomItem(player: Player): BoostItem: Randomly give either:
        { health: +10 } or { power: +10 }, and apply it to the player.
      start(): Starts the game.
  
  Each round:
    Generate new players for both player1 and player2 using cloneWithRandomStatsMultiplier().
    Assign random item boosts to each player.
    Determine who goes first by comparing their speed. The player with higher speed attacks first.
    Execute turn-based shooting.
    Continue until one player's health drops to 0 or below.
    Declare winner and proceed to the next round, regenerating new players again from the winner’s stats.
*/

enum BoostItem {
  HealthBoost = 0,
  PowerBoost = 1,
}

class ShootingGame {
  private round = 0;
  private player1: Player;
  private player2: Player;

  constructor(player1: Player, player2: Player) {
    this.player1 = player1;
    this.player2 = player2;
  }

  getRandomItem(player: Player): BoostItem {
    // number between 0 and 1
    // 0 - health+10
    // 1 - power+10
    const randConst: BoostItem = Math.round(Math.random());

    switch (randConst) {
      case BoostItem.HealthBoost:
        player.useItem(BoostItem.HealthBoost);
        break;
      case BoostItem.PowerBoost:
        player.useItem(BoostItem.PowerBoost);
        break;
    }

    return randConst;
  }

  start() {
    while (this.player1.health > 0 && this.player2.health > 0) {
      // Increment round counter and show round count
      this.round++;
      if (this.round === 1) console.log(`Game start!\n===========\n`);
      console.log(`\nRound ${this.round}:`);

      // Get random item for each player before shooting
      const p1Item = this.getRandomItem(this.player1);
      const p2Item = this.getRandomItem(this.player2);
      console.log(
        `${this.player1.name} receives item that +10 ${p1Item === BoostItem.HealthBoost ? 'health' : 'power'!}`
      );
      console.log(
        `${this.player2.name} receives item that +10 ${p2Item === BoostItem.HealthBoost ? 'health' : 'power'!}`
      );
      console.log(`-------------------------------`);

      // Show each player status before shooting
      this.player1.showStatus();
      this.player2.showStatus();
      console.log(`-------------------------------`);

      // Game logic
      let playerTurn: Player[] = [];
      if (this.player1.speed >= this.player2.speed) {
        playerTurn = [this.player1, this.player2];
      } else {
        playerTurn = [this.player2, this.player1];
      }
      console.log(`${playerTurn[0].name} goes first!`);

      for (let i = 0; i < playerTurn.length; i++) {
        const enemy = playerTurn[Math.abs(i - 1)];
        const player = playerTurn[i];

        enemy.damage(player.power);
        console.log(`${player.name} damages ${enemy.name} by ${player.power}`);

        if (enemy.health <= 0) {
          break;
        }
      }
      console.log(`-------------------------------`);

      // Show each player status after shooting
      this.player1.showStatus();
      this.player2.showStatus();

      // Show winner name if one of the player dies
      if (this.player1.health <= 0 || this.player2.health <= 0) {
        console.log(`\n${this.player1.health > 0 ? this.player1.name : this.player2.name} wins!`);
      }
    }
  }
}

class Player {
  name = 'No name';
  health = 100;
  power = 10;
  speed = 10;

  constructor(name: string, health: number, power: number, speed: number) {
    this.name = name;
    this.health = health;
    this.power = power;
    this.speed = speed;
  }

  damage(power: number) {
    this.health -= power;
  }

  useItem(item: BoostItem) {
    switch (item) {
      case BoostItem.HealthBoost:
        this.health += 10;
        break;
      case BoostItem.PowerBoost:
        this.power += 10;
        break;
    }
  }

  showStatus() {
    console.log(
      `${this.name} (Health => ${this.health}, Power => ${this.power}, Speed => ${this.speed})`
    );
  }

  cloneWithRandomStatsMultiplier(): Player {
    const multiplier = (Math.floor(Math.random() * (150 - 10 + 1)) + 10) / 100;
    return new Player(
      'Cloned player',
      multiplier * this.health,
      multiplier * this.power,
      multiplier * this.speed
    );
  }
}

const player1 = new Player('Rudy', 300, 50, 20);
const player2 = player1.cloneWithRandomStatsMultiplier();
const shootingGame = new ShootingGame(player1, player2);
shootingGame.start();
