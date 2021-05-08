const axios = require("axios");
const cheerio = require("cheerio");
const ytdl = require('ytdl-core');
const catchHandler=require('./catchHandler.js');

//Following function downloads Youtube videos using YTDL core
function YoutubeDL(req, cb) {

    var Yurl = req.query.YTD;
    var info = ytdl.getInfo(Yurl).then((info) => {
        try {
            var quality = req.query.qualitySelector;
            var itil;
            if (quality == "low Mp3") {
                header="Content-Disposition", 'attachment;\  filename="' + info.videoDetails.title + '.mp3';
             
                ytdl(Yurl, {
                    format: 'mp3',
                    filter: 'audioonly',
                    quality: "lowestaudio"
                }).pipe(res);
            } else if (quality == "high Mp3") {
                header="Content-Disposition", 'attachment;\  filename="' + info.videoDetails.title + '.mp3';
              
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
                header="Content-Disposition", 'attachment;\  filename="' + info.videoDetails.title + '.mp4';
                var resdata = ytdl(Yurl, itil);

                return cb(resdata,header);

            }
        } catch (err) {
            catchHandler("While Finding data in the DB", err, ErrorC);
            return cb("Error")


        }
    });
}
//Following function fetches the URL from instagram and sends the link as responce
async function InstaDL(req, cb) {
    var re = 0
    var query = req.body.url;
    try {
        const html = await axios.get(url);
        const $ = await cheerio.load(html.data);
        const videoLink = await $("meta[property='og:video']").attr("content");
        // if we get a videoLink, send the videoLink back to the user
        if (videoLink !== undefined) {
            cb(videoLink);
        } else {
            // if the videoLink is invalid, send a JSON res back to the user
            cb('Error');
            
        }
    } catch (err) {
        catchHandler("While Finding data in the DB", err, ErrorC);
        return cb("Error")
    }
}
module.exports = {

    'YoutubeDL': YoutubeDL,
    'InstaDL':InstaDL
}