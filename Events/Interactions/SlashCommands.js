
const { GuildMember, Embed, InteractionCollector, EmbedBuilder, ChatInputCommandInteraction } = require("discord.js");

module.exports = {
  name: "interactionCreate",
  /**
   *
   * @param { ChatInputCommandInteraction } interaction
   */
  async execute(interaction, client) {
    const { values, customId, guild, member } = interaction;
    if (!interaction.isChatInputCommand()) return;
    const command = client.commands.get(interaction.commandName);
    if (!command)
      return interaction.reply({
        content: "This Command is OutDated",
        ephemeral: true,
      });
    if (command) {
      //Only available when bot gets verified on topgg
      // let hasVoted = await client.topgg.hasVoted(interaction.user.id)
    }
    //if(!hasVoted) {
    //interaction.reply({ content: `Please vote me on [Topgg](${voteUrl.topgg})`}).then(async () => {
    //command.execute(interaction, client)
    // })
    //}else {
    //command.execute(interaction, client)
    //}
    //if(command.votersonly && !hasVoted) {
    //interaction.reply({ content: `Sorry, This is a voters only command, if you want to use it, then vote on [Topgg](${voteUrl.topgg})`})
    //}
    if (command.developer && interaction.guild.id !== "1028538200425246730")
      return interaction.reply({
        content: "This commands is only available to developers",
        ephemeral: true,
      });

    const subCommand = interaction.options.getSubcommand(false);

    if (subCommand) {
      const subCommandFile = client.subCommands.get(
        `${interaction.commandName}.${subCommand}`
      );
      if (!subCommandFile) {
        return interaction.reply({ content: "This sub command is outdated"})
      }
      subCommandFile.execute(interaction, client);
    } else command.execute(interaction, client);
  },
};
