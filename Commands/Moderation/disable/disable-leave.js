const leave = require("../../../Schemas/remove")
module.exports = {
    subCommand: "disable.leave",
    async execute(interaction) {
        const { guild } = interaction;

const data = await leave.findOneAndDelete({ 
    GuildID: guild.id
})
interaction.reply({content: "Disabled Leave", ephemeral: true})
    }
}