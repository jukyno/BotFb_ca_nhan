
var request = require("request");
var login = require("facebook-chat-api");
var SimsimiAnswered;
var text;
var botkey = "http://sandbox.api.simsimi.com/request.p?key=75df7f09-1159-47eb-852a-189fab36961a&lc=vi&ft=1.0&text=";
login(
	{	
	email: "01298830055", 
	password: "Cuong2411" 
	},
function callback (err, api)
{
	if(err) return console.error(err);
	
	api.setOptions({forceLogin: true, selfListen: false, logLevel: "silent"});
	
	api.listen(function callback(err, message)
	{
		if(message.body === "stopchat") { 
			api.sendMessage(";) Ngừng auto chat thành công.", message.threadID); 
			api.markAsRead(message.threadID);
			return api.logout(err);
		}
		if (message.body==="Getid"||message.body==="getid"||message.body==="get id"||message.body==="Get id") {
			console.log("FormID: " + message.threadID + '->Message: '+message.body);
			api.sendMessage("Your ID: ", message.threadID); 
			api.sendMessage(message.senderID, message.threadID); 
			api.markAsRead(message.threadID); 
			console.log("Sender ID: " + message.senderID);
		}
		else if(message.body === 'Stop') { 
		    api.sendMessage("- Ok bye.\n- À mà thôi, ở lại ns truyện cho vui. Ahihi [Jukyno]", message.threadID);
			return;
		}
		else if(message.body === 'sđt') { 
	        api.sendMessage('- - SĐT của boss Jukyno: 01675274963', message.threadID);
			return;
		}
		else if(message.body === 'Xem Wall') { 
	        api.sendMessage('- - mời click: https://mbasic.facebook.com/100011792836668', message.threadID);
			return;
		}

		else if(message.body === "HD") { 
			console.log("FormID: " + message.threadID + '->Message: '+message.body);
			api.sendMessage("- mời click: https://mbasic.facebook.com/100011792836668", message.threadID); 
			api.sendMessage("- Tin nhắn trả lời tự động. HD:  \n- Ghõ Xem Wall để ghé thăm tường của Boss. \n- Ghõ sđt để xem số điện thoại của Boss. \n- Ghõ Stop để tránh chatbot tự động trả lời. \n- Trả lời bất kỳ để tiếp tục cuộc trò chuyện. \n- Để phân biệt người và bot thì bot luôn bắt đầu bằng ''-'' [Boss] :)", message.threadID);
			return;
		}
		else if(message.body === "sdt") { 
			console.log("FormID: " + message.threadID + '->Message: '+message.body);
			api.sendMessage("- SĐT: 0977177321", message.threadID); 
			api.sendMessage("- Tin nhắn trả lời tự động. HD:  \n- Ghõ Xem Wall để ghé thăm tường của Boss. \n- Ghõ sđt để xem số điện thoại của Boss :v. \n- Ghõ Stop để tránh chatbot tự động trả lời. \n- Trả lời bất kỳ để tiếp tục cuộc trò chuyện. [Boss]", message.threadID);
			return;
		}
		 else if (message.senderID==="id_loại_trừ_1"||message.senderID==="id_loại_trừ_2") {			 
			console.log("FormID: " + message.threadID + '->Message: '+message.body);
			return;
		}else if (message.body)
		{
			console.log("FormID: " + message.threadID + '->Message: '+message.body);
			request(botkey + encodeURI(message.body),  
			function(error, response, body)
			{			
				if (error) api.sendMessage("- Lag quá em ko nhắn được bạn ơi :) [Boss]", message.threadID);
		var ans = JSON.parse(body);
				if (ans.result == "100")
				{
					SimsimiAnswered = ans.response;
					api.sendMessage(SimsimiAnswered+"\n--------------\n-.- Mẹ thiên hạ", message.threadID);
					api.markAsRead(message.threadID);
					console.log("Answered:"+SimsimiAnswered);
				}
				if (body.indexOf("502 Bad Gateway") > 0 || body.indexOf("response") < 0)
					api.sendMessage(" - Đéo hiểu \nĐợi não em load đã ;) : " + message.body, message.threadID 
				);
			});
		}
	});
})