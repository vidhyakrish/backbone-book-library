define(
    ['jquery', 'underscore', 'backbone', 'text!js/templates/indexTemplate.html', 'js/collections/myFavouritesCollection'], function($, _, Backbone, indexTemplate, favouritesCollection) {

        var favouritesView = Backbone.View.extend({
            collection: favouritesCollection,
            template: _.template(indexTemplate),
            initialize: function(options) {
                this.favouritesCollection = options.favouritesCollection;
                this.render();
            },
            render: function() {
                var _this = this;
                _this.$el.append(_this.template({
                    items: this.favouritesCollection
                }));
            }

        });
        return favouritesView;
    });
