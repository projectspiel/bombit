var mixins = mixins || {};

mixins.Simulable = function () {
    this.isSimulable = true;

    this.onInit(() => {
        this.callbacks = [];
    });

    this.onSimulate = function (callable) {
        this.callbacks.push(callable);
    };

    this.simulate = function (dt) {
        for (var i = 0; i < this.callbacks.length; i++) {
            this.callbacks[i].apply(this, [dt]);
        }
    };
};
