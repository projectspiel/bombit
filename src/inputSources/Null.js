var inputSources =  inputSources || {};

inputSources.Null = function() {

    this.getCurrentInputVector = function() {
        return new Vector();
    };

};
