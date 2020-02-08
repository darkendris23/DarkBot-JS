require('dotenv').config();
const fs = require('fs');
const Enmap = require("enmap");
const Discord = require('discord.js');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const config = require('./settings.json');
client.config = config;

const botCommands = require('./commands');

const prefix = config.prefix;

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);

    //------------------------------------------------//

    client.on('ready', () => {
        console.log("Connected as " + client.user.tag)
        console.log("Servers:")
        client.guilds.forEach((guild) => {
            console.log(" - " + guild.name);
          
    console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 


            // List all channels
            guild.channels.forEach((channel) => {
                console.log(` -- ${channel.name} (${channel.type}) - ${channel.id}`)
            })
        })
    });

    client.on('message', message => {
        if (!message.content.startsWith(prefix) || message.author.bot) return;

        const args = message.content.slice(prefix.length).split(/ +/);
        const command = args.shift().toLowerCase();
        console.info(`Called command: ${command}`);
        // the rest of your code
        // using the new `command` variable, this makes it easier to manage!
        // you can switch your other commands to this format as well
        if (!client.commands.has(command)) return;
      
        try {
            client.commands.get(command).execute(message, args);
        } catch (error) {
            console.error(error);
            msg.reply('there was an error trying to execute that command!');
        }
    });

    //------------------------------------------------//

    client.login(config.token);