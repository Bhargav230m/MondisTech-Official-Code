const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
} = require("discord.js");
const { execute } = require("../../Events/Client/ready");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Responds with pong"),
  /**
   *
   * @param { ChatInputCommandInteraction } interaction
   */
  execute(interaction, client) {
    interaction.reply({
      content: `Pong!, ms:${client.ws.ping}`,
      ephemeral: false,
    });
  },
};
