const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const { Console, count } = require('console');

const client = new Discord.Client();
client.commands = new Discord.Collection();


const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.once('ready', () => {
	console.log('NabBot is Ready!');
});

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const user = client.users.cache.get(message.author.id); //id

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	try{
		switch(command) {
			case 'nab':
				message.channel.send('Oh shit waddup ' + user.username);
				break;			
			case 'pop':

				message.channel.send("Members: " + message.channel.members.Collection.forEach(element => {
					element.username
				}));
				
					/*
					if(!message.channel.members.contains(args[1])){
						Console.log("User does not exist");
					} else {
						message.react('👍');
						message.channel.send('You\'ve popped ' + user.username);	
						message.author.send('You\'ve been popped by ' + user.username, { split: true });
					}
					*/
			
				break;
		}
	} catch (error) {
		console.error(error);
	}

	if (!client.commands.has(command)) return;

	try {
		client.commands.get(command).execute(message, args);

	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});

client.login(token);
