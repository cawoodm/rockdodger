g.restart = function(title) {
    g.Halt();
    g.scene = new g.Scene();
    g.scene.add(new Background());
    if (title) {
        g.state="title";
	} else {
    }
    g.Start();
}
g.preGameRender = function() {}