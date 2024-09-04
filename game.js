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
let platforms;

function preload() {
  this.load.image('background', 'assets/background.jpg');
  this.load.image('house', 'assets/house.png');
  this.load.image('character', 'assets/character.jpg');
}

function create() {
  const { width, height } = this.scale;

  // 添加背景
  const background = this.add.image(0, 0, 'background').setOrigin(0, 0);
  background.setDisplaySize(width, height);

  // 建立靜態平台群組
  platforms = this.physics.add.staticGroup();

  // 添加地面和平台，並為每個平台設置名稱
  const ground1 = platforms.create(400, 568, 'house').setName('house1');
  const ground2 = platforms.create(600, 400, 'house').setName('house2');

  // 添加玩家角色
  player = this.physics.add.sprite(100, 450, 'character');
  player.setBounce(0.2); // 設定彈跳
  player.setCollideWorldBounds(true); // 防止超出邊界

  // 添加玩家與平台間的碰撞
  this.physics.add.collider(player, platforms, onPlayerCollide, null, this);

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

// 玩家碰撞事件處理函數
function onPlayerCollide(player, ground) {
  if (ground.name === 'house1') {
    // 顯示介面或執行ground1相關的動作
    console.log('Player hit house1');
    showInterface1();
  } else if (ground.name === 'house2') {
    // 顯示介面或執行ground2相關的動作
    console.log('Player hit house2');
    showInterface2();
  }
}

// 定義不同的顯示介面函數
function showInterface1() {
  alert('玩家碰到了 ground1');
}

function showInterface2() {
  alert('玩家碰到了 ground2');
}
