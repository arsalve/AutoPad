const express = require('express')
const app = express();
const yargs = require('yargs');
const chalk = require('chalk');
const ErrorC = chalk.red.inverse;
const Warning = chalk.yellowBright;
const suc = chalk.greenBright;
const port = process.env.PORT || 8080;
var debug = true;
/*
if ((yargs.argv.Port != undefined) && (typeof (yargs.argv.Port) == "number")) {
    port = yargs.argv.Port
} else {
    console.log(Warning("Port not found so tracking targetes on usual location"))
    port = 80;
}*/
try {

    app.get('/', (req, res) => {
        res.send('Lets Lift off')
    })

    app.listen(port, () => {
        console.log(suc(`ready for targates on  http://localhost:${port}`));
    })
} catch (error) {
    catchHandler("starting the server", error);

}




function catchHandler(location, message, color) {
    if (debug = true) {
        if (color == undefined) {
            color = chalk.blueBright;
        }
        console.error(color("error occured when " + location + "\n" + message))
    }
}
