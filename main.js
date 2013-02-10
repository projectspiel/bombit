var gScreenWidth;
var gScreenHeight;

function init() {
    canvas = document.getElementById("dasCanvas");
    gScreenWidth = canvas.width;
    gScreenHeight = canvas.height;

    world = new World(canvas);
    world.initLevel();
    world.initPlayers();
    world.initMobs(10);
    world.start();

    /*contentManager = new ContentManager();
    contentManager.SetDownloadCompleted(startGame);
    contentManager.StartDownload();*/
}