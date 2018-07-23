Background = function(options) {}
Background.prototype.update = function(delta) {
}
Background.prototype.renderer = function(ctx) {
    ctx.fillStyle='#EEF';
    ctx.fillRect(0, 0, g.ui.win.width, g.ui.win.height);
}