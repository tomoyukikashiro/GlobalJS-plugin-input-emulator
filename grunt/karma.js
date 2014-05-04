var appSettings = require('../settings/app.json'),
    scriptsSettings = require('../settings/scripts.json'),
    networkSettings = require('../settings/network.json');

module.exports = {
    unit: {
        options: {
            frameworks: ['mocha', 'expect', 'sinon'],
            runnerPort: networkSettings.port.karma,
            singleRun: true,
            browsers: ['PhantomJS'],
            files: [
                appSettings.dir.app + '/bower_components/jquery/jquery.js',
                appSettings.dir.app + '/bower_components/underscore/underscore.js',
                appSettings.dir.app + '/bower_components/GlobalJS/dist/global.min.js',
                appSettings.dir.app + '/scripts/view/InputEmulator.js'
            ].concat(scriptsSettings.test),
            exclude: [
                appSettings.dir.app + '/scripts/main.js'
            ]
        }
    },
    travis: {
        options: {
            frameworks: ['mocha', 'expect', 'sinon'],
            runnerPort: networkSettings.port.karma,
            singleRun: true,
            browsers: ['PhantomJS', 'Firefox'],
            files: [
                appSettings.dir.app + '/bower_components/jquery/jquery.js',
                appSettings.dir.app + '/bower_components/underscore/underscore.js',
                appSettings.dir.app + '/bower_components/GlobalJS/dist/global.min.js',
                appSettings.dir.app + '/scripts/view/InputEmulator.js'
            ].concat(scriptsSettings.test),
            exclude: [
                appSettings.dir.app + '/scripts/main.js'
            ]
        }
    }
};
