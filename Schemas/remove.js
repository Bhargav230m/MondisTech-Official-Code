const {model, Schema} = require('mongoose');

let RemoveSchema = new Schema({
    Guild: String,
    Channel: String,
    Msg: String,
});

module.exports = model("Remove", RemoveSchema);