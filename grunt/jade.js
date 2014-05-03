var appSettings = require('../settings/app.json'),
    networkSettings = require('../settings/network.json'),
    scriptsSettings = require('../settings/scripts.json');

module.exports = {
    options: {
        pretty: true,
        data: {
            httpDomain: networkSettings.domain.local,
            scripts: scriptsSettings
        },
        basedir: appSettings.dir.app + '/jade'
    },
    server: {
        files: [{
            expand: true,
            cwd: appSettings.dir.app + '/jade',
            src: '**/!(_)*.jade',
            dest: '.tmp',
            ext: '.html'
        }]
    },
    stg: {
        options: {
            data: {
                resourcePath: '',
                domain: networkSettings.domain,
                scripts: scriptsSettings
            }
        },
        files: [{
            expand: true,
            cwd: appSettings.dir.app + '/jade',
            src: '**/!(_)*.jade',
            dest: appSettings.dir.dist,
            ext: '.html'
        }]
    },
    dist: {
        options: {
            data: {
                httpDomain: networkSettings.domain.prod
            }
        },
        files: [{
            expand: true,
            cwd: appSettings.dir.app + '/jade',
            src: '**/!(_)*.jade',
            dest: appSettings.dir.dist,
            ext: '.html'
        }]
    }
};
