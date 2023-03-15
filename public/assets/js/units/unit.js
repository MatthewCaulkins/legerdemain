// GameObject Unit base class
class Unit extends Phaser.GameObjects.Image {
    constructor(scene, x, y, texture) { //}, motion, direction, distance) {
        super(scene, x, y, texture); //, direction.offset);

        // this.startX = x;
        // this.startY = y;
        // this.distance = distance;

        // this.motion = motion;
        // this.anim = anims[motion];
        // this.direction = directions[direction];
        // this.speed = 0.15;
        // this.f = this.anim.startFrame;

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
