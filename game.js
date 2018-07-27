g.init = function() {
    //g.ui.win.width=g.ui.canvas.width=Math.min(g.ui.win.width, 800)
    g.ui.vWidth=2*278;
    g.ui.vHeight=2*213;
    // Scale up to full height
    g.ui.scale={y: g.ui.win.height/g.ui.vHeight};
    // Scale proportionally
    g.ui.scale.x=g.ui.scale.y;
    g.ui.vWidth=g.ui.win.width/g.ui.scale.x;
    g.ctx.scale(g.ui.scale.x, g.ui.scale.y)
    g.ui.floor = g.ui.vHeight-50;
    document.fonts.load('10pt "Amatica SC"').then(()=>{});
    g.ImageLoader.add("sprites", "./resources/sprites.png");
    if (location.hostname=="localhost") {
        if (location.search!="?title") return ()=>{g.restart(false)} // straight to game
        if (location.search=="?gameover") return g.gameOver;
    }
    return ()=>{g.restart(true)}
}
g.restart = function(title) {
    g.Halt();
    g.scene = new g.Scene();
    g.background = g.scene.add(new Background());
    if (title) {
        g.state="title";
        g.scene.add(new GameTitle());
	} else {
        g.state="play";
        g.player = g.scene.add(new Player({}));
        g.scene.add(new Floor());
        g.scene.add(new Rock());
    }
    g.manager = g.scene.add(new GameManager());
    g.Start();
}
g.gameOver = function() {
    state="gameover";
    g.scene.add(new GameOver());
};
g.ui.keys = {
	left: Keyboard(["KeyA", "ArrowLeft"]) // left arrow
	,right: Keyboard(["KeyD", "ArrowRight"]) // right arrow
	,up: Keyboard(["KeyW", "ArrowUp"])
	,down: Keyboard(["KeyS", "ArrowDown"])
	,fire: Keyboard("Space") // space
	,pause: Keyboard("KeyP") // P-Pause
};
g.ui.keys.pause.down = g.Pause;
g.ui.keys.left.down = function() {
	if (g.state!="play") return;
	g.player.move(Vector.left())
};
g.ui.keys.right.down = function() {
	if (g.state!="play") return;
	g.player.move(Vector.right())
};
g.ui.keys.up.down = function() {
	if (g.state!="play") return;
	g.player.move(Vector.up())
};
g.ui.keys.down.down = function() {
	if (g.state!="play") return;
	g.player.move(Vector.down())
};
g.ui.keys.fire.press = function(e) {
	if (g.state=="message") return;
    if (g.state!="play") return g.restart();
    g.player.stop();
}
g.followSwipe = function(evt) {
    if (g.state!="play") return g.restart();
    if (!evt.touches) return;
    var x = evt.touches[0].clientX;
    g.player.moveTo({x: (x/g.ui.scale.x)-g.player.w/2});
}
document.addEventListener('touchstart', g.followSwipe, false); 
document.addEventListener('touchmove', g.followSwipe, false);
g.preGameRender = function() {}