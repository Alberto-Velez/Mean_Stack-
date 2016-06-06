System.register(['angular2/platform/browser', 'angular2/core', 'angular2/http', 'rxjs/Rx', 'rxjs/add/operator/map', "angular2/common"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var browser_1, core_1, http_1, Rx_1, common_1, http_2;
    var NodeApi, App;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
                http_2 = http_1_1;
            },
            function (Rx_1_1) {
                Rx_1 = Rx_1_1;
            },
            function (_1) {},
            function (common_1_1) {
                common_1 = common_1_1;
            }],
        execute: function() {
            NodeApi = (function () {
                function NodeApi(http) {
                    this.http = http;
                    console.log('NodeApi Constructor');
                }
                NodeApi.prototype.get = function () {
                    var endpoint = 'http://127.0.0.1:8081/calls';
                    // http.get returns an Observable from RxJS lib and map is an operator in this lib
                    // the RxJS lib implements an asynchronous observable pattern
                    var response = this.http.get(endpoint).map(function (res) { return res.json().response; }).catch(this.handleError);
                    console.log(' response ' + response);
                    return response;
                };
                NodeApi.prototype.post = function (value) {
                    console.log('in the post? ' + JSON.stringify(value));
                    var endpoint = 'http://localhost:3000/calls';
                    var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
                    var options = new http_2.RequestOptions({ headers: headers });
                    var body = JSON.stringify({ "value": value });
                    return this.http.post(endpoint, body, options)
                        .map(function (res) { return res.json(); }).catch(this.handleError).subscribe();
                };
                NodeApi.prototype.handleError = function (error) {
                    // in a real world app, we may send the server to some remote logging infrastructure
                    // instead of just logging it to the console
                    console.error(error);
                    return Rx_1.Observable.throw(error.json().error || 'Server error');
                };
                NodeApi = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], NodeApi);
                return NodeApi;
            }());
            App = (function () {
                function App(nodeApi) {
                    this.nodeApi = nodeApi;
                    this.title = 'Simple Server';
                    this.call_post = 0;
                    console.log('FYI: console message appear in your browser console');
                }
                App.prototype.doGet = function () {
                    this.call_value = this.nodeApi.get();
                };
                App.prototype.doPost = function () {
                    console.log('call_post ' + this.call_post);
                    this.nodeApi.post(this.call_post);
                };
                App.prototype.ngOnInit = function () {
                    console.log('init called');
                    this.call_value = this.nodeApi.get();
                };
                App = __decorate([
                    core_1.Component({
                        selector: 'app',
                        template: "<div class=\"container\">\n        <div class=\"jumbotron text-center\">\n            <h3><span class=\"fa fa-thumbs-o-up\"></span> {{title}}</h3>\n        <!-- we use ngModel to allow two-way data-binding to the call_value defined in App-->\n            <div>\n                <!-- we use a simple form here (template form) to issue a call to our getter for the 8081 server -->\n                <form f=\"getForm\" (ngSubmit)=\"doGet()\">\n                    <button type=\"submit\" class=\"btn btn-warning btn-lg\">GET</button>\n                    {{call_value | async}}  <!--This pipe accepts a promise or observable as input, updating the view with the appropriate value(s) when the promise is resolved or observable emits a new value. -->\n                </form>\n            </div>\n            <div>\n                <form f=\"postForm\" (ngSubmit)=\"doPost()\">\n                    <button type=\"submit\" class=\"btn btn-warning btn-lg\">POST</button>\n                    <input [(ngModel)]=\"call_post\" placeholder=\"0\">\n                </form>\n            </div>\n        </div>\n        </div>\n",
                        directives: [common_1.FORM_DIRECTIVES],
                        providers: [http_1.HTTP_PROVIDERS, NodeApi],
                    }), 
                    __metadata('design:paramtypes', [NodeApi])
                ], App);
                return App;
            }());
            exports_1("App", App);
            //enableProdMode();
            browser_1.bootstrap(App)
                .catch(function (err) { return console.error(err); });
        }
    }
});
//# sourceMappingURL=post.js.map