require("dotenv").config();
const Discord = require("discord.js");
const client = new Discord.Client();
client.commands = new Discord.Collection();
const botCommands = require("./commands");

//Load Files
const config = require("./settings.json");
const prefix = config.prefix;
const TOKEN = process.env.TOKEN;

//Events
Object.keys(botCommands).map(key => {
  client.commands.set(botCommands[key].name, botCommands[key]);
});

//Commands

//Executes
client.on("ready", () => {
  console.info(`Logged in as ${client.user.tag}!`);
});

client.on("message", msg => {
  const args = msg.content.split(/ +/);
  const command = args.shift().toLowerCase();
  console.info(`Called command: ${command}`);
  if (!client.commands.has(command)) return;
  try {
    client.commands.get(command).execute(msg, args);
  } catch (error) {
    console.error(error);
    msg.reply("there was an error trying to execute that command!");
  }
});

client.login(TOKEN);
