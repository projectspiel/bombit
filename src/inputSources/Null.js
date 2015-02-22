var inputSources =  inputSources || {};

inputSources.Null = function () {
    this.getCurrentAction = function () {
        return null;
    };

    this.getCurrentInputVector = function () {
        return new Vector();
    };
};
