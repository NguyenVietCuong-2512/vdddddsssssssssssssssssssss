module.exports.config = {
	name: "join",
	eventType: ["log:subscribe"],
	version: "1.0.1",
	credits: "Mirai Team",
	description: "Thông báo bot hoặc người vào nhóm",
	dependencies: {
		"fs-extra": ""
	}
};

module.exports.run = async function({ api, event }) {
	const { join } = global.nodemodule["path"];
	const { threadID } = event;
	if (event.logMessageData.addedParticipants.some(i => i.userFbId == api.getCurrentUserID())) {
		api.changeNickname(`[ ${global.config.PREFIX} ] • ${(!global.config.BOTNAME) ? "𝕳𝖔𝖆̀𝖓𝖌 𝕲𝖔𝖔𝖉𝖇𝖔𝖞♡" : global.config.BOTNAME}`, threadID, api.getCurrentUserID());
		return api.sendMessage(`Kết nối thành công! Chào mừng mọi người đến với Bot của Lươn Trúa:\n     ღ Nhân Thiện Nguyễn ღ\nChúc mấy con đỹ trong box có phút giây trải nghiệm tuyệt vời ♥\n❖ Tao không chấp nhận với những trường hợp 𝙎𝙥𝙖𝙢, 𝘾𝙝𝙪̛̉𝙞 𝘽𝙤𝙩. Nếu phát hiện sẽ 𝙊𝙪𝙩𝙗𝙤𝙭 không điều kiện\n❖ Nếu có thắc mắc vui lòng lh Admin Bot để được hỗ trợ!`, threadID);
	}
	else {
		try {
			const { createReadStream, existsSync, mkdirSync } = global.nodemodule["fs-extra"];
			let { threadName, participantIDs } = await api.getThreadInfo(threadID);

			const threadData = global.data.threadData.get(parseInt(threadID)) || {};
			const path = join(__dirname, "cache", "joinGif");
			const pathGif = join(path,`join.gif`);

			var mentions = [], nameArray = [], memLength = [], i = 0;
			
			for (id in event.logMessageData.addedParticipants) {
				const userName = event.logMessageData.addedParticipants[id].fullName;
				nameArray.push(userName);
				mentions.push({ tag: userName, id });
				memLength.push(participantIDs.length - i++);
			}
			memLength.sort((a, b) => a - b);
			
			(typeof threadData.customJoin == "undefined") ? msg = "Mấy con đỹ!ra tiếp khách coi\n👋Xin chào con đũy\n{name}\nChào mừng đến với:\n»{threadName}«\n{type} là con đũy thứ {soThanhVien} của động xàm xí đú này 👏🥳🎉" : msg = threadData.customJoin;
			msg = msg
			.replace(/\{name}/g, nameArray.join(', '))
			.replace(/\{type}/g, (memLength.length > 1) ?  'Mấy má' : 'má')
			.replace(/\{soThanhVien}/g, memLength.join(', '))
			.replace(/\{threadName}/g, threadName);

			if (existsSync(path)) mkdirSync(path, { recursive: true });

			if (existsSync(pathGif)) formPush = { body: msg, attachment: createReadStream(pathGif), mentions }
			else formPush = { body: msg, mentions }

			return api.sendMessage(formPush, threadID);
		} catch (e) { return console.log(e) };
	}
}