define([
  'common/views/visualisations/grouped-graph/grouped-graph',
  'extensions/collections/collection',
  'extensions/models/model',
  'extensions/views/graph/linelabel'
], function (Graph, Collection, Model, LineLabel) {

  describe('Grouped Graph', function () {

    var graph, collection, model;

    beforeEach(function () {
      model = new Model({
        axes: {
          y: [
            { groupId: 'group1' },
            { groupId: 'group2' }
          ]
        }
      });
      collection = new Collection();
      Graph.prototype.GroupClass = function () {};
      graph = new Graph({
        collection: collection,
        model: model,
        valueAttr: 'events'
      });
    });

    describe('calcYScale', function () {

      it('scales domain from 0 to 1 when this is a percentage graph', function () {
        graph.isOneHundredPercent = function () { return true; };
        expect(graph.calcYScale().domain()).toEqual([0, 1]);
      });

    });

    describe('components', function () {

      describe('when showLineLabels is truthy', function () {
        it('should include the linelabel component with the correct args on initialize', function () {
          model.set({ 'show-line-labels': true });
          var labelComponent = graph.components().linelabel.view;
          expect(labelComponent).toEqual(LineLabel);
        });
      });

      describe('when showLineLabels is falsy', function () {
        it('should return the callout component with the correct args on initialize', function () {
          var labelComponent = graph.components().label;
          expect(labelComponent).toBeUndefined();
        });
      });

    });

    describe('hasData', function () {

      beforeEach(function () {
        collection.reset([
          {
            events: null,
            'group1:events': 1,
            'group2:events': 1
          },
          {
            events: null,
            'group1:events': 2,
            'group2:events': 3
          }
        ], { silent: true });
      });

      it('returns true if any line has any data', function () {
        expect(graph.hasData()).toBe(true);
      });

    });


  });


});