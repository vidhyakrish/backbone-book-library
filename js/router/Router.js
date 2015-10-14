define([
    'jquery', 'underscore', 'backbone', 'js/collections/myBookCollection', 'js/collections/myFavouritesCollection', 'js/views/header', 'js/views/myBookLibraryView', 'js/views/favouritesView'

], function($, _, Backbone, MyBookCollection, favouritesCollection, headerView, libraryView, myfavouritesView) {
    var myFavouritesCollection = new favouritesCollection();
    var newView = new headerView();
    var library = new libraryView({
        favouritesCollection: myFavouritesCollection
    });



    var Router = Backbone.Router.extend({
        initialize: function(options) {
            this.route('', 'index');
            this.route('show/:id', 'viewBook');

        },

        index: function() {
            $('header').empty();
            newView.$el.appendTo('header');
            $('#container').empty();
            library.$el.appendTo('#container');
        },

        viewBook: function(id) {
            library.remove();
            library = new myfavouritesView({
                favouritesCollection: myFavouritesCollection
            });
            library.$el.appendTo('#container');
        }
    });



    return Router;
});
