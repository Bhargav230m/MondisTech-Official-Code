const {
  Client,
  GatewayIntentBits,
  Partials,
  Collection,
} = require("discord.js");
const { Guilds, GuildMembers, GuildMessages, MessageContent} = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember } = Partials;
const chalk = require("chalk")

const client = new Client({
  intents: [Guilds, GuildMembers, GuildMessages, MessageContent],
  partials: [User, Message, GuildMember, ThreadMember],
});
const { loadEvents } = require("./Handlers/eventHandler");

client.config = require("./config.json");
client.events = new Collection();
client.subCommands = new Collection(); //SubCommand handler
client.commands = new Collection();
loadEvents(client);

const { connect } = require("mongoose");
connect(client.config.DataBaseURL, {}).then(() => {
  console.log(chalk.grey("Connected to the database"));
});



////Code will apply after the bot gets verified on topgg
//const { Api } = require("@top-gg/sdk")
//client.topgg = new Api(, this)
client.login(client.config.token);
