const gameConfig = {
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    parent: 'game-container',
    width: '100%',
    height: '100%',
  },
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
    },
  },
  scene: {
    preload: preloadAssets,
    create: createGameObjects,
    update: updatePlayerMovement,
  },
};

const game = new Phaser.Game(gameConfig);

let player;
let cursors;
let buildings;

function preloadAssets() {
  this.load.image('background', 'assets/background.jpg');
  this.load.image('building', 'assets/house.png');
  this.load.image('player', 'assets/player.jpg');
}

function createGameObjects() {
  const { width, height } = this.scale;

  // 添加背景
  const background = this.add.image(0, 0, 'background').setOrigin(0, 0);
  background.setDisplaySize(width, height);

  // 建立靜態平台群組
  buildings = this.physics.add.staticGroup();

  // 添加房子，並為每個房子設置名稱
  const house1 = buildings.create(400, 568, 'building').setName('house1');
  const house2 = buildings.create(600, 400, 'building').setName('house2');

  // 添加玩家角色
  player = this.physics.add.sprite(100, 450, 'player');
  player.setBounce(0.2); // 設定彈跳效果
  player.setCollideWorldBounds(true); // 防止超出邊界

  // 添加玩家與房子間的碰撞
  this.physics.add.collider(player, buildings, onPlayerCollideWithHouse, null, this);

  // 設定鍵盤輸入
  cursors = this.input.keyboard.createCursorKeys();
}

function updatePlayerMovement() {
  // 玩家移動邏輯
  if (cursors.left.isDown) {
    player.setVelocityX(-160);
  } else if (cursors.right.isDown) {
    player.setVelocityX(160);
  } else {
    player.setVelocityX(0);
  }

  if (cursors.up.isDown) {
    player.setVelocityY(-160);
  } else if (cursors.down.isDown) {
    player.setVelocityY(160);
  } else {
    player.setVelocityY(0);
  }
}

// 玩家碰撞房子的事件處理函數
function onPlayerCollideWithHouse(player, building) {
  if (building.name === 'house1') {
    // 顯示介面或執行house1相關的動作
    console.log('Player hit house1');
    showHouse1Interface();
  } else if (building.name === 'house2') {
    // 顯示介面或執行house2相關的動作
    console.log('Player hit house2');
    showHouse2Interface();
  }
}

// 顯示house1的介面
function showHouse1Interface() {
  alert('玩家碰到了 house1');
}

// 顯示house2的介面
function showHouse2Interface() {
  alert('玩家碰到了 house2');
}
