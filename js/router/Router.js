define([
  'jquery', 'underscore', 'backbone', 'js/collections/bookCollection', 'js/collections/myFavouritesCollection', 'js/views/header', 'js/views/myBookLibraryView', 'js/views/favouritesView', 'js/views/filteredView', 'js/views/addNewItemView', 'js/views/editExistingItemView'

], function($, _, Backbone, BookCollection, favouritesCollection, headerView, libraryView, myfavouritesView, myFilteredView, addNewItemView, editExistingItemView) {
  var myFavouritesCollection = new favouritesCollection();
  var myBookCollection = new BookCollection();

  var newView;
  var currentView;
  myBookCollection.fetch({
    async: false // assskkkkk
  });


  var Router = Backbone.Router.extend({
    initialize: function(options) {
      this.route('', 'index');
      this.route('show/all', 'showAll');
      this.route('show/favs', 'viewFavourites');
      this.route('show/filters', 'filteredview');
      this.route('add-new', 'addNew');
      this.route('edit/:itemId', 'editItem');
      this.route('home', 'index');
    },

    resetHeader: function(tag) {
      $('header').empty();
      newView = new headerView({
        idAttribute: tag
      });

      newView.$el.appendTo('header');
    },

    resetCurrentView: function() {
      if (currentView !== undefined) {
        currentView.remove();
      }
    },

    createCurrentView: function() {
      currentView.$el.appendTo('#container');
    },

    index: function() {
      this.resetHeader('#home');
      $('#container').empty();
      this.resetCurrentView();

      currentView = new libraryView({
        favouritesCollection: myFavouritesCollection,
        collection: myBookCollection
      });

      this.createCurrentView();
    },

    showAll: function() {
      this.resetHeader('#all');
      this.resetCurrentView();

      currentView = new libraryView({

        collection: myBookCollection
      });

      this.createCurrentView();
    },

    viewFavourites: function() {
      this.resetHeader('#favs');
      this.resetCurrentView();
      currentView = new myfavouritesView({
        collection: myFavouritesCollection
      });
      this.createCurrentView();
    },

    addNew: function() {
      this.resetHeader('#add-new');
      this.resetCurrentView();
      currentView = new addNewItemView({
        collection: myBookCollection
      });
      this.createCurrentView();

    },

    editItem: function(itemId) {

      this.resetHeader('#edit');
      this.resetCurrentView();

      var book = myBookCollection.get(itemId);
      currentView = new editExistingItemView({
        model: book,
        collection: myBookCollection
      });

      this.createCurrentView();
    }
  });



  return Router;
});
