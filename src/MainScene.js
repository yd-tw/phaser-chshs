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
    const cnc1Pos = relativePosition(0.75, 0.2);
    const mcs1Pos = relativePosition(0.95, 0.4);
    const mcs2Pos = relativePosition(0.95, 0.6);
    this.buildings.create(cnc1Pos.x, cnc1Pos.y, 'building').setName('house1').setVisible(false).setScale(scale);
    this.buildings.create(mcs1Pos.x, mcs1Pos.y, 'building').setName('house2').setVisible(false).setScale(scale);
    this.buildings.create(mcs2Pos.x, mcs2Pos.y, 'building').setName('house2').setVisible(false).setScale(scale);

    // 使用 Player 類別建立玩家角色
    const savedPlayerPos = this.registry.get('playerPosition') || relativePosition(0.25, 0.8);
    this.player = new Player(this, savedPlayerPos.x, savedPlayerPos.y, 'player', scale);

    // 添加玩家與房子間的碰撞
    this.physics.add.collider(this.player, this.buildings, this.onPlayerCollideWithHouse, null, this);

    // 設定鍵盤輸入
    this.keys = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.UP,
      down: Phaser.Input.Keyboard.KeyCodes.DOWN,
      left: Phaser.Input.Keyboard.KeyCodes.LEFT,
      right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
      W: Phaser.Input.Keyboard.KeyCodes.W,
      A: Phaser.Input.Keyboard.KeyCodes.A,
      S: Phaser.Input.Keyboard.KeyCodes.S,
      D: Phaser.Input.Keyboard.KeyCodes.D,
      shift: Phaser.Input.Keyboard.KeyCodes.SHIFT
    });

    // 創建空氣牆
    const walls = this.physics.add.staticGroup();
    const wallup = relativePosition(0.5, 0.2);
    const walldown = relativePosition(0.5, 0.86);
    const wallleft = relativePosition(0, 0.5);
    const wallright = relativePosition(1, 0.5);
    walls.create(wallup.x, wallup.y, 'building').setVisible(false).setSize(width, 10);
    walls.create(walldown.x, walldown.y, 'building').setVisible(false).setSize(width, 10);
    walls.create(wallleft.x, wallleft.y, 'building').setVisible(false).setSize(10, height);
    walls.create(wallright.x, wallright.y, 'building').setVisible(false).setSize(10, height);

    this.physics.add.collider(this.player, walls);
  }

  update() {
    this.player.handleInput(this.keys);
  }

  onPlayerCollideWithHouse(player, building) {
    this.registry.set('playerPosition', { x: player.x, y: player.y });
  
    const confirmText = this.add.text(player.x, player.y - 50, `按E進入 ${building.name}`, {
      font: '16px Arial',
      fill: '#000000',
      backgroundColor: '#ffffff'
    });
  
    this.input.keyboard.once('keydown-E', () => {
      confirmText.destroy();
      if (building.name === 'house1') {
        this.scene.start('House1Scene');
      } else if (building.name === 'house2') {
        this.scene.start('House2Scene');
      }
    });
  
    // 設置2秒後自動消失
    this.time.delayedCall(1000, () => {
      confirmText.destroy(); // 自動移除提示訊息
    });
  }
  
}
