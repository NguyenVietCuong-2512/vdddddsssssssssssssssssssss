const fs = require("fs");
module.exports.config = {
	name: "sinhnhat2",
    version: "1.0.1",
	hasPermssion: 0,
	credits: "ΔΔng", 
	description: "no prefix",
	commandCategory: "ππππππππ",
	usages: "YΓͺu bot",
    cooldowns: 5, 
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
	var { threadID, messageID } = event;
	if (event.body.indexOf("Sinh nhαΊ­t")==0 || (event.body.indexOf("sinh nhαΊ­t")==0) || (event.body.indexOf("Hpbd")==0) || (event.body.indexOf("hpbd")==0)) {
		var msg = {
				body: "πγβ€γπγπγ πΈγπ\nγ πΈγπγβ¨ γπγπ\nπ«γβ¨γοΌΌ ο½ οΌγ πΈγπ\nππͺπΉπΉπ        ππ²π»π½π±π­πͺπ\nπγοΌ ο½ οΌΌγπ»\nγπγ πΈγπγ\n πγ π«γ πΆ π₯",
			}
			api.sendMessage(msg, threadID, messageID);
		}
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

}