class Dagger extends Unit {
    constructor(config) {
        config.tintTexture = 'lanceTint';
        config.characterTexture = 'lanceCharacter';
        
        super(config);

        this.type = 'dagger';
        this.health = 20;
        this.defense = .05;
        this.offense = 10;
        this.range = 1;
        this.movement = 5;
        this.dodge = .35;
        this.block = .25;
        this.cooldown = 0;

        // TODO: TEMPORARY UNTIL I GET UNIQUE UNITS ART - later will use this to set the player's army tint
        super.setTint(CONSTANTS.ORANGE_TINT);
    }
}