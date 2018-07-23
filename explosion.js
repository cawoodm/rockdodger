var Explosion = function(options) {
    Object.assign(this, {tag: "explosion", x: 0, y:0, num: 50, dd: 5, r: 1, g: 1, b: 1, size: 5, lifetime: 100, gravity: 2});
    Object.assign(this, options);
    this.objs = [];
    for (let i=0; i<this.num; i++) {
      let ang = Math.PI*i/(this.num-1);
      this.objs.push({
        x: this.x,
        y: this.y,
        life: 0,
        size: this.size,
        dx: rnd(-this.dd, this.dd)*Math.cos(ang),
        dy: rnd(-this.dd, this.dd)*Math.sin(ang)-3*this.dd,
      });
    }
    this.col = {r: this.r||0, g: this.g||0, b: this.b||0};
  };
  Explosion.prototype.update = function(delta) {
    this.objs.forEach((obj, index, objs) => {
      // Lifetime
      obj.life += delta;
      if (obj.life > this.lifetime) return objs.splice(index, 1);
      // Fade with age
      obj.alpha = 1-obj.life/this.lifetime;
      // Physics and gravity
      obj.dy += this.gravity;
      obj.x += obj.dx * delta;
      obj.y += obj.dy * delta;
    });
  };
  Explosion.prototype.renderer = function(ctx) {
    let that = this;
    this.objs.forEach((obj, index) => {
        ctx.fillStyle = `rgba(${that.col.r}, ${that.col.g}, ${that.col.b}, ${obj.alpha})`;
        ctx.fillRect(obj.x, obj.y, obj.size, obj.size);
    });
  };