define([
    'jquery', 'underscore', 'backbone', 'js/collections/myBookCollection', 'text!js/templates/indexTemplate.html'

], function($, _, Backbone, BookCollection, indexTemplate) {

    var myBookLibraryView = Backbone.View.extend({
        collection: BookCollection,
        template: _.template(indexTemplate),
        initialize: function() {

            this.render();
        },
        render: function(options) {
            this.$el.html('<h3>All my books</h3>');

            console.log(this.$el);

            var _this = this;

            this.collection.each(function(model) {
                _this.$el.append(_this.template({
                    author: model.author
                }));
            });

        }


    });
    return myBookLibraryView;
});
