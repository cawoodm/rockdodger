function Floor(options) {
    this.sprite = new Sprite({w: 50, h: 50, offX: 1, offY: 102, scale: 1});
    this.sprite.y = g.ui.floor;
}
Floor.prototype.renderer = function(ctx) {
    for (let i=0; i<g.ui.vWidth/this.sprite.w; i++) {
        this.sprite.x=i*this.sprite.w;
        this.sprite.renderer(ctx);
    }
}