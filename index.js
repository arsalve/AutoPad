const express = require('express');
const app = express();
const path = require('path')
const bodyParser = require("body-parser");
const chalk = require('chalk');
const ErrorC = chalk.red.inverse;
const suc = chalk.greenBright;
const port = process.env.PORT || 8080;
const DataManupulation = require('./CustomPackages/DataManupulation.js');
const {
    exception
} = require('console');
let debug = true;
let fs = require('fs');

try {
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use((req, res, next) => {
        const allowedOrigins = ['http://localhost:8080', 'project-notepad'];
        const origin = req.headers.origin;
        console.log("Results",origin)
        if (allowedOrigins.includes(origin)) {
            console.log("Results",origin)
            res.setHeader('Access-Control-Allow-Origin', origin);
        }
        next();
    });
    app.use(express.static(path.join(__dirname, './Public')));
    app.use(bodyParser.json({limit: '50mb'}))
   
    app.listen(port, () => {
        console.log(suc(`ready for targates on  http://localhost:${port}`));
    });
    app.patch('/Update', (req, res) => {

        let Responce = DataManupulation.Updatrdata(req, (responce) => {
            res.send(responce);
        });
    })
    app.post('/find', (req, res) => {
        var responce = DataManupulation.FindObj(req, (responce) => {
            res.send(responce);
        });

    });
    app.get('*', (req, res) => {
        fs.readFile(__dirname + '\\index.html', 'utf8', function (err, text) {
            res.send(text);
        });
    })



    function catchHandler(location, message, color) {
        if (debug = true) {
            if (color == undefined) {
                color = chalk.blueBright;
            }

            console.error(color("error occured when " + location + "\n" + message))
        }
    }

} catch (error) {
    catchHandler("starting the server", error, ErrorC);

}