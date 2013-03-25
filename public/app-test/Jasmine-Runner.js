FS = require('fs');
phantom.injectJs('Jasmine-Parser.js');

var url = 'file://' + FS.absolute('../test-runner.html');
UnitTester.init(url);
