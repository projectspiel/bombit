const TILE_WIDTH = 50;
const TILE_HEIGHT = 50;
const STATUS_BAR_HEIGHT = TILE_HEIGHT;
const KEY_UP = 38;
const KEY_LEFT = 37;
const KEY_RIGHT = 39;
const KEY_DOWN = 40;

window.onload = function() {
    var preloader = new createjs.LoadQueue(false),
        resources = {},
        canvas = window.document.getElementById("dasCanvas");

    preloader.on("progress", function(event) {
        var ctx = canvas.getContext("2d"),
            angle = Math.PI * 2 * event.loaded;

        ctx.strokeStyle = "white";
        ctx.beginPath();
        ctx.arc(canvas.width/2, canvas.height/2, 100, 0, angle, true);
        ctx.stroke();
    });

    preloader.on("fileload", function(event) {
        var item = event.item;
        switch(item.type) {
            case createjs.LoadQueue.IMAGE:
                var img = new Image();
                img.src = item.src;
                resources[item.id] = img;
                break;

            case createjs.LoadQueue.SOUND:
                break;

            case createjs.LoadQueue.JAVASCRIPT:
                // createjs.LoadQueue(false) auto-adds scripts to the DOM
                break;
        }
    });

    preloader.on("complete", function() {
        Object.build(World, canvas, resources).start();
    });

    preloader.loadManifest("sources_manifest.json");
    preloader.loadManifest("resources_manifest.json");
};

Object.build = function(o) {
    var initArgs = Array.prototype.slice.call(arguments, 1);
    var instance = Object.create(o.prototype);
    o.apply(instance, initArgs);
    return instance;
}