import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import './sandwich/js/3rdparty-libs/hystrixCommand/hystrixCommand.js';
import './sandwich/js/3rdparty-libs/hystrixThreadPool/hystrixThreadPool.js';
import './sandwich/js/jquery.tinysort.min.js';
import './sandwich/js/tmpl.js';
import {AppModule} from './sandwich/app.module';

platformBrowserDynamic().bootstrapModule(AppModule);