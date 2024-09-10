export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture, scale) {
    super(scene, x, y, texture);
    
    // 添加玩家到場景中
    scene.add.existing(this);
    scene.physics.add.existing(this);

    // 設定玩家的縮放比例
    this.setScale(scale);

    // 使玩家無法超出世界邊界
    this.setCollideWorldBounds(true);

    // 初始化玩家速度或其他屬性
    this.baseSpeed = 150 * scale;
    this.speed = this.baseSpeed; // 預設速度為 baseSpeed
  }

  handleInput(keys) {
    // 檢測 Shift 按鍵是否被按下，如果按下則加速
    if (keys.shift.isDown) {
      this.speed = this.baseSpeed * 2; // 提升速度
    } else {
      this.speed = this.baseSpeed; // 恢復到基本速度
    }

    // 處理方向鍵和 WASD 輸入
    if (keys.left.isDown || keys.A.isDown) {
      this.setVelocityX(-this.speed);
    } else if (keys.right.isDown || keys.D.isDown) {
      this.setVelocityX(this.speed);
    } else {
      this.setVelocityX(0);
    }

    if (keys.up.isDown || keys.W.isDown) {
      this.setVelocityY(-this.speed);
    } else if (keys.down.isDown || keys.S.isDown) {
      this.setVelocityY(this.speed);
    } else {
      this.setVelocityY(0);
    }
  }
}
