require.config({
    paths: {
        jquery: 'js/vendor/jquery',
        underscore: 'js/vendor/underscore-min',
        backbone: 'js/vendor/backbone-min',
        bootstrap: 'js/vendor/bootstrap-min',
        text: 'js/vendor/text'
    }
});

require(['js/router/Router'], function(Router) {

    var router = new Router();

    Backbone.history.start();
});
