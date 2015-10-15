define([
  'jquery', 'underscore', 'backbone', 'js/collections/bookCollection', 'js/collections/myFavouritesCollection', 'js/views/header', 'js/views/myBookLibraryView', 'js/views/favouritesView', 'js/views/filteredView', 'js/views/addNewItemView'

], function($, _, Backbone, BookCollection, favouritesCollection, headerView, libraryView, myfavouritesView, myFilteredView, addNewItemView) {
  var myFavouritesCollection = new favouritesCollection();
  var myBookCollection = new BookCollection();
  var newView = new headerView();
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
      newView.$el.appendTo('header');
      $('header').find('#home').addClass('active');
      $('header').find('#favs').removeClass('active');
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
      $('header').find('#home').removeClass('active');
      $('header').find('#favs').addClass('active');
      library.remove();
      library = new myfavouritesView({
        collection: myFavouritesCollection
      });
      library.$el.appendTo('#container');
    },
    // filteredview: function() {
    //     library.remove();
    //     library = new myFilteredView({
    //         filteredCollection: MyBookCollection
    //     });
    //     library.$el.appendTo('#container');
    // },
    addNew: function() {
      $('header').empty();
      newView.$el.appendTo('header');
      library.remove();
      var addNewView = new addNewItemView({
        collection: myBookCollection
      });
      addNewView.$el.appendTo('#container');

    }
  });



  return Router;
});
