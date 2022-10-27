const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  Client,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("userinfo")
    .setDescription("Shows the user info")

    .addUserOption((options) =>
      options
        .setName("target")
        .setDescription("Select the target Member")
        .setRequired(true)
    ),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  execute(interaction, client) {
    const { options, guild, member } = interaction;
    const target = options.getMember("target");
    const errorArray = [];
    const errorsEmbed = new EmbedBuilder()
      .setAuthor({ name: "Could not Couldn't show this member info due to " })
      .setColor("Red");

    if (!target)
      return interaction.reply({
        embeds: [errorsEmbed.setDescription("An unknown target was specified")],
        ephemeral: true,
      });

    if (errorArray.length)
      return interaction.reply({
        embeds: [errorsEmbed.setDescription(errorArray.join("\n"))],
        ephemeral: true,
      });

    const info = new EmbedBuilder()
      .setAuthor({ name: "User Info" })
      .setColor("DarkGold")
      .setDescription(
        [
          `Name: ${target}`,
          `ID: ${target.id}`,
          `Server Joined: ${target.joinedAt}`,
        ].join(`\n`)
      );
    return interaction.reply({ embeds: [info] });
  },
};
