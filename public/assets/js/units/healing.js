class Healing extends Unit {
    constructor(config) {
        super(config);

        this.health = 18;
        this.defense = 0;
        this.offense = 15;
        this.range = 5;
        this.movement = 3;
        this.dodge = .15;
        this.block = 0;
        this.cooldown = 4;
    }
}