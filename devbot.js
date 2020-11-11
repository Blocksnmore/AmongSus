const discord = require("discord.js"); 
const bot = new discord.Client({partials: ['MESSAGE','REACTION', 'CHANNEL']});
const statuses = ["Blue vent", "Red be sus", "Cyan scan in medbay", "Black not do tasks", "Yellow kill crewmates", "Blocks_n_more develop features", "People use the Among sus discord bot", "I like your cut G", "Pink make assumptions", "Purple vote first", "Sus plays"] 
const prefix = "!!"
const developer = "314166178144583682"
const database = new Map();
const databaseformat = { "host":[], "dead":[] }   
const deadnames = ["dead", "spec", "spectators", "spectator"]
const waitnames = ["wait", "waiting", "waiting to start", "ready", "ready to play", "waiting to play", "ready to play"]
const meetnames = ["meeting", "discussion", "discuss", "meet"];
const gamenames = ["in game", "playing", "in-game", "ingame"];

/*
* Among sus developed by Blocks_n_more#5526
* All rights to the source belong to Blocks

* @ToDo 
* Code reaction controling (Meeting over and send everyone to vc)
* Bug testing
* Role stuff
*/

bot.on("messageReactionAdd", async (reaction, user) =>{
    console.log("debug: emoji");
    if(user.bot) return; 
    if(reaction.message.channel.type === "dm") return;
    let getuserid = await reaction.message.channel.messages.fetch(reaction.message.id)
    if(getuserid.author.id !== bot.user.id) return;
    if(reaction.message.embeds[0].title !== "Among sus control panel") return;
    reaction.users.remove(user); 
    switch(reaction.emoji.name){
        case "🎮":
            if(!database.get(reaction.message.guild.id).host[0]){ 
                database.get(reaction.message.guild.id).host.push(user.id);
                return user.send("You are now the host!");
            }
            if(!msg.member.hasPermission("MANAGE_CHANNELS") && msg.author.id !== database.get(reaction.message.guild.id).host[0]) return user.send("There is currently a diffrent host assigned!");

            database.get(reaction.message.guild.id).host.splice(0, 1, user.id)
            user.send("You are now the host!");
        break;
        case "DeadCyan":
            if(database.get(reaction.message.guild.id).dead.includes(user.id)) return user.send("You are currently dead!");
            database.get(reaction.message.guild.id).dead.push(user.id);
            user.send("You are now marked as dead!");
        break;
        case "♻️":
            if((!msg.member.hasPermission("MANAGE_CHANNELS") && msg.author.id !== database.get(reaction.message.guild.id).host[0]) || !database.get(reaction.message.guild.id).host[0]) return user.send("You are not currently the host!")
            reaction.message.guild.members.cache.forEach(async (member) => {member.roles.remove(dedrole).catch(e =>{});})
            reaction.message.guild.members.cache.forEach(async (member) => {
                if (!member.voice.channel) return;
                await member.voice.setChannel(reaction.message.guild.channels.cache.find(r => gamenames.includes(r.name.toLowerCase())))
            })
            database.get(reaction.message.guild.id).dead.splice(0, database.get(reaction.message.guild.id).dead.length);
        break;
        case "❗":
            if((!msg.member.hasPermission("MANAGE_CHANNELS") && msg.author.id !== database.get(reaction.message.guild.id).host[0]) || !database.get(reaction.message.guild.id).host[0]) return user.send("You are not currently the host!")
            reaction.message.guild.members.cache.forEach(async (member) => {
                if (!member.voice.channel) return;
                await member.voice.setChannel(reaction.message.guild.channels.cache.find(r => meetnames.includes(r.name.toLowerCase())))
            })
        break;

    }
})

