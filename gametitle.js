function GameTitle(options) {
    this.static=true;
    this.player = new Sprite({x: g.ui.vWidth/2, y: g.ui.vHeight*0.2, w: 70, h: 100, offX: 1, offY: 1, scale: 0.1, center: true});
    this.logo = new Sprite({sprite: "sprites", x: g.ui.vWidth/2, y: g.ui.vHeight/2, w: 755, h: 210, offX: 0, offY: 601, center: true, scale: 0.1});
}
GameTitle.prototype.update = function(delta) {
    if (this.player.scale<1.7) this.player.scale+=0.1;
    if (this.logo.w*this.logo.scale<g.ui.vWidth*0.97) this.logo.scale +=0.015;
}
GameTitle.prototype.renderer = function(ctx) {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, g.ui.vWidth, g.ui.vHeight);
    this.logo.renderer(ctx);
    this.player.renderer(ctx);
}
