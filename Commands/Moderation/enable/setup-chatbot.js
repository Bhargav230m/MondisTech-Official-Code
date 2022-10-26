const {PermissionFlagsBits} = require("discord.js");
const welcomeSchema = require("../../../Schemas/Chatbot");

module.exports = {
    subCommand: "enable.chatbot",
  
    async execute(interaction) {
        const {options} = interaction;

        const welcomeChannel = options.getChannel("channel");
    

        if(!interaction.guild.members.me.permissions.has(PermissionFlagsBits.SendMessages)) {
            interaction.reply({content: "I don't have permissions for this.", ephemeral: true});
        }

        welcomeSchema.findOne({Guild: interaction.guild.id}, async (err, data) => {
            if(!data) {
                const newWelcome = await welcomeSchema.create({
                    Guild: interaction.guild.id,
                    Channel: welcomeChannel.id,
                });
            }
            interaction.reply({content: 'Succesfully created Chatbot', ephemeral: true});
        })
    }
}