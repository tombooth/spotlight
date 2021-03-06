var DashboardView = require('../dashboard');

module.exports = DashboardView.extend({

  getContext: function () {
    return _.extend(DashboardView.prototype.getContext.apply(this, arguments), {
      hasFooter: true
    });
  },

  getMetaDescription: function () {
    var description = ['View performance statistics for the \'',
        this.model.get('title'),
        '\' service from the Performance Platform on GOV.UK'];
    return description.join('');
  },

  getTagline: function () {
    return this.model.get('tagline') || 'This dashboard shows information about how ' +
            'the <strong>' + this.model.get('title') +
            '</strong> service is currently performing.';
  },

  getBreadcrumbCrumbs: function () {
    var crumbs = DashboardView.prototype.getBreadcrumbCrumbs.apply(this, arguments);
    if (this.model.get('department')) {
      crumbs.push({
        title: this.model.get('department').title
      });
    }
    if (this.model.get('agency')) {
      crumbs.push({
        title: this.model.get('agency').title
      });
    }
    if (this.model.get('page-type') === 'module') {
      crumbs.push({
        title: this.model.get('title')
      });
    }
    return crumbs;
  }

});
