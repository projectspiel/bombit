var mixins = mixins || {};

mixins.Simulable = function () {
    this.isSimulable = true;

    var callbacks = [];

    this.onSimulate = function (callable) {
        callbacks.push(callable);
    };

    this.simulate = function (dt) {
        for (var i = 0; i < callbacks.length; i++) {
            callbacks[i].apply(this, [dt]);
        }
    };
};
