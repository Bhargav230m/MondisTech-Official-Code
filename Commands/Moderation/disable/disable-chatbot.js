const chatbot = require("../../../Schemas/Chatbot")
module.exports = {
    subCommand: "disable.chatbot",
    async execute(interaction) {
        const { guild } = interaction;

const data = await chatbot.findOneAndDelete({ 
    GuildID: guild.id
})
interaction.reply({content: "Disabled chatbot", ephemeral: true})
    }
}