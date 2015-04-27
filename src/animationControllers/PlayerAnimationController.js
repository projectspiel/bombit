var PlayerAnimationController = function(entity) {
    this.update = function (inputVector) {
        if(!(inputVector instanceof bombit.Vector) || inputVector.direction() === null) {
            if (entity.hasBall) {
                entity.gotoAndPlay("idleWithBall");
            } else {
                entity.gotoAndPlay("idle");
            }
        } else if (entity.hasBall){
            entity.gotoAndPlay("move" + inputVector.direction().capitalizeFirstLetter() + "WithBall")
        } else {
          entity.gotoAndPlay("move" + inputVector.direction().capitalizeFirstLetter());
        }
    };
};
