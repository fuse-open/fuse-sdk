const isInstalled = require('is-installed');
const chalk = require('chalk');
const cyan = chalk.cyanBright;
const yellow = chalk.yellowBright;
const log = console.log;

isInstalled('android-build-tools').then(exists => {
    if (exists) {
        log('android-build-tools already installed');
        return;
    }

    log(yellow('android-build-tools could not be found'));
    log();
    log(yellow('If you want to build Android apps it is recommended to install this package using the following command:'));
    log();
    log(cyan('    npm install -g android-build-tools'));
    log();
})
