function Player(options) {
    options = options || {};
	this.x = options.x || 0;
	this.y = options.y || 0;
	this.w = options.w || 70;
    this.h = options.h || 100;
    this.y = g.ui.floor-this.h;
    this.sprite = new Sprite({sprite: "sprites", w: this.w, h: this.h, offX: 1, offY: 1, scale: 1});
    this.collider=2;
    this.tag="player";
    this.acc={x:0, y:0};
    this.speed={x:0, y:0};
    this.velocity = options.velocity || 5;
    this.frame=0;
    this.bulletSpeed=15;
    return this;
}
Player.prototype.update = function(delta) {
    if (g.state!="play") return;
    this.speed.x += this.acc.x * delta;
    this.speed.y += this.acc.y * delta;
    let wouldCollide = this.x+this.w+this.speed.x>g.ui.win.width || this.x+this.speed.x<0;
    this.x += this.speed.x;// * delta;
    //this.y += this.speed.y;//    * delta;
    if (wouldCollide) this.stop();
    if (this.speed.x>0) this.frame=1; // Right
    else if (this.speed.x<0) this.frame=2; // Left
    else if (this.speed.y<0) this.frame=0; // Up
    else if (this.speed.y>0) this.frame=3; // Down
    else this.frame=0;
}
Player.prototype.renderer = function(ctx) {
    this.sprite.x=this.x;
    this.sprite.y=this.y;
    this.sprite.w=this.w;
    this.sprite.h=this.h;
    this.sprite.offX=this.frame*(1+this.w)+1;
    this.sprite.renderer(ctx);
}
Player.prototype.move = function(dir) {
    if (dir.y!=0) return; // Don't move up or down
    if (this.speed.x!=0) return this.stop(); // Stop if moving
    let ghost = {x: this.x, y: this.y, speed: {x: dir.x*this.velocity, y: dir.y*this.velocity}}
    let wouldCollide = this.x+this.w+ghost.speed.x>g.ui.win.width || this.x+ghost.speed.x<0;
    let isColliding = false;
    let stationary = this.speed.x+this.speed.y==0;
    // Move up/down only if on X-grid (left/right)
    //dp(isColliding, wouldCollide, stationary, this.x, this.x);
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