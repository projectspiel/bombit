var PlayerAnimationController = function(entity) {
    this.update = function (inputVector) {
        if(!(inputVector instanceof bombit.Vector) || inputVector.direction() === null) {
            if (entity.hasBall) {
                entity.gotoAndPlay("idleWithBall");
            } else if(entity.isAttacking) {
                entity.gotoAndPlay("punchDown");
            } else {
                entity.gotoAndPlay("idle");
            }
        } else if (entity.hasBall){
            entity.gotoAndPlay("move" + inputVector.direction().capitalizeFirstLetter() + "WithBall");
        } else if (entity.isAttacking) {
            entity.gotoAndPlay("punch" + inputVector.direction().capitalizeFirstLetter());
        } else {
          entity.gotoAndPlay("move" + inputVector.direction().capitalizeFirstLetter());
        }
    };
};
