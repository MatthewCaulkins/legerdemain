class Axe extends Unit {
    constructor(config) {
        config.tintTexture = 'lanceTint';
        config.characterTexture = 'lanceCharacter';
        
        super(config);

        this.type = 'axe';
        this.description = 'Attacks all adjacent tiles';
        this.health = 30;
        this.defense = .1;
        this.offense = 12;
        this.range = 1;
        this.movement = 3;
        this.dodge = .2;
        this.block = .2;
        this.cooldown = 1;
        
        // TODO: TEMPORARY UNTIL I GET UNIQUE UNITS ART - later will use this to set the player's army tint
        super.setTint(CONSTANTS.BROWN_TINT);
    }
}