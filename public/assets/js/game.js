var isMobile = navigator.userAgent.indexOf('Mobile');
if (isMobile == -1) {
    isMobile = navigator.userAgent.indexOf('Tablet');
}

var width = isMobile ? window.innerWidth : 800;
var height = isMobile ? window.innerHeight : 600;

var config = {
    type: Phaser.AUTO,
    width: width,
    height: height,
    scene: [TitleScene]
    // physics: {
    //     default: 'arcade',
    //     arcade: {
    //         gravity: { y: 200 }
    //     }
    // },
    // scene: {
    //     preload: preload,
    //     create: create
    // }
};

var alignmentConfig = {
    scene: this,
    rows: 10,
    columns: 10,
    height: height,
    width: width
}

var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('tilemap', 'assets/img/tilemap.png');
}

function create ()
{
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