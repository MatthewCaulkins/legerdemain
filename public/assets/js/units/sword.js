class Sword extends Unit {
    constructor(config) {
        config.tintTexture = 'lanceTint';
        config.characterTexture = 'lanceCharacter';
        
        super(config);

        this.type = 'sword';
        this.health = 30;
        this.defense = .05;
        this.offense = 18;
        this.range = 2;
        this.movement = 4;
        this.dodge = .25;
        this.block = .25;
        this.cooldown = 1;
        
        // TODO: TEMPORARY UNTIL I GET UNIQUE UNITS ART - later will use this to set the player's army tint
        super.setTint(CONSTANTS.GREEN_TINT);
    }
}