define(['jquery', 'underscore', 'backbone', 'text!js/templates/editExistingItemTemplate.html', 'js/models/bookModel'], function($, _, Backbone, EditTemplate, BookModel) {

  var editExistingItemView = Backbone.View.extend({

    template: _.template(EditTemplate),
    events: {
      'click #submit': 'updateItem'
    },
    initialize: function(options) {
      this.model = options.model;
      this.collection = options.collection;
      this.render();
    },
    render: function() {
      this.$el.append(this.template({
        breadcrumb: 'Edit existing item',
        book: this.model.toJSON()
      }));
    },
    updateItem: function() {
      var name = this.$('#name').val(),
        author = this.$('#author').val(),
        price = this.$('#price').val(),
        genre = this.$('#genre').val(),
        pages = this.$('#pages').val(),
        cats = this.$('#cats').val(),

        isbn = this.$('#isbn').val();

      this.model.set({

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

      this.model.save();
      this.collection.add(this.model);

      Backbone.history.navigate("#", true);
    }

  });

  return editExistingItemView;


});
