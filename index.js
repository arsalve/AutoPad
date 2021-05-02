const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
const ytdl = require('ytdl-core');
const bodyParser = require("body-parser");
const chalk = require('chalk');
const axios = require("axios");
const cheerio = require("cheerio");

const ErrorC = chalk.red.inverse;
const suc = chalk.greenBright;
const port = process.env.PORT || 8080;
const DataManupulation = require('./CustomPackages/DataManupulation.js');
const {
    exception
} = require('console');
let debug = true;
let fs = require('fs');
const {
    format
} = require('path');


app.use('/static', express.static('./static'));
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
            try {
                var quality = req.query.qualitySelector;
                var itil;
                if (quality == "low Mp3") {
                    res.header("Content-Disposition", 'attachment;\  filename="' + info.videoDetails.title + '.mp3');
                    ytdl(Yurl, {
                        format: 'mp3',
                        filter: 'audioonly',
                        quality: "lowestaudio"
                    }).pipe(res);
                } else if (quality == "high Mp3") {
                    res.header("Content-Disposition", 'attachment;\  filename="' + info.videoDetails.title + '.mp3');
                    ytdl(Yurl, {
                        format: 'mp3',
                        filter: 'audioonly',
                        quality: "highestaudio"
                    }).pipe(res);
                } else {
                    if ((quality == undefined) || (quality == 'Automatic')) {
                        itil = {
                            'format': 'mp4'
                        };
                    } else {
                        itil = {
                            'format': 'mp4',
                            'quality': quality
                        };
                    }
                    res.header("Content-Disposition", 'attachment;\  filename="' + info.videoDetails.title + '.mp4');
                    var resdata = ytdl(Yurl, itil);
                    resdata.pipe(res);
                }
            } catch (err) {
                res.status(404);
                res.send( "The link you have entered is invalid. ");
                catchHandler("While Finding data", err, ErrorC);

            }
        });
    });
    
    app.post("/Instdownload", async (req, res) => {
      
        try {
          // call the getVideo function, wait for videoString and store it
          // in the videoLink variable
          const videoLink = await getVideo(req.body.url);
          // if we get a videoLink, send the videoLink back to the user
          if (videoLink !== undefined) {
            res.status(200);
            res.send(videoLink);
          } else {
            // if the videoLink is invalid, send a JSON res back to the user
            res.status(404);
            res.send( "The link you have entered is invalid. ");
          }
        } catch (err) {
          // handle any issues with invalid links
          res.status(404);
          res.send( "The link you have entered is invalid. ");
        }
      });
    function catchHandler(location, message, color) {
        if (debug = true) {
            if (color == undefined) {
                color = chalk.blueBright;
            }

            console.error(color("error occured when " + location + "\n" + message))
        }
    }


    const getVideo = async url => {
        // calls axios to go to the page and stores the result in the html variable
        const html = await axios.get(url);
        // calls cheerio to process the html received
        const $ = cheerio.load(html.data);
        // searches the html for the videoString
        const videoString = $("meta[property='og:video']").attr("content");
        // returns the videoString
        return videoString;
      };


} catch (error) {
    console.log(ErrorC("starting the server", error));

}