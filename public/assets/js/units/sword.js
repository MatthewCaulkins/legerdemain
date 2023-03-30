class Sword extends Unit {
    constructor(config) {
        super(config);

        this.health = 30;
        this.defense = .05;
        this.offense = 18;
        this.range = 2;
        this.movement = 4;
        this.dodge = .25;
        this.block = .25;
        this.cooldown = 1;
    }
}