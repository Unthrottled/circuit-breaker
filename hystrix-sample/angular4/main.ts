import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

import './app/js/3rdparty-libs/hystrixCommand/hystrixCommand.js';
import './app/js/3rdparty-libs/hystrixThreadPool/hystrixThreadPool.js';
import './app/js/jquery.tinysort.min.js';
import './app/js/tmpl.js';

platformBrowserDynamic().bootstrapModule(AppModule);
