"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
require("./sandwich/js/3rdparty-libs/hystrixCommand/hystrixCommand.js");
require("./sandwich/js/3rdparty-libs/hystrixThreadPool/hystrixThreadPool.js");
require("./sandwich/js/jquery.tinysort.min.js");
require("./sandwich/js/tmpl.js");
var app_module_1 = require("./sandwich/app.module");
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(app_module_1.AppModule);
//# sourceMappingURL=main.js.map