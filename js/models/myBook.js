define([
    'jquery', 'underscore', 'backbone', 'js/models/bookModel'
], function($, _, Backbone, BookModel) {


    var myBook = new BookModel();

    myBook.set('id', 124);

    console.log(myBook, 'model');

    return myBook;
});
