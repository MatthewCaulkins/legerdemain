class Control extends Unit {
    constructor(config) {
        config.tintTexture = 'lanceTint';
        config.characterTexture = 'lanceCharacter';
        
        super(config);

        this.health = 20;
        this.defense = 0;
        this.offense = 0;
        this.range = 4;
        this.movement = 4;
        this.dodge = .1;
        this.block = .1;
        this.cooldown = 3;
        
        // TODO: TEMPORARY UNTIL I GET UNIQUE UNITS ART - later will use this to set the player's army tint
        super.setTint(CONSTANTS.PINK_TINT);
    }
}