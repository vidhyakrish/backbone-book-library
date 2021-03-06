define(
  ['jquery', 'underscore', 'backbone', 'text!js/templates/indexTemplate.html', 'js/collections/myFavouritesCollection'], function($, _, Backbone, indexTemplate, favouritesCollection) {

    var favouritesView = Backbone.View.extend({
      template: _.template(indexTemplate),
      initialize: function(options) {
        this.render();
      },
      render: function() {
        var _this = this;

        _this.$el.append(_this.template({
          items: this.collection,
          breadcrumb: 'My Favourites',
          noOfFavs: this.collection.length
        }));
        _this.$('.btn-success').hide();

      }

    });
    return favouritesView;
  });
