const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');

const bodyParser = require("body-parser");

const port = process.env.PORT || 8080;
const DataManupulation = require('./CustomPackages/DataManupulation.js');
const Downloads = require('./CustomPackages/Downloads.js').default;
const catchHandler=require('./CustomPackages/catchHandler.js');
const {
    exception
} = require('console');
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
//defining port to listen
    app.listen(port, () => {
        catchHandler('Ignition','ready for targates',"sucess");
    });
    //Following Endpoint Updates an object in Mongo db or if the object is not present it will create new  
    app.patch('/Update', (req, res) => {

        let Responce = DataManupulation.Updatrdata(req, (responce) => {
            res.send(responce);
        });
    });
    //Following Endpoint finds an object from Mongo db 
    app.post('/find', (req, res) => {
        var responce = DataManupulation.FindObj(req, (responce) => {
            res.send(responce);
        });

    });
     //Following Endpoint sends an entry page for user
    app.get('/', (req, res) => {

        fs.readFile(__dirname + '\\index.html', 'utf8', function (err, text) {
            res.send(text, {
                root: './'
            });
        });
    });
//Following Endpoint for downloading youtube video based on link
    app.get('/YTDdownload', (req, res) => {

        var responce = Downloads.YoutubeDL(req, (data,header) => {
            if (data != 'error'){
            res.header("Content-Disposition",header);
                data.pipe(res);}
            else {
                res.status(404);
                res.send("The link you have entered is invalid. ");
            }
        });


    });
//Following Endpoint for downloading Instagram video based on link
    app.post("/Instdownload",  (req, res) => {

        var responce = Downloads.InstaDL(req, (data) => {
            //res.send(responce);
            if (data != 'error'){
              
                res.send(data)}
            else {
                res.status(404);
                res.send("The link you have entered is invalid. ");
            }
        });


    });
} catch (error) {
    catchHandler('Start',error,"ErrorC")

}

