class Lance extends Unit {
    constructor(config) {
        config.tintTexture = 'lanceTint';
        config.characterTexture = 'lanceCharacter';

        super(config);

        this.type = 'lance';
        this.description = 'Can attack 2 spaces away; if a straight line, hits both';
        this.health = 30;
        this.defense = .1;
        this.offense = 15;
        this.range = 2;
        this.movement = 3;
        this.dodge = .15;
        this.block = .35;
        this.cooldown = 1;

        // TODO: TEMPORARY UNTIL I GET UNIQUE UNITS ART - later will use this to set the player's army tint
        super.setTint(CONSTANTS.RED_TINT);
    }
}