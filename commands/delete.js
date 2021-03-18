module.exports = {
    commands: ['delete', 'del'],
    construction: '<command> <amount>',
    minArgs: 1,
    maxArgs: 1,
    requiresRoles: [],
    requiresPermissions: ['ADMINISTRATOR'],
    callback: (message, arguments, text) => {
        message.channel.messages.fetch().then((results) => {
            message.channel.bulkDelete(results)
        }).catch()
    }
}