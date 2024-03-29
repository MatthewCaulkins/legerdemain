class Constants {
    constructor() {
        // Text inputs
        this.ARMY_NAME = 'armyName';

        // Tile Orientations
        this.BOARD_ORIENTATION = 0.785398;
        this.GRID_ORIENTATION = 0;
        this.MATCHMAKING_NAME_ORIENTATION = -1.5708;

        // Screen backgrounds
        this.HOME_SCREEN_BACKGROUND = 'homeScreenBackground';
        this.SETUP_SCREEN_BACKGROUND = 'setupScreenBackground';
        this.GAME_SCREEN_BACKGROUND = 'gameScreenBackground';
        this.SETUP_SCREEN_BORDER = 'setupScreenBorder';

        // Buttons
        this.ACCEPT_BUTTON = 'acceptButton';
        this.ACCEPT_BUTTON_DEFAULT = 'acceptButtonDefault';
        this.ACCEPT_BUTTON_HOVER = 'acceptButtonHover';
        this.ACCEPT_BUTTON_DOWN = 'acceptButtonDown';
        this.ARMY_SETUP_BUTTON = 'armySetupButton';
        this.ARMY_SETUP_BUTTON_DEFAULT = 'armySetupButtonDefault';
        this.ARMY_SETUP_BUTTON_HOVER = 'armySetupButtonHover';
        this.ARMY_SETUP_BUTTON_DOWN = 'armySetupButtonDown';
        this.BACK_BUTTON = 'backButton';
        this.BACK_BUTTON_DEFAULT = 'backButtonDefault';
        this.BACK_BUTTON_HOVER = 'backButtonHover';
        this.BACK_BUTTON_DOWN = 'backButtonDown';
        this.CLEAR_ARMY_BUTTON = 'clearArmyButton';
        this.CLEAR_ARMY_BUTTON_DEFAULT = 'clearArmyButtonDefault';
        this.CLEAR_ARMY_BUTTON_HOVER = 'clearArmyButtonHover';
        this.CLEAR_ARMY_BUTTON_DOWN = 'clearArmyButtonDown';
        this.QUIT_BUTTON = 'quitButton';
        this.QUIT_BUTTON_DEFAULT = 'quitButtonDefault';
        this.QUIT_BUTTON_HOVER = 'quitButtonHover';
        this.QUIT_BUTTON_DOWN = 'quitButtonDown';
        this.SAVE_ARMY_BUTTON = 'saveArmyButton';
        this.SAVE_ARMY_BUTTON_DEFAULT = 'saveArmyButtonDefault';
        this.SAVE_ARMY_BUTTON_HOVER = 'saveArmyButtonHover';
        this.SAVE_ARMY_BUTTON_DOWN = 'saveArmyButtonDown';
        this.SELECT_ARMY_BUTTON = 'selectArmyButton';
        this.SELECT_ARMY_BUTTON_DEFAULT = 'selectArmyButtonDefault';
        this.SELECT_ARMY_BUTTON_HOVER = 'selectArmyButtonHover';
        this.SELECT_ARMY_BUTTON_DOWN = 'selectArmyButtonDown';
        this.TUTORIAL_BUTTON = 'tutorialButton';
        this.TUTORIAL_BUTTON_DEFAULT = 'tutorialButtonDefault';
        this.TUTORIAL_BUTTON_HOVER = 'tutorialButtonHover';
        this.TUTORIAL_BUTTON_DOWN = 'tutorialButtonDown';
        this.NEXT_BUTTON = 'nextButton';
        this.NEXT_BUTTON_DEFAULT = 'nextButtonDefault';
        this.NEXT_BUTTON_HOVER = 'nextButtonHover';
        this.NEXT_BUTTON_DOWN = 'nextButtonDown';
        this.PREVIOUS_BUTTON = 'previousButton';
        this.PREVIOUS_BUTTON_DEFAULT = 'previousButtonDefault';
        this.PREVIOUS_BUTTON_HOVER = 'previousButtonHover';
        this.PREVIOUS_BUTTON_DOWN = 'previousButtonDown';

        // Sounds
        this.FOOTSTEP = 'footstepSound';
        this.HOME_LOOP = 'homeLoop';
        this.GAME_MUSIC = 'gameMusic';
        this.KNIFE2 = 'knife2';
        this.MESMERIZE = 'mesmerize';
        this.COMET = 'comet';
        this.BOWSTRING = 'bowString';
        this.HEALING = 'healing';
        this.DODGE_SOUND = 'dodgeSound';
        this.BLOCK_SOUND1 = 'blockSound1';
        this.BLOCK_SOUND2 = 'blockSound2';
        this.ARROW_SOUND = 'arrowSound';
        this.BUTTON_SOUND = 'buttonSound';
        this.PICK_UP = 'pickUpSound';
        this.PUT_DOWN = 'putDownSound';
        this.MATCHMAKE_SELECT_SOUND = 'matchmakeSelectSound';
        this.VICTORY_SOUND = 'victorySound';
        this.DEFEAT_SOUND = 'defeatSound';
        
        // End game icons
        this.END_GAME_ICON = 'endGameIcon';
        this.VICTORY = 'victory';
        this.DEFEAT = 'defeat';

        // Hex codes
        this.WHITE = '#ffffff';
        this.BLACK = '#000000';

        this.GREEN_COLOR = {r: 3, g: 108, b: 3, a: 255};
        this.RED_COLOR = {r: 138, g: 36, b: 0, a: 255};

        // Movement speeds
        this.MOVE_SPEED = 500;
        this.DASH_SPEED = 250;
        
        // Tints
        this.BLUE_TINT = 0x0044ff;
        this.BROWN_TINT = 0x9b530d;
        this.GREEN_TINT = 0x06cb06;
        this.GREY_TINT = 0xffffff;
        this.ORANGE_TINT = 0xe9b11a;
        this.PINK_TINT = 0xfb14bc;
        this.PURPLE_TINT = 0x9a12cc;
        this.RED_TINT = 0xff4400;
        this.TEAL_TINT = 0x12eedc;
        this.YELLOW_TINT = 0xe8ef36;
        this.BLACK_TINT = 0x000000;

        // Text styles
        this.TUTORIAL_TEXT_STYLE = { fontFamily: 'Georgia', color: this.WHITE, fontSize: 16, fontStyle: 'bold', wordWrap: { width: gameWidth / 2 }};
        this.DARK_TEXT_STYLE = { fontFamily: 'Georgia', color: this.BLACK, fontSize: 12 };
        this.LIGHT_TEXT_STYLE = { fontFamily: 'Raleway', color: this.WHITE, fontSize: 12 };
        this.HUD_STYLE = { fontFamily: 'Oswald', color: this.WHITE, fontSize: 20, fontStyle: 'bold' };
        this.HUD_STYLE_DARK = { fontFamily: 'Oswald', color: this.BLACK, fontSize: 20, fontStyle: 'bold' };
        
        // Scenes
        this.HOME_SCENE = 'HomeScene';
        this.PLAY_SCENE = 'PlayScene';
        this.SETUP_SCENE = 'SetupScene';

        // Events
        this.ACCEPT_ARMY = 'acceptArmy';
        this.ACCEPT_BOARD_PLACEMENT = 'acceptBoardPlacement';
        this.ACCEPT_GAME_OVER = 'acceptGameOver';
        this.ARMY_DELETED = 'armyDeleted';
        this.ARMY_SAVED = 'armySaved';
        this.ARMIES_SELECTED = 'armiesSelected';
        this.BACK_TO_HOME = 'backToHome';
        this.CHECK_DEFAULT_ARMY = 'checkDefaultArmy';
        this.CLEAR_ARMY = 'clearArmy';
        this.CLEAR_PLAYER_FROM_ROOMS = 'clearPlayerFromRooms';
        this.CREATE_HUD = 'createHUD';
        this.CREATE_ROOMS = 'createRooms';
        this.CREATE_NEW_ROOM = 'createNewRoom';
        this.CURRENT_PLAYERS = 'currentPlayers';
        this.DELETE_ARMY = 'deleteArmy';
        this.DISCONNECT_PLAYER = 'disconnectPlayer';
        this.GAME_LOADED = 'gameLoaded';
        this.GAME_SCREEN_REACHED = 'gameScreenReached';
        this.GAME_TUTORIAL_RUN = 'gameTutorialRun';
        this.GET_PLAYER_DATA = 'getPlayerData';
        this.GET_ROOMS = 'getRooms';
        this.HOME_TUTORIAL_RUN = 'homeTutorialRun';
        this.JOIN_ROOM = 'joinRoom';
        this.LAST_TUTORIAL_SCREEN = 'lastTutorialScreen';
        this.LEAVE_ROOM = 'leaveRoom';
        this.LIST_ROOMS = 'listRooms';
        this.LOAD_PLAY_SCENE = 'loadPlayScene';
        this.LOAD_SETUP_SCENE = 'loadSetupScene';
        this.MATCHMAKING_TILES_CREATED = 'matchmakingTilesCreated';
        this.NEW_PLAYER = 'newPlayer';
        this.NEXT_TUTORIAL_SCREEN = 'nextTutorialScreen';
        this.PLAYER_ARMIES = 'playerArmies';
        this.QUIT_GAME = 'quitGame';
        this.QUIT_GAME_CONFIRMED = 'quitGameConfirmed';
        this.QUIT_GAME_SELECTED = 'quitGameSelected';
        this.RUN_TUTORIAL = 'runTutorial';
        this.RUN_HOME_TUTORIAL = 'runHomeTutorial';
        this.SAVE_ARMY = 'saveArmy';
        this.SELECTED_ARMY = 'selectedArmy';
        this.SETUP_TUTORIAL_RUN = 'setupTutorialRun';
        this.START_GAME = 'startGame';
        this.START_HOME_MUSIC = 'startHomeMusic';
        this.TOGGLE_INPUT = 'toggleInput';
        this.UPDATE_ROOMS = 'updateRooms';

        this.BLANK_NAME = '_________________';

        // Battle events
        this.CHANGE_DIRECTION = 'changeDirection';
        this.CHANGE_DIRECTION_CONFIRMED = 'changeDirectionConfirmed';
        this.END_TURN = 'endTurn';
        this.END_TURN_CONFIRMED = 'endTurnConfirmed';
        this.MOVE_UNIT = 'moveUnit';
        this.MOVE_UNIT_CONFIRMED = 'moveUnitConfirmed';
        this.UNIT_ACTION = 'unitAction';
        this.UNIT_ACTION_CONFIRMED = 'unitActionConfirmed';

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
        this.RIGHT = 'right';
        this.BOTTOM = 'bottom';
        this.LEFT = 'left';

        // Direction Opposites
        this.DIRECTION_OPPOSITES = {
            'top': 'bottom',
            'right': 'left',
            'bottom': 'top',
            'left': 'right'
        };

        // Action types
        this.DAMAGE = 'damage';
        this.HEAL = 'heal';
        this.STOP = 'stop';

        // Direction buttons
        this.TOP_DIRECTION_BUTTON = 'topDirectionButton';
        this.RIGHT_DIRECTION_BUTTON = 'rightDirectionButton';
        this.BOTTOM_DIRECTION_BUTTON = 'bottomDirectionButton';
        this.LEFT_DIRECTION_BUTTON = 'leftDirectionButton';

        // Prefabs
        this.TILE = 'tile';
        this.ORB = 'orb';
        this.ARROW = 'arrow';
        this.CURRENT_PLAYER_CONTAINER = 'currentPlayerContainer';
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

        // Action Results
        this.BLOCK_RESULT = 'BLOCK';
        this.DODGE_RESULT = 'DODGE';

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