function GameOver(options) {
    this.static=true;
    this.gameover = new Sprite({sprite: "sprites", x: g.ui.win.width/2, y: g.ui.win.height/2, w: 615, h: 201, offX: 0, offY: 812, center: true, scale: 0.1});
}
GameOver.prototype.update = function(delta) {
    if (this.gameover.w*this.gameover.scale<g.ui.win.width*0.8)
        this.gameover.scale +=0.05;
    else
        g.state="gameOver";
}
GameOver.prototype.renderer = function(ctx) {
    g.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)'; g.ctx.fillRect(0, 0, g.ui.win.width, g.ui.win.height);
    this.gameover.renderer(ctx);
}
