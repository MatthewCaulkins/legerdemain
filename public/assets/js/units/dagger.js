class Dagger extends Unit {
    constructor(config) {
        config.tintTexture = CONSTANTS.LANCE_TINT;
        config.characterTexture = CONSTANTS.LANCE;
        
        super(config);

        this.type = CONSTANTS.DAGGER;
        this.description = 'Attacks same tile twice';
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