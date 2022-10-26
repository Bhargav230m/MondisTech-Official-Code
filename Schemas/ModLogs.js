const {model, Schema} = require('mongoose');

let Modlogs = new Schema({
    Guild: String,
    Channel: String,
});

module.exports = model("Modlog", Modlogs);