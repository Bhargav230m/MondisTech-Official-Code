const Cryptr = require('cryptr');
const fs = require("fs");

class Storage {
    constructor(token) {
        this.token = token;
        const cryptr = new Cryptr(token);
        const Database = fs.readFileSync(require('path').join(__dirname, './db.json'));
        const ParsedDatabase = JSON.parse(Database);
        const savedWord = ParsedDatabase.savedWord;
        if(savedWord){
            let Decrypted;
            try {
                Decrypted = cryptr.decrypt(savedWord);
            }catch(err){
                Decrypted = null;
            }
            if(Decrypted != "AssistantsSafeWordCheck") {
                console.log("Assistants Safe Storage: WARNING! Encryption token to Safe Storage has been changed! Your tokens could be causing errors, we're reseting whole database now.");

                fs.writeFileSync(require('path').join(__dirname, './db.json'), JSON.stringify({
                    "users": {},
                    "savedWord": ""
                }, null, 3));

                console.log("Assistants Safe Storage: Database has been reseted.");
            }
        }else{
            fs.writeFileSync(require('path').join(__dirname, './db.json'), JSON.stringify({
                "users": {},
                "savedWord": cryptr.encrypt("AssistantsSafeWordCheck")
            }, null, 3));
        }
        this.cryptr = cryptr;
    }

    GetUser (userid) {
        let UserData;
        try{
            UserData = fs.readFileSync(require('path').join(__dirname, './db.json'));
            UserData = JSON.parse(UserData);
            UserData = UserData.users[userid];
            UserData ? UserData = this.cryptr.decrypt(UserData) : UserData = null;
        }catch(err){
            UserData = null;
        }
        return UserData;
    }

    SaveUser (userid, token) {
        const Database = fs.readFileSync(require('path').join(__dirname, './db.json'));
        const ParsedDatabase = JSON.parse(Database);
        ParsedDatabase.users[userid] = this.cryptr.encrypt(token);
        fs.writeFileSync(require('path').join(__dirname, './db.json'), JSON.stringify(ParsedDatabase, null, 3));
    }
}

module.exports = Storage;