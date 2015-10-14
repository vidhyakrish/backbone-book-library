define(['jquery', 'underscore', 'backbone', 'js/models/bookModel'], function($, _, Backbone, bookModel) {

    var myFavouritesCollection = Backbone.Collection.extend({
        model: bookModel
    });
    return myFavouritesCollection;
});
