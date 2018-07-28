function Player(options) {
    options = options || {};
	this.x = options.x || g.ui.vWidth/2;
	this.y = options.y || g.ui.floor-100;
	this.w = options.w || 70;
    this.h = options.h || 100;
    this.y = g.ui.floor-this.h;
    this.sprite = new Sprite({sprite: "sprites", w: this.w, h: this.h, offX: 1, offY: 1});
    this.collider=2;
    this.tag="player";
    this.acc={x:0, y:0};
    this.speed={x:0, y:0};
    this.velocity = options.velocity || 10;
    this.frame=0;
    this.owCount=0;
    return this;
}
Player.prototype.update = function(delta) {
    if (g.state!="play") return;
    this.speed.x += this.acc.x * delta;
    this.speed.y += this.acc.y * delta;
    let wouldCollide = this.x+this.w+this.speed.x>g.ui.vWidth || this.x+this.speed.x<0;
    this.x += this.speed.x;// * delta;
    //this.y += this.speed.y;//    * delta;
    if (wouldCollide) this.stop();
    if (this.owCount>0) {this.owCount--; this.frame=2}
    else if (this.speed.x>0) this.frame=1; else if (this.speed.x<0 || this.frame==2) this.frame=0;
}
Player.prototype.renderer = function(ctx) {
    this.sprite.x=this.x;
    this.sprite.y=this.y;
    this.sprite.w=this.w;
    this.sprite.h=this.h;
    this.sprite.offX=this.frame*(1+this.w)+1;
    this.sprite.renderer(ctx);
}
Player.prototype.moveTo = function(dir) {
    if (this.x==dir.x) return;
    if (dir.x+this.w>g.ui.vWidth || dir.x<0) return;
    if (dir.x<this.x) this.frame=0; else this.frame=1;
    this.x=dir.x;
    this.speed.x=0;
}
Player.prototype.move = function(dir) {
    if (dir.y!=0) return; // Don't move up or down
    if (this.speed.x!=0) return this.stop(); // Stop if moving
    let ghost = {x: this.x, y: this.y, speed: {x: dir.x*this.velocity, y: dir.y*this.velocity}}
    let wouldCollide = this.x+this.w+ghost.speed.x>g.ui.vWidth || this.x+ghost.speed.x<0;
    let isColliding = false;
    let stationary = this.speed.x+this.speed.y==0;
    if (isColliding && wouldCollide) {
        // Do nothing
    } else if (stationary && !wouldCollide) {
        // Move now
        this.speed = ghost.speed;
    } else {
        // Move now
        this.speed = ghost.speed;
    }
}
Player.prototype.shoot = function() {
    let dir = Vector.up()
    //g.scene.add(new Bullet({x: g.player.x+dir.x*this.w/3, y: g.player.y+dir.y*this.w/3, speed: dir, velocity: this.bulletSpeed}));
}
Player.prototype.stop = function() {
    this.speed={x: 0, y:0}; 
}
Player.prototype.explode = function(options) {
    let o = {x: this.x, y: this.y, size: 10, r: 255};
    Object.assign(o, options);
    g.scene.add(new Explosion(o))
    g.scene.remove(this);
}