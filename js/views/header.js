define(
  ['jquery', 'underscore', 'backbone', 'text!js/templates/headerTemplate.html'], function($, _, Backbone, headerTemplate) {

    var index = Backbone.View.extend({
      template: _.template(headerTemplate),
      events: {
        'click #show-all': 'showAll'
      },
      initialize: function(options) {
        this.idAttribute = options.idAttribute;
        this.render();

      },
      render: function() {
        this.$el.append(this.template());
        this.toggleClass();
      },
      toggleClass: function() {
        this.$(this.idAttribute).removeClass('inactive').addClass('active');
      },
      showAll: function() {
        Backbone.history.navigate('home', {
          trigger: true
        });

      }



    });
    return index;
  });
