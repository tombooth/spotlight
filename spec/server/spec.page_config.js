define([
  'page_config'
],
function (PageConfig) {
  describe('PageConfig', function () {

    var req;
    beforeEach(function () {
      var get = jasmine.createSpy();
      get.plan = function (prop) {
        return {
          assetPath: '/path/to/assets/',
          govukHost: 'www.gov.uk'
        }[prop];
      };
      req = {
        app: {
          get: get
        },
        protocol: 'http',
        originalUrl: '/performance/foo'
      };
    });

    describe('getGovUkUrl', function () {
      it('returns the equivalent page location on GOV.UK', function () {
        expect(PageConfig.getGovUkUrl(req)).toEqual('https://www.gov.uk/performance/foo');
      });
    });

    describe('commonConfig', function () {
      it('contains assetPath property', function () {
        var commonConfig = PageConfig.commonConfig(req);
        expect(commonConfig.assetPath).toEqual('/path/to/assets/');
      });
      it('contains assetPath property', function () {
        var commonConfig = PageConfig.commonConfig(req);
        expect(commonConfig.url).toEqual('/performance/foo');
      });
    });
  });
});
