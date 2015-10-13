define([
    'jquery', 'underscore', 'backbone', 'js/collections/myBookCollection'

], function($, _, Backbone, myBookCollection) {
    var myBookLibrary = new myBookLibraryView({
        //     collection: myBookCollection
    });

    myBookLibrary.$el.appendTo($('#library-view'));
    console.log(myBookLibrary.el);


    return myBookLibrary;
});
