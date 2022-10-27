//Made by Technology Power

//defining all the required properties from discord.js
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  //Naming the command and adding its description
  data: new SlashCommandBuilder()
    .setName("suggest")
    .setDescription("Suggest something")
    //options
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

        //choices you can add much as you want
        .addChoices(
          { name: "Everyone can react", value: "Everyone can react" },
          {
            name: "What do you think about my idea?, react with ☑️ or ❌",
            value: "What do you think about my idea?, react with ☑️ or ❌",
          }
        )
    ),

  //Main command and also defining interaction

  async execute(interaction) {
    const { options } = interaction;
    //Fetching all the options
    const suggestion = options.getString("suggestion");
    const description = options.getString("description");

    //Builing a embed for the suggestion
    const message = new EmbedBuilder()
      .setAuthor({ name: `Suggestion by ${interaction.user.username}` })
      .setColor("Random")

      .setDescription(
        [
          `**Suggestion**\n${suggestion}`, // <- adding suggestion variable to get access to it
          `**Description**\n${description}`, // <- adding description variable to get access to it
        ].join("\n") // <- joining the description using \n
      );
    const messagee = await interaction.reply({
      embeds: [message],
      //Adding fetchReply so we can react to the message
      fetchReply: true,
    });
    // reacting to the message
    await messagee.react("☑️");
    await messagee.react("❌");
  },
};
