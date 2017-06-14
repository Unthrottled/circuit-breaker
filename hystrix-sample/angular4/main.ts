import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {AppModule} from './app/app.module';
//CSS FILES
import './styles';
//JS FILES
import './app/js/3rdparty-libs/hystrixCommand/hystrixCommand.js';
import './app/js/3rdparty-libs/hystrixThreadPool/hystrixThreadPool.js';
import './app/js/jquery.tinysort.min.js';
import './app/js/tmpl.js';

import './app/templates/hystrixCommand/hystrixCircuit.html';
import './app/templates/hystrixCommand/hystrixCircuitContainer.html';
import './app/templates/hystrixCommand/hystrixCircuitProperties.html';
import './app/templates/hystrixThreadPool/hystrixThreadPool.html';
import './app/templates/hystrixThreadPool/hystrixThreadPoolContainer.html';

platformBrowserDynamic().bootstrapModule(AppModule);