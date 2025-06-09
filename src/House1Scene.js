// House1Scene.js
export default class House1Scene extends Phaser.Scene {
  constructor() {
    super({ key: 'House1Scene' });
  }

  preload() {
    // 在這裡載入這個場景需要的資源
    this.load.image('house1Background', '/house1_background.jpg');
  }

  create() {
    const { width, height } = this.scale;
    // 設置場景背景或其他場景元素
    const background = this.add.image(0, 0, 'house1Background').setOrigin(0, 0);
    background.setDisplaySize(width, height);
    // 添加返回到主場景的按鈕或鍵盤事件
    this.input.keyboard.on('keydown-ESC', () => {
      this.scene.start('MainScene'); // 返回到主場景
    });
  }
}
