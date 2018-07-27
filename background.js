Background = function(options) {
    this.sprite = new Sprite({x: 0, y: 0, w: 278, h: 213, offX: 0, offY: 387});
}
Background.prototype.update = function(delta) {
}
Background.prototype.renderer = function(ctx) {
    //ctx.fillStyle='#CDF';
    //ctx.fillRect(0, 0, g.ui.win.width, g.ui.win.height);
    ctx.scale(g.ui.win.width/this.sprite.w, g.ui.win.height/this.sprite.h)
    this.sprite.renderer(ctx)
}