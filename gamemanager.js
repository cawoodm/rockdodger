function GameManager() {
    this.score = 0;
    this.level = 1;
    this.health = 10;
    this.noRender = true;
    this.collider = g.scene.add(new Collider());
    this.collider.check("player", "rock", (e1,e2)=>{this.playerHitsRock(e1,e2)});
    this.collider.check("player", "prize", (e1,e2)=>{this.playerHitsPrize(e1,e2)});
    this.healthBar = new Sprite({x: 170, y: 2, w: 100, h: 25, offX: 1, offY: 320, scale: 1});
    this.healthBar.x = g.ui.vWidth-this.healthBar.w-5;
}
GameManager.prototype.update = function(delta) {
    if (g.state!="play") return;
    if (g.scene.count("rock")<this.level) {
        if (Math.round(rnd(0,4))>0)
            g.scene.add(new Rock({y: rnd(-100*this.level, 0), size:Math.round(rnd(0,this.level))}));
        else if (g.scene.count("prize")==0)
            g.scene.add(new Prize({y: rnd(-20*this.level, 0), size:Math.round(rnd(0,this.level))}));
    }
    this.level = 1 + Math.floor(this.score / 10);
}
GameManager.prototype.renderer = function(ctx) {
    if (g.state == "title") return;
    ctx.fillStyle="rgba(3,3,3,0.5)";
    ctx.fillRect(0, 0, g.ui.vWidth, 30)
    ctx.fillStyle="#FFF";
	ctx.font="22px Amatic SC";
    ctx.fillText("Level: " + this.level + "  Score: " + this.score, 4, 22);
    ctx.fillStyle="#D00";
    ctx.fillRect(this.healthBar.x+27, this.healthBar.y+4, this.health*7, 20)
    this.healthBar.renderer(ctx);
}
GameManager.prototype.playerHitsRock = function(player, rock) {
    rock.explode({r:255})
    player.owCount=20;
    if (this.health > 0) {
        this.health--;
        player.y = g.ui.floor - 100 + 5*(10-this.health); // Shrink player
    }
    if (this.health==0) {
        player.explode({size: 20});
        g.gameOver();
    }
}
GameManager.prototype.playerHitsPrize = function(player, prize) {
    prize.explode()
    // Grow player
    if (player.w<100) player.y = g.ui.floor - 100 + 5*(10-this.health);
    if (this.health<10) this.health++; else this.score+=10;
}
GameManager.prototype.rockMissed = function(rock) {
    this.score++;
    rock.explode({r: 130, g: 130, b: 130}); // Smash rock-color
}
