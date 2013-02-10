const TILE_WIDTH = 50;
const TILE_HEIGHT = 50;
const STATUS_BAR_HEIGHT = TILE_HEIGHT;

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
        {src:"res/img/player1.png", id:"player1"},
        {src:"res/img/player2.png", id:"player2"}
    ];

    var preloader = new createjs.PreloadJS(false);

    preloader.onProgress = function(event) {
        ctx = canvas.getContext("2d");

        canvas.width = canvas.width; // clear canvas

        var angle = Math.PI * 2 * event.loaded;
        ctx.strokeStyle = "white";
        ctx.beginPath();
        ctx.arc(gScreenWidth/2, gScreenHeight/2, 100, 0, angle, true);
        ctx.stroke();
    };

    preloader.onFileLoad = function(event) {
        switch(event.type) {
            case createjs.PreloadJS.IMAGE:
                var img = new Image();
                img.src = event.src;
                resources[event.id] = img;
                break;

            case createjs.PreloadJS.SOUND:
                break;
        }
    };

    preloader.loadManifest(manifest);
}

function loadSources() {
    var manifest = [
        {src:"src/World.js", id:"world"},
        {src:"src/Block.js", id:"block"},
        {src:"src/Player.js", id:"player"}
    ];

    var preloader = new createjs.PreloadJS(false);

    preloader.onFileLoad = function(event) {
        switch(event.type) {
            case createjs.PreloadJS.JAVASCRIPT:
                document.body.appendChild(event.result);
                break;
        }
    };

    preloader.onComplete = function(event) {
        //@todo THIS IS BULLSHIT, we should have an 'allLoaded' global flag we check so that we dont depend on the order of the load calls
        setTimeout(function() {
            var world = new World(canvas);
            world.initLevel();
            world.initPlayers();
            world.initMobs(10);
            world.start();
        }, 250);
    };

    preloader.loadManifest(manifest);
}

function handleProgress(event) {
    ctx = canvas.getContext("2d");

    canvas.width = canvas.width; // clear canvas

    var angle = Math.PI * 2 * event.loaded;
    ctx.strokeStyle = "white";
    ctx.beginPath();
    ctx.arc(gScreenWidth/2, gScreenHeight/2, 100, 0, angle, true);
    ctx.stroke();
}
