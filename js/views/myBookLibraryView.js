define([
  'jquery', 'underscore', 'backbone', 'js/collections/bookCollection', 'text!js/templates/indexTemplate.html', 'js/collections/myFavouritesCollection'

], function($, _, Backbone, BookCollection, indexTemplate, favouritesCollection) {

  var myBookLibraryView = Backbone.View.extend({

    template: _.template(indexTemplate),

    events: {
      'click a': 'addToFavourites',
      'click span': 'filterByParam'
    },

    initialize: function(options) {
      _.bindAll(this, 'filterByParam');
      this.myFavouritesCollection = options.favouritesCollection;
      this.collection = options.collection;
      this.render();
    },

    render: function(options) {
      this.$el.html('<h3>All my books</h3>');

      var _this = this;

      _this.$el.append(_this.template({
        items: this.collection
      }));

    },

    addToFavourites: function(e) {
      var bookId = $(e.target).attr('id');
      $(e.target).html('Added to favourites').removeClass('btn-success').addClass('btn-warning');
      var _this = this;
      this.collection.each(function(item) {
        if (item.get('id') === bookId) {
          _this.myFavouritesCollection.add(item);
        }
      });


    },


    filterByParam: function(e) {

      var query = $(e.target).text();
      var keyQuery = $(e.target).attr('id');

      if (keyQuery === 'genre_s') {
        this.filteredCollection = new BookCollection(this.collection.where({
          genre_s: query
        }));
      } else if (keyQuery === 'author') {
        this.filteredCollection = new BookCollection(this.collection.where({
          author: query
        }));
      }


      this.$el.empty();
      var _this = this;
      _this.$el.append(_this.template({
        items: this.filteredCollection
      }));
    }

  });
  return myBookLibraryView;
});
