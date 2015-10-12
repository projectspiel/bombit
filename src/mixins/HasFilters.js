var mixins = mixins || {};

mixins.HasFilters = function () {
    this.hasFilter = true;

    // Circular dependenty with Sprite, how do we solve that?

    this.onInit(function() {
        this.sprite.filters = [];
        this._filters = {};
    });

    this.setFilter = function(name, filter) {
      this.removeFilter(name);
      this._filters[name] = filter;
      this.sprite.filters.push(filter);
    };

    this.removeFilter = function(name) {
      this.sprite.filters.forEach(
        (filter, index) => {
          if (filter === this._filters[name]){
            this.sprite.filters.splice(index, 1);
          }
        }
      );
      delete this._filters[name];
    };
};
