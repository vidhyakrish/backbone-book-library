define(
  ['jquery', 'underscore', 'backbone', 'text!js/templates/addNewTemplate.html', 'js/models/bookModel'], function($, _, Backbone, addNewTemplate, BookModel) {

    var addNewItemView = Backbone.View.extend({

      template: _.template(addNewTemplate),
      events: {
        'click #submit': 'addNew'
      },
      initialize: function(options) {
        this.collection = options.collection;
        this.render();
      },
      render: function() {
        this.$el.append(this.template());
      },
      addNew: function() {
        var name = this.$('#name').val(),
          author = this.$('#author').val(),
          price = this.$('#price').val(),
          genre = this.$('#genre').val(),
          pages = this.$('#pages').val(),
          cats = this.$('#cats').val(),

          isbn = this.$('#isbn').val();

        var model = new BookModel({

          name: name,
          author: author,
          price: price,
          genre_s: genre,
          sequence_i: 1,
          inStock: true,
          pages_i: pages,
          cats: cats,
          isbn: isbn
        });

        model.save();
        this.collection.add(model);

        Backbone.history.navigate("#", true);
      }

    });
    return addNewItemView;
  });
