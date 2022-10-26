const { ChatInputCommandInteraction, Client } = require("discord.js")
const { loadEvents } = require("../../../Handlers/eventHandler")
module.exports = {
    subCommand: "reload.events",
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client
     */
    execute(interaction, client) {
        for(const [key, value] of client.events)
        client.removeAllListeners(`${key}`, value, true);
        loadEvents(client);
        interaction.reply({content: "Reloaded all the events", ephemeral: true})
    }
}