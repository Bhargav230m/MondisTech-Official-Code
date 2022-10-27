const ml = require("../../../Schemas/ModLogs");

module.exports = {
  subCommand: "disable.modlogs",

  async execute(interaction) {
    const data = await ml.findOneAndDelete({ Guild: guild.id });
    interaction.reply({ content: "Disabled modlogs" });
  },
};
