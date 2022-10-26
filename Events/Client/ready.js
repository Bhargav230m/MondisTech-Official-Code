const { loadCommands } = require("../../Handlers/commandHandler")
const chalk = require("chalk")
module.exports = {
    name: "ready",
    once: "true",
    execute(client) {
        console.log(chalk.green(`Logined as MonDisTech`))
        client.user.setActivity(`with ${client.guilds.cache.size} guild(s)`)



    console.log(chalk.red("MONDISTECH MADE BY TECHNOLOGY POWER, AIO"))
loadCommands(client);
        
    }
}