class Constants {
    constructor() {
        this.ATTACK_SOUND = 'attackSound';
        this.DODGE = 'dodge';
        this.MOVE_UNIT = 'moveUnit';

        this.BOARD_ORIENTATION = 0.785398;
        this.UNITS_ORIENTATION = 0;

        this.WHITE = 0xffffff;
        this.BLACK = 0x000000;

        // Tints
        this.BLUE_TINT = 0x0044ff;
        this.BROWN_TINT = 0x9b530d;
        this.GREEN_TINT = 0x06cb06;
        this.ORANGE_TINT = 0xe9b11a;
        this.PINK_TINT = 0xfb14bc;
        this.PURPLE_TINT = 0x9a12cc;
        this.RED_TINT = 0xff4400;
        this.TEAL_TINT = 0x12eedc;
        this.YELLOW_TINT = 0xe8ef36;

        // Scenes
        this.HOME_SCENE = 'HomeScene';
        this.PLAY_SCENE = 'PlayScene';
        this.SETUP_SCENE = 'SetupScene';

        // Text styles
        this.DARK_TEXT_STYLE = { fontFamily: 'Georgia', color: '#000', fontSize: '12px' };
        this.LIGHT_TEXT_STYLE = { fontFamily: 'Georgia', color: '#fff', fontSize: '12px' };
        this.HUD_STYLE = { fontFamily: 'Bungee', color: '#fff', fontSize: '24px', fontStyle: 'strong' };

        // Events
        this.ACCEPT_BOARD_PLACEMENT = 'acceptBoardPlacement';
        this.ARMY_SAVED = 'armySaved';
        this.BACK_TO_HOME = 'backToHome';
        this.CREATE_HUD = 'createHUD';
        this.CURRENT_PLAYERS = 'currentPlayers';
        this.DISCONNECT_PLAYER = 'disconnectPlayer';
        this.GAME_LOADED = 'gameLoaded';
        this.GAME_SCREEN_REACHED = 'gameScreenReached';
        this.LOAD_PLAY_SCENE = 'loadPlayScene';
        this.LOAD_SETUP_SCENE = 'loadSetupScene';
        this.NEW_PLAYER = 'newPlayer';
        this.POINTER_DOWN = 'pointerdown';
        this.POINTER_OUT = 'pointerout';
        this.POINTER_OVER = 'pointerover';
        this.QUIT_GAME = 'quitGame';
        this.SAVE_ARMY = 'saveArmy';

        // Directions
        this.TOP = 'top';
        this.DOWN = 'down';
        this.LEFT = 'left';
        this.RIGHT = 'right';

        // Units
        this.AXE = 'axe';
        this.BOW = 'bow';
        this.CONTROL = 'control';
        this.DAGGER = 'dagger';
        this.HEALING = 'healing';
        this.LANCE = 'lance';
        this.SHIELD = 'shield';
        this.SORCERY = 'sorcery';
        this.SWORD = 'sword';

        // Stats
        this.HEALTH = 'Health';
        this.DEFENSE = 'Defense';
        this.OFFENSE = 'Offense';
        this.RANGE = 'Range';
        this.MOVEMENT = 'Movement';
        this.DODGE = 'Dodge';
        this.BLOCK = 'Block';
        this.COOLDOWN = 'Cooldown';
    }
}