const {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  PermissionFlagsBits,
  Client,
  EmbedBuilder,
  InteractionResponse,
} = require("discord.js");
const DataBase = require("../../Schemas/Infractions");
const ml = require("../../Schemas/ModLogs")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Kicks the member from the server.")
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
    .setDMPermission(false)
    .addUserOption((options) =>
      options
        .setName("target")
        .setDescription("Select the target Member")
        .setRequired(true)
    )
    .addStringOption((options) =>
      options
        .setName("reason")
        .setDescription("Provide a reason to Kick the member ")
        .setMaxLength(512)
    ),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const { options, guild, member } = interaction;
    const target = options.getMember("target");
    const reason = options.getString("reason") || "Non Specified.";
    const errorArray = [];
    const errorsEmbed = new EmbedBuilder()
      .setAuthor({ name: "Could not kick this member due to" })
      .setColor("Red");
    if (!target)
      return interaction.reply({
        embeds: [errorsEmbed.setDescription("Could not find that target")],
        ephemeral: true,
      });
    const Kick = "Kick";

    if (!target.manageable || !target.moderatable)
      errorArray.push("Selected target is not a moderatable by this bot.");

    if (member.roles.highest.position < target.roles.highest.position)
      errorArray.push("Selected target has higer role than yours.");

    if (errorArray.length)
      return interaction.reply({
        embeds: [errorsEmbed.setDescription(errorArray.join("\n"))],
        ephemeral: true,
      });

    target.kick();

    const newInfractionsObject = {
      IssuerID: member.id,
      IssuerName: member.user.tag,
      Reason: reason,
      Date: Date.now(),
      TP: Kick,
    };
    let userData = await DataBase.findOne({ Guild: guild.id, User: target.id });
    if (!userData)
      userData = await DataBase.create({
        Guild: guild.id,
        User: target.id,
        Infractions: [newInfractionsObject],
      });
    else
      userData.Infractions.push(newInfractionsObject) &&
        (await userData.save());



    const successEmbed = new EmbedBuilder()
      .setAuthor({ name: "Kick Issues", iconURL: guild.iconURL() })
      .setColor("Gold")
      .setDescription(
        [
          `${target} was issued a kick for ${reason} by ${member}`,
          `\nBrining their insfractions total to **${userData.Infractions.length} points**`,
        ].join("\n")
      );
      const dat = await ml.findOne({ Guild: guild.id });
      if(!dat) {
        return interaction.reply({ embeds: [successEmbed]})
      }
      const dchannel = await guild.channels.cache.get(dat.Channel);
      if(dat) {
        const embe = new EmbedBuilder()
        .setAuthor({name: "ModLogs"})
        .setDescription(`${target} was kicked from server for reason by ${member}`)
        .setColor("Random")
        dchannel.send({ embeds: [embe] })
      }
    return interaction.reply({ embeds: [successEmbed] });
  },
};
