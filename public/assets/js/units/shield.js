class Shield extends Unit {
    constructor(config) {
        super(config);

        this.health = 40;
        this.defense = .2;
        this.offense = 8;
        this.range = 1;
        this.movement = 3;
        this.dodge = .05;
        this.block = .4;
        this.cooldown = 2;
    }
}