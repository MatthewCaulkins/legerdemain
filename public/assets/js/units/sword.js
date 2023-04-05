class Sword extends Unit {
    constructor(config) {
        config.tintTexture = 'swordTint';
        config.characterTexture = 'sword';
        
        super(config);

        this.type = 'sword';
        this.description = 'Can dash to attack an extra tile away in a straight line';
        this.health = 30;
        this.defense = .05;
        this.offense = 18;
        this.range = 1;
        this.movement = 4;
        this.dodge = .25;
        this.block = .25;
        this.cooldown = 1;
        
        // TODO: TEMPORARY UNTIL I GET UNIQUE UNITS ART - later will use this to set the player's army tint
        super.setTint(CONSTANTS.GREEN_TINT);
    }
}