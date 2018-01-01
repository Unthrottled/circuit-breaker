"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./slider.component.htm");
var SliderImpl = /** @class */ (function () {
    function SliderImpl(sessionService, http, zone, urlSupplier, parametersOperator, responseOperator, rangeMax) {
        this.sessionService = sessionService;
        this.http = http;
        this.zone = zone;
        this.urlSupplier = urlSupplier;
        this.parametersOperator = parametersOperator;
        this.responseOperator = responseOperator;
        this.rangeMax = rangeMax;
        this.sliderValue = 10;
        this.someRange2config = {
            behaviour: 'drag',
            connect: true,
            margin: 100,
            range: {
                min: 1,
                max: rangeMax
            }
        };
    }
    SliderImpl.prototype.ngOnInit = function () {
        var self = this;
        this.sessionService.fetchSessionId()
            .subscribe(function (sessionId) {
            self.http.get('./hystrix/get/' + sessionId + self.urlSupplier())
                .subscribe(function (response) {
                self.zone.run(function () {
                    return self.sliderValue = self.responseOperator(response.json());
                });
            });
        });
    };
    SliderImpl.prototype.change = function (newValue) {
        var self = this;
        this.sessionService.fetchSessionId()
            .subscribe(function (sessionId) {
            self.http.post('./hystrix/post/' + sessionId + self.urlSupplier(), self.parametersOperator(newValue, sessionId))
                .subscribe(function (response) {
                self.zone.run(function () {
                    return self.sliderValue = self.responseOperator(response.json());
                });
            });
        });
    };
    return SliderImpl;
}());
exports.SliderImpl = SliderImpl;
//# sourceMappingURL=slider.implementation.js.map