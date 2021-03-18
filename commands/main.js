const { prefix } = require("../config.json")

module.exports = (client, options) => {
     let {
         commands,
         structure = '',
         minArgs = 0,
         maxArgs = null,
         requiresRoles = [],
         requiresPermissions = [],
         callback
     } = options

     client.on('message', message => {
         const { member, content, guild } = message

         for (const alias of commands) {
             if (content.toLowerCase().startsWith(`${prefix}${alias.toLowerCase()}`)) {
                 for (const permission of requiresPermissions) {
                     if (!member.hasPermission(permission)) {
                         message.reply('Insufficient permissions. Sorry.')
                         return
                     }
                 }

                 for (const role0 of requiresRoles) {
                     const role = guild.roles.cache.find(role => role.name === role0)

                     if (!role || !member.roles.cache.has(role.id)) {
                        message.reply('Insufficient roles. Sorry.')
                        return
                     }
                 }

                 const arguments = content.split(/[ ]+/)
                 arguments.shift()
                 if (arguments.length < minArgs || (arguments.length > maxArgs && maxArgs !== null)) {
                    message.reply(`I can\'t do that like this. Use ${structure}`)
                    return
                 }

                 callback(message, arguments, arguments.join(' '))
                 return
             }
         }
     })
}