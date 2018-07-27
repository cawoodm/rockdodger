g.init = function() {
	g.ui.win.width=g.ui.canvas.width=Math.min(g.ui.win.width, 800)
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
    g.ui.floor = g.ui.win.height-100;
    g.scene.add(new Background());
    if (title) {
        g.state="title";
        g.scene.add(new GameTitle());
	} else {
        g.state="play";
        g.player = g.scene.add(new Player({x: g.ui.win.width/2, y: g.ui.floor-100, velocity: 10}));
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
g.preGameRender = function() {}