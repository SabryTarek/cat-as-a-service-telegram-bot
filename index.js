const { Telegraf } = require('telegraf')
const axios = require('axios')

require('dotenv').config()
const bot = new Telegraf (process.env.BOT_TOKEN)


bot.use((ctx, next) => {
	// console.log(`${ctx.from.username} said: ${ctx.Message.text}`)
    next()
})




const helpMessage = `
    say something to me:
        - /start start the bot
        - /help commands referance
        - /cat send random cat image
        - /cat <KEYWORD> send random cat image
`

bot.start((ctx) => {
    ctx.reply("Hi I am Cat-as-a-Service Bot 🐱");
    ctx.reply(helpMessage);
})
bot.help((ctx) => {
	//logger(ctx)
    ctx.reply(helpMessage);
})






bot.command('cat', async (ctx) => {
    let input = ctx.message.text
    let inputArray = input.split(' ')
    if (inputArray.length == 1) {
        try {
            let res = await axios.get('https://aws.random.cat/meow')
            ctx.replyWithPhoto(res.data.file)
        } catch (e) {
            console.log(e)
        }
    } else {
    inputArray.shift()
    input = inputArray.join(' ')
    ctx.replyWithPhoto(`https://cataas.com/cat/says/${input}`)
}})



bot.launch()


module.exports = bot;
