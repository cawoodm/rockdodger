function Rock(options) {
    options = options || {};
    this.size = options.size || 0;
    this.tag = "rock";
    this.rot = rnd(0, 180);
    switch (this.size) {
        case 1:
            this.w=this.h=30;
            this.sprite = new Sprite({w: this.w, h: this.h, offX: 26, offY: 203})
            break;
        default:
            this.w=this.h=24;
            this.sprite = new Sprite({w: this.w, h: this.h, offX: 1, offY: 203})
            break;
    }
    this.x = rnd(0, g.ui.win.width-100);
    this.y = options.y || 0;
    this.speed=0;
    this.acc=0.1;
}
Rock.prototype.update = function(delta) {
    if (g.state!="play") return;
    this.speed+=this.acc;
    this.rot+=0.8;
    this.y+=this.speed*delta;
    if (this.y>g.ui.floor) g.manager.rockMissed(this);
}
Rock.prototype.renderer = function(ctx) {
    ctx.translate(this.x+this.w/2, this.y+this.h/2)
    ctx.rotate(this.rot*Math.PI/180)
    this.sprite.renderer(ctx);
}
Rock.prototype.explode = function(o) {
    g.scene.add(new Explosion({x: this.x, y: this.y, size: 5, r: o.r, g: o.g, b: o.b}))
    g.scene.remove(this);
}