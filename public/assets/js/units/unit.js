// GameObject Unit base class
class Unit extends Phaser.GameObjects.Container {
    constructor(scene, player, tile, tintTexture, characterTexture) { //}, motion, direction, distance) {
        // Create image game objects for this container
        const tint = scene.add.image(0, 0, tintTexture);
        const character = scene.add.image(0, 0, characterTexture);

        const width = character.displayWidth;
        const height = character.displayHeight;
        // const x = tile.x;
        // const y = tile.y;

        super(scene, 0, 0, [tint, character]);

        this.tint = tint;
        this.character = character;

        //this.scene.boardContainer.add(this.tint);
        //this.scene.boardContainer.add(this.character);


        // Set the size of the container

        this.depth = tile.depth;

        this.tint.setDepth(this.depth);
        this.character.setDepth(this.depth);

        // Move this container to the tile it is on
        this.tile = tile;
        this.setSize(width, height);
        this.x = tile.x;
        this.y = tile.y;

        console.log('The dimensions of this container are ');
        console.log(width);
        console.log(height);
        console.log('The position of this container is');
        console.log(this.x);
        console.log(this.y);
        // TODO: Change these to sprites eventually
        // this.startX = x;
        // this.startY = y;
        // this.distance = distance;

        // this.motion = motion;
        // this.anim = anims[motion];
        // this.direction = directions[direction];
        // this.speed = 0.15;
        // this.f = this.anim.startFrame;

        // Universal attributes
        this.scene = scene;
        this.player = player;

        this.health;
        this.defense;
        this.offense;
        this.range;
        this.movement;
        this.dodge;
        this.block;
        this.cooldown;

        this.orientation;


        this.scene.boardContainer.add(this);
        // this.depth = y + 64;

        // scene.time.delayedCall(this.anim.speed * 1000, this.changeFrame, [], this);
    }

    changeFrame ()
    {
        // this.f++;

        // var delay = this.anim.speed;

        // if (this.f === this.anim.endFrame)
        // {
        //     switch (this.motion)
        //     {
        //         case 'walk':
        //             this.f = this.anim.startFrame;
        //             this.frame = this.texture.get(this.direction.offset + this.f);
        //             scene.time.delayedCall(delay * 1000, this.changeFrame, [], this);
        //             break;

        //         case 'attack':
        //             delay = Math.random() * 2;
        //             scene.time.delayedCall(delay * 1000, this.resetAnimation, [], this);
        //             break;

        //         case 'idle':
        //             delay = 0.5 + Math.random();
        //             scene.time.delayedCall(delay * 1000, this.resetAnimation, [], this);
        //             break;

        //         case 'die':
        //             delay = 6 + Math.random() * 6;
        //             scene.time.delayedCall(delay * 1000, this.resetAnimation, [], this);
        //             break;
        //     }
        // }
        // else
        // {
        //     this.frame = this.texture.get(this.direction.offset + this.f);

        //     scene.time.delayedCall(delay * 1000, this.changeFrame, [], this);
        // }
    }

    resetAnimation ()
    {
        // this.f = this.anim.startFrame;

        // this.frame = this.texture.get(this.direction.offset + this.f);

        // scene.time.delayedCall(this.anim.speed * 1000, this.changeFrame, [], this);
    }

    update ()
    {
        // if (this.motion === 'walk')
        // {
        //     this.x += this.direction.x * this.speed;

        //     if (this.direction.y !== 0)
        //     {
        //         this.y += this.direction.y * this.speed;
        //         this.depth = this.y + 64;
        //     }

        //     //  Walked far enough?
        //     if (Phaser.Math.Distance.Between(this.startX, this.startY, this.x, this.y) >= this.distance)
        //     {
        //         this.direction = directions[this.direction.opposite];
        //         this.f = this.anim.startFrame;
        //         this.frame = this.texture.get(this.direction.offset + this.f);
        //         this.startX = this.x;
        //         this.startY = this.y;
        //     }
        // }
    }
}
