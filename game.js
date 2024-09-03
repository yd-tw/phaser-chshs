// 遊戲設定
const config = {
  type: Phaser.AUTO, // 使用 WebGL 或 Canvas，自動選擇
  width: 800,
  height: 600,
  parent: 'game-container',
  physics: {
    default: 'arcade',
    arcade: {
      //gravity: { y: 0 }, // 垂直方向的重力
      debug: false
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

// 建立遊戲實例
const game = new Phaser.Game(config);

let player;
let cursors;

function preload() {
  // 載入圖片資源
  this.load.image('sky', 'https://labs.phaser.io/assets/skies/space3.png');
  this.load.image('ground', 'https://labs.phaser.io/assets/platforms/platform.png');
  this.load.image('star', 'https://labs.phaser.io/assets/demoscene/star.png');
  this.load.image('dude', 'https://labs.phaser.io/assets/sprites/phaser-dude.png');
}

function create() {
  // 添加背景
  this.add.image(400, 300, 'sky');

  // 建立靜態平台群組
  const platforms = this.physics.add.staticGroup();

  // 添加地面和平台
  platforms.create(400, 568, 'ground').setScale(2).refreshBody();
  platforms.create(600, 400, 'ground');

  // 添加玩家角色
  player = this.physics.add.sprite(100, 450, 'dude');
  player.setBounce(0.2); // 設定彈跳
  player.setCollideWorldBounds(true); // 防止超出邊界

  // 添加玩家與平台間的碰撞
  this.physics.add.collider(player, platforms);

  // 設定鍵盤輸入
  cursors = this.input.keyboard.createCursorKeys();
}

function update() {
  // 更新玩家移動
  if (cursors.left.isDown) {
    player.setVelocityX(-160);
  } else if (cursors.right.isDown) {
    player.setVelocityX(160);
  } else {
    player.setVelocityX(0);
  }

  // 設定玩家跳躍
  if (cursors.up.isDown) {
    player.setVelocityY(-160);
  } else if (cursors.down.isDown) {
    player.setVelocityY(160);
  } else {
    player.setVelocityY(0);
  }
}
