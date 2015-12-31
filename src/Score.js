var Score = (function () {
    "use strict";
    var level = 0,
        text;

    text = new createjs.Text("Level 0", "20px MineCrafter", "#222222");
    text.x = 50;
    text.y = 30;
    text.zindex = 1000;

    return {
      increment: increment,
      getDisplayObject: getDisplayObject
    };

    function increment() {
      level++;
      update();
    }

    function getDisplayObject() {
      return text;
    }

    function update() {
      text.text = "Level " + level;
    }

})();
