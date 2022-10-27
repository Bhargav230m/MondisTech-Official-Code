const fs = require('fs');
const {v4: uuidv4} = require("uuid");

class PPManager {
    constructor(config, themeConfig) {
        this.config = config;
        this.themeConfig = themeConfig;
    }

    GetProjectData() {
        let projectStats;
        try{
            projectStats = fs.readFileSync(require('path').join(__dirname, './project.json'));
        }catch(err){
            projectStats = JSON.stringify({"id": null, name: null, version: require('discord-dashboard').version});
        }
        const projectData = JSON.parse(projectStats);
        return projectData;
    }

    SaveProjectData() {
        let projectData;
        try{
            projectData = this.GetProjectData();
        }catch(err){
            projectData = {};
        }
        if(!projectData.id)projectData.id = uuidv4();
        projectData.name = `${this.config.websiteTitle || this.themeConfig.websiteName || this.config.client.id}`;
        projectData.version = require('discord-dashboard').version;
        fs.writeFileSync(require('path').join(__dirname, './project.json'), JSON.stringify(projectData, null, 3));
        return true;
    }

    PP_GetAccepted() {
        let ppAccepted;
        try {
            ppAccepted = fs.readFileSync(require('path').join(__dirname, './ppAccepted.txt'), 'utf8');
        }catch(err){
            ppAccepted=null;
        }
        return ppAccepted;
    }

    PP_Accept() {
        fs.writeFileSync(require('path').join(__dirname, './ppAccepted.txt'), 'accepted');
        return true;
    }
}

module.exports = {PPManager};