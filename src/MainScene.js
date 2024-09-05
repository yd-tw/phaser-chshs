// MainScene.js
export default class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MainScene' }); // 宣告這個場景的鍵值為 'MainScene'
  }

  preload() {
    this.load.image('background', 'assets/background.jpg');
    this.load.image('building', 'assets/house.png');
    this.load.image('player', 'assets/player.jpg');
  }

  create() {
    const { width, height } = this.scale;

    // 添加背景
    const background = this.add.image(0, 0, 'background').setOrigin(0, 0);
    background.setDisplaySize(width, height);

    // 建立靜態平台群組
    this.buildings = this.physics.add.staticGroup();

    // 添加房子，並為每個房子設置名稱
    const house1 = this.buildings.create(400, 568, 'building').setName('house1');
    const house2 = this.buildings.create(600, 400, 'building').setName('house2');

    // 添加玩家角色
    this.player = this.physics.add.sprite(100, 450, 'player');
    this.player.setBounce(0.2); // 設定彈跳效果
    this.player.setCollideWorldBounds(true); // 防止超出邊界

    // 添加玩家與房子間的碰撞
    this.physics.add.collider(this.player, this.buildings, this.onPlayerCollideWithHouse, null, this);

    // 設定鍵盤輸入
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    // 玩家移動邏輯
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);
    } else {
      this.player.setVelocityX(0);
    }

    if (this.cursors.up.isDown) {
      this.player.setVelocityY(-160);
    } else if (this.cursors.down.isDown) {
      this.player.setVelocityY(160);
    } else {
      this.player.setVelocityY(0);
    }
  }

  onPlayerCollideWithHouse(player, building) {
    if (building.name === 'house1') {
      console.log('Player hit house1');
      this.showHouse1Interface();
    } else if (building.name === 'house2') {
      console.log('Player hit house2');
      this.showHouse2Interface();
    }
  }

  showHouse1Interface() {
    alert('玩家碰到了 house1');
  }

  showHouse2Interface() {
    alert('玩家碰到了 house2');
  }
}
