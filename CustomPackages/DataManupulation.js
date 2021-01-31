const uri = "mongodb+srv://Alpha1996:Alpha1996@notepad.marpq.mongodb.net/Notepad?retryWrites=true&w=majority";
const mongoose = require('mongoose');
const chalk = require('chalk');
const ErrorC = chalk.red.inverse;
const Warning = chalk.yellowBright;
const suc = chalk.greenBright;
const good = chalk.cyanBright;

const notes = require('./Models.js');
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});
async function FindObj(req, cb) {
    var re = 0
    var query = req.body;
    try {
        var result = await notes.find(query).exec();
        // console.log(result);
        if (result.length > 0)
            return cb(result);
        else
            return cb("object not Found");
    } catch (err) {
        catchHandler("While Finding data in the DB", err, ErrorC);
        return cb("Error")
    }


}
async function Updatrdata(req, resp) {
    try {
        var query = {
            'id': req.body.id
        }
        var obj = req.body;

        var resp = await notes.findOneAndUpdate(query, obj, {
            new: true,
            upsert: true, // Make this update into an upsert
            rawResult: true

        }).then(() => {
            FindObj(req, resp);
        });
    } catch {
        (err) => {
            catchHandler("While conecting the DB", err, ErrorC);
            return err;
        }
    }


}
function catchHandler(location, message, color) {
    if (debug = true) {
        if (color == undefined) {
            color = chalk.blueBright;
        }

        console.error(color("error occured when " + location + "\n" + message))
    }
}
module.exports = {
    'FindObj': FindObj,
    'Updatrdata': Updatrdata
}