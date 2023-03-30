class Sorcery extends Unit {
    constructor(config) {
        super(config);

        this.health = 20;
        this.defense = 0;
        this.offense = 15;
        this.range = 5;
        this.movement = 3;
        this.dodge = .1;
        this.block = .1;
        this.cooldown = 3;
    }
}