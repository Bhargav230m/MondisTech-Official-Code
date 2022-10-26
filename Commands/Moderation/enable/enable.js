const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("enable")
    .setDescription("Enable a plugin in your server")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addSubcommand((subCommand) =>
      subCommand
        .setName("chatbot")
        .setDescription("Enables chatbot in your server")
        .addChannelOption((option) =>
          option
            .setName("channel")
            .setDescription("Channel for AI messages.")
            .setRequired(true)
        )
    )
    .addSubcommand((subCommand) =>
      subCommand
        .setName("welcome")
        .setDescription("Enabled Welcome system in your server")
        .addChannelOption((option) =>
          option
            .setName("channel")
            .setDescription("Channel for welcome messages.")
            .setRequired(true)
        )
        .addStringOption((option) =>
          option
            .setName("welcome-message")
            .setDescription("Enter your welcome message.")
            .setRequired(true)
        )
        .addRoleOption((option) =>
          option
            .setName("welcome-role")
            .setDescription("Enter your welcome role.")
            .setRequired(true)
        )
    )
	.addSubcommand((subCommand) =>
          subCommand
            .setName("leave")
            .setDescription("Enabled Leave system in your server")
            .addChannelOption((option) =>
              option
                .setName("channel")
                .setDescription("Channel for leave messages.")
                .setRequired(true)
            )
            .addStringOption((option) =>
              option
                .setName("leave-message")
                .setDescription("Enter your leave message.")
                .setRequired(true)
            )
        )
};
