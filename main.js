const TILE_WIDTH = 50;
const TILE_HEIGHT = 50;
const STATUS_BAR_HEIGHT = TILE_HEIGHT;

// KEY MAPS
const KEY_UP = 38;
const KEY_LEFT = 37;
const KEY_RIGHT = 39;
const KEY_DOWN = 40;

var canvas;
var gScreenWidth;
var gScreenHeight;
var resources = {};

window.onload = init;

function init() {
    canvas = document.getElementById("dasCanvas");
    gScreenWidth = canvas.width;
    gScreenHeight = canvas.height;

    loadResources();
    loadSources();
}

function loadResources() {
    var manifest = [
        {src:"res/img/solid_block.png", id:"block"},
        {src:"res/img/player.png", id:"player1"}
    ];

    var queue = new createjs.LoadQueue(false);

    queue.on("progress", function(event) {
        var ctx = canvas.getContext("2d");

        canvas.width = canvas.width; // clear canvas

        var angle = Math.PI * 2 * event.loaded;
        ctx.strokeStyle = "white";
        ctx.beginPath();
        ctx.arc(gScreenWidth/2, gScreenHeight/2, 100, 0, angle, true);
        ctx.stroke();
    });

    queue.on("fileload", function(event) {
        var item = event.item;
        switch(item.type) {
            case createjs.LoadQueue.IMAGE:
                var img = new Image();
                img.src = item.src;
                resources[item.id] = img;
                break;

            case createjs.LoadQueue.SOUND:
                break;
        }
    });

    queue.loadManifest(manifest);
}

function loadSources() {
    var manifest = [
        {src:"src/Vector.js", id:"vector"},
        {src:"src/World.js", id:"world"},
        {src:"src/Block.js", id:"block"},
        {src:"src/Player.js", id:"player"}
    ];

    var preloader = new createjs.LoadQueue(false);

    preloader.onFileLoad = function(event) {
        switch(event.type) {
            case createjs.PreloadJS.JAVASCRIPT:
                document.body.appendChild(event.result);
                break;
        }
    };

    preloader.on("complete", function() {
        //@todo THIS IS BULLSHIT, we should have an 'allLoaded' global flag we check so that we dont depend on the order of the load calls
        setTimeout(function() {
            var world = new World(canvas);
            //TODO: refactor, we should just call world.init({options}) 
            world.initLevel();
            world.initPlayers();
            world.initMobs(10);
            world.registerKeyEvents();
            world.start();
        }, 250);
    });

    preloader.loadManifest(manifest);
}