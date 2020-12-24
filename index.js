const express = require('express');
const app = express();
const yargs = require('yargs');
var fs = require('fs');
const chalk = require('chalk');
const path =require('path')
const bodyParser = require("body-parser");
const ErrorC = chalk.red.inverse;
const Warning = chalk.yellowBright;
const suc = chalk.greenBright;
const good = chalk.cyanBright;
const mongo = require('mongodb');
const port = process.env.PORT || 8080;
var debug = true;
const MongoClient = require('mongodb').MongoClient;
const e = require('express');
const uri = "mongodb+srv://Alpha1996:Alpha1996@notepad.marpq.mongodb.net/<dbname>?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

try {
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.static(path.join(__dirname,'./Public')));   
    app.use(bodyParser.json());
    app.listen(port, () => {
        console.log(suc(`ready for targates on  http://localhost:${port}`));
    });
    app.post('/Update', (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
      

        var responce = Updatrdata(req);
        res.send(responce);
    })
    app.post('/find', (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
      
        var responce = FindObj(req ,(responce)=>{res.send(responce);});
       
    });



app.get('*', (req, res) => {
    fs.readFile(__dirname + '\\index.html', 'utf8', function(err, text){
        res.send(text);
    });
    //res.send('Lets Lift off')
})





}
catch (error) {
    catchHandler("starting the server", error);

}

function FindObj(req,cb) {
    var re = 0
    client.connect(err => {
        if (err) {
            catchHandler("While conecting the DB", err, ErrorC);
            return cb("Error");
        } else {
            console.log(good("Connected!"));
            const db = client.db("Notepad");
            var query = req.body; //to find
            db.collection("test").find(
                query
            ).toArray(function (err, result) {
                if (err)
                    if (err) {
                        catchHandler("While Finding data in the DB", err, ErrorC);
                        return cb("Error")

                    };
                if(result.length>0)
                return cb(result); 
                else
                return cb("object not Found"); 

            });
        }
    });

}

function Updatrdata(req) {
    var myobj = req.body;
    client.connect(err => {
        if (err) {
            catchHandler("While conecting the DB", err, ErrorC);
            return err;
        } else {
            const db = client.db("Notepad");
            db.collection("test").findOneAndUpdate({'id':req.body.id},{$set:req.body},{upsert: true, new: true, setDefaultsOnInsert: true});(myobj, function (err, res) {
                if (err) {
                    catchHandler("While Inserting data in db the DB", err, ErrorC);
                    return err;

                } else {
                    console.log(good("Herer connected!"));
                    return "200";
                }
            })
        }

    })
}

function catchHandler(location, message, color) {
    if (debug = true) {
        if (color == undefined) {
            color = chalk.blueBright;
        }
        console.error(color("error occured when " + location + "\n" + message))
    }
}