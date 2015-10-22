define([
  'jquery', 'underscore', 'backbone', 'js/collections/bookCollection', 'text!js/templates/indexTemplate.html', 'js/collections/myFavouritesCollection'

], function($, _, Backbone, BookCollection, indexTemplate, favouritesCollection) {

  var myBookLibraryView = Backbone.View.extend({

    template: _.template(indexTemplate),

    events: {
      'click a': 'addToFavourites',
      'click .filter': 'filterByParam',
      'click #edit-item': 'editItem'

    },

    initialize: function(options) {
      _.bindAll(this, 'filterByParam');
      this.myFavouritesCollection = options.favouritesCollection;
      this.collection = options.collection;
      this.render();
    },

    render: function(options) {


      var _this = this;

      _this.$el.append(_this.template({
        items: this.collection,
        breadcrumb: 'Available Books'
      }));

    },

    addToFavourites: function(e) {
      var bookId = $(e.target).attr('id');

      $(e.target).html('Added to favourites').removeClass('btn-success').addClass('btn-warning');
      var _this = this;
      this.collection.each(function(item) {
        if (item.get('id') == bookId) {
          _this.myFavouritesCollection.add(item);
        }
      });

    },


    filterByParam: function(e) {
      this.valueQuery = $(e.target).text();
      this.keyQuery = $(e.target).attr('id');

      var _this = this;
      this.FilteredCollection = new BookCollection(this.collection.filter(function(item, keyQuery, valueQuery) {

        var keyQueryValue = _this.keyQuery,
          valueQueryValue = _this.valueQuery;
        return item.get(keyQueryValue) === valueQueryValue;
      }));

      this.$el.empty();
      _this.$el.append(_this.template({
        items: this.FilteredCollection,
        breadcrumb: 'Books filtered by ' + '\'' + this.valueQuery + '\''
      }));
    },

    editItem: function(e) {
      var itemId = $(e.target).closest('.book-item').attr('id');
      Backbone.history.navigate('edit/' + itemId, {
        trigger: true
      });
    }


  });
  return myBookLibraryView;
});
