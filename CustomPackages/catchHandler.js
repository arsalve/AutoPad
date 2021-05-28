const chalk = require('chalk');
const ErrorC = chalk.red.inverse;
const suc = chalk.greenBright;
const Warning = chalk.yellowBright;

const good = chalk.cyanBright;

function catchHandler(location, message, type, debug = true) {

    if (debug == true) {
        switch (type) {
            case "Error":
                color = ErrorC
                break;
            case "sucess":
                color = suc
                break;
            case "Warning":
                color = Warning
                break;
            case "good":
                color = good
                break;
            default:
                color = good
                break;
        }
        console.error(color("Log at " + location + "\n information : " + message))
    }
}
module.exports = catchHandler;