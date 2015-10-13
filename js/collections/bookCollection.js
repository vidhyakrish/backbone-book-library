define([
    'jquery', 'underscore', 'backbone', 'js/models/bookModel'

], function($, _, Backbone, BookModel) {
    var bookCollection = Backbone.Collection.extend({
        model: BookModel,
        url: 'http://wc4042gsd.emea.ad.jpmorganchase.com:3000/library'
    });
    return bookCollection;
});
