class Dagger extends Unit {
    constructor(config) {
        super(config);

        this.health = 20;
        this.defense = .05;
        this.offense = 10;
        this.range = 1;
        this.movement = 5;
        this.dodge = .35;
        this.block = .25;
        this.cooldown = 0;
    }
}