var entities = entities || {};

entities.Polygon = function() {
    var vertices = [];

    for(var i=0; i < arguments.length; i++) {
        vertices.push( arguments[i] );
    }

    this.getVertices = function() {
        return vertices;
    };
}
