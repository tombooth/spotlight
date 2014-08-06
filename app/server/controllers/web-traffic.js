var requirejs = require('requirejs');
var Backbone = require('backbone');
var sanitizer = require('sanitizer');

var dashboards = require('../../support/stagecraft_stub/responses/dashboards'),
    departments = require('../../support/stagecraft_stub/responses/departments'),
    agencies = require('../../support/stagecraft_stub/responses/agencies');

var View = require('../views/web-traffic');

var DashboardCollection = requirejs('common/collections/dashboards');
var PageConfig = requirejs('page_config');

module.exports = function (req, res) {
  var contentDashboards = new DashboardCollection(dashboards.items).filterDashboards(DashboardCollection.CONTENT),
      collection = new DashboardCollection(contentDashboards),
      model = new Backbone.Model(_.extend(PageConfig.commonConfig(req), {
    title: 'Web traffic',
    'page-type': 'services',
    filter: sanitizer.escape(req.query.filter || ''),
    departmentFilter: req.query.department || null,
    departments: departments,
    agencyFilter: req.query.agency || null,
    agencies: agencies,
    data: contentDashboards,
    script: true,
    noun: 'dashboard'
  }));

  var view = new View({
    model: model,
    collection: collection
  });
  view.render();

  res.set('Cache-Control', 'public, max-age=120');
  res.send(view.html);
};
