class Lance extends Unit {
    constructor(config) {
        super(config);

        this.health = 30;
        this.defense = .1;
        this.offense = 15;
        this.range = 2;
        this.movement = 3;
        this.dodge = .15;
        this.block = .35;
        this.cooldown = 1;
    }
}