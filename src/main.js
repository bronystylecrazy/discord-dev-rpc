const RPC = require('discord-rpc');
let icons = require('./icons');
var monitor = require('active-window');

let iconPacks = icons;

const rpc = new RPC.Client({
	transport: "ipc"
});

rpc.on('ready', () => {
	monitor.getActiveWindow(callback, -1, 1);
	console.log("Rich is now active!");
});

var startTimestamp = new Date();

const onWindowChange = ({ app, title }) => {
	console.log("Window changed!");
	var details = "Hey, I ❤️ coding with..";
	var state = "Node.js x Vue.js";
	if (app === "Code - Insiders") {
		state = `Editing ${title.split(" - ")[0].trim()} in ${title.split(" - ")[1].trim()}.`

		const fileName = title.split(" - ")[0].trim();
		const { icon, text } = checkIfMatched(fileName);
		console.log(`show -> ${text}`);
		rpc.setActivity({
			details,
			state,
			startTimestamp,
			smallImageText: "Visual Studio Code",
			smallImageKey: "vscode",
			largeImageText: text,
			largeImageKey: icon
		});
	}
}

function checkIfMatched(fileName) {
	for (var icon in iconPacks) {
		if (fileName.endsWith(icon)) {
			return iconPacks[icon];
		}
	}
	return { icon: "nodejslogo", text: "Node.js" };
}

rpc.login({
	clientId: "795279750506741801",
});

let actualTitle = "";

callback = (window) => {
	if (actualTitle !== window.title) {
		onWindowChange(window);
	}
	try {
		actualTitle = window.title;
	} catch (err) {
		console.log(err);
	}
}
