define(
  ['jquery', 'underscore', 'backbone', 'text!js/templates/addNewTemplate.html', ], function($, _, Backbone, addNewTemplate) {

    var addNewItemView = Backbone.View.extend({

      template: _.template(addNewTemplate),
      events: {
        'click #submit': 'addNew'
      },
      initialize: function(options) {
        this.collection = options.collection;
        console.log(this.collection);

        this.render();
      },
      render: function() {
        this.$el.append(this.template());
      },
      addNew: function() {

        var name = this.$('#name').val();
        var author = this.$('#author').val();
        var price = this.$('#price').val();
        var genre = this.$('#genre').val();
        this.collection.add({
          name: name,
          author: author,
          price: price,
          genre_s: genre

        });
        Backbone.history.navigate("#", true);

        this.collection.save();

      }

    });
    return addNewItemView;
  });
