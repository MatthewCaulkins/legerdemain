class Constants {
    constructor() {
        this.ATTACK_SOUND = 'attackSound';
        this.DODGE = 'dodge';
        this.MOVE_UNIT = 'moveUnit';

        // Text inputs
        this.ARMY_NAME = 'armyName';

        // Tile Orientations
        this.BOARD_ORIENTATION = 0.785398;
        this.GRID_ORIENTATION = 0;

        // Hex codes
        this.WHITE = '#ffffff';
        this.BLACK = '#000000';

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

        // Text styles
        this.DARK_TEXT_STYLE = { fontFamily: 'Georgia', color: this.BLACK, fontSize: 12 };
        this.LIGHT_TEXT_STYLE = { fontFamily: 'Raleway', color: this.WHITE, fontSize: 12 };
        this.HUD_STYLE = { fontFamily: 'Oswald', color: this.WHITE, fontSize: 20, fontStyle: 'bold' };
        
        // Scenes
        this.HOME_SCENE = 'HomeScene';
        this.PLAY_SCENE = 'PlayScene';
        this.SETUP_SCENE = 'SetupScene';

        // Events
        this.ACCEPT_ARMY = 'acceptArmy';
        this.ACCEPT_BOARD_PLACEMENT = 'acceptBoardPlacement';
        this.ARMY_DELETED = 'armyDeleted';
        this.ARMY_SAVED = 'armySaved';
        this.BACK_TO_HOME = 'backToHome';
        this.CLEAR_ARMY = 'clearArmy';
        this.CREATE_HUD = 'createHUD';
        this.CREATE_NEW_ROOM = 'createNewRoom';
        this.CURRENT_PLAYERS = 'currentPlayers';
        this.DELETE_ARMY = 'deleteArmy';
        this.DISCONNECT_PLAYER = 'disconnectPlayer';
        this.GAME_LOADED = 'gameLoaded';
        this.GAME_SCREEN_REACHED = 'gameScreenReached';
        this.GET_PLAYER_DATA = 'getPlayerData';
        this.GET_ROOMS = 'getRooms';
        this.JOIN_ROOM = 'joinRoom';
        this.LEAVE_ROOM = 'leaveRoom';
        this.LIST_ROOMS = 'listRooms';
        this.LOAD_PLAY_SCENE = 'loadPlayScene';
        this.LOAD_SETUP_SCENE = 'loadSetupScene';
        this.NEW_PLAYER = 'newPlayer';
        this.PLAYER_ARMIES = 'playerArmies';
        this.QUIT_GAME = 'quitGame';
        this.SAVE_ARMY = 'saveArmy';

        // Mouse events
        this.POINTER_DOWN = 'pointerdown';
        this.POINTER_OUT = 'pointerout';
        this.POINTER_OVER = 'pointerover';
        this.POINTER_UP = 'pointerup';

        // Game phases
        this.ARMY_SELECT_PHASE = 'armySelectPhase';
        this.GAME_PHASE = 'gamePhase';
        this.REVIEW_PHASE = 'reviewPhase';  // This is extra right now

        // Player phase
        this.PLAYER_ONE_PHASE = 'playerOnePhase';
        this.PLAYER_TWO_PHASE = 'playerTwoPhase';

        // Player actions
        this.MID_ACTION = 'midAction';
        this.SELECTION_ACTION = 'selectionAction';
        this.MOVEMENT_ACTION = 'movementAction';
        this.DIRECTION_ACTION = 'directionAction';
        this.ACTION_ACTION = 'actionAction';

        // Directions
        this.TOP = 'top';
        this.BOTTOM = 'bottom';
        this.LEFT = 'left';
        this.RIGHT = 'right';

        // Direction buttons
        this.TOP_DIRECTION_BUTTON = 'topDirectionButton';
        this.RIGHT_DIRECTION_BUTTON = 'rightDirectionButton';
        this.BOTTOM_DIRECTION_BUTTON = 'bottomDirectionButton';
        this.LEFT_DIRECTION_BUTTON = 'leftDirectionButton';

        // Prefabs
        this.TILE = 'tile';
        this.ORB = 'orb';
        this.ARROW = 'arrow';
        this.ACTION_BUTTON_CONTAINER = 'actionButtonContainer';
        this.MATCHMAKING_TILE = 'matchmakingTile';
        this.ACTION_BUTTON = 'actionButton';
        this.MOVE_BUTTON = 'moveButton';
        this.DIRECTION_BUTTON = 'direcetionButton';
        this.WAIT_BUTTON = 'waitButton';

        // Orb frames
        this.EMPTY = 'empty';
        this.FILLED = 'filled';
        this.ACTIVE = 'active';

        // Army arrow frames
        this.ON = 'on';
        this.HOVER = 'hover';
        this.OFF = 'off';

        // Play button frames
        this.ACTION_BUTTON_ON = 'actionButtonOn';
        this.ACTION_BUTTON_HOVER = 'actionButtonHover';
        this.ACTION_BUTTON_ACTIVE = 'actionButtonActive';
        this.ACTION_BUTTON_OFF = 'actionButtonOff';
        this.MOVE_BUTTON_ON = 'moveButtonOn';
        this.MOVE_BUTTON_HOVER = 'moveButtonHover';
        this.MOVE_BUTTON_ACTIVE = 'moveButtonActive';
        this.MOVE_BUTTON_OFF = 'moveButtonOff';
        this.DIRECTION_BUTTON_ON = 'directionButtonOn';
        this.DIRECTION_BUTTON_HOVER = 'directionButtonHover';
        this.DIRECTION_BUTTON_ACTIVE = 'directionButtonActive';
        this.DIRECTION_BUTTON_OFF = 'directionButtonOff';
        this.WAIT_BUTTON_ON = 'waitButtonOn';
        this.WAIT_BUTTON_HOVER = 'waitButtonHover';
        this.WAIT_BUTTON_ACTIVE = 'waitButtonActive';
        this.WAIT_BUTTON_OFF = 'waitButtonOff';

        // Units
        this.AXE = 'axe';
        this.AXE_TINT = 'axeTint';
        this.BOW = 'bow';
        this.BOW_TINT = 'bowTint';
        this.CONTROL = 'control';
        this.CONTROL_TINT = 'controlTint';
        this.DAGGER = 'dagger';
        this.DAGGER_TINT = 'daggerTint';
        this.HEALING = 'healing';
        this.HEALING_TINT = 'healingTint';
        this.LANCE = 'lance';
        this.LANCE_TINT = 'lanceTint';
        this.SHIELD = 'shield';
        this.SHIELD_TINT = 'shieldTint';
        this.SORCERY = 'sorcery';
        this.SORCERY_TINT = 'sorceryTint';
        this.SWORD = 'sword';
        this.SWORD_TINT = 'swordTint';

        // Unit animation frames
        this.LANCE_TOP_IDLE = 'lanceTopIdle';
        this.LANCE_RIGHT_IDLE = 'lanceRightIdle';
        this.LANCE_BOTTOM_IDLE = 'lanceBottomIdle';
        this.LANCE_LEFT_IDLE = 'lanceLeftIdle';

        // Unit tint animation frames
        this.LANCE_TINT_TOP_IDLE = 'lanceTintTopIdle';
        this.LANCE_TINT_RIGHT_IDLE = 'lanceTintRightIdle';
        this.LANCE_TINT_BOTTOM_IDLE = 'lanceTintBottomIdle';
        this.LANCE_TINT_LEFT_IDLE = 'lanceTintLeftIdle';

        // Stats
        this.HEALTH = 'Health';
        this.DEFENSE = 'Defense';
        this.OFFENSE = 'Offense';
        this.RANGE = 'Range';
        this.MOVEMENT = 'Movement';
        this.DODGE = 'Dodge';
        this.BLOCK = 'Block';
        this.COOLDOWN = 'Cooldown';

        // Setup scene notices
        this.ARMY_SAVED_NOTICE = 'armySavedNotice';
        this.ARMY_SAVED_NOTICE_TEXT = 'Army Saved';
        this.ARMY_DELETED_NOTICE = 'armyDeletedNotice';
        this.ARMY_DELETED_NOTICE_TEXT = 'Army Deleted';
        this.NEED_UNITS_NOTICE = 'needUnitsNotice';
        this.NEED_UNITS_NOTICE_TEXT = 'Your army needs at least 1 unit';
        this.NEED_NAME_NOTICE = 'needNameNotice';
        this.NEED_NAME_NOTICE_TEXT = 'Your army needs a name';
    }
}