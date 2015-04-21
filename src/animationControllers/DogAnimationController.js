var DogAnimationController = function(entity) {
    this.update = function (inputVector) {
        if(!(inputVector instanceof bombit.Vector) || inputVector.direction() === null) {
            entity.gotoAndPlay("idle");
        } else {
            entity.gotoAndPlay("move" + inputVector.direction().capitalizeFirstLetter());
        }
    };
};
