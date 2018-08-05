function Prize(options) {
    options = options || {};
    this.size = options.size || 0;
    this.tag = "prize";
    this.center=true;
    this.rot = 0;
    this.w=this.h=40;
    this.frame=rnd(0,2);
    this.sprite = new Sprite({w: this.w, h: this.h, offX: 1+this.frame*(this.w+1), offY: 269})
    this.x = rnd(0, g.ui.vWidth-this.w);
    this.y = options.y || 0;
    this.speed=0;
    this.acc=0.1;
}
Prize.prototype.update = function(delta) {
    if (g.state!="play") return;
    this.speed+=this.acc;
    this.rot+=1;
    this.y+=this.speed*delta;
    if (this.y>g.ui.floor) {
        this.explode();
        g.scene.remove(this);
    }
}
Prize.prototype.renderer = function(ctx) {
    ctx.translate(this.x+this.w/2, this.y+this.h/2)
    ctx.rotate(this.rot*Math.PI/180)
    ctx.translate(-this.w/2, -this.h/2)
    //this.sprite.x=-this.w/2;this.sprite.h=-this.h/2;
    this.sprite.renderer(ctx);
}
Prize.prototype.explode = function(o) {
    g.scene.add(new Explosion({x: this.x, y: this.y, size: 5, r: 215, g: 215, b: 0}))
    g.scene.remove(this);
}