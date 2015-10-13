define(
    ['jquery', 'underscore', 'backbone', 'text!js/templates/headerTemplate.html'], function($, _, Backbone, headerTemplate) {

        var index = Backbone.View.extend({
            template: _.template(headerTemplate),
            initialize: function() {
                this.render();
            },
            render: function() {
                console.log(this.$el);
                this.$el.append(this.template());
            }

        });
        return index;
    });
