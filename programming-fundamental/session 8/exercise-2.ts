export {}

/**
 * Specifications :
 * Create a shooting game between two player
 * Each player has three properties : name, health and power
 * Each player will take turns to shooting
 * Before shooting, players get a chance to get random items (health +10 or power +10)
 * The game will continue until one of the players has health <= 0
 * 
 * Requirements : 
 * Create ShootingGame & Player class
 * 
 * ShootingGame class : 
 * constructor(player1, player2) → player objects as a parameter
 * getRandomItem() → return { health: 0 or 10, power: 0 or 10 } => {health : 0 , power : 10}
 * start() → start shooting games
 * 
 * Player class :
 * Property → name, health (default 100), power (default 10)
 * damage(power) →  subtract player health
 * useItem(item) → apply item to player (increase health or power, based on result from getRandomItem())
 * showStatus() → show player status (ex : “Player A (Health => 100, Power => 10) ”)
 * 
 * ShootingGame start() function flow :
 * In every turn :
 * Show each player status before shooting
 * Get random item for each player before shooting
 * Show each player status after shooting
 * Show winner name
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
      if (this.round === 1) console.log(`Game start!\n===========\n`)
      console.log(`\nRound ${this.round}:`)

      // Get random item for each player before shooting
      const p1Item = this.getRandomItem(this.player1)
      const p2Item = this.getRandomItem(this.player2)
      console.log(`${this.player1.name} receives item that +10 ${p1Item === BoostItem.HealthBoost ? 'health' : 'power'!}`)
      console.log(`${this.player2.name} receives item that +10 ${p2Item === BoostItem.HealthBoost ? 'health' : 'power'!}`)
      console.log(`-------------------------------`)
  
      // Show each player status before shooting
      this.player1.showStatus()
      this.player2.showStatus()
      console.log(`-------------------------------`)
  
      // Game logic
      const playerWhoGoesFirst = Math.round(Math.random()) + 1;
      let playerTurn = [];
      if (playerWhoGoesFirst === 1) {
        playerTurn = [this.player1, this.player2];
      } else {
        playerTurn = [this.player2, this.player1];
      }
      console.log(`${playerTurn[0].name} goes first!`)

      for (let i = 0; i < playerTurn.length; i++) {
        const enemy = playerTurn[Math.abs(i - 1)];
        const player = playerTurn[i];

        enemy.damage(player.power);
        console.log(`${player.name} damages ${enemy.name} by ${player.power}`)

        if (enemy.health <= 0) {
          break;
        }
      }
      console.log(`-------------------------------`)
  
      // Show each player status after shooting
      this.player1.showStatus()
      this.player2.showStatus()
  
      // Show winner name if one of the player dies
      if (this.player1.health <= 0 || this.player2.health <= 0) {
        console.log(`\n${this.player1.health > 0 ? this.player1.name : this.player2.name} wins!`)
      }
    }

  }
}

class Player {
  name = 'No name';
  health = 100;
  power = 10;

  constructor(name: string, health: number, power: number) {
    this.name = name;
    this.health = health;
    this.power = power;
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
    console.log(`${this.name} (Health => ${this.health}, Power => ${this.power})`);
  }
}

const player1 = new Player('Rudy', 300, 50);
const player2 = new Player('Reinhard', 300, 50);
const shootingGame = new ShootingGame(player1, player2);
shootingGame.start();
