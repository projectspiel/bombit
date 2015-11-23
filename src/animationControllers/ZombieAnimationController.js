var ZombieAnimationController = function (entity) {
    this.update = function (inputVector) {
        if (!(inputVector instanceof bombit.Vector) || inputVector.direction() === null) {
            entity.gotoAndPlay("idle");
        } else if (entity.hasDog){
            entity.gotoAndPlay("move" + inputVector.direction().capitalizeFirstLetter() + "WithDog");
        } else {
            entity.gotoAndPlay("move" + inputVector.direction().capitalizeFirstLetter());
        }
    };
};
