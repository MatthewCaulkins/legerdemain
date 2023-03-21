// import IsoPlugin from "phaser3-plugin-isometric";

// import PlayScene from './scenes/playScene.js';

var isMobile = navigator.userAgent.indexOf('Mobile');
if (isMobile == -1) {
    isMobile = navigator.userAgent.indexOf('Tablet');
}

var gameWidth = isMobile >= 0 ? window.innerWidth : 1200;
var gameHeight = isMobile >= 0 ? window.innerHeight : 900;

var config = {
    type: Phaser.AUTO,
    height: gameHeight,
    width: gameWidth,
    scene: [ArmySelectScene, TitleScene], // , boardTest ArmySelectScene
    //parent: 'game-container',
    
    // physics: {
    //     default: 'arcade',
    //     arcade: {
    //         gravity: { y: 200 }
    //     }
    // },
    // scene: {
    //     preload: preload,
    //     create: create  // This will use these ones on this file instead of the ones in the scene file
    // }
    // scale: {
    //     mode: Phaser.Scale.FIT,
    //     autoCenter: Phaser.Scale.CENTER_BOTH
    // }
};

var alignmentConfig = {
    scene: this,
    rows: 10,
    columns: 10,
    height: gameHeight,
    width: gameWidth
}

var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('tilemap', 'assets/img/tilemap.png');
}

function create ()
{
    // console.log('create function');
    // const self = this;
    // this.socket = io();
    // this.socket.on('currentPlayers', function(players) {
    //     console.log('Current players called');
    //     console.log(players);
    //     Object.keys(players).forEach(id => {
    //         if (players[id].playerId === self.socket.io) {
    //             addPlayer(self, players[id]);
    //         };
    //     });
    // });

    // this.add.sprite(150, 150, 'tilemap');
    // var graphics = this.add.graphics();

    // graphics.lineStyle(2, 0xff0000);

    // for (let i = 0; i < alignmentConfig.width; i += (alignmentConfig.width / alignmentConfig.columns)) {
    //     graphics.moveTo(i, 0);
    //     graphics.lineTo(i, alignmentConfig.height);
    // }
    // graphics.strokePath();
    // this.grid = new AlignmentGrid(alignmentConfig);
    // this.grid.drawGrid();
    // var particles = this.add.particles('red');

    // var emitter = particles.createEmitter({
    //     speed: 100,
    //     scale: { start: 1, end: 0 },
    //     blendMode: 'ADD'
    // });

    // var logo = this.physics.add.image(400, 100, 'logo');

    // logo.setVelocity(100, 200);
    // logo.setBounce(1, 1);
    // logo.setCollideWorldBounds(true);

    // emitter.startFollow(logo);
}

// function addPlayer(self, playerInfo) {
//     // self.ship = self.physics.add.image(playerInfo.x, playerInfo.y, 'ship').setOrigin(0.5, 0.5).setDisplaySize(53, 40);
//     // if (playerInfo.team === 'blue') {
//     //   self.ship.setTint(0x0000ff);
//     // } else {
//     //   self.ship.setTint(0xff0000);
//     // }
//     // self.ship.setDrag(100);
//     // self.ship.setAngularDrag(100);
//     // self.ship.setMaxVelocity(200);
//     console.log(`Add Player ${self}`);
//     console.log(playerInfo);
// }

// $.ajax({
//     type: 'GET',
//     url: '/scores',
//     success: function(data) {
//         game = new Phaser.Game(config);
//         scores = data;
//     },
//     error: function(xhr) {
//         console.log(xhr);
//     }
// });

// let game, scores;
// class Highscore extends Phaser.Scene {
//   constructor() {
//     super({
//       key: 'Highscore',
//       active: true
//     });
//     this.scores = [];
//   }
//   preload() {
//     this.load.bitmapFont('arcade', 'assets/arcade.png', 'assets/arcade.xml');
//   }
//   create() {
//     this.add.bitmapText(100, 110, 'arcade', 'RANK  SCORE   NAME').setTint(0xffffff);
//     for (let i = 1; i < 6; i++) {
//       if (scores[i-1]) {
//         this.add.bitmapText(100, 160 + 50 * i, 'arcade', ` ${i}      ${scores[i-1].highScore}    ${scores[i-1].name}`).setTint(0xffffff);
//       } else {
//         this.add.bitmapText(100, 160 + 50 * i, 'arcade', ` ${i}      0    ---`).setTint(0xffffff);
//       }
//     }
//   }
// }
// let config = {
//   type: Phaser.AUTO,
//   parent: 'phaser-example',
//   width: 800,
//   height: 600,
//   pixelArt: true,
//   scene: [Highscore]
// };
// $.ajax({
//   type: 'GET',
//   url: '/scores',
//   success: function(data) {
//     game = new Phaser.Game(config);
//     scores = data;
//   },
//   error: function(xhr) {
//     console.log(xhr);
//   }
// });