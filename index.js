require('dotenv').config();
const Discord = require('discord.js')

const TOKEN = process.env.TOKEN;
const settings =  require ('./settings.json')

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

//------------------------------------------------//

client.login(TOKEN)
