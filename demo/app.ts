import 'angular';
import register from '@kpsys/angularjs-register';

import '../dist/angularjs-splitter.css';
import splitterModule from '../dist/angularjs-splitter';
import DemoController from './demo.controller';

register('app', [splitterModule])
    .controller('demoController', DemoController);
