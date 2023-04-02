class Bow extends Unit {
    constructor(config) {
        config.tintTexture = 'lanceTint';
        config.characterTexture = 'lanceCharacter';
        
        super(config);

        this.health = 25;
        this.defense = .05;
        this.offense = 15;
        this.range = 5;
        this.movement = 3;
        this.dodge = .2;
        this.block = .1;
        this.cooldown = 2;
        
        // TODO: TEMPORARY UNTIL I GET UNIQUE UNITS ART - later will use this to set the player's army tint
        super.setTint(CONSTANTS.TEAL_TINT);
    }
}