"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
var app_module_1 = require("./app/app.module");
//CSS FILES
require("./styles");
//JS FILES
require("./app/assets/js/3rdparty-libs/hystrixCommand/hystrixCommand.js");
require("./app/assets/js/3rdparty-libs/hystrixThreadPool/hystrixThreadPool.js");
require("./app/assets/js/jquery.tinysort.min.js");
require("./app/assets/js/tmpl.js");
require("./app/templates/hystrixCommand/hystrixCircuit.html");
require("./app/templates/hystrixCommand/hystrixCircuitContainer.html");
require("./app/templates/hystrixCommand/hystrixCircuitProperties.html");
require("./app/templates/hystrixThreadPool/hystrixThreadPool.html");
require("./app/templates/hystrixThreadPool/hystrixThreadPoolContainer.html");
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(app_module_1.AppModule);
//# sourceMappingURL=main.js.map