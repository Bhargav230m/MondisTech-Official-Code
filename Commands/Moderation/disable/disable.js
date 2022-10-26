const {
PermissionFlagsBits,
  SlashCommandBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("disable")
    .setDescription("Disables a plugin from your server")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addSubcommand((subCommand) =>
      subCommand
        .setName("chatbot")
        .setDescription("Disables chatbot from your server")
    )
    .addSubcommand((subCommand) =>
      subCommand
        .setName("welcome")
        .setDescription("Disables welcome from your server")
    )
    .addSubcommand((subCommand) =>
    subCommand
      .setName("leave")
      .setDescription("Disables leave from your server")
  )
  .addSubcommand((subCommand) =>
  subCommand
    .setName("modlogs")
    .setDescription("Disables modlogs from your server")
),
};
