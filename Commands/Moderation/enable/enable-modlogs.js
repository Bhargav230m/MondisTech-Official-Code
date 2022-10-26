const ml = require("../../../Schemas/ModLogs")

module.exports = {
    subCommand: "enable.modlogs",

    async execute(interaction) {
        const { guild, options } = interaction;
const channel = options.getChannel("channel")

if(!channel) {
await interaction.reply({content: "Please enter the channel"})
}

const data = await ml.findOne({ Guild: guild.id})
if(!data) {
    await ml.create({ 
        Guild: guild.id,
    Channel: channel.id,
    });
    interaction.reply({content: "Successfully activated modlogs"})
}
if(data) {
    return;
}

    }
}