define([
    'jquery', 'underscore', 'backbone', 'js/collections/bookCollection'

], function($, _, Backbone, BookCollection) {

    var myBookCollection = new BookCollection();
    myBookCollection.fetch({
        async: false // assskkkkk
    });


    console.log(myBookCollection, 'collection');
    return myBookCollection;
});
