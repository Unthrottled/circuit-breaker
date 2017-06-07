import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {AppModule} from './sandwich/app.module';

//CSS FILES
import './styles'

//JS FILES
import './sandwich/js/3rdparty-libs/hystrixCommand/hystrixCommand.js';
import './sandwich/js/3rdparty-libs/hystrixThreadPool/hystrixThreadPool.js';
import './sandwich/js/jquery.tinysort.min.js';
import './sandwich/js/tmpl.js';

import './sandwich/templates/hystrixCommand/hystrixCircuit.html';
import './sandwich/templates/hystrixCommand/hystrixCircuitContainer.html';
import './sandwich/templates/hystrixCommand/hystrixCircuitProperties.html';
import './sandwich/templates/hystrixThreadPool/hystrixThreadPool.html';
import './sandwich/templates/hystrixThreadPool/hystrixThreadPoolContainer.html';

platformBrowserDynamic().bootstrapModule(AppModule);