require('dotenv').config();
const Discord = require('discord.js')

const TOKEN = process.env.TOKEN;
const { Prefix } =  require ('./settings.json')

bot.commands = new Discord.Collection();
const botCommands = require('./commands');

const client = new Discord.Client()

//------------------------------------------------//

client.on('ready', () => {
    console.log("Connected as " + client.user.tag)
	console.log("Servers:")
    client.guilds.forEach((guild) => {
        console.log(" - " + guild.name)
		
		 // List all channels
        guild.channels.forEach((channel) => {
            console.log(` -- ${channel.name} (${channel.type}) - ${channel.id}`)
        })
})

// client.on('message', message => {
if (!message.content.startsWith(prefix) || message.author.bot) return;

const args = message.content.slice(prefix.length).split(' ');
const command = args.shift().toLowerCase();
// the rest of your code

//------------------------------------------------//

client.login(TOKEN)
