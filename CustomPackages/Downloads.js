const ytdl = require('ytdl-core');
const catchHandler = require('./catchHandler.js');


// add stealth plugin and use defaults (all evasion techniques)
const cheerio = require('cheerio');
const request = require('request');
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
    var video_url = req.body.url;
    try {

        var retURL;
        if (video_url !== undefined) {

            if (video_url.substring(0, 8) === 'https://' || video_url.substring(0, 7) === 'http://' ||
                video_url.substring(0, 21) === 'https://www.instagram' || video_url.substring(0, 20) === 'http://www.instagram.com') {

                request(video_url, (error, response, html) => {
                    let $ = cheerio.load(html)
                        if (!error) {
                            console.log('Insta_grab : ' + video_url + ' : Loaded')
                            //basic data from the meta tags
                            let video_link = $('meta[property="og:video"]').attr('content');
                            let file = $('meta[property="og:type"]').attr('content');
                            let url = $('meta[property="og:url"]').attr('content');
                            let title = $('meta[property="og:title"]').attr('content');
                            retURL = {
                                title,
                                url,
                                file,
                                video_link
                            };
                            console.log(retURL); return cb(retURL.video_link)
                        } else {
                            return cb({
                                'message': 'Error, Unable to load webpage'
                            })
                        }
                    })
                       
                   
                


            } else {
                return cb({
                    'message': 'Invalid URL'
                });
            }
        } else {
            return cb({
                'message': 'Provided invalid URL'
            });
        }
        // puppeteer.launch({
        //     headless: false
        // }).then( browser => {

        //     const page =  browser.newPage();
        //      page.goto(query, {
        //         timeout: 15000,
        //         waitUntil: 'domcontentloaded'
        //     });
        //     try {
        //         retURL =  page.evaluate('document.querySelectorAll("meta[property=\'og:video\']")[0].content');
        //          browser.close();
        //         if(retURL !== undefined) {

        //              return cb(retURL);
        //         } else {
        //             // if the videoLink is invalid, send a JSON res back to the user
        //             return cb('Error');
        //         }

        //     } catch (err) {
        //          browser.close();
        //         catchHandler("While Finding ig data", err, "ErrorC");
        //         return cb("Error")
        //     }

        // });
    } catch (err) {
        catchHandler("While Instagram data in the page", err, "ErrorC");
        return cb("Error")
    }
}
module.exports = {

    'YoutubeDL': YoutubeDL,
    'InstaDL': InstaDL
}