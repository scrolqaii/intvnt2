const Discord = require("discord.js")
const client = new Discord.Client()
const config = require("./config.json")
const path = require('path')
const fs = require('fs')

client.on('ready', () => {
    console.log('Waking up.')
    const handler = 'main.js'
    const relHandler = require(`./commands/${handler}`)

    const readCommands = dir => {
        const files = fs.readdirSync(path.join(__dirname, dir))
        for (const file of files) {
            const stat = fs.lstatSync(path.join(__dirname, dir, file))
            if (stat.isDirectory()) {
                readCommands(path.join(dir, file))
            } else if (file !== handler) {
                const option = require(path.join(__dirname, dir, file))
                relHandler(client, option)
            }
        }
    }

    readCommands('commands')
})

client.login(config.token)