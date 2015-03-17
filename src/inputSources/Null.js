var inputSources =  inputSources || {};

inputSources.Null = function () {

    this.getCurrentInput = function (entity) {
        return {};
    };
};
