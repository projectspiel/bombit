/* global constants:true */
constants = {
    TILE_WIDTH: 48,
    TILE_HEIGHT: 96,
    KEY_UP: 38,
    KEY_LEFT: 37,
    KEY_RIGHT: 39,
    KEY_DOWN: 40
};

/* global resources:true */
resources = {};

window.onload = function() {
    var preloader = new createjs.LoadQueue(false),
        canvas = window.document.getElementById("dasCanvas"),
        context = canvas.getContext("2d");

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
        Object.build(World, canvas).start();
    });

    preloader.loadManifest("resources_manifest.json");
    preloader.loadManifest("sources_manifest.json");
};

Object.build = function(o) {
    var instance = Object.create(o.prototype);
    o.apply(instance, Array.prototype.slice.call(arguments, 1));
    return instance;
};