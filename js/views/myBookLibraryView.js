define([
    'jquery', 'underscore', 'backbone', 'js/collections/bookCollection', 'js/collections/myBookCollection', 'text!js/templates/indexTemplate.html', 'js/collections/myFavouritesCollection'

], function($, _, Backbone, BookCollection, MyBookCollection, indexTemplate, favouritesCollection) {

    var myBookLibraryView = Backbone.View.extend({
        collection: MyBookCollection,

        template: _.template(indexTemplate),

        events: {
            'click a': 'addToFavourites',
            'click span': 'filterByParam'
        },

        initialize: function(options) {
            _.bindAll(this, 'filterByParam');
            this.myFavouritesCollection = options.favouritesCollection;
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

        },
        filterByParam: function(e) {
            var genre = $(e.target).text().toLowerCase();
            var author = $(e.target).text();
            var keyQuery = $(e.target).attr('id');

            if (keyQuery === 'genre_s') {
                this.filteredCollection = new BookCollection(this.collection.where({
                    genre_s: genre
                }));
            } else if (keyQuery === 'author') {
                this.filteredCollection = new BookCollection(this.collection.where({
                    author: author
                }));
            }


            console.log(this.filteredCollection);


            this.$el.empty();
            var _this = this;
            _this.$el.append(_this.template({
                items: this.filteredCollection
            }));
        }

    });
    return myBookLibraryView;
});
