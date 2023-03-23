class ScaleAssets {
    static scaleToWidth(obj, percent) {
        obj.displayWidth = game.config.width * percent;
        obj.scaleY = obj.scaleX;
    }

    static centerHorizontally(obj) {
        obj.x = game.config.width / 2;
    }

    static centerVertically(obj) {
        obj.y = game.config.height / 2;
    }

    static center(obj) {
        obj.x = game.config.width / 2;
        obj.y = game.config.height / 2;
    }
}