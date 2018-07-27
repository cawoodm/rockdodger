function Floor(options) {
    this.sprite = new Sprite({sprite: "sprites", w: 100, h: 100, offX: 1, offY: 102, scale: 1});
    this.sprite.y = g.ui.floor;
}
Floor.prototype.renderer = function(ctx) {
    for (let i=0; i<g.ui.win.width/100; i++) {
        this.sprite.x=i*100;
        this.sprite.renderer(ctx);
    }
}