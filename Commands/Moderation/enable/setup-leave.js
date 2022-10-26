const schema = require("../../../Schemas/remove")
const { PermissionFlagsBits } = require("discord.js")
module.exports = {
    subCommand: "enable.leave",

    async execute(interaction) {
        const { options } = interaction;
        const welcomeChannel = options.getChannel("channel");
        const welcomeMessage = options.getString("leave-message");


        if(!interaction.guild.members.me.permissions.has(PermissionFlagsBits.SendMessages)) {
            interaction.reply({content: "I don't have permissions for this.", ephemeral: true});
        }

        schema.findOne({Guild: interaction.guild.id}, async (err, data) => {
            if(!data) {
                const newWelcome = await schema.create({
                    Guild: interaction.guild.id,
                    Channel: welcomeChannel.id,
                    Msg: welcomeMessage,
                });
            }
            interaction.reply({content: 'Succesfully created a leave message', ephemeral: true});
        })
    }
}