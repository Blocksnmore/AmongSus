const discord = require("discord.js"); 
const bot = new discord.Client({partials: ['MESSAGE','REACTION', 'CHANNEL']});
const statuses = ["Blue vent", "Red be sus", "Cyan scan in medbay", "Black not do tasks", "Yellow kill crewmates", "Blocks_n_more develop features", "People use the Among sus discord bot", "I like your cut G", "Pink make assumptions", "Purple vote first", "Sus plays"] 
const mysql = require("mysql");
const prefix = "!!"
const developer = "314166178144583682"
const database = new Map();
   
bot.on("message", async msg =>{
    if(msg.author.bot) return;
    if(!msg.content.startsWith(prefix)) return;
    var messageSplit = msg.content.toString().split(" ");
    var command = messageSplit[0].substring(prefix.length);
    switch(command){
        case "help":
            let helpmsg = "`"+prefix+"help` - Shows this\n`"+prefix+"createpanel` - Creates a reaction control panel\n`"+prefix+"setup` - Configuration of the bot\n`"+prefix+"kill` - Kill a user\n`"+prefix+"revive` - Revive a user";
            let embed = new discord.MessageEmbed().setTitle("Among sus help").setDescription(helpmsg).setColor("#FF0000").setFooter("Thanks to all "+bot.guilds.cache.size+" servers using me!");
            msg.channel.send(embed);
        break;
        case "setup":
            if(!msg.member.hasPermission("MANAGE_CHANNELS") && !msg.author.id === developer) return msg.channel.send("You're being too sus right now!");
        break;
        case "createpanel":
            if(!msg.member.hasPermission("MANAGE_MESSAGES") && !msg.author.id === developer) return msg.channel.send("You're being too sus right now!");
            //had to do embed1 because even though this is a let it still is considered a dupe for some weird reason
            let embed1 = new discord.MessageEmbed().setTitle("Among sus control panel").setDescription("<:DeadCyan:763914639725428788> - Dead \n♻️ - Start/Restart game \n❗ - Meeting \n🚪 - Meeting over \n💬 - Send everyone to main vc \n🎮 - Become host");
            msg.channel.send(embed1).then(async m=>{
                //await m.react("763914639725428788"); 
                await m.react("♻️");
                await m.react("❗"); 
                await m.react("🚪"); 
                await m.react("💬");
                await m.react("🎮");
            })
        break;
        case "kill":
            if(!msg.member.hasPermission("MANAGE_MESSAGES") && !msg.author.id === developer) return msg.channel.send("You're being too sus right now!");

        break;
    };
});

bot.on("ready", ()=>{
    var statusnum = 0; bot.user.setActivity(statuses[statusnum], {type: "WATCHING"}); 
    statusnum++; 
    console.log("I have started!")
    setInterval(function(){
        if(statusnum -1 === statuses.length) statusnum = 0;
        bot.user.setActivity(statuses[statusnum], {type: "WATCHING"}); statusnum++; 
    }, 60000);
})

bot.login(process.env.devtoken);