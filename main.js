const TILE_WIDTH = 50;
const TILE_HEIGHT = 50;
const STATUS_BAR_HEIGHT = TILE_HEIGHT;

// KEY MAPS
const KEY_UP = 38;
const KEY_LEFT = 37;
const KEY_RIGHT = 39;
const KEY_DOWN = 40;

var canvas;
var resources = {};

window.onload = function() {
    canvas = document.getElementById("dasCanvas");
    loadResources();
};

function loadResources() {
    var preloader = new createjs.LoadQueue(false);

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
                // LoadQueue(false) auto-adds scripts to the DOM
                break;
        }
    });

    preloader.on("complete", function() {
        //@todo THIS IS BULLSHIT, we should have an 'allLoaded' global flag we check so that we dont depend on the order of the load calls
        setTimeout(function() {
            var world = new World(canvas);
            //TODO: refactor, we should just call world.init({options})
            world.initLevel();
            world.initPlayer();
            world.initMobs(10);
            world.registerKeyEvents();
            world.start();
        }, 250);
    });

    preloader.loadManifest("sources_manifest.json");
    preloader.loadManifest("resources_manifest.json");
}