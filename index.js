const express = require('express');
const app = express();
const yargs = require('yargs');
const chalk = require('chalk');
const ErrorC = chalk.red.inverse;
const Warning = chalk.yellowBright;
const suc = chalk.greenBright;
const good = chalk.cyanBright;
const mongo = require('mongodb');
const port = process.env.PORT || 8080;
var debug = true;
try {


    const MongoClient = require('mongodb').MongoClient;
    const uri = "mongodb+srv://Alpha1996:Alpha1996@notepad.marpq.mongodb.net/<dbname>?retryWrites=true&w=majority";
    const client = new MongoClient(uri, {
        useNewUrlParser: true
    });

    app.listen(port, () => {
        console.log(suc(`ready for targates on  http://localhost:${port}`));
    });

    app.get('/Update', (req, res) => {
        var myobj = {
            ID: "Company Inc",
            VALUE: "Highway 37"
        };

        client.connect(err => {
            if (err) {
                catchHandler("While conecting the DB", err, ErrorC);
                throw err;
            };
            console.log(good("Connected!"));
            const db = client.db("Notepad");
            var myobj = {
                ID: Date.now(),
                DAta: "Highway 37Highway 37Highway 37Highway 37Highway 37Highway 37Highway 37Highway 3"
            };
            db.collection("test").insertOne(myobj, function (err, res) {
                if (err) throw err;

            })


        })
        res.send("1 document inserted")
    })


    app.get('/find', (req, res) => {
        console.log(suc("result"));
        client.connect(err => {
            if (err) {
                catchHandler("While conecting the DB", err, ErrorC);
                throw err;
            };
            console.log(good("Connected!"));
            const db = client.db("Notepad");
            var query = {
                ID: 1608402560685
            };
            db.collection("test").find(
                query
            ).toArray(function (err, result) {
                if (err) throw err;
                console.log(chalk.red.inverse(result));

                res.send(result)
            });
        });





    })

    app.get('/', (req, res) => {
        res.send('Lets Lift off')
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