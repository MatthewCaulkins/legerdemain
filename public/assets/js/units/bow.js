class Bow extends Unit {
    constructor(config) {
        super(config);

        this.health = 25;
        this.defense = .05;
        this.offense = 15;
        this.range = 5;
        this.movement = 3;
        this.dodge = .2;
        this.block = .1;
        this.cooldown = 2;
    }
}