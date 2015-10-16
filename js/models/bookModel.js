define([
  'jquery', 'underscore', 'backbone'

], function($, _, Backbone) {

  var bookModel = Backbone.Model.extend({
    urlRoot: 'http://wc4042gsd.emea.ad.jpmorganchase.com:3000/library',
    defaults: function() {
      return {
        id: null,
        cat: null,
        name: null,
        author: null,
        series_t: null,
        sequence_i: 1,
        genre_s: null,
        inStock: true,
        price: null,
        pages_i: 384,
        isbn: null
      };
    }

  });
  return bookModel;
});
