define([
  'jquery', 'underscore', 'backbone', 'js/collections/bookCollection', 'js/collections/myFavouritesCollection', 'js/views/header', 'js/views/myBookLibraryView', 'js/views/favouritesView', 'js/views/filteredView', 'js/views/addNewItemView'

], function($, _, Backbone, BookCollection, favouritesCollection, headerView, libraryView, myfavouritesView, myFilteredView, addNewItemView) {
  var myFavouritesCollection = new favouritesCollection();
  var myBookCollection = new BookCollection();
  //var myFilteredCollection = new BookCollection();
  var newView;
  var library;
  myBookCollection.fetch({
    async: false // assskkkkk
  });


  var Router = Backbone.Router.extend({
    initialize: function(options) {
      this.route('', 'index');
      this.route('show/favs', 'viewFavourites');
      this.route('show/filters', 'filteredview');
      this.route('add-new', 'addNew');
      this.route('home', 'index');

    },

    index: function() {
      $('header').empty();
      newView = new headerView({
        idAttribute: "#home"
      });
      newView.$el.appendTo('header');
      // $('header').find('#home').addClass('active');
      // $('header').find('#favs').removeClass('active');
      $('#container').empty();
      if (library !== undefined) {
        library.remove();
      }
      library = new libraryView({
        favouritesCollection: myFavouritesCollection,
        collection: myBookCollection

      });
      library.$el.appendTo('#container');
    },
    viewFavourites: function() {
      $('header').empty();
      newView = new headerView({
        idAttribute: "#favs"
      });
      // $('header').find('#home').removeClass('active');
      // $('header').find('#favs').addClass('active');
      newView.$el.appendTo('header');
      if (library !== undefined) {
        library.remove();
      }
      library = new myfavouritesView({
        collection: myFavouritesCollection
      });
      library.$el.appendTo('#container');
    },

    addNew: function() {
      $('header').empty();
      newView = new headerView({
        idAttribute: "#add-new"
      });
      newView.$el.appendTo('header');
      // $('header').find('#home').removeClass('active');
      // $('header').find('#add-new').addClass('active');
      if (library !== undefined) {
        library.remove();
      }
      var addNewView = new addNewItemView({
        collection: myBookCollection
      });
      addNewView.$el.appendTo('#container');

    }
  });



  return Router;
});
