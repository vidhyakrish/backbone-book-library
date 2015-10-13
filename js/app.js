define([
    'js/vendor/jquery', 'js/vendor/underscore', 'js/vendor/backbone', 'js/router/Router', 'css/bootstrap.min'
], function($, _, Backbone, Router, Bootstrap) {
    var initialize = function() {
        Router.initialize();
    };

    return {
        initialize: initialize
    };
});
