class Control extends Unit {
    constructor(config) {
        super(config);

        this.health = 20;
        this.defense = 0;
        this.offense = 0;
        this.range = 4;
        this.movement = 4;
        this.dodge = .1;
        this.block = .1;
        this.cooldown = 3;
    }
}