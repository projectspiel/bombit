var mixins = mixins || {};

mixins.Simulable = function (callback) {
    this.isSimulable = true;

    var callbacks = [];

    this.onSimulate = function (callable) {
        callbacks.push(callable);
    };

    this.prependOnSimulate = function (callable) {
        callbacks.unshift(callable);
    };

    this.simulate = function (dt) {
        for (var i = 0; i < callbacks.length; i++) {
            callbacks[i].apply(this, [dt]);
        }
    };
};
