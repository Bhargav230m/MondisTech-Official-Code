const { ChatInputCommandInteraction, Client } = require("discord.js")
const { loadCommands } = require("../../../Handlers/commandHandler")
module.exports = {
    subCommand: "reload.commands",
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client
     */
    execute(interaction, client) {
        loadCommands(client) 
        interaction.reply({content: "Reloaded all the commands", ephemeral: true})
    }
}