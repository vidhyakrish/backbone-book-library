define(['jquery', 'underscore', 'backbone', 'text!js/templates/indexTemplate.html', 'js/collections/BookCollection'], function($, _, Backbone, filterTemplate, filteredCollection) {

  var filteredView = Backbone.View.extend({
    collection: filteredCollection,
    template: _.template(filterTemplate),
    initialize: function(options) {
      this.filteredCollection = options.filteredCollection;
      this.render();
    },
    render: function() {
      this.$el.append(this.template({
        items: this.filteredCollection
      }));
    }
  });
  return filteredView;
});
