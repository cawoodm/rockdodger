function GameTitle(options) {
    this.static=true;
    //this.player = new Sprite({sprite: "sprites", x: g.ui.win.width/2, y: 0, w: 100, h: 100, offX: 299, offY: 0, center: true, scale: 3});
    //this.player.acc=g.ui.blockSize/4;
    this.logo = new Sprite({sprite: "sprites", x: g.ui.win.width/2, y: g.ui.win.height/2, w: 755, h: 210, offX: 0, offY: 601, center: true, scale: 0.1});
}
GameTitle.prototype.update = function(delta) {
    //if (this.player.y<g.ui.win.height/5) {this.player.acc-=0.2; this.player.y += this.player.acc;}
    if (this.logo.w*this.logo.scale<g.ui.win.width*0.9) this.logo.scale +=0.05;
}
GameTitle.prototype.renderer = function(ctx) {
    
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, g.ui.win.width, g.ui.win.height);

    this.logo.renderer(ctx);
    //this.player.renderer(ctx);

}
