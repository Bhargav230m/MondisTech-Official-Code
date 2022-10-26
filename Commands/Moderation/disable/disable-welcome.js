const welcome = require("../../../Schemas/Welcome")
module.exports = {
    subCommand: "disable.welcome",
    async execute(interaction) {
        const { guild } = interaction;

const data = await welcome.findOneAndDelete({ 
    GuildID: guild.id
})
interaction.reply({content: "Disabled Welcome", ephemeral: true})
    }
}