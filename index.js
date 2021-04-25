const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
const ytdl = require('ytdl-core');
const bodyParser = require("body-parser");
const chalk = require('chalk');
app.use('/static', express.static('./static'));

const ErrorC = chalk.red.inverse;
const suc = chalk.greenBright;
const port = process.env.PORT || 8080;
const DataManupulation = require('./CustomPackages/DataManupulation.js');
const {
    exception
} = require('console');
let debug = true;
let fs = require('fs');
const { format } = require('path');

try {
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(cors());
    app.use(express.static(path.join(__dirname, './Public')));
    app.use(bodyParser.json({
        limit: '50mb'
    }))

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
    app.get('/', (req, res) => {

        fs.readFile(__dirname + '\\index.html', 'utf8', function (err, text) {
            res.send(text, {
                root: './'
            });
        });
    })

    app.get('/YTDdownload', (req, res) => {

        var Yurl = req.query.YTD;
        var info = ytdl.getInfo(Yurl).then((info) => {
            var quality = req.query.qualitySelector;
            var itil;
            (info.formats).forEach(Format => {
                if(quality==Format.qualityLabel){
                    itil=Format.itag;
                }
            });
            if(quality=="Only Mp3")
             {
                res.header("Content-Disposition", 'attachment;\  filename="' + info.videoDetails.title + '.mp3');
                ytdl(Yurl, {
                    format: 'mp3',
                    filter: 'audioonly',
                    quality: "highestaudio"
                }).pipe(res);
            }
            else  {
                if(itil==undefined){
                    itil  = "highest";
                }
                res.header("Content-Disposition", 'attachment;\  filename="' + info.videoDetails.title+ '.mp4');
                ytdl(Yurl, {
                    format: 'mp4',
                    quality: itil
                }).pipe(res);
            }
        });
    });

    function catchHandler(location, message, color) {
        if (debug = true) {
            if (color == undefined) {
                color = chalk.blueBright;
            }

            console.error(color("error occured when " + location + "\n" + message))
        }
    }

} catch (error) {
    console.log(ErrorC("starting the server", error));

}