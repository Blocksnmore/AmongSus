const discord = require("discord.js"); 
const bot = new discord.Client({partials: ['MESSAGE','REACTION', 'CHANNEL']});
const fs = require("file-system"); 

const token = process.env.token
const statuses = ["Blue vent", "Red be sus", "Cyan scan in medbay", "Black not do tasks", "Yellow kill crewmates", "Blocks_n_more develop features", "People use the Among sus discord bot", "I like your cut G", "Pink make assumptions", "Purple vote first", "Sus plays on "+bot.guilds.cache.size+" servers"] 
var prefix = "!"
var dead = []; 
var roles = ["dead", "ded", "spectator"];
var ingamec = ["in-game", "in game"]
const author = "314166178144583682"; // mainly for debugging stuff

//status is "watching thing"


// substring(6)

bot.on('messageReactionAdd', async (reaction, user) => {
  if(user.bot) return; 

  if(reaction.message.channel.type === "dm") return;
  
  if(!reaction.message.embeds) return;
  
  if(!reaction.message.author === bot.user) return;

  reaction.users.remove(user); 
  const dedrole = reaction.message.guild.roles.cache.find(e => roles.includes(e.name.toLowerCase()));;
  switch(reaction.emoji.name){
    case "DeadCyan":
      if(dead.includes(user.id)) return user.send("You are already dead!");
      user.send("You are now dead!"); dead.push(user.id);
      let i = reaction.message.guild.roles.cache.find(e => e.id === dedrole.id);
      reaction.message.guild.member(user).roles.add(i)
    break; case "♻️":
      dead = [];
      reaction.message.guild.members.cache.forEach(async (member) => { member.roles.remove(dedrole).catch(eee=>{}); })
      reaction.message.guild.members.cache.forEach(async (member) => {
      if (!member.voice.channel) return;
      await member.voice.setChannel(reaction.message.guild.channels.cache.find(r => r.name.toLowerCase() === "in-game"))})
    break; case "❗":
      reaction.message.guild.members.cache.forEach(async (member) => {
      if (!member.voice.channel) return;
      await member.voice.setChannel(reaction.message.guild.channels.cache.find(r => r.name.toLowerCase() === "meeting"))})
    break; case "🚪":
      reaction.message.guild.members.cache.forEach(async (member) => {if (!member.voice.channel) return;
      if(dead.includes(member.id)) return await member.voice.setChannel(reaction.message.guild.channels.cache.find(r => r.name.toLowerCase() === "dead"))
      if(!dead.includes(member.id)) return member.voice.setChannel(reaction.message.guild.channels.cache.find(r => ingamec.includes(r.name.toLowerCase())))})
    break; case "💬":
      reaction.message.guild.members.cache.forEach(async (member) => { if (!member.voice.channel) return;
      await member.voice.setChannel(reaction.message.guild.channels.cache.find(r => r.name.toLowerCase() === "waiting"))})
    break;}
})

