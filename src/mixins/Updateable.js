var mixins = mixins || {};

mixins.Updateable = function() {
    this.prototype.update = function() {
    };

    this.isUpdateable = true;
};