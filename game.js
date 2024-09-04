const config = {
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    parent: 'game-container',
    width: '100%',
    height: '100%'
  },
  physics: {
    default: 'arcade',
    arcade: {
      debug: false
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

const game = new Phaser.Game(config);

let player;
let cursors;

function preload() {
  this.load.image('sky', 'background.jpg');
  this.load.image('ground', 'chshs.png');
  this.load.image('dude', 'cat.jpg');
}

function create() {
  const { width, height } = this.scale;

  // 添加背景
  const background = this.add.image(0, 0, 'sky').setOrigin(0, 0);
  background.setDisplaySize(width, height);

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
