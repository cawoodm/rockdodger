Background = function(options) {
    this.sprite = new Sprite({x: 0, y: 0, w: 277, h: 214, offX: 0, offY: 387});
}
Background.prototype.update = function(delta) {
}
Background.prototype.renderer = function(ctx) {
    //ctx.fillStyle='#CDF';
    //ctx.fillRect(0, 0, g.ui.win.width, g.ui.win.height);
    ctx.scale(3,3)
    this.sprite.renderer(ctx)
}