bot.on("message", async msg =>{
  if(msg.author.bot) return;
  var messageSplit = msg.content.toString().split(" ");
  var command = messageSplit[0].substring(1)
  if(!msg.content.startsWith(prefix)) return;
  switch(command){
    case "createpanel":
      if(!msg.member.hasPermission("MANAGE_MESSAGES") || !msg.author.id === author) return msg.channel.send("You're being too sus to run this!");
      msg.delete();
      const embed = new discord.MessageEmbed().setTitle("Among us control panel").setDescription("<:DeadCyan:763914639725428788> - Dead \n♻️ - Start/Restart game \n❗ - Meeting \n🚪 - Meeting over \n💬 - Send everyone to main vc")
      msg.channel.send(embed).then(async m=>{
      await m.react("763914639725428788"); await m.react("♻️");
      await m.react("❗"); await m.react("🚪"); await m.react("💬");})
    break;
    case "kill":
        if(!messageSplit[1]) return msg.channel.send("Provide the id of someone to kill!");
        if(isNaN(messageSplit[1])) return msg.channel.send("That is not an id!");
        if(!msg.member.hasPermission("MANAGE_ROLES")|| !msg.author.id === author) return msg.channel.send("You're being too sus to run this!");
        if(dead.includes(messageSplit[1])) return msg.channel.send("They are already dead!");
        let deadrole = msg.guild.roles.cache.find(e => roles.includes(e.name.toLowerCase()))
        dead.push(messageSplit[1]); 
        msg.guild.members.cache.get(messageSplit[1]).roles.add(msg.guild.roles.cache.filter(e => e.id === deadrole.id)).catch(e=>{msg.channel.send("I failed to add the role, the role might not exsist, the user already has it, or i don't have permission to manage roles!")
        })
        msg.channel.send("That user has now been killed!");
    break;
    case "setup":
      if(!messageSplit[1]){
        let setupsneeded = [];
        if (!msg.guild.roles.cache.some((channel) => roles.includes(channel.name.toLowerCase()))) setupsneeded.push("DEAD_ROLE");
        if (!msg.guild.channels.cache.some((channel) => channel.name.toLowerCase() === "waiting")) setupsneeded.push("WAITING_VOICE");
        if (!msg.guild.channels.cache.some((channel) => channel.name.toLowerCase() === "dead")) setupsneeded.push("DEAD_VOICE");
        if (!msg.guild.channels.cache.some((channel) => ingamec.includes(channel.name.toLowerCase()))) setupsneeded.push("GAME_VOICE");
        var setups = "";
        if(!setupsneeded[0]){
          var setups = "No missing roles/channels!"
        }else{
          var setups = setupsneeded.toString()
        }
        msg.channel.send("> Current needed configurations: `"+setups+"` \n> Missing a channel? Let my auto setup make it! `!setup run`")
      }else{
        if(!messageSplit[1].toLowerCase() === "run") return msg.channel.send("Thats not a valid option!")
        if(!msg.member.hasPermission("MANAGE_CHANNELS")|| !msg.author.id === author) return msg.channel.send("You're being too sus to run this!");
        let setupsneeded = [];
        if (!msg.guild.roles.cache.some((channel) => roles.includes(channel.name.toLowerCase()))) setupsneeded.push("DEAD_ROLE");
        if (!msg.guild.channels.cache.some((channel) => channel.name.toLowerCase() === "waiting")) setupsneeded.push("WAITING_VOICE");
        if (!msg.guild.channels.cache.some((channel) => channel.name.toLowerCase() === "dead")) setupsneeded.push("DEAD_VOICE");
        if (!msg.guild.channels.cache.some((channel) => ingamec.includes(channel.name.toLowerCase()))) setupsneeded.push("GAME_VOICE");
        if (!msg.guild.channels.cache.some((channel) => channel.name.toLowerCase() === "meeting")) setupsneeded.push("MEETING_VOICE");
        if(!setupsneeded[0]) return msg.channel.send("It looks like this server is already set up!");
        try{
        msg.guild.channels.create('among us', {type: 'category'}).then(cate =>{
        if (!msg.guild.roles.cache.some((channel) => roles.includes(channel.name.toLowerCase()))) msg.guild.roles.create({data: {name: 'dead'},reason: 'Among us auto setup',})
        if (!msg.guild.channels.cache.some((channel) => channel.name.toLowerCase() === "meeting")) msg.guild.channels.create('meeting', {type: 'voice', parent:cate.id, permissionOverwrites: [{ id: msg.guild.roles.cache.find(e => roles.includes(e.name.toLowerCase())).id, deny: ['SPEAK'],}], });
        if (!msg.guild.channels.cache.some((channel) => channel.name.toLowerCase() === "waiting")) msg.guild.channels.create('waiting', {type: 'voice', parent:cate.id})
        if (!msg.guild.channels.cache.some((channel) => channel.name.toLowerCase() === "dead")) msg.guild.channels.create('dead', {type: 'voice', parent:cate.id})
        if (!msg.guild.channels.cache.some((channel) => channel.name.toLowerCase() === "in-game")) msg.guild.channels.create('in-game', {type: 'voice', parent:cate.id,permissionOverwrites: [{ id: msg.guild.id, deny: ['SPEAK'],}], })
        })
        msg.channel.send("> Created required roles/channels")
        }catch(e){
        msg.channel.send("> An error occured while creating the channels, I might be missing `MANAGE_CHANNELS` perms")
        console.log(e);
        }
      }
  break;
  case "help":
      msg.channel.send("> Among us discord bot help \n> Developed by Blocks_n_more#5526 \n> **!help** - Shows this \n> **!createpanel** - Create reaction panel \n> **!kill** - Force kill a user \n> **!setup** - Server setup \n> **Need support?** Join my discord at https://amongsus.page.link/d")
  break;
  }})

    
{ const http = require("http"); const e = require("express"); const app = e(); 
  app.get("/", (request, response) => { response.send("<h2>What u doin here?</h2>"); });
  app.listen(process.env.PORT);
  setInterval(() => { http.get(`http://AmongSus.blocksnmore.repl.co`); }, 280000);
}

bot.on("ready", () => {
 setInterval(function(){
  bot.user.setActivity(statuses[Math.floor(Math.random() * statuses.length)], {type: "WATCHING"})
 },60000) 
 console.log("Watching people be among us")
})

bot.login(token)
