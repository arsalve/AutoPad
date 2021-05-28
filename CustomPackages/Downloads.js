
const ytdl = require('ytdl-core');
const catchHandler = require('./catchHandler.js');
const puppeteer = require('puppeteer-extra')

// add stealth plugin and use defaults (all evasion techniques)
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())



//Following function downloads Youtube videos using YTDL core
function YoutubeDL(req, cb) {

    var Yurl = req.query.YTD;
    try {
        var info = ytdl.getInfo(Yurl).then((info) => {
            try {
                var quality = req.query.qualitySelector;
                var itil;
                if (quality == "low-mp3") {
                    header = 'attachment;\  filename="' + info.videoDetails.title + '.mp3';

                    itil = {
                        format: 'mp3',
                        filter: 'audioonly',
                        quality: "lowestaudio"
                    };
                } else if (quality == "high-mp3") {
                    header = 'attachment;\  filename="' + info.videoDetails.title + '.mp3';

                    itil = {
                        format: 'mp3',
                        filter: 'audioonly',
                        quality: "highestaudio"
                    };
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
                    header = 'attachment;\  filename="' + info.videoDetails.title + '.mp4';
                }
                var resdata = ytdl(Yurl, itil);

                return cb(resdata, header);

            } catch (err) {
                catchHandler("While Finding data", err, "ErrorC");
                return cb("Error");


            }

        });
    } catch (err) {
        catchHandler("Not an Youtube URL", err, "ErrorC");
        return cb("Not an Youtube URL")
    }
}

//Following function fetches the URL from instagram and sends the link as responce

async function InstaDL(req, cb) {
    var re = 0
    var query = req.body.url;
    try {

        var retURL;
        puppeteer.launch({
            headless: true
        }).then(async browser => {

            const page = await browser.newPage();
            await page.goto(query, {
                timeout: 15000,
                waitUntil: 'domcontentloaded'
            });
            try {
                retURL = await page.evaluate('document.querySelectorAll("meta[property=\'og:video\']")[0].content');
                await browser.close();
                if(retURL !== undefined) {
                    
                     return cb(retURL);
                } else {
                    // if the videoLink is invalid, send a JSON res back to the user
                    return cb('Error');
                }

            } catch (err) {
                await browser.close();
                catchHandler("While Finding ig data", err, "ErrorC");
                return cb("Error")
            }
           
        });
    } catch (err) {
        catchHandler("While Instagram data in the page", err, "ErrorC");
        return cb("Error")
    }
}
module.exports = {

    'YoutubeDL': YoutubeDL,
    'InstaDL': InstaDL}
