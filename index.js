import MainScene from './src/MainScene.js';
import House1Scene from './src/House1Scene.js';
import House2Scene from './src/House2Scene.js';

const gameConfig = {
  type: Phaser.AUTO,
  backgroundColor: '#F3ECE0',
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
  scene: [MainScene, House1Scene, House2Scene],
};

const game = new Phaser.Game(gameConfig);
