/* global constants:true */
constants = {
    KEY_UP: 38,
    KEY_LEFT: 37,
    KEY_RIGHT: 39,
    KEY_DOWN: 40,
    KEY_W: 87,
    KEY_A: 65,
    KEY_S: 83,
    KEY_D: 68
};

var CANVAS_HEIGHT,
    CANVAS_WIDTH,
    MAP_HEIGHT = 1000,
    MAP_WIDTH  = 1000,

    // Debugging
    DISPLAY_DEBUG = false;

/* global resources:true */
resources = {};

window.onload = function() {
    var preloader = new createjs.LoadQueue(false),
        canvas = window.document.getElementById("dasCanvas"),
        context = canvas.getContext("2d");

    // @fixme
    CANVAS_HEIGHT = canvas.height;
    CANVAS_WIDTH  = canvas.width;

    context.webkitImageSmoothingEnabled = context.imageSmoothingEnabled = context.mozImageSmoothingEnabled = context.oImageSmoothingEnabled = false;

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
        new World(canvas).start();
    });

    preloader.loadManifest("resources_manifest.json");
    preloader.loadManifest("sources_manifest.json");
};

window.log = function() {
    for (var i = 0; i < arguments.length; i++) {
        console.log(arguments[i].toString?arguments[i].toString():arguments[i]);
    }
};
