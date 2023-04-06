class Shield extends Unit {
    constructor(config) {
        config.tintTexture = 'lanceTint';
        config.characterTexture = 'lanceCharacter';
        
        super(config);

        this.type = CONSTANTS.SHIELD;
        this.description = 'Strongest defense';
        this.health = 40;
        this.defense = .2;
        this.offense = 8;
        this.range = 1;
        this.movement = 3;
        this.dodge = .05;
        this.block = .4;
        this.cooldown = 2;

        // TODO: TEMPORARY UNTIL I GET UNIQUE UNITS ART - later will use this to set the player's army tint
        super.setTint(CONSTANTS.BLUE_TINT);
    }
}