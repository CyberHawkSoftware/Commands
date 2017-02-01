//gives a link to the source code on github
module.exports = function command(bot, info)
{
  'use strict';
    
  return {
    inline: true,
    alias: ['s'],
    description: '(Returns some bot stats)',
    permissions: 'public',
    action: function(details)
    {
      let now = new Date();
      const convertDate = function(ms)
      {
        let str = '';
        let x = ms / 1000;
        let seconds = Math.floor(x % 60);
        x /= 60;
        let minutes = Math.floor(x % 60);
        x /= 60;
        let hours = Math.floor(x % 24);
        x /= 24;
        let days = Math.floor(x);
        if(days > 0)
        {
          str += `${days}d`;
        }
        if(hours > 0)
        {
          str += `${hours}h`;
        }
        if(minutes > 0)
        {
          str += `${minutes}m`;
        }
        if(seconds > 0)
        {
          str += `${seconds}s`;
        }
        return str;
      };
      const countUsers = function()
      {
        let num = 0;
        Object.keys(bot.servers).forEach(function(key)
        {
          num += bot.servers[key].member_count;
        });
        return num;
      };
      const getFeathers = function()
      {
        let s = Object.keys(info.feathers).map((key) => 
        {
          return key;
        }).join(',');
        return s;
      };
      bot.sendMessage({
        to: details.channelID,
        embed: {
          title: 'Game Shogun\'s Stats',
          description: '',
          footer: {
            text: 'Created by CyberRonin#5517'
          },
          thumbnail: {
            url: 'https://cdn.discordapp.com/avatars/266929822385569792/aa6e7430c7581c37573ce3a007123593.jpg'
          },
          fields:[
            {
              name: 'Servers',
              value: Object.keys(bot.servers).length,
              inline: true
            },
            {
              name: 'Channels',
              value: Object.keys(bot.channels).length,
              inline: true
            },
            {
              name: 'Users',
              value: countUsers(),
              inline: true
            },
            {
              name: 'Commands',
              value: Object.keys(info.commands).length,
              inline: true
            },
            {
              name: 'Uptime',
              value: convertDate(now - info.start),
              inline: true
            },
            {
              name: 'Discord Server',
              value: 'https://discord.gg/jDpR9PD',
              inline: true
            },
            {
              name: 'Feathers Loaded',
              value: getFeathers()
            },
            {
              name: 'About',
              value: 'Primary purpose is to have a bot that will be useful when gaming. The first implementation will be League of Legends!',
              inline: false
            }
          ]
        }
      });
    }
  };
};