bot.on("message", async msg =>{
    if(msg.author.bot) return;
    if(!msg.content.startsWith(prefix)) return;
    var messageSplit = msg.content.toString().split(" ");
    var command = messageSplit[0].toLowerCase().substring(prefix.length);
    switch(command){
        case "help":
            let embed = new discord.MessageEmbed().setTitle("Among sus help").setDescription("`"+prefix+"help` - Shows this\n`"+prefix+"createpanel` - Creates a reaction control panel\n`"+prefix+"setup` - Configuration of the bot\n`"+prefix+"kill` - Kill a user\n`"+prefix+"revive` - Revive a user").setColor("#FF0000").setFooter("Thanks to all "+bot.guilds.cache.size+" servers using me!");
            msg.channel.send(embed);
        break;
        case "setup":
            if(!msg.member.hasPermission("MANAGE_CHANNELS") && msg.author.id !== developer) return msg.channel.send("You're being too sus right now!");
            if(!messageSplit[1].toLowerCase() === "run"){
                let setupsneeded = [];
                if (!msg.guild.roles.cache.some((channel) => deadnames.includes(channel.name.toLowerCase()))) setupsneeded.push("DEAD_ROLE");
                if (!msg.guild.channels.cache.some((channel) => waitnames.includes(channel.name.toLowerCase()))) setupsneeded.push("WAITING_VOICE");
                if (!msg.guild.channels.cache.some((channel) => deadnames.includes(channel.name.toLowerCase()))) setupsneeded.push("DEAD_VOICE");
                if (!msg.guild.channels.cache.some((channel) => gamenames.includes(channel.name.toLowerCase()))) setupsneeded.push("GAME_VOICE");
                if (!msg.guild.channels.cache.some((channel) => meetnames.includes(channel.name.toLowerCase()))) setupsneeded.push("MEETING_VOICE");
                let setups = setupsneeded ? "No setup needed" : setupsneeded.toString();
                let embed2 = new discord.MessageEmbed().setTitle("Among sus setup").setDescription("The current setup(s) needed are `"+setups+"` \n**Need a channel/role created?** `"+prefix+"setup run`").setColor("#FF0000").setFooter("Thanks to all "+bot.guilds.cache.size+" servers using me!");
                msg.channel.send(embed2);
                return;
            }else{
                try{
                    let setupsneeded = [];
                    let embed5 = new discord.MessageEmbed().setTitle("Among sus setup").setDescription("All the channels seem to be set up! If you think this is a false please let my developer know!").setColor("#FF0000").setFooter("Thanks to all "+bot.guilds.cache.size+" servers using me!");
                    if (!msg.guild.roles.cache.some((channel) => deadnames.includes(channel.name.toLowerCase()))) setupsneeded.push("DEAD_ROLE");
                    if (!msg.guild.channels.cache.some((channel) => waitnames.includes(channel.name.toLowerCase()))) setupsneeded.push("WAITING_VOICE");
                    if (!msg.guild.channels.cache.some((channel) => deadnames.includes(channel.name.toLowerCase()))) setupsneeded.push("DEAD_VOICE");
                    if (!msg.guild.channels.cache.some((channel) => gamenames.includes(channel.name.toLowerCase()))) setupsneeded.push("GAME_VOICE");
                    if (!msg.guild.channels.cache.some((channel) => meetnames.includes(channel.name.toLowerCase()))) setupsneeded.push("MEETING_VOICE");
                    if(!setupsneeded[0]) msg.channel.send(embed5);
                    msg.guild.channels.create('Among us', {type: 'category'}).then(async c =>{
                        if (!msg.guild.roles.cache.some((channel) => roles.includes(channel.name.toLowerCase()))) await msg.guild.roles.create({data: {name: 'dead'},reason: 'Among us auto setup',});
                        if (!msg.guild.channels.cache.some((channel) => waitnames.includes(channel.name.toLowerCase()))) await msg.guild.channels.create('waiting', {type: 'voice', parent:cate.id})
                        if (!msg.guild.channels.cache.some((channel) => deadnames.includes(channel.name.toLowerCase()))) await msg.guild.channels.create('dead', {type: 'voice', parent:cate.id})
                        if (!msg.guild.channels.cache.some((channel) => gamenames.includes(channel.name.toLowerCase()))) await msg.guild.channels.create('in-game', {type: 'voice', parent:cate.id,permissionOverwrites: [{ id: msg.guild.id, deny: ['SPEAK'],}], })
                        if (!msg.guild.channels.cache.some((channel) => meetnames.includes(channel.name.toLowerCase()))) await msg.guild.channels.create('meeting', {type: 'voice', parent:cate.id, permissionOverwrites: [{ id: msg.guild.roles.cache.find(e => deadnames.includes(e.name.toLowerCase())).id, deny: ['SPEAK'],}], });
                    })
                    let embed4 = new discord.MessageEmbed().setTitle("Among sus setup").setDescription("All the channels have been created sucessfully! You should find them in the category `Among us`").setColor("#FF0000").setFooter("Thanks to all "+bot.guilds.cache.size+" servers using me!");
                    msg.channel.send(embed4)
                }catch(e){
                    let embed3 = new discord.MessageEmbed().setTitle("Among sus setup").setDescription("An error occured while running the channel setup, I might be missing the `MANAGE_CHANNELS` permission!").setColor("#FF0000").setFooter("Thanks to all "+bot.guilds.cache.size+" servers using me!");
                    msg.channel.send(embed3)
                }
            }
        break;
        case "createpanel":
            if(!msg.member.hasPermission("MANAGE_MESSAGES") && msg.author.id !== developer) return msg.channel.send("You're being too sus right now!");
            //had to do embed1 because even though this is a let it still is considered a dupe for some weird reason
            let embed1 = new discord.MessageEmbed().setTitle("Among sus control panel").setDescription("<:DeadCyan:763914639725428788> - Dead \n♻️ - Start/Restart game \n❗ - Meeting \n🚪 - Meeting over \n💬 - Send everyone to main vc \n🎮 - Become host");
            msg.channel.send(embed1).then(async m=>{
                await m.react("763914639725428788"); 
                await m.react("♻️");
                await m.react("❗"); 
                await m.react("🚪"); 
                await m.react("💬");
                await m.react("🎮");
            })
        break;
        case "kill":
            if(!msg.member.hasPermission("MANAGE_MESSAGES") && msg.author.id !== developer && msg.author.id !== database.get(msg.guild.id).host) return msg.channel.send("You're being too sus right now!");
            let user = msg.mentions.users.first();
            if(!user) return msg.channel.send("You need to provide a user!");
            let guilddata = database.get(msg.guild.id);
            guilddata.dead.push(user.id);
            msg.channel.send("Done! That user is now dead");
        break;
        case "revive":
            if(!msg.member.hasPermission("MANAGE_MESSAGES") && msg.author.id !== developer && msg.author.id !== database.get(msg.guild.id).host) return msg.channel.send("You're being too sus right now!");
            let user1 = msg.mentions.users.first();
            if(!user1) return msg.channel.send("You need to provide a user!");
            let guilddata1 = database.get(msg.guild.id);
            if(guilddata1.dead.indexof(user1.id) < 0) return msg.channel.send("It seems like that user is not currently dead!");
            guilddata1.dead.splice(guilddata1.dead.indexof(user1.id), 1);
            msg.channel.send("Done! That user is no longer dead");
        break;
    };
});

bot.on("ready", ()=>{
    var statusnum = 0; bot.user.setActivity(statuses[statusnum], {type: "WATCHING"}); 
    bot.guilds.cache.forEach(g =>{
        database.set(g.id, databaseformat);
    })
    statusnum++; 
    console.log("I have started!")
    setInterval(function(){
        if(statusnum +1 === statuses.length) statusnum = 0;
        bot.user.setActivity(statuses[statusnum], {type: "WATCHING"}); statusnum++; 
    }, 60000);
})

bot.login(require("./config.json").token);