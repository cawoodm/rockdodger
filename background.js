Background = function(options) {
    this.sprite = new Sprite({x: 0, y: 0, w: 278, h: 213, offX: 0, offY: 387});
    this.scale = {x: g.ui.vWidth/this.sprite.w, y: g.ui.vHeight/(this.sprite.h*1.1)}
}
//Background.prototype.update = function(delta) {}
Background.prototype.renderer = function(ctx) {
    ctx.scale(this.scale.x, this.scale.y)
    this.sprite.renderer(ctx)
}