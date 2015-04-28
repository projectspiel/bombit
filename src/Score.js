var Score = function() {
    var zombieCount = 0,
        text;
    text = new createjs.Text("Dead Zombies: 0", "20px MineCrafter", "#222222");
    text.x = 50;
    text.y = 30
    text.zindex = 1000

    function increment() {
      zombieCount++;
      update();
    }

    function getDisplayObject() {
      return text;
    }

    function update() {
      text.text = "Dead Zombies: " + zombieCount;
    }

    return {
      increment: increment,
      getDisplayObject: getDisplayObject
    };
}();
