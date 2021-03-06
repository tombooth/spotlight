define(['app/support/backdrop_stub/response_fetcher.js', 'lodash', 'fs', 'path'],
function (ResponseFetcher, _, fs, path) {

  var stubMappings = [
    { 'key': {'service': 'licensing', 'api_name': 'monitoring'}, 'file':  'licensing_availability_response.json'},
    { 'key': {'service': 'licensing', 'api_name': 'application', 'filter_by': 'authorityUrlSlug:fake-authority-1', 'group_by': 'licenceUrlSlug'}, 'file':  'licensing_top_5_licenses.json'},
    { 'key': {'service': 'licensing', 'api_name': 'application', 'filter_by': 'authorityUrlSlug:fake-authority-1', 'period': 'week'}, 'file':  'licensing_top.json'},
    { 'key': {'service': 'licensing', 'api_name': 'application'}, 'file':  'licensing_applications.json'},
    { 'key': {'filter_by': 'dataType:licensing_overview_journey'}, 'file':  'licensing_overview_journey.json'},
    { 'key': {'service': 'pay-legalisation-post', 'api_name': 'journey'}, 'file':  'fco_overview_journey.json'},
    { 'key': {'service': 'pay-foreign-marriage-certificates', 'api_name': 'monitoring'}, 'file':  'foreign_marriage_availability.json'},
    { 'key': {'service': 'pay-register-death-abroad', 'api_name': 'journey'}, 'file':  'pay-register-death-abroad-journey.json'},
    { 'key': {'service': 'deposit-foreign-marriage', 'api_name': 'journey'}, 'file':  'journey-with-missing-data.json'},
    { 'key': {'service': 'deposit-foreign-marriage', 'api_name': 'monitoring', 'period': 'hour'}, 'file':  'deposit_foreign_marriage_monitoring_hour.json'},
    { 'key': {'service': 'deposit-foreign-marriage', 'api_name': 'monitoring', 'period': 'day'}, 'file':  'deposit_foreign_marriage_monitoring_day.json'},
    { 'key': {'service': 'lasting-power-of-attorney', 'api_name': 'journey', 'group_by': 'eventLabel', 'filter_by': 'eventAction:help'}, 'file':  'lpa_help_usage.json'},
    { 'key': {'service': 'lasting-power-of-attorney', 'api_name': 'journey'}, 'file':  'lpa_journey.json'},
    { 'key': {'service': 'lasting-power-of-attorney', 'api_name': 'monitoring'}, 'file':  'lpa_availability.json'},
    { 'key': {'service': 'lasting-power-of-attorney'}, 'file':  'lpa_volumes.json'},
    { 'key': {'service': 'vehicle-licensing', 'api_name': 'failures'}, 'file':  'vehicle_licensing_failures.json'},
    { 'key': {'service': 'vehicle-licensing', 'api_name': 'volumetrics', 'group_by': 'service'}, 'file':  'vehicle_licensing_services.json'},
    { 'key': {'service': 'vehicle-licensing', 'api_name': 'volumetrics', 'group_by': 'channel'}, 'file':  'vehicle_licensing_volumetrics.json'},
    { 'key': {'service': 'vehicle-licensing', 'api_name': 'channels'}, 'file':  'vehicle_licensing_channels.json'},
    { 'key': {'service': 'vehicle-licensing', 'api_name': 'customer-satisfaction'}, 'file':  'vehicle_licensing_customer_satisfaction.json'},
    { 'key': {'service': 'sorn', 'api_name': 'monitoring'}, 'file':  'availability.json'},
    { 'key': {'service': 'tax-disc', 'api_name': 'monitoring'}, 'file':  'availability.json'},
    { 'key': {'api_name': 'monitoring', 'period': 'hour'}, 'file':  'deposit_foreign_marriage_monitoring_hour.json'},
    { 'key': {'api_name': 'monitoring', 'period': 'day'}, 'file':  'deposit_foreign_marriage_monitoring_day.json'},
    { 'key': {'api_name': 'realtime'}, 'file':  'licensing_realtime.json'}
  ];

  describe('fetch json', function () {

    _.each(stubMappings, function (mapping) {
      describe('when there is a mapped json response', function () {
        it('responds with ' + mapping.file, function () {
          var responseFetcher = new ResponseFetcher();
          var jsonResponse = fs.readFileSync(path.join('app/support/backdrop_stub/responses', mapping.file));
          var request = { param: function (key) {
            return mapping.key[key];
          } };

          expect(responseFetcher.fetchJson(request)).toEqual(JSON.parse(jsonResponse));
        });
      });
    });

    describe('when there no mapped json response', function () {

      it('respond with the relevant json file', function () {
        var responseFetcher = new ResponseFetcher();
        var params = {
          'service': 'blagh',
          'api_name': 'nonsense'
        };
        var request = { param: function (key) {
          return params[key];
        } };

        expect(responseFetcher.fetchJson(request)).toEqual(null);
      });

    });
  });

});
