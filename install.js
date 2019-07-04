const isInstalled = require('is-installed');
const isWindows = require('is-windows');
const chalk = require('chalk');
const which = require('which');
const cyan = chalk.cyanBright;
const yellow = chalk.yellowBright;
const red = chalk.redBright;
const log = console.log;

isInstalled('android-build-tools').then(exists => {
    if (exists) {
        log('android-build-tools already installed');
    } else {
        log(yellow('android-build-tools could not be found'));
        log();
        log(yellow('If you want to build Android apps it is recommended to install this package using the following command:'));
        log();
        log(cyan('    npm install -g android-build-tools'));
        log();
    }
})

if (!isWindows()) {
    if (which.sync('mono', {nothrow: true})) {
        log('mono already installed');
    } else {
        log(red('mono could not be found'));
        log();
        log(red('Mono is required to use Fuse SDK. Get the latest version from here:'));
        log();
        log(cyan('    https://www.mono-project.com/download/'));
        log();
    }
}
