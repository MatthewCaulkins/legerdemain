class Axe extends Unit {
    constructor(config) {
        super(config);

        this.health = 30;
        this.defense = .1;
        this.offense = 12;
        this.range = 1;
        this.movement = 3;
        this.dodge = .2;
        this.block = .2;
        this.cooldown = 1;
    }
}