class Control extends Unit {
    constructor(config) {
        config.tintTexture = CONSTANTS.LANCE_TINT;
        config.characterTexture = CONSTANTS.LANCE;
        
        super(config);

        this.type = CONSTANTS.CONTROL;
        this.description = 'Adds 2 to single unit cooldown anywhere on board'
        this.health = 20;
        this.defense = 0;
        this.offense = 0;
        this.range = '-';
        this.movement = 4;
        this.dodge = .1;
        this.block = .1;
        this.cooldown = 3;
        
        // TODO: TEMPORARY UNTIL I GET UNIQUE UNITS ART - later will use this to set the player's army tint
        super.setTint(CONSTANTS.PINK_TINT);
    }
}