function GameManager() {
    this.score = 0;
    this.level = 1;
    this.health = 16;
    this.collider = g.scene.add(new Collider());
    this.collider.check("player", "rock", (e1,e2)=>{this.playerHitsRock(e1,e2)});
    this.collider.check("player", "prize", (e1,e2)=>{this.playerHitsPrize(e1,e2)});
    this.healthBar = new Sprite({x: 200, y: 5, w: 251, h: 66, offX: 1, offY: 320});
}
GameManager.prototype.update = function(delta) {
    if (g.scene.count("rock")<this.level) {
        if (Math.round(rnd(0,4))>0)
            g.scene.add(new Rock({y: rnd(-100*this.level, 0), size:Math.round(rnd(0,this.level))}));
        else
            g.scene.add(new Prize({y: rnd(-100*this.level, 0), size:Math.round(rnd(0,this.level))}));
    }
    this.level = 1 + Math.floor(this.score / 10);
}
GameManager.prototype.renderer = function(ctx) {
    ctx.fillStyle="#DDC";
	ctx.font="36px Amatic SC, bold";
    ctx.fillText("Level: " + this.level + "  Score: " + this.score, 20, 36);
    ctx.fillStyle="#D00";
    ctx.fillRect(this.healthBar.x+64, this.healthBar.y+10, this.health*10, 46)
    this.healthBar.renderer(ctx);
}
GameManager.prototype.playerHitsRock = function(player, rock) {
    rock.explode({r:255})
    if (this.health > 0) {
        this.health--;
        player.y = g.ui.floor - 100 + 5*(16-this.health); // Shrink player
    }
    if (this.health==0) {
        player.explode();
        g.state="gameover"; // TODO
    }
}
GameManager.prototype.playerHitsPrize = function(e1, prize) {
    prize.explode()
    // Grow player
    if (g.player.w<100) g.player.h=g.player.w+=5;
    if (this.health<16) this.health++;
}
GameManager.prototype.rockMissed = function(rock) {
    this.score++;
    rock.explode({r: 130, g: 130, b: 130}); // Smash rock-color
}
