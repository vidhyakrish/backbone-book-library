define([
    'js/vendor/jquery', 'js/vendor/underscore', 'js/vendor/backbone', 'js/router/Router'
], function($, _, Backbone, Router) {
    var initialize = function() {
        Router.initialize();
    };

    return {
        initialize: initialize
    };
});
