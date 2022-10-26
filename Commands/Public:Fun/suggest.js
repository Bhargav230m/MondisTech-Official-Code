const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
} = require("discord.js");
const { execute } = require("./meme");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("suggest")
    .setDescription("Suggest something")
    .addStringOption((option) =>
      option
        .setName("suggestion")
        .setDescription("What will you suggest?")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("description")
        .setDescription("Describe your suggestion")
        .setRequired(true)
    ),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction) {
    const { guild, options, member } = interaction;

    const suggestion = options.getString("suggestion");
    const description = options.getString("description");

    const message = new EmbedBuilder()
      .setAuthor({ name: `Suggestion by ${interaction.user.username}` })
      .setColor("darkgreen")
      .setDescription(
        [
          `**Suggestion**\n${suggestion}`,
          `**Description**\n${description}`,
        ].join("\n")
      );
    const messagee = await interaction.reply({
      embeds: [message],
      fetchReply: true,
    });

    await messagee.react("☑️");
    await messagee.react("❌");
  },
};
