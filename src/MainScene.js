import Player from './Player.js';

export default class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MainScene' });
  }

  preload() {
    this.load.image('background', 'assets/background.png');
    this.load.image('building', 'assets/house.png');
    this.load.image('player', 'assets/player.jpg');
  }

  create() {
    const { width, height } = this.scale;

    // 添加背景圖片
    const background = this.add.image(width / 2, height / 2, 'background');
    const scale = Math.min(width / background.width, height / background.height);
    background.setScale(scale);

    const relativePosition = (percentageX, percentageY) => ({
      x: background.x - background.displayWidth / 2 + background.displayWidth * percentageX,
      y: background.y - background.displayHeight / 2 + background.displayHeight * percentageY
    });

    // 建立靜態平台群組並添加房子
    this.buildings = this.physics.add.staticGroup();
    const house1Pos = relativePosition(0.75, 0.2);
    const house2Pos = relativePosition(0.95, 0.4);
    this.buildings.create(house1Pos.x, house1Pos.y, 'building').setName('house1').setScale(scale);
    this.buildings.create(house2Pos.x, house2Pos.y, 'building').setName('house2').setScale(scale);

    // 使用 Player 類別建立玩家角色
    const playerPos = relativePosition(0.25, 0.8);
    this.player = new Player(this, playerPos.x, playerPos.y, 'player', scale);

    // 添加玩家與房子間的碰撞
    this.physics.add.collider(this.player, this.buildings, this.onPlayerCollideWithHouse, null, this);

    // 設定鍵盤輸入
    this.cursors = this.input.keyboard.createCursorKeys();

    // 創建空氣牆
    const walls = this.physics.add.staticGroup();
    const wallup = relativePosition(0.5, 0.2);
    const walldown = relativePosition(0.5, 0.9);
    const wallleft = relativePosition(0, 0.5);
    const wallright = relativePosition(1, 0.5);
    walls.create(wallup.x, wallup.y, 'building').setVisible(false).setSize(width, 10);
    walls.create(walldown.x, walldown.y, 'building').setVisible(false).setSize(width, 10);
    walls.create(wallleft.x, wallleft.y, 'building').setVisible(false).setSize(10, height);
    walls.create(wallright.x, wallright.y, 'building').setVisible(false).setSize(10, height);

    this.physics.add.collider(this.player, walls);
  }

  update() {
    this.player.handleInput(this.cursors);
  }

  onPlayerCollideWithHouse(player, building) {
    if (building.name === 'house1') {
      this.scene.start('House1Scene');
    } else if (building.name === 'house2') {
      this.scene.start('House2Scene');
    }
  }
}
