
const { EmbedBuilder } = require("discord.js");
const Schema = require("../../Schemas/Welcome");



module.exports = {
    name: "guildMemberAdd",
    async execute(member) {



        //welcome add
        Schema.findOne({Guild: member.guild.id}, async (err, data) => {
            if (!data) return;
            let channel = data.Channel;
            let Msg = data.Msg || " ";
            let Role = data.Role;

            const {user, guild} = member;
            const welcomeChannel = member.guild.channels.cache.get(data.Channel);

            const welcomeEmbed = new EmbedBuilder()
            .setTitle("**New member!**")
            .setDescription(data.Msg)
            .setColor(0x037821)
            .addFields({name: 'Total members', value: `${guild.memberCount}`})
            .addFields({name: `Member Name`, value: `<@${member.id}>`})
            .setTimestamp();

            welcomeChannel.send({embeds: [welcomeEmbed]});
            member.roles.add(data.Role);
        })
    }
}