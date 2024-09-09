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
    this.speed = 160;
  }

  handleInput(cursors) {
    if (cursors.left.isDown) {
      this.setVelocityX(-this.speed);
    } else if (cursors.right.isDown) {
      this.setVelocityX(this.speed);
    } else {
      this.setVelocityX(0);
    }

    if (cursors.up.isDown) {
      this.setVelocityY(-this.speed);
    } else if (cursors.down.isDown) {
      this.setVelocityY(this.speed);
    } else {
      this.setVelocityY(0);
    }
  }
}
