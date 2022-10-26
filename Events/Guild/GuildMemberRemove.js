
const { EmbedBuilder } = require("discord.js");
const Schema = require("../../Schemas/remove");



module.exports = {
    name: "guildMemberRemove",
    async execute(member) {



        //welcome add
        Schema.findOne({Guild: member.guild.id}, async (err, data) => {
            if (!data) return;
            let channel = data.Channel;
            let Msg = data.Msg || " ";

            const {guild} = member;
            const welcomeChannel = member.guild.channels.cache.get(data.Channel);

            const welcomeEmbed = new EmbedBuilder()
            .setTitle("**Member Left :-(**")
            .setDescription(data.Msg)
            .setColor(0x037821)
            .addFields({name: 'Total members', value: `${guild.memberCount}`})
            .addFields({name: `Member Name`, value: `<@${member.id}>`})
            .setTimestamp();

            welcomeChannel.send({embeds: [welcomeEmbed]});
        })
    }
}