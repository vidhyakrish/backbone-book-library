define([
    'jquery', 'underscore', 'backbone', 'js/collections/myBookCollection', 'text!js/templates/indexTemplate.html', 'js/collections/myFavouritesCollection'

], function($, _, Backbone, BookCollection, indexTemplate, favouritesCollection) {

    var myBookLibraryView = Backbone.View.extend({
        collection: BookCollection,

        template: _.template(indexTemplate),

        events: {
            'click a': 'addToFavourites'
        },

        initialize: function() {
            this.myFavouritesCollection = new favouritesCollection();
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
            this.showFavourites();
        },

        showFavourites: function() {
            console.log(this.myFavouritesCollection);
        }

    });
    return myBookLibraryView;
});
