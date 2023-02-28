var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    },
    scene: {
        preload: preload,
        create: create
    }
};

var game = new Phaser.Game(config);

function preload ()
{
    this.load.setBaseURL('http://labs.phaser.io');

    this.load.image('sky', 'assets/skies/space3.png');
    this.load.image('logo', 'assets/sprites/phaser3-logo.png');
    this.load.image('red', 'assets/particles/red.png');
}

function create ()
{
    this.add.image(400, 300, 'sky');

    var particles = this.add.particles('red');

    var emitter = particles.createEmitter({
        speed: 100,
        scale: { start: 1, end: 0 },
        blendMode: 'ADD'
    });

    var logo = this.physics.add.image(400, 100, 'logo');

    logo.setVelocity(100, 200);
    logo.setBounce(1, 1);
    logo.setCollideWorldBounds(true);

    emitter.startFollow(logo);
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