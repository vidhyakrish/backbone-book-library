define([
    'jquery', 'underscore', 'backbone', 'js/collections/myBookCollection', 'js/collections/myFavouritesCollection', 'js/views/header', 'js/views/myBookLibraryView', 'js/views/favouritesView', 'js/views/filteredView'

], function($, _, Backbone, MyBookCollection, favouritesCollection, headerView, libraryView, myfavouritesView, myFilteredView) {
    var myFavouritesCollection = new favouritesCollection();
    var newView = new headerView();
    var library = new libraryView({
        favouritesCollection: myFavouritesCollection
    });



    var Router = Backbone.Router.extend({
        initialize: function(options) {
            this.route('', 'index');
            this.route('show/favs', 'viewFavourites');
            this.route('show/filters', 'filteredview');

        },

        index: function() {
            $('header').empty();
            newView.$el.appendTo('header');
            $('#container').empty();
            library.$el.appendTo('#container');
        },
        viewFavourites: function() {
            library.remove();
            library = new myfavouritesView({
                favouritesCollection: myFavouritesCollection
            });
            library.$el.appendTo('#container');
        },
        filteredview: function() {
            library.remove();
            library = new myFilteredView({
                filteredCollection: MyBookCollection
            });
            library.$el.appendTo('#container');
        }
    });



    return Router;
});
