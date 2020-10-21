const discord = require("discord.js"); 
const bot = new discord.Client({partials: ['MESSAGE','REACTION', 'CHANNEL']});
const statuses = ["Blue vent", "Red be sus", "Cyan scan in medbay", "Black not do tasks", "Yellow kill crewmates", "Blocks_n_more develop features", "People use the Among sus discord bot", "I like your cut G", "Pink make assumptions", "Purple vote first", "Sus plays"] 
const mysql = require("mysql");
var mysqlc = mysql.createConnection({
    host     : process.env.mysqlurl,
    user     : process.env.mysqluser,
    password : process.env.mysqlpassword,
    database : process.env.mysqldb});
   


bot.on("ready", ()=>{
var statusnum = 0; bot.user.setActivity(statuses[statusnum], {type: "WATCHING"}); statusnum++; setInterval(function(){
    if(statusnum -1 === statuses.length) statusnum = 0;
    bot.user.setActivity(statuses[statusnum], {type: "WATCHING"}); statusnum++; }, 60000);
})


bot.login(process.env.devtoken);