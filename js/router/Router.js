define([
    'jquery', 'underscore', 'backbone', 'js/collections/myBookCollection', 'js/views/header', 'js/views/myBookLibraryView'

], function($, _, Backbone, MyBookCollection, headerView, libraryView) {
    var Router = Backbone.Router.extend({
        initialize: function(options) {
            this.route('', 'index');
            this.route('show/:id', 'viewBook');

        },

        index: function() {
            var newView = new headerView({
                el: 'header'
            });
            var library = new libraryView({
                el: '#container'
            });

        },

        viewBook: function(id) {
            MyBookCollection.each(function(model) {
                if (id === model.get('id')) {
                    console.log(model.get('author'));
                }
            });

            console.log('display book', id);
        }
    });



    return Router;
});
