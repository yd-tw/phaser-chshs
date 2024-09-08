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
  
    // 添加背景圖片，調整其比例以適應畫布
    const background = this.add.image(0, 0, 'background').setOrigin(0.5, 0.5);
    const bgScaleX = width / background.width;
    const bgScaleY = height / background.height;
    
    // 設定縮放比例，並保持圖片不變形
    const scale = Math.min(bgScaleX, bgScaleY);
    background.setScale(scale);
    
    // 設定圖片置中對齊畫布
    background.setPosition(width / 2, height / 2);
  
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
      this.scene.start('House1Scene'); // 切換到House1場景
    } else if (building.name === 'house2') {
      console.log('Player hit house2');
      this.scene.start('House2Scene'); // 切換到House2場景
    }
  }
}
